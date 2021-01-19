<template>
  <div class="Dashboard">
    <a-row class="account-row">
      <a-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
        <div class="account-holder-details" style="display: flex">
          <img
            class="account-icons"
            src="~/assets/icons/user.svg"
            alt="wallet"
          />
          <div
            class="account-holder-text-details"
            style="margin-left: 10px; display: flex; flex-direction: column"
          >
            <span class="account-email Roboto-Medium">
              {{ UserInfo.Email }}
            </span>
            <span
              style="font-size: 0.8rem"
              class="account-email-detail Roboto-Regular"
            >
              {{$t('dashboard_text_last_login')}} {{ UserInfo.LastLogin }}
              {{ UserInfo.LastLoginIP }}
            </span>
          </div>
        </div>
      </a-col>
      <a-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
        <p align="right" class="Roboto-Regular">
          <span class="Roboto-Medium account-email-detail">User ID :</span>
          38668998
        </p>
      </a-col>
    </a-row>

    <a-row class="account-row hide-mobile-1000">
      <a-col>
        <WelcomeHeader :UserInfo="UserInfo" />
      </a-col>
    </a-row>

    <a-row type="flex" class="account-row" :gutter="12">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <WalletCard />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <a-button
          @click="$router.push(localeRoute('/account/referral'))"
          class="account-block-button Roboto-Medium"
          type="primary"
          block
        >
          {{$t('dashboard_text_referal_info')}}
        </a-button>
        <a-row style="margin-top: 10px">
          <a-col>
            <Announcements />
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex" class="account-row" :gutter="12">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <Security :UserInfo="UserInfo" />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <Activity />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import WelcomeHeader from '~/components/Account/WelcomeHeader'
import WalletCard from '~/components/Account/WalletCard'
import Announcements from '~/components/Account/Announcements'
import Security from '~/components/Account/Security'
import Activity from '~/components/Account/Activity'
export default {
  components: {
    WelcomeHeader,
    WalletCard,
    Announcements,
    Security,
    Activity,
  },
  head(){
    return{
      title: 'Kontrol Paneli | Cointral.com',
    }
  },
  data() {
    return {
      UserInfo: {},
    }
  },
  async mounted() {
    await this.getUserInfo()
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
  },
}
</script>

<style lang="less" scoped>
.account-row:first-child {
  margin-bottom: 20px;
}
.account-row {
  margin: 10px auto;
}
.account-card {
  box-shadow: 0px 0px 9px #00000012;
  border-radius: 4px;
}
.account-email {
  color: var(--text-color);
}
.account-email-detail {
  color: #778090;
}
.account-default-text-color {
  color: var(--text-color);
}
.account-card-secondary-text {
  color: #778090;
}

.account-block-button {
  background: transparent linear-gradient(172deg, #90dafe 0%, #30abe5 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 9px #00000012;
  border-radius: 4px;
  min-height: 48px;
  height: fit-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.align-items-start {
  align-items: flex-start;
}
@media only screen and (max-width: 1000px) {
  .account-icons {
    margin-left: 10px;
  }
  .account-holder-details {
    align-items: flex-start;
  }
}
</style>
