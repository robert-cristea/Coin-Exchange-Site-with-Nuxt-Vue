<template>
  <div class="preferences-page" :style="isMobile ? 'margin-top: 20px' : null">
    <a-row class="mb-common">
      <a-col :offset="isMobile ? 1 : 0" :span="!isMobile ? 24 : 23">
        <a-card class="border-none preferences-header-card">
          <h1 class="Roboto-Regular">{{ $t('text_preferences') }}</h1>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="mb-common">
      <a-col :span="!isMobile ? 12 : 24">
        <a-card class="border-none preferences-card">
          <a-list class="preferences-list">
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <h3 slot="title">{{ $t('text_transaction_notifications') }}</h3>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <h3 class="actions-item">{{ $t('text_email') }}</h3>
                <h3 class="actions-item">{{ $t('text_sms') }}</h3>
              </div>
            </a-list-item>
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <p slot="title" class="list-title">
                  {{ $t('text_deposit_notices') }}
                </p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <span @click="showEmailError">
                  <a-switch
                    :disabled="!UserInfo.EmailVerified"
                    v-model="UserInfo.DepositEmailNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
                <span @click="showSmsError">
                  <a-switch
                    :disabled="!UserInfo.EnableSMSVerify"
                    v-model="UserInfo.DepositSMSNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
              </div>
            </a-list-item>
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <p slot="title" class="list-title">
                  {{ $t('text_withdraw_notifications') }}
                </p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <span @click="showEmailError">
                  <a-switch
                    :disabled="!UserInfo.EmailVerified"
                    v-model="UserInfo.WithdrawEmailNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
                <span @click="showSmsError">
                  <a-switch
                    :disabled="!UserInfo.EnableSMSVerify"
                    v-model="UserInfo.WithdrawSMSNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
              </div>
            </a-list-item>
            <!-- <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <p slot="title" class="list-title">
                  {{ $t('text_p2p_notifications') }}
                </p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <span @click="showEmailError">
                  <a-switch
                    :disabled="!UserInfo.EmailVerified"
                    v-model="UserInfo.P2PEmailNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
                <span @click="showSmsError">
                  <a-switch
                    :disabled="!UserInfo.EnableSMSVerify"
                    v-model="UserInfo.P2PSMSNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
              </div>
            </a-list-item> -->
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <p slot="title" class="list-title">
                  {{ $t('text_otc_statements') }}
                </p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <span @click="showEmailError">
                  <a-switch
                    :disabled="!UserInfo.EmailVerified"
                    v-model="UserInfo.OTCEmailNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
                <span @click="showSmsError">
                  <a-switch
                    :disabled="!UserInfo.EnableSMSVerify"
                    v-model="UserInfo.OTCSMSNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
              </div>
            </a-list-item>
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <p slot="title" class="list-title">
                  {{ $t('text_security_settings_notifications') }}
                </p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <span @click="showSmsError">
                  <a-switch
                    :disabled="!UserInfo.EnableSMSVerify"
                    v-model="UserInfo.SecurityUpdateSMSNotify"
                    class="actions-item"
                    size="small"
                  />
                </span>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="!isMobile ? 12 : 24">
        <a-card class="border-none preferences-card">
          <a-list class="preferences-list">
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <h3 slot="title">
                  {{ $t('text_notification_lang_settings') }}
                </h3>
                <p slot="description">{{ $t('text_set_notification_lang') }}</p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <a-select
                  v-model="UserInfo.SelectedInformationLanguage"
                  style="width: 100px"
                >
                  <a-select-option value="tr">Türkçe</a-select-option>
                  <a-select-option value="en">English</a-select-option>
                </a-select>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
        <a-card class="border-none preferences-card">
          <a-list class="preferences-list">
            <a-list-item class="Roboto-Medium preferences-list-item">
              <a-list-item-meta>
                <h3 slot="title">
                  Telegram Bildirimleri&nbsp;
                  <a-tooltip>
                    <a-icon type="info-circle"></a-icon>
                    <span slot="title">{{
                      $t('preferences_text_telegram_tooltip')
                    }}</span>
                  </a-tooltip>
                </h3>

                <p slot="description">Telegram üzerinden bildirim alın</p>
              </a-list-item-meta>
              <div slot="actions" class="preferences-list-actions">
                <a target="_blank" href="https://t.me/CointralBot"
                  >@CointralBot</a
                >
              </div>
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

      isMobile: null,
    }
  },
  head() {
    return {
      title: 'Bildirim Tercihleri | Cointral.com',
    }
  },
  mounted() {
    this.getUserInfo()

    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
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
    async updateNotifySettings() {
      const {
        DepositEmailNotify,
        DepositSMSNotify,
        WithdrawEmailNotify,
        WithdrawSMSNotify,
        P2PEmailNotify,
        P2PSMSNotify,
        OTCEmailNotify,
        OTCSMSNotify,
        SecurityUpdateSMSNotify,
        SelectedInformationLanguage,
      } = this.UserInfo
      let NotifyInfo = {
        DepositEmailNotify,
        DepositSMSNotify,
        WithdrawEmailNotify,
        WithdrawSMSNotify,
        P2PEmailNotify,
        P2PSMSNotify,
        OTCEmailNotify,
        OTCSMSNotify,
        SecurityUpdateSMSNotify,
        SelectedInformationLanguage,
      }
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.post(
        FINANCE_API_URL + '/UpdateNotificationSettings',
        {
          NotifyInfo,
        },
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        // this.getUserInfo()
      }
    },
    showEmailError() {
      if (!this.UserInfo.EmailVerified) {
        this.$notification.open({
          description:
            'E-posta bildirimleri alabilmek için lütfen e-postanızı doğrulayın',
        })
      }
    },
    showSmsError() {
      if (!this.UserInfo.EnableSMSVerify) {
        this.$notification.open({
          description:
            'Sms bildirimleri alabilmek için lütfen sms doğrulamanızı aktif edin',
        })
      }
    },
  },
  watch: {
    'UserInfo.DepositEmailNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.DepositSMSNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.WithdrawEmailNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.WithdrawSMSNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.P2PEmailNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.P2PSMSNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.OTCEmailNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.OTCSMSNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.SecurityUpdateEmailNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.SecurityUpdateSMSNotify': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
    'UserInfo.SelectedInformationLanguage': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateNotifySettings()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.mb-common {
  margin-bottom: 20px;
}
.list-title {
  color: #000000;
  margin-bottom: 0;
}
.preferences-header-card {
  box-shadow: 0px 0px 2px #00000029;
  margin-top: -15px;
  margin-left: -15px;
}
.preferences-list {
  .preferences-list-item:first-child {
    border-bottom: 0px;
  }
}
.preferences-card-extra {
  display: flex;
}
.preferences-list-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preferences-list-actions .actions-item {
  margin-bottom: 0;
}
.preferences-list-actions .actions-item:first-child {
  margin-right: 20px;
  text-align: left;
}
</style>
