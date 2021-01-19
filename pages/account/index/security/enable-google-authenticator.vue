<template>
  <div class="page-2fa">
    <div class="card-wrapper-2fa">
      <h1 align="center" class="Roboto-Medium">
        {{ $t('text_enable_google_authenticator') }}
      </h1>
      <a-row>
        <a-col :span="!isMobile ? 16 : 24">
          <a-card
            :class="
              !isMobile ? 'card-2fa border-none' : 'card-2fa-mobile border-none'
            "
          >
            <a-steps
              :direction="isMobile ? 'vertical' : 'horizontal'"
              labelPlacement="vertical"
              size="small"
              v-model="currentStep"
            >
              <a-step :disabled="true">
                <template slot="title">
                  <span class="enable-2fa-step-title Roboto-Medium">{{
                    $t('text_download_app')
                  }}</span>
                </template>
              </a-step>
              <a-step :disabled="true">
                <template slot="title">
                  <span class="enable-2fa-step-title Roboto-Medium">{{
                    $t('text_scan_qr')
                  }}</span>
                </template>
              </a-step>
              <a-step :disabled="true">
                <template slot="title">
                  <span class="enable-2fa-step-title Roboto-Medium">{{
                    $t('text_save_key_title')
                  }}</span>
                </template>
              </a-step>
              <a-step :disabled="true">
                <template slot="title">
                  <span class="enable-2fa-step-title Roboto-Medium">{{
                    $t('text_google_auth_enabled')
                  }}</span>
                </template>
              </a-step>
            </a-steps>

            <div v-if="currentStep === 0">
              <Step
                :subtitle="$t('text_download_install')"
                :stepNo="currentStep + 1"
              >
                <div v-if="!isMobile" class="store-icons" slot="store-icons">
                  <StoreButton title="App Store" type="apple">
                    <div slot="icon">
                      <a-icon class="store-icon" type="apple" theme="filled" />
                    </div>
                  </StoreButton>
                  <StoreButton title="Google Play" type="google">
                    <div slot="icon">
                      <a-icon
                        class="store-icon"
                        type="google-circle"
                        theme="filled"
                      />
                    </div>
                  </StoreButton>
                </div>
                <!-- Store Button Icons on Mobile -->
                <a-col
                  v-else
                  align="center"
                  class="store-icons-mobile"
                  slot="store-icons"
                >
                  <a-col :span="24">
                    <StoreButton title="App Store">
                      <div slot="icon">
                        <a-icon
                          class="store-icon"
                          type="apple"
                          theme="filled"
                        />
                      </div>
                    </StoreButton>
                  </a-col>
                  <a-col
                    :span="24"
                    style="margin-top: 20px; margin-bottom: 10px"
                  >
                    <StoreButton title="Google Play">
                      <div slot="icon">
                        <a-icon
                          class="store-icon"
                          type="google-circle"
                          theme="filled"
                        />
                      </div>
                    </StoreButton>
                  </a-col>
                </a-col>
                <div slot="content" class="step-content"></div>
                <div slot="footer" class="step-footer">
                  <a-button
                    class="btn-2fa Roboto-Medium"
                    type="primary"
                    :loading="get2faLoading"
                    @click="get2faSecretKey"
                    >{{ $t('text_next') }}</a-button
                  >
                </div>
              </Step>
            </div>
            <div v-if="currentStep === 1">
              <Step
                :subtitle="$t('text_download_install')"
                :stepNo="currentStep + 1"
              >
                <div slot="content" class="step-content">
                  <div class="qr-container">
                    <div class="qr-container-item">
                      <img :src="enable2fa.QRImage" width="100px" />
                    </div>
                    <div class="qr-container-item">
                      <p align="left" class="Roboto-Medium">
                        {{ $t('text_cant_scan') }}
                      </p>
                      <h4 align="left" class="Roboto-Medium">
                        {{ enable2fa.SecretKey }}
                      </h4>
                    </div>
                  </div>
                </div>
                <div slot="footer" class="step-footer">
                  <a-button
                    class="btn-2fa Roboto-Medium"
                    type="primary"
                    @click="currentStep = 2"
                    :style="isMobile ? 'max-width: 50vw; left: 20vw' : null"
                    >{{ $t('text_next') }}</a-button
                  >
                </div>
              </Step>
            </div>
            <div v-if="currentStep === 2">
              <Step :subtitle="$t('text_save_key')" :stepNo="currentStep + 1">
                <div slot="content" class="step-content">
                  <div class="key-container">
                    <div>
                      <img
                        src="~/assets/icons/enable2fa/save_key.svg"
                        alt="image_needed"
                      />
                    </div>
                    <div>
                      <p align="left" class="Roboto-Regular">
                        {{ $t('text_reset_google_auth') }}
                      </p>
                      <h4 align="left" class="Roboto-Medium">
                        {{ enable2fa.SecretKey }}
                      </h4>
                    </div>
                  </div>
                </div>
                <div slot="footer">
                  <a-button
                    class="btn-2fa Roboto-Medium"
                    type="primary"
                    :loading="enable2faloading"
                    @click="enableTwoFa"
                    :style="isMobile ? 'max-width: 50vw; left: 20vw' : null"
                    >{{ $t('text_next') }}</a-button
                  >
                </div>
              </Step>
            </div>
            <div v-if="currentStep === 3">
              <div :class="isMobile ? 'form-2fa-mobile' : 'form-2fa'">
                <a-alert
                  class="my-10"
                  v-if="showError"
                  v-bind:message="$t('warning_title')"
                  :description="errorMsg"
                  type="warning"
                  @close="(e) => (showError = false)"
                  closable
                ></a-alert>
                <div v-if="vrfTypes.includes('sms')" class="verify-fieldset">
                  <p
                    style="margin: 0"
                    class="Roboto-Medium primary-text-enable2fa"
                  >
                    {{ $t('text_phone_verification') }}
                  </p>
                  <a-form-model class="form-model">
                    <a-row :gutter="8">
                      <a-col :span="16">
                        <a-form-model-item class="mr-0 form-model-item">
                          <a-input
                            v-model="vrf.SmsCode"
                            class="Roboto-Regular"
                            :maxLength="6"
                            placeholder="Kodu Giriniz"
                            size="large"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item class="mr-0 form-model-item">
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
                            }}
                          </a-button>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-form-model>
                  <p
                    align="left"
                    class="Roboto-Medium secondary-text-enable2fa"
                    v-if="isSmsCodeSent"
                  >
                    {{ $t('send_sms_text', { phn: oph }) }}
                  </p>
                </div>
                <div v-if="vrfTypes.includes('email')" class="verify-fieldset">
                  <p
                    style="margin: 0"
                    class="Roboto-Medium primary-text-enable2fa"
                  >
                    {{ $t('text_email_verification') }}
                  </p>
                  <a-form-model class="form-model">
                    <a-row :gutter="8">
                      <a-col :span="16">
                        <a-form-model-item class="mr-0 form-model-item">
                          <a-input
                            v-model="vrf.EmailCode"
                            class="Roboto-Regular"
                            :maxLength="6"
                            placeholder="Kodu Giriniz"
                            size="large"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item class="mr-0 form-model-item">
                          <a-button
                            :disabled="isEmailCodeSent"
                            @click="sendCode('EMAIL')"
                            class="submit-button-color Roboto-Regular"
                            type="secondary"
                            size="large"
                            block
                          >
                            {{
                              isEmailCodeSent
                                ? emailTimer
                                : $t('text_send_code')
                            }}
                          </a-button>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-form-model>
                  <p
                    class="Roboto-Medium secondary-text-enable2fa"
                    v-if="isEmailCodeSent"
                  >
                    {{ $t('send_email_text', { email: oem }) }}
                  </p>
                </div>
                <div class="verify-fieldset">
                  <p
                    style="margin: 0"
                    class="Roboto-Medium primary-text-enable2fa"
                  >
                    {{ $t('text_google_verification') }}
                  </p>
                  <a-form-model class="form-model">
                    <a-row :gutter="8">
                      <a-col :span="24">
                        <a-form-model-item class="mr-0 form-model-item">
                          <a-input
                            v-model="vrf.TwoFaCode"
                            class="Roboto-Regular"
                            :maxLength="6"
                            placeholder="Kodu Giriniz"
                            size="large"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-form-model>
                  <p class="Roboto-Medium secondary-text-enable2fa">
                    {{ $t('text_google_code_enter') }}
                  </p>
                </div>
                <nuxt-link to="#">
                  <p class="help-text Roboto-Medium secondary-text-enable2fa">
                    <u>{{ $t('text_security_verify_not_available') }}</u>
                  </p>
                </nuxt-link>
                <a-button
                  :disabled="!validateVrfCodes"
                  class="btn-2fa Roboto-Medium"
                  :style="isMobile ? 'max-width: 50vw; left: 40vw' : null"
                  type="primary"
                  :loading="securityVerifyLoading"
                  @click="securityVerify"
                  >{{ $t('text_next') }}</a-button
                >
                <recaptcha />
                <small
                  >This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy"
                    >Privacy Policy</a
                  >
                  and
                  <a href="https://policies.google.com/terms"
                    >Terms of Service</a
                  >
                  apply.
                </small>
              </div>
            </div>
            <!-- previous button -->
            <div
              v-if="currentStep > 0"
              class="btn-2fa-back Roboto-Medium secondary-text-enable2fa"
              @click="currentStep = currentStep - 1"
            >
              <a-icon type="left" />
              <span>
                <u>{{ $t('text_previous') }}</u>
              </span>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import Step from '~/components/Account/Enable2fa/Step'
