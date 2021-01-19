<template>
  <a-row
    type="flex"
    :gutter="16"
    align="middle"
    justify="start"
    class="form-row w-100"
  >
    <a-col :offset="2" :md="4" :sm="24">
      <img src="../../assets/images/homepage/brand.png" alt="brand" />
    </a-col>
    <a-col :offset="2" :md="16" :sm="24">
      <div>
        <h1 class="Roboto-Regular text-white text-font">
          {{ $t('text_homepage_header') }}
        </h1>
        <a-button type="primary" class="Roboto-Medium" @click="goToSignUp">
          {{ $t('text_signup_now') }}</a-button
        >
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'

export default {
  name: 'HomePageHeader',
  components: {
    VueTelInput,
  },
  data() {
    return {
      tabList: [
        { key: 'Email', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Phone', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeTab: 'Email',
      // isValidPhoneNo: true,
      AreaCode: '',
      PhoneNoDetails: {},
      phoneTouched: false,
      signup: {
        email: '',
        phone: '',
      },
    }
  },
  methods: {
    goToSignUp() {
      const prefix = this.$cookies.get('i18n_redirected')
      this.$router.push({
        path: '/' + prefix + '/signup',
      })
    },
    validateMobileNumber(payload) {
      this.PhoneNoDetails = payload
      this.AreaCode = payload.country.dialCode
    },
    onPhoneFocus(val) {
      this.phoneTouched = true
      this.mobileTouched = true
    },
  },
}
</script>

<style scoped>
.form-row {
  margin: 50px 0px 0px 0px !important;
  overflow: hidden;
  min-height: fit-content;
  background-color: rgba(0, 0, 0, 0.26);
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>

<style>
.phone-input .vti__dropdown {
  padding: 0 8px !important;
}
.vti__dropdown-list {
  max-width: 244px;
}
</style>

<style scoped>
.mobile-form {
  overflow: visible;
}
</style>

<style lang="less" scoped>
.ant-tabs {
  color: white;
}

.text-font {
  font-weight: bold;
}
</style>
