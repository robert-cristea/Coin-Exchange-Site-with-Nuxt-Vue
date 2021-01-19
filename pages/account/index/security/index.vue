<template>
  <div class="security-settings-page">
    <a-row class="mb-common security-settings-header">
      <a-col :span="24">
        <a-card class="security-setting-card border-none">
          <h2 class="Roboto-Medium">
            Hesabınızın Güvenliğini Artırın (
            <span class="totalVrfs">{{ totalVerifications }}</span>
            / 3 )
          </h2>
          <div class="security-links">
            <a-list
              :grid="{ gutter: 24, column: 6 }"
              class="security-list"
              :loading="false"
            >
              <a-list-item class="security-settings-list-item Roboto-Medium">
                <a-list-item-meta v-bind:title="this.$t('security_text_twofa')">
                  <img
                    v-if="UserInfo.Enable2FAVerify || UserInfo.EnableSMSVerify"
                    slot="avatar"
                    src="~/assets/icons/account/success.svg"
                    class="security-settings-list-item-icon"
                  />
                  <img
                    v-else
                    slot="avatar"
                    src="~/assets/icons/security_settings/ss-x-circle.svg"
                    class="security-settings-list-item-icon"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item class="security-settings-list-item Roboto-Medium">
                <a-list-item-meta v-bind:title="this.$t('security_text_authentication')">
                  <img
                    v-if="UserInfo.KYCVerified"
                    slot="avatar"
                    src="~/assets/icons/account/success.svg"
                    class="security-settings-list-item-icon"
                  />
                  <img
                    v-else
                    slot="avatar"
                    src="~/assets/icons/security_settings/ss-x-circle.svg"
                    class="security-settings-list-item-icon"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item class="security-settings-list-item Roboto-Medium">
                <a-list-item-meta v-bind:title="this.$t('security_text_antiphishing_code')">
                  <img
                    v-if="UserInfo.IsExistAntiphishingCode"
                    slot="avatar"
                    src="~/assets/icons/account/success.svg"
                    class="security-settings-list-item-icon"
                  />
                  <img
                    v-else
                    slot="avatar"
                    src="~/assets/icons/security_settings/ss-x-circle.svg"
                    class="security-settings-list-item-icon"
                    s
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="mb-common">
      <a-col :span="12">
        <a-card class="security-setting-card border-none mb-common">
          <a-list class="auth-type-list" :loading="false">
            <a-list-item class="Roboto-Medium auth-type-list-item">
              <a-list-item-meta>
                <img
                  slot="avatar"
                  src="~/assets/icons/security_settings/ss-email.svg"
                  alt
                />
                <p slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_email_authentication') }}
                </p>
                <span class="list-desc Roboto-Medium" slot="description">{{
                  $t('text_used_for')
                }}</span>
              </a-list-item-meta>
              <div v-if="!UserInfo.EmailVerified">
                <a-button
                  type="primary"
                  slot="actions"
                   @click="
                  $router.push(
                    localeRoute('/account/security/enable-email-authenticator')
                  )
                "
                  block
                  class="Roboto-Medium btn-primary-outline"
                  >{{ $t('text_not_verified') }}</a-button
                >
              </div>
              <div v-else>
                <a-button
                  type="primary"
                  slot="actions"
                  block
                  icon="check"
                  class="Roboto-Medium btn-primary-outline confirmed"
                  >{{ $t('text_verified') }}</a-button
                >
              </div>
            </a-list-item>
            <a-list-item class="Roboto-Medium auth-type-list-item">
              <a-list-item-meta>
                <img
                  slot="avatar"
                  src="~/assets/icons/security_settings/ss-sms.svg"
                  alt
                />
                <p slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_sms_authentication') }}
                </p>
                <span class="list-desc Roboto-Medium" slot="description">{{
                  $t('text_used_for')
                }}</span>
              </a-list-item-meta>
              <div v-if="!UserInfo.EnableSMSVerify">
                <a-button
                  v-if="!UserInfo.EnableSMSVerify"
                  slot="actions"
                  @click="
                    $router.push(
                      localeRoute('/account/security/enable-sms-authenticator')
                    )
                  "
                  type="primary"
                  block
                  class="Roboto-Medium btn-primary-outline"
                  >{{ $t('text_activate') }}</a-button
                >
              </div>
              <div v-else>
                <a-button
                  slot="actions"
                  type="secondary"
                  @click="disableSms"
                  block
                  class="Roboto-Medium"
                  >{{ $t('text_disable') }}</a-button
                >
              </div>
            </a-list-item>
            <a-list-item class="Roboto-Medium auth-type-list-item">
              <a-list-item-meta>
                <img
                  class="icon-2fa"
                  slot="avatar"
                  src="~/assets/icons/verify_modal/2faicon.svg"
                  alt
                />
                <p slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_google_authentication') }}
                </p>
                <span class="list-desc Roboto-Medium" slot="description">{{
                  $t('text_used_for')
                }}</span>
              </a-list-item-meta>

              <div v-if="UserInfo.Enable2FAVerify">
                <a-button
                  slot="actions"
                  type="secondary"
                  @click="disable2fa"
                  block
                  class="Roboto-Medium"
                  >{{ $t('text_disable') }}</a-button
                >
              </div>
              <div v-else>
                <a-button
                  slot="actions"
                  type="primary"
                  @click="
                    $router.push(
                      localeRoute(
                        '/account/security/enable-google-authenticator'
                      )
                    )
                  "
                  block
                  class="Roboto-Medium btn-primary-outline"
                  >{{ $t('text_activate') }}</a-button
                >
              </div>
              <div v-if="UserInfo.Enable2FAVerify">
                <nuxt-link
                  :to="
                    localePath('/account/security/enable-google-authenticator')
                  "
                >
                  <a-button
                    slot="actions"
                    type="primary"
                    block
                    class="Roboto-Medium btn-primary-outline"
                    >{{ $t('text_activate') }}</a-button
                  >
                </nuxt-link>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
        <a-card
          class="security-setting-card security-setting-card-small border-none mb-common"
        >
          <a-list :loading="false">
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <h3 slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_device_management') }}
                </h3>
              </a-list-item-meta>
              <a-button
                @click="
                  $router.push(
                    localeRoute('/account/security/device-management/')
                  )
                "
                slot="actions"
                type="secondary"
                block
                class="Roboto-Medium"
                >{{ $t('text_change') }}</a-button
              >
            </a-list-item>
          </a-list>
        </a-card>
        <a-card
          class="security-setting-card security-setting-card-small border-none mb-common"
        >
          <a-list :loading="false">
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <h3 slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_login_password') }}
                </h3>
              </a-list-item-meta>
              <a-button
                slot="actions"
                @click="$router.push(localeRoute('/account/security/password'))"
                type="secondary"
                block
                class="Roboto-Medium"
                >{{ $t('text_change') }}</a-button
              >
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card
          class="security-setting-card security-setting-card-small border-none mb-common"
          v-if="UserInfo.KYCVerified === true"
        >
          <a-list :loading="false">
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <h3 slot="title" class="list-title Roboto-Medium">
                  Kurumsal Hesap
                </h3>
              </a-list-item-meta>
              <div class="text-right">
                <a-button
                  v-if="
                    UserInfo.CorporateStatus === 'NoCorporate' ||
                    UserInfo.CorporateStatus === 'CorporateRevision'
                  "
                  type="primary"
                  slot="actions"
                  block
                  class="Roboto-Medium btn-primary-outline"
                >
                  <nuxt-link :to="localePath('/account/corporate')">
                    <span>
                      {{ UserInfo.CorporateStatusLabel }}
                    </span>
                  </nuxt-link>
                </a-button>
                <a-button
                  v-else-if="UserInfo.CorporateStatus === 'CorporateInProgress'"
                  type="secondary"
                  slot="actions"
                  block
                  class="Roboto-Medium btn-secondary-outline"
                >
                  <span>
                    {{ UserInfo.CorporateStatusLabel }}
                  </span>
                </a-button>
                <a-button
                  v-else
                  type="primary"
                  slot="actions"
                  block
                  class="Roboto-Medium btn-primary-outline confirmed"
                >
                  <nuxt-link :to="localePath('/account/corporate')">
                    <span
                      v-if="UserInfo.CorporateStatus === 'CorporateInProgress'"
                    >
                      İnceleniyor
                    </span>
                    <span
                      v-else-if="
                        UserInfo.CorporateStatus === 'CorporateRevision'
                      "
                    >
                      Yeniden Başvur
                    </span>
                    <span
                      v-else-if="UserInfo.CorporateStatus === 'CorporateDone'"
                    >
                      Onaylandı
                    </span>
                  </nuxt-link>
                </a-button>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
        <a-card
          class="security-setting-card security-setting-card-small border-none mb-common"
        >
          <a-list :loading="false">
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <h3 slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_authentication') }}
                </h3>
              </a-list-item-meta>

              <a-button
                v-if="
                  UserInfo.KYCStatus === 'NoKYC' ||
                  UserInfo.KYCStatus === 'InProgress' ||
                  UserInfo.KYCStatus === 'Revision'
                "
                type="primary"
                slot="actions"
                block
                class="Roboto-Medium btn-primary-outline"
              >
                <nuxt-link :to="localePath('/account/kyc')">
                  <span v-if="UserInfo.KYCStatus === 'Revision'">{{
                    $t('text_confirm')
                  }}</span>
                  <span v-else-if="UserInfo.KYCStatus === 'NoKYC'">{{
                    $t('text_confirm')
                  }}</span>
                  <span v-else-if="UserInfo.KYCStatus === 'InProgress'">{{
                    $t('text_inprogress')
                  }}</span>
                </nuxt-link>
              </a-button>

              <a-button
                v-else
                type="primary"
                slot="actions"
                block
                icon="check"
                class="Roboto-Medium btn-primary-outline confirmed"
                >{{ $t('text_verified') }}</a-button
              >
            </a-list-item>
          </a-list>
        </a-card>
        <a-card
          class="security-setting-card security-setting-card-small border-none mb-common"
        >
          <a-list :loading="false">
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <h3 slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_phishing_block_code') }}
                </h3>
                <span slot="description">{{ $t('text_phishing_desc') }}</span>
              </a-list-item-meta>
              <a-button
                v-if="UserInfo.AntiphishingCode === ''"
                slot="actions"
                type="primary"
                block
                class="Roboto-Medium btn-primary-outline"
                @click="
                  $router.push(
                    localeRoute('/account/security/anti-phishing-code')
                  )
                "
                >{{ $t('text_activate') }}</a-button
              >
              <a-button
                v-else
                slot="actions"
                type="secondary"
                block
                class="Roboto-Medium"
                @click="
                  $router.push(
                    localeRoute('/account/security/anti-phishing-code')
                  )
                "
                >{{ $t('text_change') }}</a-button
              >
            </a-list-item>
          </a-list>
        </a-card>
        <a-card
          class="security-setting-card security-setting-card-small border-none mb-common"
        >
          <a-list :loading="false">
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <h3 slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_account_mobility') }}
                </h3>
                <span slot="description"
                  >{{ $t('text_last_login') }} : {{ UserInfo.LastLogin }}</span
                >
              </a-list-item-meta>
              <a-button
                slot="actions"
                @click="$router.push(localeRoute('/account/activity'))"
                type="secondary"
                block
                class="Roboto-Medium"
                >{{ $t('text_continue') }}</a-button
              >
            </a-list-item>
            <a-list-item class="Roboto-Medium">
              <a-list-item-meta>
                <a-icon slot="avatar" type="close-circle" />
                <p slot="title" class="list-title Roboto-Medium">
                  {{ $t('text_suspicious_activity') }}
                  <a
                    @click.prevent="$router.push(localeRoute('/account/froze'))"
                  >
                    {{ $t('text_deactivate_account') }}
                  </a>
                </p>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserInfo: {},
    }
  },
  head(){
    return{
      title: 'Güvenlik | Cointral.com',
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
  computed: {
    totalVerifications() {
      let vrfs = 0
      vrfs += this.UserInfo.KYCVerified ? 1 : 0
      vrfs += (this.UserInfo.Enable2FAVerify || this.UserInfo.EnableSMSVerify) ? 1 : 0
      vrfs += this.UserInfo.IsExistAntiphishingCode ? 1 : 0
      return vrfs
    },
  },
}
</script>

<style lang="less" scoped>
.btn-primary-outline {
  min-width: 80px;
  border: 1px solid var(--primary-button-bg);
  background-color: transparent !important;
  color: var(--primary-button-bg);
}
.confirmed {
  border: 1px solid #5cb56a;
  color: #5cb56a;
  pointer-events: none;
}
.mb-common {
  margin-bottom: 20px;
}
.list-title {
  color: #1e2026;
  margin-bottom: 0;
}
.list-desc {
  color: #778090;
}
.auth-type-list-item:nth-child(1) {
  border-bottom: 0;
}
.security-settings-header {
  margin-top: -15px;
  margin-left: -15px;
}
.security-setting-card {
  box-shadow: 0px 0px 2px #0000000d;
  border-radius: 3px;
}

.security-settings-list-item-icon {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.security-settings-list-item {
  text-align: left;
  text-decoration: underline;
  .ant-list-item {
    margin-bottom: 0;
  }
}
.icon-2fa {
  background-color: darkgray;
  border-radius: 50%;
}
.totalVrfs {
  color: var(--text-primary);
}
</style>
