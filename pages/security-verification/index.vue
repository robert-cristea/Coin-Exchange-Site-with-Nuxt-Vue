<template>
  <div id="security-verify-page">
    <Index>
      <template slot="auth-card-content">
        <div class="security-verify-header text-center">
          <h2 class="Roboto-Medium">{{ $t(this.ttl) }}</h2>
          <p class="verify-text-secondary Roboto-Regular">{{ $t(this.dsc) }}</p>
        </div>
        <a-alert
          v-if="subject === 'DISABLE2FA'"
          class="disable2fa-text-container border-none"
          :description="$t('text_disable_2fa_warning')"
          type="info"
          show-icon
        ></a-alert>
        <a-alert
          v-if="subject === 'DISABLESMS'"
          class="disable2fa-text-container border-none"
          :description="$t('text_disable_sms_warning')"
          type="info"
          show-icon
        ></a-alert>
        <a-alert
          class="my-10"
          v-if="showError"
          v-bind:message="$t('warning_title')"
          :description="errorMsg"
          type="warning"
          @close="(e) => (showError = false)"
          closable
        ></a-alert>

        <div v-if="subject !== 'TWOFATOKEN'">
          <div class="my-10" v-if="vrfTypes.includes('sms')">
            <p class="Roboto-Regular mb-0">{{ $t('verify_phone_title') }}</p>
            <a-form-model class="verify-form-model">
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-form-model-item class="mr-0 mb-0">
                    <a-input
                      v-model="vrf.SmsCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('verify_enter_code')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item class="mr-0 mb-0">
                    <input
                      id="sendSMSCode"
                      @click="sendCode('SMS')"
                      style="display: none"
                    />
                    <a-button
                      :disabled="isSmsCodeSent"
                      @click="sendCode('SMS')"
                      :loading="isLoadingSendCodeSMS"
                      class="submit-button-color Roboto-Regular"
                      type="secondary"
                      size="large"
                      block
                    >
                      {{ isSmsCodeSent ? smsTimer : $t('text_send_code') }}
                    </a-button>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <p align="left" class="Roboto-Regular mb-0" v-if="isSmsCodeSent">
              {{ $t('send_sms_text', { phn: oph }) }}
            </p>
          </div>

          <div class="my-10" v-if="vrfTypes.includes('email')">
            <p class="Roboto-Regular mb-0">{{ $t('verify_email_title') }}</p>
            <a-form-model class="verify-form-model">
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-form-model-item class="mr-0 mb-0">
                    <a-input
                      v-model="vrf.EmailCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('verify_enter_code')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item class="mr-0 mb-0">
                    <input
                      id="sendEMAILCode"
                      @click="sendCode('EMAIL')"
                      style="display: none"
                    />

                    <a-button
                      :loading="isLoadingSendCodeEmail"
                      :disabled="isEmailCodeSent"
                      @click="sendCode('EMAIL')"
                      class="submit-button-color Roboto-Regular"
                      type="secondary"
                      size="large"
                      block
                    >
                      {{ isEmailCodeSent ? emailTimer : $t('text_send_code') }}
                    </a-button>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <p align="left" class="Roboto-Regular mb-0" v-if="isEmailCodeSent">
              {{ $t('send_email_text', { email: oem }) }}
            </p>
          </div>

          <div class="my-10" v-if="vrfTypes.includes('2fa')">
            <p class="Roboto-Regular mb-0">{{ $t('verify_2fa_title') }}</p>
            <a-form-model class="verify-form-model">
              <a-row :gutter="8">
                <a-col :span="24">
                  <a-form-model-item class="mr-0 mb-0">
                    <a-input
                      v-model="vrf.TwoFaCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('verify_enter_code')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <p align="left" class="Roboto-Regular mb-0">
              {{ $t('verify_2fa_info') }}
            </p>
          </div>
        </div>

        <div v-if="subject === 'TWOFATOKEN'">
          <a-tabs
            v-if="vrfTypes.includes('sms') && vrfTypes.includes('2fa')"
            v-model="TwoFaActiveTabKey"
          >
            <a-tab-pane
              v-for="tf in TwoFaTabs"
              :key="tf.key"
              class="Roboto-Medium"
            >
              <span
                v-if="tf.key === 'SMS'"
                slot="tab"
                :class="{
                  'tab-label-active': tf.key === TwoFaActiveTabKey,
                  'tab-label-inactive': tf.key !== TwoFaActiveTabKey,
                }"
                >{{ tf.key }}</span
              >
              <span
                v-if="tf.key === '2FA'"
                slot="tab"
                :class="{
                  'tab-label-active': tf.key === TwoFaActiveTabKey,
                  'tab-label-inactive': tf.key !== TwoFaActiveTabKey,
                }"
                >{{ tf.key }}</span
              >
              <div v-if="TwoFaActiveTabKey === 'SMS'">
                <p class="Roboto-Regular mb-0">
                  {{ $t('verify_phone_title') }}
                </p>
                <a-form-model class="verify-form-model">
                  <a-row :gutter="8">
                    <a-col :span="16">
                      <a-form-model-item class="mr-0 mb-0">
                        <a-input
                          v-model="vrf.SmsCode"
                          class="Roboto-Regular"
                          :maxLength="6"
                          v-bind:placeholder="$t('verify_enter_code')"
                          size="large"
                        ></a-input>
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-model-item class="mr-0 mb-0">
                        <a-button
                          :disabled="isSmsCodeSent"
                          @click="sendCode('SMS')"
                          :loading="isLoadingSendCodeSMS"
                          class="submit-button-color Roboto-Regular"
                          type="secondary"
                          size="large"
                          block
                        >
                          {{ isSmsCodeSent ? smsTimer : $t('text_send_code') }}
                        </a-button>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-form-model>
                <p
                  align="left"
                  class="Roboto-Regular mb-0"
                  v-if="isSmsCodeSent"
                >
                  {{ $t('send_sms_text', { phn: oph }) }}
                </p>
              </div>
              <div v-if="TwoFaActiveTabKey === '2FA'">
                <p class="Roboto-Regular mb-0">{{ $t('verify_2fa_title') }}</p>
                <a-form-model class="verify-form-model">
                  <a-row :gutter="8">
                    <a-col :span="24">
                      <a-form-model-item class="mr-0 mb-0">
                        <a-input
                          v-model="vrf.TwoFaCode"
                          class="Roboto-Regular"
                          :maxLength="6"
                          v-bind:placeholder="$t('verify_enter_code')"
                          size="large"
                        ></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-form-model>
                <p align="left" class="Roboto-Regular mb-0">
                  {{ $t('verify_2fa_info') }}
                </p>
              </div>
            </a-tab-pane>
          </a-tabs>

          <div v-if="vrfTypes.length === 1 && vrfTypes.includes('sms')">
            <p class="Roboto-Regular mb-0">{{ $t('verify_phone_title') }}</p>
            <a-form-model class="verify-form-model">
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-form-model-item class="mr-0 mb-0">
                    <a-input
                      v-model="vrf.SmsCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('verify_enter_code')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item class="mr-0 mb-0">
                    <a-button
                      :disabled="isSmsCodeSent"
                      @click="sendCode('SMS')"
                      :loading="isLoadingSendCodeSMS"
                      class="submit-button-color Roboto-Regular"
                      type="secondary"
                      size="large"
                      block
                    >
                      {{ isSmsCodeSent ? smsTimer : $t('text_send_code') }}
                    </a-button>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <p align="left" class="Roboto-Regular mb-0" v-if="isSmsCodeSent">
              {{ $t('send_sms_text', { phn: oph }) }}
            </p>
          </div>

          <div v-if="vrfTypes.length === 1 && vrfTypes.includes('2fa')">
            <p class="Roboto-Regular mb-0">{{ $t('verify_2fa_title') }}</p>
            <a-form-model class="verify-form-model">
              <a-row :gutter="8">
                <a-col :span="24">
                  <a-form-model-item class="mr-0 mb-0">
                    <a-input
                      v-model="vrf.TwoFaCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('verify_enter_code')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <p align="left" class="Roboto-Regular mb-0">
              {{ $t('verify_2fa_info') }}
            </p>
          </div>
        </div>

        <div v-if="subject === 'RESETPASSWORD'">
          <a-form-model
            :model="resetPasswords"
            ref="resetPasswordsRef"
            layout="vertical"
            :rules="resetPasswordRules"
            class="verify-form-model Roboto-Regular"
          >
            <a-row :gutter="8">
              <a-col :span="24">
                <a-form-model-item
                  class="mr-0 mb-0"
                  has-feedback
                  prop="NewPassword"
                >
                  <template slot="label">
                    <p class="input-label mb-0">
                      {{ $t('verify_new_password') }}
                    </p>
                  </template>
                  <a-input-password
                    v-model="resetPasswords.NewPassword"
                    class="Roboto-Regular"
                    v-bind:placeholder="$t('verify_new_password')"
                    size="large"
                  ></a-input-password>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :span="24">
                <a-form-model-item
                  class="mr-0 mb-0"
                  has-feedback
                  prop="ConfirmPassword')"
                >
                  <template slot="label">
                    <p class="input-label mb-0">
                      {{ $t('verify_confirm_password') }}
                    </p>
                  </template>
                  <a-input-password
                    v-model="resetPasswords.ConfirmPassword"
                    class="Roboto-Regular"
                    v-bind:placeholder="$t('verify_confirm_password')"
                    size="large"
                  ></a-input-password>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </div>

        <a-button
          v-if="subject === 'RESETPASSWORD'"
          style="margin-top: 20px"
          :loading="isSecurityVerifyLoading"
          @click="resetPassword"
          class="primary-button Roboto-Medium"
          type="primary"
          size="large"
          block
          >{{ $t('verify_send_button') }}</a-button
        >
        <a-button
          v-else
          style="margin-top: 20px"
          :loading="isSecurityVerifyLoading"
          :disabled="DisableCheckVerify"
          @click="securityVerify"
          class="primary-button Roboto-Medium"
          type="primary"
          size="large"
          block
          >{{ $t('verify_send_button') }}</a-button
        >
        <recaptcha />
        <small
          >This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a href="https://policies.google.com/terms">Terms of Service</a>
          apply.
        </small>
      </template>
    </Index>
  </div>
