<template>
  <div>
    <a-menu
      v-if="!isMobile"
      style="width: 200px"
      :default-selected-keys="['1']"
      :open-keys.sync="openKeys"
      mode="inline"
      @click="handleClick"
    >
      <a-menu-item
        @click="$router.push(localeRoute('/my/wallet/main-wallet'))"
        class="menu-item-title"
        key="1"
      >
        <img
          style="margin-right: 15px"
          src="~/assets/images/wallet.svg"
          alt
        />{{ $t('text_main_wallet') }}
      </a-menu-item>
      <a-menu-item
        class="menu-item-title"
        key="2"
        @click="$router.push(localeRoute('/my/wallet/fiat-wallet'))"
      >
        <img
          style="margin-right: 15px"
          src="~/assets/images/wallet.svg"
          alt
        />{{ $t('text_fiat_wallet') }}
      </a-menu-item>
      <!-- <a-menu-item
        class="menu-item-title"
        key="3"
        @click="$router.push(localeRoute('/my/wallet/p2p-wallet'))"
      >
        <img
          style="margin-right: 15px"
          src="~/assets/images/wallet.svg"
          alt
        />{{ $t('text_p2p_wallet') }}
      </a-menu-item> -->
      <a-menu-item
        class="menu-item-title"
        key="4"
        @click="$router.push(localeRoute('/my/wallet/history'))"
      >
        <img
          style="margin-right: 5px"
          src="~/assets/images/wallethistory2.svg"
          alt
        />
        {{ $t('navbar_wallet_history') }}
      </a-menu-item>
    </a-menu>
    <a-tabs
      v-else
      v-model="activeKey"
      :open-keys.sync="openKeys"
      mode="inline"
      :tab-bar-style="{ 'background-color': 'black', color: 'gray' }"
      class="ant-tabs-bar-navbar"
    >
      <a-tab-pane key="1">
        <span
          slot="tab"
          @click="$router.push(localeRoute('/my/wallet/main-wallet'))"
        >
          <img
            style="margin-right: 15px"
            src="~/assets/images/wallethistory2.svg"
            alt
          />
          {{ $t('navbar_main_wallet') }}
        </span>
        <a-tabs
          :animated="false"
          :tab-bar-style="{ position: 'relative', top: '-15px' }"
          class="ant-tabs-bar-navbar__tabs"
        >
          <a-tab-pane key="5">
            <span
              slot="tab"
              @click="$router.push(localeRoute('/my/wallet/main-wallet'))"
            >
              {{ $t('navbar_tab_balance') }}
            </span>
            <MainWallet />
          </a-tab-pane>
          <a-tab-pane key="6">
            <span
              slot="tab"
              @click="
                $router.push(localeRoute('/my/wallet/main-wallet/deposit/BTC'))
              "
            >
              {{ $t('navbar_tab_deposit') }}
            </span>
            <MainWalletDeposit />
          </a-tab-pane>
          <a-tab-pane key="7" force-render>
            <span
              slot="tab"
              @click="
                $router.push(localeRoute('/my/wallet/main-wallet/withdraw/BTC'))
              "
            >
              {{ $t('navbar_tab_withdraw') }}
            </span>
            <MainWalletWithdraw />
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>

      <a-tab-pane key="2">
        <span
          slot="tab"
          @click="$router.push(localeRoute('/my/wallet/fiat-wallet'))"
        >
          <img
            style="margin-right: 15px"
            src="~/assets/images/wallet.svg"
            alt
          />
          {{ $t('navbar_fiat_wallet') }}
        </span>
        <a-tabs
          :animated="false"
          :tabBarStyle="{ position: 'relative', top: '-15px' }"
          v-model="secondKey"
        >
          <a-tab-pane key="8" v-bind:tab="$t('navbar_tab_balance')">
            <Price />
          </a-tab-pane>
          <a-tab-pane key="9" v-bind:tab="$t('navbar_tab_deposit')">
            <FiatDeposit />
          </a-tab-pane>
          <a-tab-pane
            key="10"
            v-bind:tab="$t('navbar_tab_withdraw')"
            force-render
          >
            <FiatWithdraw />
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>

      <a-tab-pane key="3">
        <span
          slot="tab"
          @click="$router.push(localeRoute('/my/wallet/p2p-wallet'))"
        >
          <img
            style="margin-right: 15px"
            src="~/assets/images/wallet.svg"
            alt
          />
          {{ $t('navbar_p2p_wallet') }}
        </span>
        <P2P />
      </a-tab-pane>

      <a-tab-pane key="4">
        <span
          slot="tab"
          @click="$router.push(localeRoute('/my/wallet/history'))"
        >
          <img
            style="margin-right: 5px"
            src="~/assets/images/wallethistory2.svg"
            alt
          />
          {{ $t('navbar_wallet_history') }}
        </span>
        <History />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Wallet',

  props: {
    activeKey: {
      type: String,
      default: '1',
    },
    firstKey: {
      type: String,
      default: '5',
    },
    secondKey: {
      type: String,
      default: '8',
    },
  },

  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1'],
      key: 1,
      isMobile: null,
    }
  },

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  watch: {
    openKeys(val) {},
  },

  components: {
    Navbar: () => import('@/components/Wallet/Navbar'),
    MainWallet: () => import('@/components/Wallet/MainWallet'),
    P2P: () => import('@/components/Wallet/P2P'),
    Price: () => import('@/components/Wallet/Price'),
    History: () => import('@/components/Wallet/History'),
    MainWalletDeposit: () => import('@/components/MainWallet/Deposit'),
    MainWalletWithdraw: () => import('@/components/MainWallet/Withdraw'),
    FiatDeposit: () => import('@/components/FiatWallet/Deposit'),
    FiatWithdraw: () => import('@/components/FiatWallet/Withdraw'),
  },

  computed: {
    ...mapGetters({
      CURRENT_TAB: 'wallet/CURRENT_TAB',
    }),
  },

  methods: {
    ...mapMutations({
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
    }),

    handleClick(e, event) {
      switch (e.key) {
        case '1':
          this.SET_CURRENT_TAB('MainWallet')
          break
        case '2':
          this.SET_CURRENT_TAB('Price')
          break
        case '3':
          this.SET_CURRENT_TAB('P2P')
          break
        case '4':
          this.SET_CURRENT_TAB('History')
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar-header {
  width: 105px;
  display: flex;
  justify-content: flex-start;

  span {
    color: #000000;
  }

  img {
    padding-right: 13px;
  }
}

.menu-item-title {
  color: black;
  padding-left: 20px;
}
</style>
