<template>
  <div>
    <a-card
      :bordered="false"
      class="border-none"
      :tabList="tabList"
      :active-tab-key="activeKey"
      @tabChange="(key) => onTabChange(key)"
    >
      <span
        slot="titleSlot"
        slot-scope="item"
        class="Roboto-Medium"
        :class="{
          'tab-label-active': item.key === activeKey,
          'tab-label-inactive': item.key !== activeKey,
        }"
      >
        <span v-if="item.key === 'Email'" slot="tab">
          {{ $t('login_tab_email') }}
        </span>
        <span v-if="item.key === 'Mobile'" slot="tab">
          {{ $t('login_tab_mobile') }}
        </span>
      </span>

      <div v-if="activeKey === 'Email'">
        <a-form-model
          ref="signUpEmailFormRef"
          :model="signUpEmail"
          :rules="emailSignUpRules"
          layout="vertical"
        >
          <a-form-model-item
            has-feedback
            prop="Email"
            v-on:submit.prevent="emitEmailSignUp"
          >
            <template slot="label">
              <span class="input-label Roboto-Regular">{{
                $t('text_email')
              }}</span>
            </template>
            <a-input
              v-model="signUpEmail.Email"
              size="large"
              @focus="emailTouched = true"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="Password">
            <template slot="label">
              <span class="input-label Roboto-Regular">{{
                $t('text_password')
              }}</span>
            </template>
            <a-input-password
              v-model="signUpEmail.Password"
              class="Roboto-Regular"
              size="large"
              @focus="emailTouched = true"
            ></a-input-password>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="confirmPassword">
            <template slot="label">
              <span class="input-label Roboto-Regular">{{
                $t('text_password_again')
              }}</span>
            </template>
            <a-input-password
              v-model="signUpEmail.confirmPassword"
              class="Roboto-Regular"
              size="large"
              @focus="emailTouched = true"
            ></a-input-password>
          </a-form-model-item>
          <a-collapse
            v-model="emailReference"
            :bordered="false"
            expand-icon-position="right"
            class="reference-collapse"
            default-active-key="1"
          >
            <template #expandIcon="props">
              <a-icon type="caret-down" :rotate="props.isActive ? 0 : 180" />
            </template>
            <a-collapse-panel
              key="1"
              header="Referans Kodu"
              style="border-bottom: none; padding: 0"
            >
              <a-input size="large" v-model="signUpEmail.ReferenceCode" />
            </a-collapse-panel>
          </a-collapse>
          <a-alert
            v-if="error4Msg"
            message="Error"
            :description="error4Msg"
            type="error"
            closable
            @close="$emit('clear-error4')"
          />
          <a-form-model-item prop="agreeTerms">
            <a-checkbox v-model="signUpEmail.agreeTerms">
              <client-only>
                <span v-if="getActiveLang === 'en'">
                  {{ $t('signup_text_term_of_use') }}
                </span>
              </client-only>
              <span class="Roboto-Medium" @click.stop="goTOS">
                {{ $t('signup_text_tou') }}
              </span>
              <span>
                {{ $t('text_and') }}
              </span>
              <span class="Roboto-Medium" @click.stop="goAggr">{{
                $t('signup_text_pdpa')
              }}</span>
              <client-only>
                <span v-if="getActiveLang === 'tr'">
                  {{ $t('signup_text_term_of_use') }}
                </span>
              </client-only>
            </a-checkbox>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              :loading="isSignUpLoading"
              @click="emitEmailSignUp"
              class="primary-button border-none Roboto-Medium"
              type="primary"
              size="large"
              block
              >{{ $t('login_text_create_account') }}</a-button
            >
            <recaptcha />
            <small
              >This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a>
              and
              <a href="https://policies.google.com/terms">Terms of Service</a>
              apply.
            </small>
          </a-form-model-item>
        </a-form-model>
      </div>

      <div v-if="activeKey === 'Mobile'">
        <a-form-model
          ref="signUpMobileFormRef"
          :model="signUpMobile"
          :rules="mobileSignUpRules"
          layout="vertical"
          v-on:submit.prevent="emitMobileSignUp"
        >
          <a-form-model-item prop="PhoneNumber">
            <template slot="label">
              <span class="input-label Roboto-Regular">{{
                $t('text_mobile')
              }}</span>
            </template>
            <vue-tel-input
              :class="{ invalidPhoneNo: !isValidPhoneNo }"
              v-model="signUpMobile.PhoneNumber"
              :disabledFetchingCountry="false"
              defaultCountry="TR"
              inputClasses="ant-input ant-input-lg Roboto-Regular"
              :dynamicPlaceholder="true"
              @validate="validateMobileNumber"
              @focus="(payload) => onPhoneFocus(payload)"
              @input="onPhoneInput"
            ></vue-tel-input>
            <span
              v-if="!isValidPhoneNo"
              class="Roboto-Regular"
              :style="{ color: 'red' }"
            >
              Invalid Phone No
            </span>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="Password">
            <template slot="label">
              <span class="input-label Roboto-Regular">{{
                $t('text_password')
              }}</span>
            </template>
            <a-input-password
              v-model="signUpMobile.Password"
              class="Roboto-Regular"
              size="large"
              @focus="mobileTouched = true"
            ></a-input-password>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="confirmPassword">
            <template slot="label">
              <span class="input-label Roboto-Regular">{{
                $t('text_password_again')
              }}</span>
            </template>
            <a-input-password
              v-model="signUpMobile.confirmPassword"
              class="Roboto-Regular"
              size="large"
              @focus="mobileTouched = true"
            ></a-input-password>
          </a-form-model-item>
          <a-collapse
            v-model="mobileReference"
            :bordered="false"
            expand-icon-position="right"
            class="reference-collapse"
          >
            <template #expandIcon="props">
              <a-icon type="caret-down" :rotate="props.isActive ? 0 : 180" />
            </template>
            <a-collapse-panel
              key="1"
              header="Referans Kodu"
              style="border-bottom: none; padding: 0"
            >
              <a-input size="large" v-model="signUpMobile.ReferenceCode" />
            </a-collapse-panel>
          </a-collapse>
          <a-alert
            v-if="error4Msg"
            message="Error"
            :description="error4Msg"
            type="error"
            closable
            @close="$emit('clear-error4')"
          />
          <a-form-model-item prop="agreeTerms">
            <a-checkbox v-model="signUpMobile.agreeTerms">
              <client-only>
                <span v-if="getActiveLang === 'en'">
                  {{ $t('signup_text_term_of_use') }}
                </span>
              </client-only>
              <span class="Roboto-Medium" @click.stop="goTOS">
                {{ $t('signup_text_tou') }}
              </span>
              <span>
                {{ $t('text_and') }}
              </span>
              <span class="Roboto-Medium" @click.stop="goAggr">{{
                $t('signup_text_pdpa')
              }}</span>
              <client-only>
                <span v-if="getActiveLang === 'tr'">
                  {{ $t('signup_text_term_of_use') }}
                </span>
              </client-only>
            </a-checkbox>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              :loading="isSignUpLoading"
              @click="emitMobileSignUp"
              class="Roboto-Medium"
              type="primary"
              size="large"
              block
              >{{ $t('login_text_create_account') }}</a-button
            >
            <recaptcha />
            <small
              >This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a>
              and
              <a href="https://policies.google.com/terms">Terms of Service</a>
              apply.
            </small>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-card>
  </div>