</template>

<script>
import Index from '~/components/Login/Index'
import { mapMutations } from 'vuex'
import authMixin from '~/Mixins/authMixin'
import jwt_decode from 'jwt-decode'

export default {
  components: {
    Index,
  },
  layout: 'login',
  middleware({ app, store, redirect }) {
    if (!store.state.auth.verficationData.status) {
      redirect(app.localePath('/login'))
    }
  },
  head() {
    return {
      title: 'Güvenlik Onayı | Cointral.com',
    }
  },
  data() {
    return {
      TwoFaTabs: [
        { key: 'SMS', scopedSlots: { tab: 'titleSlot' } },
        { key: '2FA', scopedSlots: { tab: 'titleSlot' } },
      ],
      TwoFaActiveTabKey: 'SMS',

      vrf: {
        SmsCode: '',
        EmailCode: '',
        TwoFaCode: '',
      },
      resetPasswords: {
        NewPassword: '',
        ConfirmPassword: '',
      },
      resetPasswordRules: {
        NewPassword: [
          {
            validator: this.ResetPasswordValidator,
            trigger: 'change',
          },
        ],
        ConfirmPassword: [
          {
            validator: this.ConfirmResetPasswordValidator,
            trigger: 'change',
          },
        ],
      },
      vrfTypes: [],
      phn: '',
      cst: '',
      subject: '',
      oem: '',
      oph: '',
      ttl: '',
      dsc: '',
      isSmsCodeSent: false,
      isEmailCodeSent: false,
      isValidVerifInfo: false,

      smsTimer: 60,
      emailTimer: 60,
      smsIntrvl: null,
      emailIntrvl: null,

      showError: false,
      errorMsg: '',

      isSecurityVerifyLoading: false,
      isLoadingSendCodeSMS: false,
      isLoadingSendCodeEmail: false,
    }
  },
  mounted() {
    document.addEventListener('keyup', this.CTA_SECURITY_VERIFY)
    const {
      SecurityVerificationToken,
      redirectURI,
    } = this.$store.state.auth.verficationData

    const { sub, phn, cst, vrf, oem, oph, ttl, dsc } = jwt_decode(
      SecurityVerificationToken
    )

    this.subject = sub
    this.phn = phn
    this.cst = cst
    this.vrfTypes = vrf.split(',')
    this.oem = oem
    this.oph = oph
    this.ttl = ttl
    this.dsc = dsc
    if (this.subject === 'VERIFYCUSTOMER') {
      if (this.vrfTypes.includes('sms')) {
        this.sendCode('SMS')
      }
      if (this.vrfTypes.includes('email')) {
        this.sendCode('EMAIL')
      }
    }
  },
  destroyed() {
    document.removeEventListener('keyup', this.CTA_SECURITY_VERIFY)
  },
  methods: {
    CTA_SECURITY_VERIFY(e) {
      if (e.keyCode === 13) {
        if (this.subject === 'RESETPASSWORD') this.resetPassword()
        else this.securityVerify()
      }
    },
    ...mapMutations({
      setLoggedIn: 'auth/setLoggedIn',
    }),
    async sendCode(type) {
      const {
        SecurityVerificationToken,
      } = this.$store.state.auth.verficationData
      const { $axios, $config } = this
      const payload = {
        Type: type,
        Token: SecurityVerificationToken,
      }
      try {
        if (type === 'SMS') {
          this.isLoadingSendCodeSMS = true
        }
        if (type === 'EMAIL') {
          this.isLoadingSendCodeEmail = true
        }
        const response = await $axios.post(
          $config.AUTH_API_URL + '/SendOTP',
          payload
        )
        if (response.data.Success) {
          if (type === 'SMS') {
            this.isLoadingSendCodeSMS = false
            this.isSmsCodeSent = true
            this.startTimer('SMS')
            setTimeout(() => {
              this.isSmsCodeSent = false
            }, 1000 * 60)
          }
          if (type === 'EMAIL') {
            this.isLoadingSendCodeEmail = false
            this.isEmailCodeSent = true
            this.startTimer('EMAIL')
            setTimeout(() => {
              this.isEmailCodeSent = false
            }, 1000 * 60)
          }
        }
      } catch (e) {
        this.isLoadingSendCodeSMS = false
        this.isLoadingSendCodeEmail = false
      }
    },
    async securityVerify() {
      this.clearTimers()
      const {
        SecurityVerificationToken,
        redirectURI,
      } = this.$store.state.auth.verficationData
      const { $axios, $config } = this
      const payload = {
        Token: SecurityVerificationToken,
        ...this.vrf,
      }
      try {
        this.isSecurityVerifyLoading = true
        this.$recaptcha.language = this.$cookies.get('i18n_redirected')
        let token = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()
        const response = await $axios.post(
          $config.AUTH_API_URL + '/SecurityVerify',
          payload,
          {
            headers: {
              captcha: token,
            },
          }
        )
        if ('Success' in response.data && response.data.Success) {
          if (!!response.data.Token && !!response.data.RefreshToken) {
            this.$cookies.set('Token', response.data.Token)
            this.$cookies.set('RefreshToken', response.data.RefreshToken)
            this.setLoggedIn(true)
          }
          this.isSecurityVerifyLoading = false
          this.$router.replace(this.localeRoute(redirectURI))
        } else {
          this.isSecurityVerifyLoading = false
          this.showError = true
          this.errorMsg = response.data.Message
        }
      } catch (e) {
        this.isSecurityVerifyLoading = false
        this.$notification['error']({
          message: this.$t('text_error'),
        })

        //this.$router.go(-1)
      }
    },
    startTimer(type) {
      if (type === 'SMS') {
        this.smsIntrvl = setInterval(() => {
          if (this.smsTimer === 0) {
            this.smsTimer = 60
            clearInterval(this.smsIntrvl)
          }
          this.smsTimer -= 1
        }, 1000)
      }
      if (type === 'EMAIL') {
        this.emailIntrvl = setInterval(() => {
          if (this.emailTimer === 0) {
            this.emailTimer = 60
            clearInterval(this.emailIntrvl)
          }
          this.emailTimer -= 1
        }, 1000)
      }
    },
    clearTimers() {
      clearInterval(this.smsIntrvl)
      clearInterval(this.emailIntrvl)
      this.smsTimer = this.emailTimer = 60
      this.isSmsCodeSent = this.isEmailCodeSent = false
    },
    async resetPassword() {
      try {
        this.isSecurityVerifyLoading = true
        const {
          SecurityVerificationToken,
          redirectURI,
        } = this.$store.state.auth.verficationData
        const { $axios, $router, $config } = this
        const {
          data: { Message, Success },
        } = await $axios.post(
          $config.FINANCE_API_URL + '/ResetPasswordVerify',
          {
            Token: SecurityVerificationToken,
            ...this.vrf,
            NewPassword: this.resetPasswords.NewPassword,
          }
        )
        if (Success) {
          $router.replace(this.localeRoute('/login'))
        } else {
          this.showError = true
          this.errorMsg = Message
        }
      } catch (e) {
        if (e.response) {
          this.showError = true
          this.errorMsg = Message
        }
      } finally {
        this.isSecurityVerifyLoading = false
      }
    },
  },
  computed: {
    validateVrfCodes() {
      let valid = true
      if (this.vrfTypes.includes('sms')) {
        valid *= this.vrf.SmsCode !== '' && this.vrf.SmsCode.length === 6
      }
      if (this.vrfTypes.includes('email')) {
        valid *= this.vrf.EmailCode !== '' && this.vrf.EmailCode.length === 6
      }
      if (this.vrfTypes.includes('2fa')) {
        valid *= this.vrf.TwoFaCode !== '' && this.vrf.TwoFaCode.length === 6
      }
      return valid
    },
    DisableCheckVerify() {
      const MAX = 6
      if (this.subject === 'TWOFATOKEN') {
        if (this.vrfTypes.includes('sms') && this.vrfTypes.includes('2fa')) {
          if (this.TwoFaActiveTabKey === 'SMS') {
            return this.vrf.SmsCode.length < MAX ? true : false
          } else if (this.TwoFaActiveTabKey === '2FA') {
            return this.vrf.TwoFaCode.length < MAX ? true : false
          }
        } else if (
          this.vrfTypes.length === 1 &&
          this.vrfTypes.includes('sms')
        ) {
          return this.vrf.SmsCode.length < MAX ? true : false
        } else if (
          this.vrfTypes.length === 1 &&
          this.vrfTypes.includes('2fa')
        ) {
          return this.vrf.TwoFaCode.length < MAX ? true : false
        }
      } else if (this.subject !== 'TWOFATOKEN') {
        let valid = true
        if (this.vrfTypes.includes('sms')) {
          valid *= this.vrf.SmsCode !== '' && this.vrf.SmsCode.length === 6
        }
        if (this.vrfTypes.includes('email')) {
          valid *= this.vrf.EmailCode !== '' && this.vrf.EmailCode.length === 6
        }
        if (this.vrfTypes.includes('2fa')) {
          valid *= this.vrf.TwoFaCode !== '' && this.vrf.TwoFaCode.length === 6
        }
        return valid ? false : true
      }
    },
  },
  filters: {
    maskMail(value) {
      const toRep = value.slice(0, value.indexOf('@'))
      return (
        toRep
          .split('')
          .map((ch) => '*')
          .join('') + value.slice(value.indexOf('@'))
      )
    },
    maskPhone(value) {
      const toRep = value.slice(3, -4)
      return (
        value.slice(0, 3) +
        toRep
          .split('')
          .map((ch) => '*')
          .join('') +
        value.slice(-4)
      )
    },
  },

  watch: {
    TwoFaActiveTabKey(val) {
      if (val === 'SMS') {
        this.vrf.TwoFaCode = ''
      }
      if (val === '2FA') {
        this.vrf.SmsCode = ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.verify-text-secondary {
  color: #9aa0ac;
}
.disable2fa-text-container {
  margin: 15px auto;
  color: #6992bc;
}
.security-verify-header {
  margin-bottom: 30px;
}
</style>
