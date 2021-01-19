<template>
  <a-card class="account-card border-none h-100">
    <h4
      slot="title"
      style="margin: 0"
      class="Roboto-Bold account-default-text-color"
    >
      {{ $t('text_increase_security') }}
    </h4>
    <div slot="extra" class="Roboto-Medium">
      <a-button
        @click="$router.push(localeRoute('/account/security'))"
        class="border-none"
      >
        <a-icon type="right" />
      </a-button>
    </div>
    <div class="account-card-body">
      <div class="account-card-body-item">
        <p class="account-default-text-color">
          {{ $t('text_enable_2fa') }}
        </p>

        <div v-if="UserInfo.Enable2FAVerify">
          <a-button @click="disable2fa" type="link">{{
            $t('text_disable')
          }}</a-button>
        </div>
        <div v-else>
          <a-button
            @click="
              $router.push(
                localeRoute('/account/security/enable-google-authenticator')
              )
            "
            type="link"
            >{{ $t('text_activate') }}</a-button
          >
        </div>
      </div>
      <div class="account-card-body-item">
        <p class="account-default-text-color">
          {{ $t('text_authentication') }}
        </p>
        <div v-if="UserInfo.KYCStatus !== 'Done'">
          <a-button
            v-if="UserInfo.KYCStatus === 'Revision'"
            @click="$router.push(localeRoute('/account/kyc'))"
            type="link"
          >
            {{ $t('text_confirm') }}
          </a-button>
          <a-button
            v-else-if="UserInfo.KYCStatus === 'NoKYC'"
            @click="$router.push(localeRoute('/account/kyc'))"
            type="link"
          >
            {{ $t('text_confirm') }}
          </a-button>
          <a-button
            v-else-if="UserInfo.KYCStatus === 'InProgress'"
            type="link"
            :disabled="true"
          >
            {{ $t('text_inprogress') }}
          </a-button>
        </div>
        <div v-else>
          <a-button class="text-success" type="link" :disabled="true">{{
            $t('text_verified')
          }}</a-button>
        </div>
      </div>
      <div class="account-card-body-item">
        <p class="account-default-text-color">
          {{ $t('text_sms_authentication') }}
        </p>
        <div v-if="UserInfo.EnableSMSVerify">
          <a-button @click="disableSms" type="link">{{
            $t('text_disable')
          }}</a-button>
        </div>
        <div v-else>
          <a-button
            @click="
              $router.push(
                localeRoute('/account/security/enable-sms-authenticator')
              )
            "
            type="link"
            >{{ $t('text_activate') }}</a-button
          >
        </div>
      </div>
      <div class="account-card-body-item">
        <p class="account-default-text-color">
          {{ $t('text_phishing_block_code') }}
        </p>
        <a-button
          v-if="UserInfo.AntiphishingCode === ''"
          type="link"
          @click="
            $router.push(localeRoute('/account/security/anti-phishing-code'))
          "
          >{{ $t('text_activate') }}</a-button
        >
        <a-button
          v-else
          type="link"
          @click="
            $router.push(localeRoute('/account/security/anti-phishing-code'))
          "
          >{{ $t('text_change') }}</a-button
        >
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    UserInfo: {
      required: true,
      type: Object,
    },
  },
  methods: {
    async disable2fa() {
      const {
        $store,
        $router,
        $config: { FINANCE_API_URL },
        $axios,
        $cookies,
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/DisableTwoFA', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { SecurityVerificationToken } = response.data
        $store.commit('auth/setVerficationData', {
          SecurityVerificationToken,
          status: true,
          redirectURI: '/account/security',
        })
        $router.push(this.localeRoute('/security-verification'))
      }
    },
    async disableSms() {
      const {
        $store,
        $router,
        $config: { FINANCE_API_URL },
        $axios,
        $cookies,
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/DisableSMS', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { SecurityVerificationToken } = response.data
        $store.commit('auth/setVerficationData', {
          SecurityVerificationToken,
          status: true,
          redirectURI: '/account/security',
        })
        $router.push(this.localeRoute('/security-verification'))
      }
    },
  },
}
</script>

<style lang="less" scoped>
.account-card {
  box-shadow: 0px 0px 9px #00000012;
  border-radius: 4px;
}
.account-card-secondary-text {
  color: #778090;
}
.account-default-text-color {
  color: var(--text-color);
}
.account-card-body-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.account-card-body-item p {
  margin: 0;
}
</style>
