<template>
  <div class="verify-modal-container">
    <a-modal
      id="verify-modal"
      :visible="verifyData.showDialog"
      :confirm-loading="isloadingVerifyData"
      @ok="verify"
      @cancel="cancelVerify"
      :centered="true"
      :destroyOnClose="true"
      :footer="null"
      :width="384"
      :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
      :maskClosable="false"
    >
      <a-alert
        class="my-10"
        v-if="showError"
        v-bind:message="$t('warning_title')"
        :description="errorMsg"
        type="warning"
        @close.stop="(e) => (showError = false)"
        closable
      ></a-alert>
      <!-- content section start -->
      <!-- 2FA or SMS -->
      <div
        v-if="
          (vrfTypes.includes('sms') && !vrfTypes.includes('2fa')) ||
          (vrfTypes.includes('2fa') && !vrfTypes.includes('sms'))
        "
      >
        <div class="modal-body">
          <div v-if="vrfTypes.includes('sms')">
            <p class="Roboto-Regular">
              {{ $t('text_sms_label') }}
            </p>
            <p class="Roboto-Regular" style="margin-bottom: 0">
              {{ $t('text_sms_code_label') }}
            </p>

            <a-form-model>
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-form-model-item class="mr-0">
                    <a-input
                      v-model="vrf.SmsCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('text_sms_placeholder')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item class="mr-0">
                    <a-button
                      :disabled="isSmsCodeSent"
                      @click="sendCode('SMS')"
                      class="submit-button-color Roboto-Regular"
                      type="secondary"
                      size="large"
                      block
                    >
                      {{
                        isSmsCodeSent ? smsTimer : $t('text_send_code')
                      }}</a-button
                    >
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
          <div v-if="vrfTypes.includes('2fa')">
            <p class="Roboto-Regular" style="margin-bottom: 0">
              {{ $t('text_twofa_code_label') }}
            </p>
            <a-form-model>
              <a-row :gutter="8">
                <a-col :span="24">
                  <a-form-model-item class="mr-0">
                    <a-input
                      v-model="vrf.TwoFaCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('text_twofa_placeholder')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
        </div>
        <!-- modal footer start -->
        <div class="change-password-footer">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-button
                @click="cancelVerify"
                class="Roboto-Medium change-password-footer-btn-cancel"
                type="secondary"
                size="large"
                block
              >
                {{ $t('text_cancel') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button
                :disabled="
                  vrf.SmsCode.length !== 6 && vrf.TwoFaCode.length !== 6
                "
                @click="verify"
                class="Roboto-Medium change-password-footer-btn-approve"
                type="primary"
                size="large"
                block
              >
                {{ $t('text_approve') }}
              </a-button>
            </a-col>
          </a-row>
        </div>
        <!-- modal footer end-->
      </div>
      <!-- if sms and 2fa verif is active -->
      <div v-else-if="vrfTypes.includes('sms') && vrfTypes.includes('2fa')">
        <a-tabs v-model="activeVrfType">
          <a-tab-pane
            v-for="(vrf, index) in tabListVrf"
            :key="vrf.key"
            class="Roboto-Medium"
            :class="{
              'tab-label-active': vrf.key === activeVrfType,
              'tab-label-inactive': vrf.key !== activeVrfType,
            }"
          >
            <span v-if="vrf.key === 'sms'" slot="tab" class="text-uppercase">
              {{ vrf.key }}
            </span>
            <span v-if="vrf.key === '2fa'" slot="tab" class="text-uppercase">
              {{ vrf.key }}
            </span>
          </a-tab-pane>
        </a-tabs>

        <div class="modal-body">
          <div v-if="activeVrfType === 'sms'">
            <p class="Roboto-Regular">
              {{ $t('text_sms_label') }}
            </p>
            <p class="Roboto-Regular" style="margin-bottom: 0">
              {{ $t('text_sms_code_label') }}
            </p>

            <a-form-model>
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-form-model-item class="mr-0">
                    <a-input
                      v-model="vrf.SmsCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('text_sms_placeholder')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item class="mr-0">
                    <a-button
                      :disabled="isSmsCodeSent"
                      @click="sendCode('SMS')"
                      class="submit-button-color Roboto-Regular"
                      type="secondary"
                      size="large"
                      block
                    >
                      {{
                        isSmsCodeSent ? smsTimer : $t('text_send_code')
                      }}</a-button
                    >
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
          <div v-if="activeVrfType === '2fa'">
            <p class="Roboto-Regular" style="margin-bottom: 0">
              {{ $t('text_twofa_code_label') }}
            </p>
            <a-form-model>
              <a-row :gutter="8">
                <a-col :span="24">
                  <a-form-model-item class="mr-0">
                    <a-input
                      v-model="vrf.TwoFaCode"
                      class="Roboto-Regular"
                      :maxLength="6"
                      v-bind:placeholder="$t('text_twofa_placeholder')"
                      size="large"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
        </div>
        <!-- modal footer start -->
        <div class="change-password-footer">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-button
                @click="cancelVerify"
                class="Roboto-Medium change-password-footer-btn-cancel"
                type="secondary"
                size="large"
                block
              >
                {{ $t('text_cancel') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button
                :disabled="
                  vrf.SmsCode.length !== 6 && vrf.TwoFaCode.length !== 6
                "
                @click="verify"
                class="Roboto-Medium change-password-footer-btn-approve"
                type="primary"
                size="large"
                block
              >
                {{ $t('text_approve') }}
              </a-button>
            </a-col>
          </a-row>
        </div>
        <!-- modal footer end-->
      </div>

      <!-- if only  sms and email verif is active -->
      <div
        v-else-if="
          vrfTypes.length === 2 &&
          vrfTypes.includes('sms') &&
          vrfTypes.includes('email')
        "
      >
        <h3 slot="title" class="security-modal-title">SMS</h3>
        <!-- if only sms and email verif is active -->
        <div class="modal-body">
          <p class="Roboto-Regular">
            {{ $t('text_sms_label') }}
          </p>
          <p class="Roboto-Regular" style="margin-bottom: 0">
            {{ $t('text_sms_code_label') }}
          </p>
          <a-form-model>
            <a-row :gutter="8">
              <a-col :span="16">
                <a-form-model-item class="mr-0">
                  <a-input
                    v-model="vrf.SmsCode"
                    class="Roboto-Regular"
                    :maxLength="6"
                    v-bind:placeholder="$t('text_sms_placeholder')"
                    size="large"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item class="mr-0">
                  <a-button
                    :disabled="isSmsCodeSent"
                    @click="sendCode('SMS')"
                    class="submit-button-color Roboto-Regular"
                    type="secondary"
                    size="large"
                    block
                  >
                    {{
                      isSmsCodeSent ? smsTimer : $t('text_send_code')
                    }}</a-button
                  >
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </div>
        <!-- modal footer start -->
        <div class="change-password-footer">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-button
                @click="cancelVerify"
                class="Roboto-Medium change-password-footer-btn-cancel"
                type="secondary"
                size="large"
                block
              >
                {{ $t('text_cancel') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button
                @click="verify"
                :disabled="vrf.SmsCode.length !== 6"
                class="Roboto-Medium change-password-footer-btn-approve"
                type="primary"
                size="large"
                block
              >
                {{ $t('text_approve') }}
              </a-button>
            </a-col>
          </a-row>
        </div>
        <!-- modal footer end-->
      </div>

      <!-- if only 2fa and email verif is active -->
      <div
        v-else-if="
          vrfTypes.length === 2 &&
          vrfTypes.includes('2fa') &&
          vrfTypes.includes('email')
        "
      >
        <h3 slot="title" class="security-modal-title">2fa</h3>
        <p class="Roboto-Regular">
          {{ $t('text_twofa_label') }}
        </p>
        <p class="Roboto-Regular" style="margin-bottom: 0">
          {{ $t('text_twofa_code_label') }}
        </p>
        <div class="modal-body">
          <a-row :gutter="8">
            <a-col :span="16">
              <a-form-model-item class="mr-0">
                <a-input
                  v-model="vrf.TwoFaCode"
                  class="Roboto-Regular"
                  :maxLength="6"
                  v-bind:placeholder="$t(text_twofa_placeholder)"
                  size="large"
                ></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
        </div>
        <!-- modal footer start -->
        <div class="change-password-footer">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-button
                @click="cancelVerify"
                class="Roboto-Medium change-password-footer-btn-cancel"
                type="secondary"
                size="large"
                block
              >
                {{ $t('text_cancel') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button
                @click="verify"
                :disabled="vrf.TwoFaCode.length !== 6"
                class="Roboto-Medium change-password-footer-btn-approve"
                type="primary"
                size="large"
                block
              >
                {{ $t('text_approve') }}
              </a-button>
            </a-col>
          </a-row>
        </div>
        <!-- modal footer end-->
      </div>

      <!-- if only email or only sms verif is active -->
      <div
        v-else-if="
          vrfTypes.length === 1 &&
          (vrfTypes.includes('sms') || vrfTypes.includes('email'))
        "
      >
        <h3 slot="title" class="security-modal-title">
          {{ $t('text_security_verification') }}
        </h3>
        <div class="modal-body">
          <p class="Roboto-Regular">
            {{ $t('text_p2p_warning') }}
          </p>

          <div class="invite-verify-box">
            <div class="invite-verify-box-item">
              <img
                class="icon-2fa"
                slot="avatar"
                src="~/assets/icons/security_settings/ss-sms.svg"
                alt=""
              />
              <p class="Roboto-Medium">{{ $t('text_phone_verification') }}</p>
            </div>
            <div class="invite-verify-box-item">
              <img
                class="icon-2fa"
                slot="avatar"
                src="~/assets/icons/security_settings/ss-2fa.svg"
                alt=""
              />
              <p class="Roboto-Medium">{{ $t('text_twofa_verification') }}</p>
            </div>
          </div>
          <p align="right" class="Roboto-Medium remind-me-text">
            {{ $t('text_remind') }}
          </p>
        </div>
      </div>

      <div v-else>
        <h3 slot="title" class="security-modal-title">
          {{ $t('text_security_verification') }}
        </h3>
        <div class="modal-body">
          <p class="Roboto-Regular">
            {{ $t('text_p2p_warning') }}
          </p>

          <div class="invite-verify-box">
            <div
              class="invite-verify-box-item"
              @click="
                $router.push(
                  localeRoute('/account/security/enable-sms-authenticator')
                )
              "
            >
              <img
                class="icon-2fa"
                slot="avatar"
                src="~/assets/icons/security_settings/ss-sms.svg"
                alt=""
              />
              <p class="Roboto-Medium">{{ $t('text_phone_verification') }}</p>
            </div>
            <div
              class="invite-verify-box-item"
              @click="
                $router.push(
                  localeRoute('/account/security/enable-google-authenticator')
                )
              "
            >
              <img
                class="icon-2fa"
                slot="avatar"
                src="~/assets/icons/security_settings/ss-2fa.svg"
                alt=""
              />
              <p class="Roboto-Medium">{{ $t('text_twofa_verification') }}</p>
            </div>
          </div>
          <p align="right" class="Roboto-Medium remind-me-text">
            {{ $t('text_remind') }}
          </p>
        </div>
      </div>

      <!-- content section end -->

      <!-- close header icon start -->
      <span class="custom-modal-icon" slot="closeIcon">
        <a-icon type="close" @click="cancelVerify"></a-icon>
      </span>
      <!-- close header icon end -->
      <recaptcha />
    </a-modal>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  props: {
    verifyData: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      tabListVrf: [
        { key: 'sms', scopedSlots: { tab: 'titleSlot' } },
        { key: '2fa', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeVrfType: 'sms',
      vrf: {
        SmsCode: '',
        EmailCode: '',
        TwoFaCode: '',
      },
      vrfTypes: [],
      isSmsCodeSent: false,
      smsTimer: 60,
      smsIntrvl: null,
      isloadingVerifyData: false,

      showError: false,
      errorMsg: '',
    }
  },
  mounted() {
    document.addEventListener('keyup', this.CTA_SECURITY_VERIFY)
    if (this.verifyData.Token) {
      const { vrf } = jwt_decode(this.verifyData.Token)
      this.vrfTypes = vrf.split(',').length > 1 ? vrf.split(',') : [vrf]
    }
  },
  destroyed() {
    document.removeEventListener('keyup', this.CTA_SECURITY_VERIFY)
  },
  methods: {
    CTA_SECURITY_VERIFY(e) {
      if (e.keyCode === 13) {
        this.verify()
      }
    },
    async verify() {
      const { $axios, $config } = this
      try {
        this.$recaptcha.language = this.$cookies.get('i18n_redirected')
        let captcha = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()

        this.isloadingVerifyData = true
        const response = await $axios.post(
          $config.AUTH_API_URL + '/SecurityVerify',
          {
            Token: this.verifyData.Token,
            ...this.vrf,
          },
          {
            headers: {
              captcha,
            },
          }
        )
        this.isloadingVerifyData = false

        if (response.data.Success) {
          this.clearTimers()
          this.$router.push(this.localeRoute('/account/security'))
        } else {
          this.showError = true
          this.errorMsg = response.data.Message
        }
      } catch (e) {
        if (e.response) {
          this.showError = true
          this.errorMsg = e.response.data.Message
        }
      }
    },
    cancelVerify() {
      this.clearTimers()
      this.verifyData.Token = null
      this.verifyData.showDialog = false
    },
    async sendCode(type) {
      const { $axios, $config } = this
      const payload = {
        Type: type,
        Token: this.verifyData.Token,
      }
      try {
        this.$recaptcha.language = this.$cookies.get('i18n_redirected')
        let captcha = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()

        const response = await $axios.post(
          $config.AUTH_API_URL + '/SendOTP',
          payload,
          {
            headers: {
              captcha,
            },
          }
        )
        if (response.data.Success) {
          this.isSmsCodeSent = true
          this.startTimer('SMS')
        }
      } catch (e) {
        // this.$router.push('/account')
      }
    },
    startTimer(type) {
      if (type === 'SMS') {
        this.smsIntrvl = setInterval(() => {
          if (this.smsTimer === 0) {
            this.smsTimer = 60
            this.isSmsCodeSent = false
            clearInterval(this.smsIntrvl)
          }
          this.smsTimer -= 1
        }, 1000)
      }
    },
    clearTimers() {
      clearInterval(this.smsIntrvl)
      this.smsTimer = 60
      this.isSmsCodeSent = false
    },
  },
  watch: {
    activeVrfType(val) {
      if (val === 'sms') {
        this.vrf.TwoFaCode = ''
      }
      if (val === '2fa') {
        this.vrf.SmsCode = ''
      }
    },
  },
}
</script>

<style scoped>
.text-uppercase {
  text-transform: uppercase;
}
.change-password-footer .change-password-footer-cancel {
  margin-right: 5px;
}
.invite-verify-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
}
.invite-verify-box-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e8ea;
  border-radius: 3px;
  text-align: center;
  width: 150px;
  height: 120px;
  cursor: pointer;
}
.remind-me-text {
  color: #1ca4e8;
  cursor: pointer;
}
.security-modal-title {
  margin-bottom: 10px;
  text-align: center;
}

.custom-modal-icon {
  position: absolute;
  top: -70%;
  right: -50%;
  color: #c1c6cd;
}
</style>
