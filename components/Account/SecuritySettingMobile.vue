<template>
  <div class="security-settings">
    <div class="increase-security">
      <h2 class="Roboto-Medium">
        Increase Your Account Security (
        <span class="totalVrfs">
          {{ totalVerifications }}
        </span>
        /3)
      </h2>
      <div class="v-list">
        <div class="v-list-item">
          <img
            v-if="UserInfo.Enable2FAVerify || UserInfo.EnableSMSVerify"
            slot="avatar"
            src="~/assets/icons/account/success.svg"
            alt=""
          />
          <img
            v-else
            slot="avatar"
            src="~/assets/icons/security_settings/ss-x-circle.svg"
            alt=""
          />
          <span>2FA etkinleştir</span>
        </div>
        <div class="v-list-item">
          <img
            v-if="UserInfo.KYCVerified"
            slot="avatar"
            src="~/assets/icons/account/success.svg"
            alt=""
          />
          <img
            v-else
            slot="avatar"
            src="~/assets/icons/security_settings/ss-x-circle.svg"
            alt=""
          />
          <span>Hesabınızı Doğrulayın </span>
        </div>
        <div class="v-list-item">
          <img
            v-if="UserInfo.IsExistAntiphishingCode"
            slot="avatar"
            src="~/assets/icons/account/success.svg"
            alt=""
          />
          <img
            v-else
            slot="avatar"
            src="~/assets/icons/security_settings/ss-x-circle.svg"
            alt=""
          />
          <span>Oltalama Tanımlayın</span>
        </div>
      </div>
    </div>

    <div class="twofa">
      <div class="twofa-list">
        <img src="~/assets/icons/security_settings/ss-email.svg" />
        <div class="twofa-list-info">
          <h3>{{ $t('text_email_authentication') }}</h3>
          <span>{{ $t('text_used_for') }}</span>
        </div>
        <a-button
          v-if="!UserInfo.EmailVerified"
          type="primary"
          slot="actions"
          block
          class="Roboto-Medium btn-primary-outline v-button"
          >{{ $t('text_open') }}</a-button
        >
        <a-button
          v-else
          type="primary"
          slot="actions"
          block
          icon="check"
          disabled
          class="Roboto-Medium btn-primary-outline confirmed"
          >{{ $t('text_confirmed') }}</a-button
        >
      </div>
      <div class="twofa-list">
        <img src="~/assets/icons/security_settings/ss-sms.svg" />
        <div class="twofa-list-info">
          <h3>{{ $t('text_sms_authentication') }}</h3>
          <span>{{ $t('text_used_for') }}</span>
        </div>
        <a-button
          v-if="!UserInfo.EnableSMSVerify"
          type="primary"
          slot="actions"
          block
          class="Roboto-Medium btn-primary-outline v-button"
          @click="
            $router.push(
              localeRoute('/account/security/enable-sms-authenticator')
            )
          "
          >{{ $t('text_open') }}</a-button
        >
        <a-button
          v-else
          type="secondary"
          slot="actions"
          block
          icon="check"
          class="Roboto-Medium change-button"
          @click="disableSMS"
          >{{ $t('text_disable') }}</a-button
        >
      </div>
      <div class="twofa-list">
        <img src="~/assets/icons/security_settings/ss-2fa.svg" />
        <div class="twofa-list-info">
          <h3>{{ $t('text_google_authentication') }}</h3>
          <span>{{ $t('text_used_for') }}</span>
        </div>
        <a-button
          v-if="!UserInfo.Enable2FAVerify"
          type="primary"
          slot="actions"
          block
          class="Roboto-Medium btn-primary-outline v-button"
          @click="
            $router.push(
              localeRoute('/account/security/enable-google-authenticator')
            )
          "
          >{{ $t('text_open') }}</a-button
        >
        <a-button
          v-else
          type="secondary"
          slot="actions"
          block
          icon="check"
          @click="disable2fa"
          class="Roboto-Medium change-button"
          >{{ $t('text_disable') }}</a-button
        >
      </div>
    </div>

    <div class="verification">
      <h3>{{ $t('text_device_management') }}</h3>
      <a-button
        slot="actions"
        type="secondary"
        block
        @click="
          $router.push(localeRoute('/account/security/device-management'))
        "
        class="Roboto-Medium change-button"
        >{{ $t('text_change') }}</a-button
      >
    </div>

    <div class="verification">
      <h3>{{ $t('text_login_password') }}</h3>
      <a-button
        slot="actions"
        type="secondary"
        block
        class="Roboto-Medium change-button"
        @click="$router.push(localeRoute('/account/security/password'))"
        >{{ $t('text_change') }}</a-button
      >
    </div>

    <div class="verification">
      <h3>{{ $t('text_authentication') }}</h3>
      <a-button
        :disabled="
          UserInfo.KYCStatus === 'Done' || UserInfo.KYCStatus === 'InProgress'
        "
        slot="actions"
        type="primary"
        block
        class="Roboto-Medium btn-primary-outline change-button"
      >
        <nuxt-link :to="localePath('/account/kyc')">
          <span v-if="UserInfo.KYCStatus === 'Verified'">
            {{ $t('text_verified') }}
          </span>
          <span v-else-if="UserInfo.KYCStatus === 'Revision'">
            {{ $t('text_confirm') }}
          </span>
          <span v-else-if="UserInfo.KYCStatus === 'NoKYC'">
            {{ $t('text_confirm') }}
          </span>
          <span v-else-if="UserInfo.KYCStatus === 'InProgress'">
            {{ $t('text_inprogress') }}
          </span>
          <span v-else> {{ $t('text_verification') }} </span>
        </nuxt-link>
      </a-button>
    </div>

    <div class="verification prevention">
      <div>
        <h3>{{ $t('text_phishing_block_code') }}</h3>
        <span class="verification-exp">{{ $t('text_phishing_desc') }}</span>
      </div>
      <a-button
        v-if="!UserInfo.isExistAntiphishingCode"
        slot="actions"
        type="primary"
        block
        class="Roboto-Medium btn-primary-outline change-button"
        @click="
          $router.push(localeRoute('/account/security/anti-phishing-code'))
        "
        >{{ $t('text_activate') }}</a-button
      >
      <a-button
        v-else
        slot="actions"
        type="secondary"
        block
        class="Roboto-Medium change-button"
        @click="
          $router.push(localeRoute('/account/security/device-management'))
        "
        >{{ $t('text_change') }}</a-button
      >
    </div>
    <div class="verification prevention">
      <div class="first-row">
        <div>
          <h3 slot="title" class="list-title Roboto-Medium">
            {{ $t('text_account_mobility') }}
          </h3>
          <span slot="description">
            {{ $t('text_last_login') }} : {{ UserInfo.LastLogin }}
          </span>
        </div>
        <div slot="actions">
          <nuxt-link :to="localePath('/account/activity')">
            <a-button
              type="primary"
              block
              class="Roboto-Medium btn-primary-outline change-button"
              >{{ $t('text_more') }}</a-button
            >
          </nuxt-link>
        </div>
      </div>
      <p slot="title" class="list-title Roboto-Medium">
        {{ $t('text_suspicious_activity') }}
        <a @click.prevent="$router.push(localeRoute('/account/froze'))">{{
          $t('text_deactivate_account')
        }}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserInfo: {},
    }
  },
  beforeMount() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetUserInfo', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { UserInfo } = response.data
        this.UserInfo = UserInfo
      }
    },
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

    //Disable SMS
    async disableSMS() {
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
  computed: {
    totalVerifications() {
      let vrfs = 0
      vrfs += this.UserInfo.KYCVerified ? 1 : 0
      vrfs +=
        this.UserInfo.Enable2FAVerify || this.UserInfo.EnableSMSVerify ? 1 : 0
      vrfs += this.UserInfo.IsExistAntiphishingCode ? 1 : 0
      return vrfs
    },
  },
}
</script>

