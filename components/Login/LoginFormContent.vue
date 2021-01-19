<template>
  <a-card
    :bordered="false"
    class="border-none"
    :tabList="tabList"
    :active-tab-key="activeKey"
    @tabChange="(key) => (activeKey = key)"
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
        ref="emailLoginFormRef"
        :model="user"
        :rules="emailLoginRules"
        layout="vertical"
      >
        <a-form-model-item
          has-feedback
          prop="Username"
          v-on:submit.prevent="emitUsernameLogin"
        >
          <template slot="label">
            <span class="input-label Roboto-Regular">{{
              $t('text_email')
            }}</span>
          </template>
          <a-input
            v-model="user.Username"
            class="Roboto-Regular"
            type="email"
            size="large"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="Password">
          <template slot="label">
            <span class="input-label Roboto-Regular">{{
              $t('text_password')
            }}</span>
          </template>
          <a-input-password
            v-model="user.Password"
            class="Roboto-Regular"
            size="large"
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            :loading="isLoginLoading"
            @click="emitUsernameLogin"
            class="primary-button border-none Roboto-Medium"
            type="primary"
            size="large"
            block
            >{{ $t('login_text') }}</a-button
          >
          <small
            >This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a>
            apply.
          </small>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div v-if="activeKey === 'Mobile'">
      <a-form-model
        ref="mobileLoginFormRef"
        :model="userMobile"
        :rules="mobileLoginRules"
        layout="vertical"
      >
        <a-form-model-item
          prop="PhoneNumber"
          v-on:submit.prevent="emitMobileLogin"
        >
          <template slot="label">
            <span class="input-label">{{ $t('text_mobile') }}</span>
          </template>
          <vue-tel-input
            :class="{ invalidPhoneNo: !isValidPhoneNo }"
            v-model="userMobile.PhoneNumber"
            :disabledFetchingCountry="false"
            defaultCountry="TR"
            @validate="validateMobileNumber"
            :validCharactersOnly="true"
            inputClasses="ant-input ant-input-lg"
            :dynamicPlaceholder="true"
          ></vue-tel-input>
          <span v-if="!isValidPhoneNo" :style="{ color: 'red' }">
            {{ $t('login_text_invalid_phone') }}
          </span>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="Password">
          <template slot="label">
            <span class="input-label">{{ $t('text_password') }}</span>
          </template>
          <a-input-password
            v-model="userMobile.Password"
            size="large"
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            :loading="isLoginLoading"
            @click="emitMobileLogin"
            class="primary-button border-none Roboto-Medium"
            type="primary"
            size="large"
            block
            >{{ $t('login_text') }}</a-button
          >
          <small
            >This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a>
            apply.
          </small>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-card>
</template>
<script>
import { VueTelInput } from 'vue-tel-input'
import authMixin from '~/Mixins/authMixin'
import { UAParser } from 'ua-parser-js'

export default {
  // loads validator and auth utils
  mixins: [authMixin],
  props: {
    isLoginLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueTelInput,
  },

  data() {
    return {
      tabList: [
        { key: 'Email', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Mobile', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'Email',
      // model data
      deviceComponents: [],
      user: {
        Username: '',
        Password: '',
        DeviceId: '',
        Components: [],
      },
      userMobile: {
        PhoneNumber: '',
        Password: '',
        DeviceId: '',
      },
      isValidPhoneNo: true,
      isMountedCheck: true,
      PhoneNoDetails: {},
      emailLoginRules: {
        Username: [
          {
            validator: this.EmailValidator,
            trigger: 'change',
          },
        ],
      },
      mobileLoginRules: {},
    }
  },
  mounted() {
    document.addEventListener('keyup', this.CTA_LOGIN)
    this.setDeviceId()
  },
  destroyed() {
    document.removeEventListener('keyup', this.CTA_LOGIN)
  },
  methods: {
    CTA_LOGIN(e) {
      const activeKey = this.activeKey
      if (e.keyCode === 13) {
        switch (activeKey) {
          case 'Email':
            this.emitUsernameLogin()
            break
          case 'Mobile':
            this.emitMobileLogin()
            break
        }
      }
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
            enumerateDevices: true,
            pixelRatio: true,
            doNotTrack: true,
            fontsFlash: true,
            availableScreenResolution: true,
            touchSupport: true,
            hasLiedLanguages: true,
            hasLiedResolution: true,
            hasLiedOs: true,
            hasLiedBrowser: true,
          },
        },
        function (components) {
          var values = components.map(function (component) {
            return component.value
          })
          //console.log(components)
          var murmur = vue.$fingerPrint2.x64hash128(values.join(''), 31)
          vue.user.DeviceId = murmur
          vue.userMobile.DeviceId = murmur
          vue.deviceComponents = components
          //console.log(murmur)
        }
      )
    },
    async device(x) {
      this.$axios.post(
        'https://api.cointral.com/API/rest/Device/FingerPrintJs?User=' +
          this.user.Username +
          '&Device=' +
          this.user.DeviceId,
        x,
        {}
      )
    },
    emitUsernameLogin() {
      this.device(this.deviceComponents)
      this.$refs.emailLoginFormRef.validate(async (valid) => {
        if (valid) {
          try {
            this.$emit('loginBtnClick', { user: this.user })
          } catch (error) {}
        }
      })
    },
    emitMobileLogin() {
      const { PhoneNumber } = this.userMobile
      let _PhoneNumber
      if (PhoneNumber.startsWith('+')) {
        _PhoneNumber = PhoneNumber.slice(1).split(' ').join('')
      } else {
        _PhoneNumber =
          this.PhoneNoDetails.country.dialCode +
          PhoneNumber.slice(1).split(' ').join('')
      }

      this.$refs.mobileLoginFormRef.validate(async (valid) => {
        if (valid && this.isValidPhoneNo) {
          try {
            this.$emit('mobileLoginClick', {
              user: {
                ...this.userMobile,
                PhoneNumber: _PhoneNumber,
              },
            })
          } catch (error) {
            return
          }
        }
      })
    },
    validateMobileNumber(payload) {
      if (this.userMobile.PhoneNumber.length) {
        this.PhoneNoDetails = payload
        this.isValidPhoneNo = payload.isValid
      }
    },
  },
  watch: {
    'userMobile.PhoneNumber': function () {
      if (this.userMobile.PhoneNumber === '') {
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
</style>
