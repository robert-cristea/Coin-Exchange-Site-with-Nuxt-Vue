<template>
  <div class="account-page-sidebar h-100">
    <a-card
      class="cointral-card account-card side-bar h-100"
      :bodyStyle="{ padding: 0 }"
    >
      <a-menu mode="inline" class="account-menu">
        <a-menu-item
          @click="$router.push(localeRoute('/account/dashboard'))"
          class="Roboto-Regular account-menu-item"
          :class="{
            'ant-menu-item-selected': $route.path === '/account/dashboard',
          }"
          key="Dashboard"
        >
          <img
            class="account-icons"
            src="~/assets/icons/user.svg"
            alt="wallet"
          />
          <span>{{ $t('text_dashboard') }}</span>
        </a-menu-item>
        <a-menu-item
          @click="$router.push(localeRoute('/account/bank-accounts'))"
          class="Roboto-Regular account-menu-item"
          :class="{
            'ant-menu-item-selected': $route.path === '/account/bank-accounts',
          }"
          key="Payment"
        >
          <img
            class="account-icons"
            src="~/assets/images/Panel2.svg"
            alt="wallet"
          />
          <span>{{ $t('text_payment') }}</span>
        </a-menu-item>
        <a-menu-item
          @click="$router.push(localeRoute('/account/security'))"
          class="Roboto-Regular account-menu-item"
          :class="{
            'ant-menu-item-selected': $route.path === '/account/security',
          }"
          key="Security"
        >
          <img class="account-icons" src="~/assets/images/security2.svg" />
          <span>{{ $t('text_security') }}</span>
        </a-menu-item>
        <!-- <a-menu-item class="Roboto-Regular account-menu-item" key="BasicInfo">
          <img class="account-icons" src="~/assets/icons/wallet.svg" />
          <span> {{ $t('text_basic_info') }}</span>
        </a-menu-item>-->
        <a-menu-item
          @click="$router.push(localeRoute('/account/settings/preferences'))"
          class="Roboto-Regular account-menu-item"
          :class="{
            'ant-menu-item-selected':
              $route.path === '/account/settings/preferences',
          }"
          key="Preferences"
        >
          <img class="account-icons" src="~/assets/images/settings2.svg" />
          <span>{{ $t('text_preferences') }}</span>
        </a-menu-item>
        <a-menu-item
          @click="$router.push(localeRoute('/account/referral'))"
          class="Roboto-Regular account-menu-item"
          :class="{
            'ant-menu-item-selected': $route.path === '/account/referral',
          }"
          key="Referral"
        >
          <img class="account-icons" src="~/assets/images/reference2.svg" />
          <span>{{ $t('text_referral') }}</span>
        </a-menu-item>
      </a-menu>
    </a-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.account-page-sidebar {
  background-color: var(--body-background);
}
.side-bar {
  width: 15vw;
  @media screen and (min-width: 1300px) {
    width: 180px;
  }
}
.account-card {
  background-color: var(--body-background);
}
.account-menu-item {
  background-color: var(--body-background);
  color: var(--text-color);
  font-size: 14px;
  padding-left: 16px !important;
}
.account-icons {
  font-size: 0.5rem;
  margin-right: 5px;
}
.account-menu {
  background-color: var(--body-background);
}
.account-menu {
  .ant-menu-inline .ant-menu-item {
    width: 0;
  }
}
.account-menu .ant-menu-item-selected {
  background-color: #f5f5f5;
  color: var(--text-color);
}
.account-menu-item img {
  margin-right: 10px;
}
.ant-menu-item::after {
  right: unset;
  left: 0;
}
</style>