import StoreButton from '~/components/Account/Enable2fa/StoreButton'
import jwt_decode from 'jwt-decode'

export default {
  name: 'EnableGoogleAuthenticatorPage',
  middleware: ['auth'],
  components: {
    Step,
    StoreButton,
  },
  head() {
    return {
      title: this.$t('title_text_google_authanticator'),
    }
  },
  data() {
    return {
      currentStep: 0,
      vrfTypes: [],
      phn: '',
      cst: '',
      vrf: {
        SmsCode: '',
        EmailCode: '',
        TwoFaCode: '',
      },
      enable2fa: {
        QRImage: null,
        SecretKey: null,
        SecurityVerificationToken: null,
      },
      isSmsCodeSent: false,
      isEmailCodeSent: false,

      smsTimer: 60,
      emailTimer: 60,
      smsIntrvl: null,
      emailIntrvl: null,

      // loaders
      get2faLoading: false,
      enable2faloading: false,
      securityVerifyLoading: false,

      showError: false,
      errorMsg: '',

      isMobile: null,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 750

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 750
    })
  },
  destroyed() {
    document.removeEventListener('keyup', this.CTA_GOOGLE_SECURITY_VERIFY)
  },
  methods: {
    CTA_GOOGLE_SECURITY_VERIFY(e) {
      if (e.keyCode === 13) {
        this.securityVerify()
      }
    },
    async get2faSecretKey() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.get2faLoading = true
      const response = await $axios.get(FINANCE_API_URL + '/Get2FASecretKey', {
        headers: authHeaders,
      })
      this.get2faLoading = false
      if (response.data.Success) {
        const { QRImage, SecretKey } = response.data
        this.enable2fa.QRImage = 'data:image/png;base64,' + QRImage
        this.enable2fa.SecretKey = SecretKey
        this.currentStep = 1
      }
    },
    async enableTwoFa() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this

      this.clearTimers()
      this.vrf.EmailCode = this.vrf.SmsCode = this.vrf.TwoFaCode = ''

      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.enable2faloading = true
      const response = await $axios.post(
        FINANCE_API_URL + '/EnableTwoFA',
        {
          TwoFaSecretKey: this.enable2fa.SecretKey,
        },
        {
          headers: authHeaders,
        }
      )
      this.enable2faloading = false
      if (response.data.Success) {
        const { SecurityVerificationToken } = response.data
        let st = jwt_decode(SecurityVerificationToken)
        // st = JSON.parse(st)
        const { vrf, cst, phn, oph, oem } = st
        this.cst = cst
        this.oph = oph
        this.oem = oem
        this.vrfTypes = vrf.split(',')

        this.enable2fa.SecurityVerificationToken = SecurityVerificationToken
        this.currentStep = 3
      }
    },
    async sendCode(type) {
      const { SecurityVerificationToken } = this.enable2fa
      const { $axios, $config } = this
      const payload = {
        Type: type,
        Token: SecurityVerificationToken,
      }
      try {
        this.$recaptcha.language = this.$cookies.get('i18n_redirected')
        let token = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()

        const response = await $axios.post(
          $config.AUTH_API_URL + '/SendOTP',
          payload,
          {
            headers: {
              captcha: token,
            },
          }
        )

        if (response.data.Success) {
          if (type === 'SMS') {
            this.isSmsCodeSent = true
            this.startTimer('SMS')
            setTimeout(() => {
              this.isSmsCodeSent = false
            }, 1000 * 60)
          }
          if (type === 'EMAIL') {
            this.isEmailCodeSent = true
            this.startTimer('EMAIL')
            setTimeout(() => {
              this.isEmailCodeSent = false
            }, 1000 * 60)
          }
        }
      } catch (e) {
        this.$router.push(this.localeRoute('/account/security'))
      }
    },
    async securityVerify() {
      this.clearTimers()
      const { SecurityVerificationToken } = this.enable2fa
      const { $axios, $config } = this
      const payload = {
        Token: SecurityVerificationToken,
        ...this.vrf,
      }
      try {
        this.securityVerifyLoading = true
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
        this.securityVerifyLoading = false
        if ('Success' in response.data && response.data.Success) {
          this.$router.push(this.localeRoute('/account/security'))
        } else {
          this.showError = true
          this.errorMsg = response.data.Message
        }
      } catch (e) {
        this.$router.push(this.localeRoute('/account/security'))
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
  },

  watch: {
    currentStep(v) {
      if (v === 3) {
        document.addEventListener('keyup', this.CTA_GOOGLE_SECURITY_VERIFY)
      } else {
        document.removeEventListener('keyup', this.CTA_GOOGLE_SECURITY_VERIFY)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.page-2fa {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.secondary-text-enable2fa {
  font-size: 12px;
  color: #89919f;
}
.primary-text-enable2fa {
  font-size: 12px;
}
.card-2fa {
  padding: 30px;
  box-shadow: 0px 0px 10px #00000029;
  border-radius: 3px;
  width: 736px;
  max-width: 736px;
  min-height: 450px;
}
.step-content {
  margin: 20px auto;
  max-width: 300px;
}
.enable-2fa-step-title {
  color: #778090;
}
.store-icons {
  margin: 30px auto;
  max-width: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-2fa {
  margin-top: 10px;
  height: 40px;
  width: 250px;
}
.btn-2fa-back {
  position: absolute;
  left: 20px;
  bottom: 40px;
  cursor: pointer;
}
.verify-fieldset {
  margin: 20px auto;
}
/* qr */
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 5px;
}
.qr-container-item {
  margin: auto 10px;
}
.key-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-2fa {
  margin: auto;
  max-width: 60%;
}
.form-model {
  &-item {
    margin-bottom: 0;
  }
}
/* mobile */
.card-2fa-mobile {
  box-shadow: 0 0 10px #00000029;
  border-radius: 3px;
  width: 100vw;
  min-height: 450px;
}
.store-icons-mobile {
  margin: 30px auto;
  max-width: 400px;
}
.form-2fa-mobile {
  margin: auto;
  max-width: 100%;
}
</style>
