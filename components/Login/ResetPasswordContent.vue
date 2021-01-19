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
      :class="{
        'login-tab-title-active': item.key === activeKey,
        'login-tab-title-inactive': item.key !== activeKey,
      }"
    >
      {{ item.key }}
    </span>
    <div v-if="activeKey === 'Email'">
      <a-form-model
        layout="vertical"
        :model="resetPassword"
        :rules="resetPasswordRules"
        v-on:submit.prevent="emitResetPassword"
      >
        <a-form-model-item
          v-bind:label="$t('login_text_email_info')"
          has-feedback
          prop="Email"
        >
          <a-input
            v-model="resetPassword.Email"
            class="Roboto-Regular"
            type="email"
            size="large"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            @click="emitResetPassword"
            :loading="isResetPasswordLoading"
            :disabled="!emailRegex.test(resetPassword.Email)"
            class="login-button border-none Roboto-Medium"
            type="primary"
            size="large"
            block
            >{{ $t('login_text_reset_password') }}</a-button
          >
          <recaptcha />
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
      <a-form-model layout="vertical" v-on:submit.prevent="emitResetPassword">
        <a-form-model-item v-bind:label="$t('login_text_phone_info')">
          <vue-tel-input
            :class="{ invalidPhoneNo: !isValidPhoneNo }"
            v-model="resetPassword.PhoneNumber"
            :disabledFetchingCountry="false"
            :validCharactersOnly="true"
            @validate="validateMobileNumber"
            inputClasses="ant-input ant-input-lg"
            :dynamicPlaceholder="true"
          ></vue-tel-input>
          <span v-if="!isValidPhoneNo" :style="{ color: 'red' }">
            {{ $t('login_text_invalid_phone') }}
          </span>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            @click="emitResetPassword"
            :loading="isResetPasswordLoading"
            :disabled="!isValidPhoneNo"
            class="login-button border-none Roboto-Medium"
            type="primary"
            size="large"
            block
            >{{ $t('login_text_reset_password') }}</a-button
          >
          <recaptcha />
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

export default {
  // loads validator and auth utils
  mixins: [authMixin],
  props: {
    isResetPasswordLoading: {
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
      resetPassword: {
        Email: '',
        PhoneNumber: '',
        AreaCode: '',
      },
      resetPasswordRules: {
        Email: [
          {
            validator: this.EmailValidator,
            trigger: 'change',
          },
        ],
      },
      isValidPhoneNo: true,
    }
  },
  methods: {
    async emitResetPassword() {
      const { Email, PhoneNumber, AreaCode } = this.resetPassword
      let token
      try {
        const { $config } = this
      } catch (e) {}
      if (this.activeKey === 'Email') {
        this.$emit('resetPassword', {
          data: { Email },
          token,
        })
      } else {
        let _PhoneNumber = PhoneNumber.slice(1)
          .replace(AreaCode, '')
          .split(' ')
          .join('')

        this.$emit('resetPassword', {
          data: {
            PhoneNumber: _PhoneNumber,
            AreaCode,
          },
          token,
        })
      }
    },
    validateMobileNumber(payload) {
      if (this.resetPassword.PhoneNumber.length) {
        this.isValidPhoneNo = payload.isValid
        this.resetPassword.AreaCode = payload.country.dialCode
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-button {
  background-color: var(--login-button-bg-color);
  color: var(--login-button-text-color);
}
.login-tab-title-inactive {
  color: var(--login-tab-title-inactive-color);
}
.login-tab-title-active {
  color: var(--login-tab-title-active-color);
}
.invalidPhoneNo {
  &.vue-tel-input {
    border: 1px solid red !important;
  }
}
</style>
