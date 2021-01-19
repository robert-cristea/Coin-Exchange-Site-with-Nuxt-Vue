<template>
  <div class="sms-enable-page">
    <a-card class="sms-enable-card border-none">
      <h2 align="center" class="sms-enable-heading Roboto-Medium">
        {{ $t('text_enable_sms_auth') }}
      </h2>
      <div class="my-10">
        <a-alert
          v-if="showError"
          v-bind:message="$t('warning_title')"
          :description="errorMsg"
          @close="(e) => (showError = false)"
          type="warning"
          closable
        ></a-alert>
      </div>
      <div class="phone-input">
        <vue-tel-input
          :class="{ invalidPhoneNo: !isValidPhoneNo }"
          v-model="Sms.PhoneNumber"
          :disabledFetchingCountry="false"
          @validate="validateMobileNumber"
          inputClasses="ant-input ant-input-lg Roboto-Regular"
          :dynamicPlaceholder="true"
        ></vue-tel-input>
        <span
          v-if="!isValidPhoneNo"
          class="Roboto-Regular"
          :style="{ color: 'red' }"
        >
          {{ $t('invalid_phone_no') }}
        </span>
      </div>
      <a-button
        @click="enableSms"
        :disabled="!isValidPhoneNo"
        class="Roboto-Medium"
        size="large"
        type="primary"
        :loading="enableSmsLoading"
        block
        >{{ $t('text_approve') }}</a-button
      >
    </a-card>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
export default {
  name: 'EnableSmsAuthenticatorPage',
  middleware: ['auth'],
  components: {
    VueTelInput,
  },
  head() {
    return {
      title: 'SMS Onayı | Cointral.com',
    }
  },
  data() {
    return {
      Sms: {
        AreaCode: '',
        PhoneNumber: '',
      },
      isValidPhoneNo: true,
      PhoneNoDetails: {},
      enableSmsLoading: false,

      showError: false,
      errorMsg: '',
    }
  },
  methods: {
    async enableSms() {
      const { PhoneNumber } = this.Sms
      let _PhoneNumber
      if (PhoneNumber.startsWith('+')) {
        _PhoneNumber = PhoneNumber.slice(1).split(' ').join('')
      } else {
        _PhoneNumber =
          this.PhoneNoDetails.country.dialCode +
          PhoneNumber.slice(1).split(' ').join('')
      }
      try {
        const {
          $axios,
          $cookies,
          $store,
          $config: { FINANCE_API_URL },
        } = this
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        this.enableSmsLoading = true
        const response = await $axios.post(
          FINANCE_API_URL + '/EnableSMS',
          { ...this.Sms, PhoneNumber: _PhoneNumber },
          {
            headers: authHeaders,
          }
        )
        const { Success, Message } = response.data
        if (Success) {
          const { SecurityVerificationToken } = response.data
          $store.commit('auth/setVerficationData', {
            SecurityVerificationToken,
            status: true,
            redirectURI: '/account/security',
          })
          this.enableSmsLoading = false
          this.$router.push(this.localeRoute('/security-verification'))
        } else {
          this.showError = true
          this.errorMsg = Message
          this.enableSmsLoading = false
        }
      } catch (e) {
        if (e.response) {
          const { Message } = e.response.data
          this.showError = true
          this.errorMsg = Message
        }
        this.enableSmsLoading = false
      }
    },
    validateMobileNumber(payload) {
      if (this.Sms.PhoneNumber.length) {
        this.PhoneNoDetails = payload
        this.isValidPhoneNo = payload.isValid
        this.Sms.AreaCode = payload.country.dialCode
      }
    },
  },
  watch: {
    'Sms.PhoneNumber': function () {
      if (this.Sms.PhoneNumber === '') {
        this.isValidPhoneNo = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.sms-enable-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sms-enable-card {
  width: 384px;
  box-shadow: 0px 0px 10px #0000001a;
  border-radius: 3px;
}
.sms-enable-heading {
  color: #212833;
}
.phone-input {
  margin: 20px auto;
}
.invalidPhoneNo {
  &.vue-tel-input {
    border: 1px solid red !important;
  }
}
</style>