<style lang="scss" scoped>
.security-settings {
  display: flex;
  flex-direction: column;
  background-color: #f5f6f7;
  align-items: center;
  .increase-security {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    height: 200px;
    width: 100%;
    background-color: white;
    margin-bottom: 16px;
    .totalVrfs {
      color: var(--text-primary);
      font-size: 28px;
    }
  }
  .v-list {
    display: flex;
    flex-direction: column;
    .v-list-item {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 4px;
      img {
        margin-right: 3px;
      }
    }
  }
  .twofa {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    background-color: white;
    width: 100%;
    padding: 0 10px;
    .twofa-list {
      display: flex;
      align-items: center;
      justify-content: space-around;

      height: 80px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eaecef;
      .twofa-list-info {
        display: flex;
        flex-direction: column;
        margin: 0px 15px;
        width: 100%;

        h3 {
          font-size: 14px;
          margin: 0;
        }
        span {
          font-size: 10px;
        }
      }
      .v-button {
        width: 100px;
      }
    }
  }
  .verification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 80px;
    background-color: white;
    margin-bottom: 16px;
    padding: 0 10px;
    .change-button {
      width: 100px;
    }
  }
  .prevention {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 150px;
    padding: 0 10px;
    .verification-exp {
      font-size: 12px;
    }
    .first-row {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
}
</style>
