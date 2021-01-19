<template>
  <div :class="!isMobile ? 'account-page' : null">
    <div
      class="account-page-navigation hide-mobile-1000"
      v-if="hideAccountMenu"
    >
      <SideBar @menuClick="changeCurrentComponent" />
    </div>
    <div
      class="account-page-content hide-mobile-1000"
      :class="{ 'p-0': !hideAccountMenu }"
    >
      <nuxt-child></nuxt-child>
    </div>

    <div v-if="isMobile">
      <a-tabs
        :active-key="activeAccountMenu"
        mode="inline"
        :tabBarStyle="{ backgroundColor: 'black', color: 'gray' }"
      >
        <a-tab-pane key="/account/dashboard" style="margin:0 !important;">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/dashboard'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_dashboard') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>

        <a-tab-pane key="/account/bank-accounts">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/bank-accounts'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_bank') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>
        <a-tab-pane key="/account/security">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/security'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_security') }}
          </span>
          <SecuritySettingMobile />
        </a-tab-pane>
        <a-tab-pane key="/account/settings/preferences">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/settings/preferences'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_preferences') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>

        <a-tab-pane key="/account/referral">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/referral'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_reference') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>

        <!-- <a-tab-pane key="/account/activity">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/activity'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_activity') }}
          </span>
          <ActivityViewMobile />
        </a-tab-pane>
        <a-tab-pane key="/account/security/device-management">
          <span
            slot="tab"
            @click="
              $router.push(localeRoute('/account/security/device-management'))
            "
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_management') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>
        <a-tab-pane key="/account/security/anti-phishing-code">
          <span
            slot="tab"
            @click="
              $router.push(localeRoute('/account/security/anti-phishing-code'))
            "
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_antiphishing') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>
        <a-tab-pane key="/account/security/enable-sms-authenticator">
          <span
            slot="tab"
            @click="
              $router.push(
                localeRoute('/account/security/enable-sms-authenticator')
              )
            "
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('text_enable_sms_auth') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane>
        <a-tab-pane key="/account/security/password">
          <span
            slot="tab"
            @click="$router.push(localeRoute('/account/security/password'))"
          >
            <img
              style="margin-right: 15px"
              src="~/assets/images/wallet.svg"
              alt
            />
            {{ $t('account_text_change_password') }}
          </span>
          <nuxt-child></nuxt-child>
        </a-tab-pane> -->
      </a-tabs>

      <nuxt-child v-if="isNestedRoutes"></nuxt-child>
    </div>
  </div>
</template>

<script>
import SideBar from '~/components/Account/SideBar'
import ActivityViewMobile from '~/components/Account/ActivityViewMobile'
import SecuritySettingMobile from '~/components/Account/SecuritySettingMobile'

export default {
  middleware: ['auth'],
  components: {
    SideBar,
    ActivityViewMobile,
    SecuritySettingMobile,
  },
  head(){
    return{
      title: 'Hesabım | Cointral.com',
    }
  },
  data() {
    return {
      isMobile: null,
      activeAccountMenu: '/account/dashboard',
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  methods: {
    changeCurrentComponent(component) {
      this.currentComponent = component
    },
  },
  computed: {
    hideAccountMenu() {
      return this.$route.path.includes('/account/referral') ? false : true
    },
    isNestedRoutes() {
      let baseroutes = [
        '/tr/account/dashboard',
        '/tr/account/bank-accounts',
        '/tr/account/security',
        '/tr/account/settings/preferences',
        '/tr/account/referral',
        '/en/account/dashboard',
        '/en/account/bank-accounts',
        '/en/account/security',
        '/en/account/settings/preferences',
        '/en/account/referral',
      ]
      return !baseroutes.includes(this.$route.path)
    },
  },
  watch: {
    $route: {
      handler: function (val) {
        let routePrefix = this.$cookies.get('i18n_redirected')
        this.activeAccountMenu = val.path.replace('/' + routePrefix, '')
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/ant/variables.less';

.cointral-card .ant-card-body {
  padding: 0 !important;
}
.account-page {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  background-color: var(--account-page-bg);
}
.account-page-navigation {
  min-width: 180px;
  width: 200px;
}
.account-page-content {
  width: 100%;
  padding: 16px 16px 16px 16px;
}
</style>