</template>
<script>
import { VueTelInput } from 'vue-tel-input'
import authMixin from '~/Mixins/authMixin'
import { UAParser } from 'ua-parser-js'

export default {
  // loads validator and auth utils
  mixins: [authMixin],
  components: {
    VueTelInput,
  },
  props: {
    error4Msg: {
      type: String,
      default: null,
    },
    isSignUpLoading: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    const { type } = this.$route.query
    if (!!type) {
      if (type === 'email') {
        const { email } = this.$route.query
        this.signUpEmail.Email = email
      }
      if (type === 'phone') {
        const { phone } = this.$route.query
        this.activeKey = 'Mobile'
        this.signUpMobile.PhoneNumber = phone
      }
    }
  },
  data() {
    const termsValidator = (rule, value, callback) => {
      if (value || this.activeKey === 'Mobile') {
        callback()
      } else {
        callback(new Error(this.$t('validation_text_terms')))
      }
    }
    const termsValidatorMobile = (rule, value, callback) => {
      if (value || this.activeKey === 'Email') {
        callback()
      } else {
        callback(new Error(this.$t('validation_text_terms')))
      }
    }
    return {
      tabList: [
        { key: 'Email', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Mobile', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'Email',
      emailTouched: false,
      mobileTouched: false,
      emailReference: ['2'],
      mobileReference: ['2'],
      phoneTouched: false,
      signUpEmail: {
        Email: '',
        Password: '',
        confirmPassword: '',
        ReferenceCode:
          this.$route.query.ref !== '' ? this.$route.query.ref : '',
        DeviceId: '',
        agreeTerms: false,
      },
      signUpMobile: {
        AreaCode: '',
        PhoneNumber: '',
        Password: '',
        confirmPassword: '',
        ReferenceCode:
          this.$route.query.ref !== '' ? this.$route.query.ref : '',
        DeviceId: '',
        agreeTerms: false,
      },
      isValidPhoneNo: true,
      PhoneNoDetails: {},
      emailSignUpRules: {
        Email: [
          {
            validator: this.EmailValidator,
            trigger: 'change',
          },
        ],
        Password: [
          {
            validator: this.PasswordValidatorEmail,
            trigger: 'change',
          },
        ],
        confirmPassword: [
          {
            validator: this.confirmPasswordValidatorEmail,
            trigger: 'change',
          },
        ],
        agreeTerms: [{ validator: termsValidator, trigger: 'change' }],
      },
      mobileSignUpRules: {
        Password: [
          {
            validator: this.PasswordValidatorMobile,
            trigger: 'change',
          },
        ],
        confirmPassword: [
          {
            validator: this.confirmPasswordValidatorMobile,
            trigger: 'change',
          },
        ],
        agreeTerms: [{ validator: termsValidatorMobile, trigger: 'change' }],
      },
    }
  },
  mounted() {
    if (process.client) {
      document.addEventListener('keydown', (event) => {
        const activeKey = this.activeKey
        if (event.keyCode === 13) {
          switch (activeKey) {
            case 'Email':
              this.emitEmailSignUp()
              break
            case 'Mobile':
              this.emitMobileSignUp()
              break
          }
        }
      })
    }
    this.setDeviceId()
  },
  methods: {
    goTOS() {
      window.open('https://cointral.com/tr/kullanim-kosulu/')
    },
    goAggr() {
      window.open('https://cointral.com/tr/kvkk-ve-aydinlatma-metni/')
    },
    async setDeviceId() {
      let vue = this
      this.$fingerPrint2.get(
        {
          preprocessor: function (key, value) {
            if (key == 'userAgent') {
              var parser = new UAParser(value) // https://github.com/faisalman/ua-parser-js
              var userAgentMinusVersion =
                parser.getOS().name + ' ' + parser.getBrowser().name
              return userAgentMinusVersion
            }
            return value
          },
          excludes: {
             'enumerateDevices': true,
             'pixelRatio': true,
             'doNotTrack': true,
             'fontsFlash': true,
             'availableScreenResolution': true,
             'touchSupport': true,
             'hasLiedLanguages': true,
             'hasLiedResolution': true,
             'hasLiedOs': true,
             'hasLiedBrowser': true
          },
        },
        function (components) {
          var values = components.map(function (component) {
            return component.value
          })
          var murmur = vue.$fingerPrint2.x64hash128(values.join(''), 31)

          vue.signUpEmail.DeviceId = murmur
          vue.signUpMobile.DeviceId = murmur
        }
      )
    },
    emitEmailSignUp() {
      this.$refs.signUpEmailFormRef.validate(async (valid) => {
        if (valid) {
          try {
            this.$recaptcha.language = this.$cookies.get('i18n_redirected')
            let token = await this.$recaptcha.getResponse()
            await this.$recaptcha.reset()
            this.$emit('signUp', { user: this.signUpEmail, token })
          } catch (error) {}
        }
      })
    },
    emitMobileSignUp() {
      const { PhoneNumber } = this.signUpMobile
      let _PhoneNumber
      let length = this.PhoneNoDetails.country.dialCode.length + 1
      if (PhoneNumber.startsWith('+')) {
        _PhoneNumber = PhoneNumber.slice(length).split(' ').join('')
      } else {
        _PhoneNumber = PhoneNumber
      }

      this.$refs.signUpMobileFormRef.validate(async (valid) => {
        if (valid && this.isValidPhoneNo) {
          try {
            this.$recaptcha.language = this.$cookies.get('i18n_redirected')
            let token = await this.$recaptcha.getResponse()
            await this.$recaptcha.reset()
            this.$emit('signUp', {
              user: {
                ...this.signUpMobile,
                PhoneNumber: _PhoneNumber,
              },
              token,
            })
          } catch (error) {}
        }
      })
    },
    validateMobileNumber(payload) {
      this.PhoneNoDetails = payload
      this.isValidPhoneNo = this.phoneTouched ? payload.isValid : true
      this.signUpMobile.AreaCode = payload.country.dialCode
    },
    onPhoneFocus(val) {
      this.isValidPhoneNo = this.phoneTouched
      this.phoneTouched = true
      this.mobileTouched = true
    },
    onPhoneInput(val, payload) {
      this.isValidPhoneNo = this.phoneTouched ? payload.isValid : true
    },
    onTabChange(key) {
      this.activeKey = key
      switch (key) {
        case 'Email':
          this.$refs.signUpMobileFormRef.clearValidate()
          break
        case 'Mobile':
          this.$refs.signUpEmailFormRef.clearValidate()
          break
      }
    },
  },
  computed: {
    getActiveLang() {
      return this.$i18n.getLocaleCookie()
    },
  },
  watch: {
    'signUpMobile.PhoneNumber': function () {
      if (this.signUpMobile.PhoneNumber === '') {
        this.isValidPhoneNo = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.invalidPhoneNo {
  &.vue-tel-input {
    border: 1px solid red !important;
  }
}
.reference-collapse {
  background-color: #ffffff;
  .ant-collapse-header {
    padding-left: 0 !important;
    width: fit-content;
  }
  .ant-collapse-content-box {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
.display-block {
  display: block;
}
.display-none {
  display: none;
}
</style>
