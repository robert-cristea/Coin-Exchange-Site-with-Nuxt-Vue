<template>
  <div class="change-password-container">
    <a-row class="stick-margin">
      <a-col :span="24">
        <a-card class="border-none">
          <a-breadcrumb class="order-breadcumb Roboto-Regular">
            <a-breadcrumb-item>
              <a @click="$router.push(localeRoute('/account/security'))">{{
                $t('header_text_security')
              }}</a></a-breadcrumb-item
            >
            <a-breadcrumb-item>
              {{ $t('text_login_password') }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-card>
      </a-col>
    </a-row>
    <a-row
      type="flex"
      class="change-password-card-row"
      align="middle"
      justify="center"
    >
      <a-col :span="24">
        <a-card class="change-password-card">
          <div class="text-center change-card-section">
            <h2
              class="Roboto-Regular change-password-card-title change-text-primary"
            >
              {{ $t('password_text_create_pass') }}
            </h2>
            <p class="change-text-secondary Roboto-Regular">
              {{ $t('password_text_info') }}
            </p>
          </div>
          <div class="alert-container change-card-section">
            <a-alert
              class="border-none Roboto-Regular change-text-alert"
              type="info"
              show-icon
            >
              <span slot="description">{{ $t('password_description') }}</span>
            </a-alert>
            <a-alert
              v-if="showError"
              type="warning"
              :description="errorMsg"
              show-icon
              class="Roboto-Regular alert-box"
              @close="(e) => (showError = false)"
              closable
            ></a-alert>
          </div>
          <div class="change-password-form change-card-section">
            <a-form-model
              ref="changePassFormRef"
              :model="changePass"
              :rules="changePassRules"
              layout="vertical"
            >
              <a-form-model-item has-feedback prop="CurrentPassword">
                <template slot="label">
                  <span class="input-label Roboto-Medium">{{
                    $t('text_current_password')
                  }}</span>
                </template>
                <a-input-password
                  v-model="changePass.CurrentPassword"
                  class="Roboto-Regular"
                  type="email"
                  size="large"
                ></a-input-password>
              </a-form-model-item>
              <a-form-model-item has-feedback prop="NewPassword">
                <template slot="label">
                  <span class="input-label Roboto-Medium">{{
                    $t('text_new_password')
                  }}</span>
                </template>
                <a-input-password
                  v-model="changePass.NewPassword"
                  class="Roboto-Regular"
                  size="large"
                ></a-input-password>
              </a-form-model-item>
              <a-form-model-item has-feedback prop="ConfirmPassword">
                <template slot="label">
                  <span class="input-label Roboto-Medium">{{
                    $t('text_new_password_again')
                  }}</span>
                </template>
                <a-input-password
                  v-model="changePass.ConfirmPassword"
                  class="Roboto-Regular"
                  size="large"
                ></a-input-password>
              </a-form-model-item>
              <a-form-model-item>
                <a-button
                  @click="updatePassword"
                  class="primary-button border-none Roboto-Medium"
                  type="primary"
                  size="large"
                  :loading="isLoadingChangePassword"
                  block
                  >{{ $t('text_send') }}</a-button
                >
              </a-form-model-item>
            </a-form-model>
          </div>
          <!-- veirfy modal start-->
          <SecurityVerifyModal
            v-if="verifyData.showDialog"
            :verifyData="verifyData"
          />
          <!-- verify modal end -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import authMixin from '~/Mixins/authMixin'
import SecurityVerifyModal from '~/components/Account/SecurityVerifyModal'
export default {
  components: {
    SecurityVerifyModal,
  },
  mixins: [authMixin],
  head() {
    return {
      title: this.$t('title_text_update_password'),
    }
  },
  data() {
    /* eslint-disable */
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/

    const PasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password')))
      } else if (!passwordRegex.test(value.toString())) {
        callback(new Error(this.$t('password_text_regex')))
      } else {
        if (this.changePass.ConfirmPassword !== '') {
          this.$refs.changePassFormRef.validateField('ConfirmPassword')
        }
        callback()
      }
    }
    const confirmPasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password_again')))
      } else if (value !== this.changePass.NewPassword) {
        callback(new Error(this.$t('validation_text_password_match')))
      } else {
        callback()
      }
    }
    return {
      changePass: {
        CurrentPassword: '',
        NewPassword: '',
        ConfirmPassword: '',
      },
      changePassRules: {
        NewPassword: [
          {
            validator: PasswordValidator,
            trigger: 'change',
          },
        ],
        ConfirmPassword: [
          {
            validator: confirmPasswordValidator,
            trigger: 'change',
          },
        ],
      },
      isLoadingChangePassword: false,
      showError: false,
      errorMsg: '',
      verifyData: {
        Token: null,
        errorCode: null,
        showDialog: false,
      },
    }
  },

  mounted() {
    document.body.addEventListener('keyup', this.CTA_UPDATE_PASSWORD)
  },
  destroyed() {
    document.body.removeEventListener('keyup', this.CTA_UPDATE_PASSWORD)
  },
  methods: {
    CTA_UPDATE_PASSWORD(e) {
      if (e.keyCode === 13) {
        this.updatePassword()
      }
    },
    async updatePassword() {
      const { $axios, $config, $cookies } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingChangePassword = true
      const response = await $axios.post(
        $config.FINANCE_API_URL + '/UpdatePassword',
        this.changePass,
        {
          headers: authHeaders,
        }
      )
      this.isLoadingChangePassword = false
      if (response.data.Success) {
        const { SecurityVerificationToken, ErrorCode } = response.data
        this.verifyData.Token = SecurityVerificationToken
        this.verifyData.errorCode = ErrorCode
        this.verifyData.showDialog = true
      } else if (response.data.ErrorCode === 98) {
        const { ErrorCode } = response.data
        this.verifyData.Token = ''
        this.verifyData.errorCode = ErrorCode
        this.verifyData.showDialog = true
      } else {
        const { ErrorCode } = response.data
        if (ErrorCode === 98) {
          this.verifyData.Token = ''
          this.verifyData.errorCode = ErrorCode
          this.verifyData.showDialog = true
        }
        this.showError = true
        this.errorMsg = response.data.Message
      }
    },
  },
}
</script>

<style scoped>
.stick-margin {
  margin: -15px auto auto -15px;
}
.change-password-card-row {
  min-height: 50vh;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-text-primary {
  color: #1e2026;
}
.change-text-secondary {
  color: #818998;
}
.change-text-alert {
  color: #6992bc;
}
.change-password-card-title {
  font-size: 25px;
}
.change-password-card {
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 3px;
  width: 400px;
  margin: auto auto;
}
.change-card-section {
  margin: 20px auto;
}
.input-label {
  padding: 0;
}
.alert-box {
  margin: 10px auto;
}
</style>
