<template>
  <div :class="!isMobile ? 'wallet' : null">
    <div class="navbar">
      <navbar :active-key="activeKey" />
    </div>
    <div class="content" v-show="!isMobile">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  middleware: ['auth'],
  name: 'wallet',
  head() {
    return {
      title: 'Cüzdan | Cointral.com',
    }
  },
  data: () => ({
    isMobile: null,
    activeKey: null,
    firstKey: null,
    secondKey: null,
  }),

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

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
    this.activeKey = '1'
    this.firstKey = '5'
    this.secondKey = '8'
    if (this.$route.params.subComponent === 'deposit') {
      this.activeKey = '1'
      this.firstKey = '6'
      if (this.$route.params.asset) {
        this.SET_SELECTED_ASSET(this.$route.params.asset)
      }
      this.SET_CURRENT_TAB('MainWalletDeposit')
      return
    } else if (this.$route.params.subComponent === 'withdraw') {
      this.activeKey = '1'
      this.firstKey = '7'
      if (this.$route.params.asset) {
        this.SET_SELECTED_ASSET(this.$route.params.asset)
      }
      this.SET_CURRENT_TAB('MainWalletWithdraw')
      return
    }

    if (this.$route.params.subComponent === 'deposit') {
      this.activeKey = '2'
      this.secondKey = '9'
      this.SET_CURRENT_TAB('FiatDeposit')
      return
    } else if (this.$route.params.subComponent === 'withdraw') {
      this.activeKey = '2'
      this.secondKey = '10'
      this.SET_CURRENT_TAB('FiatWithdraw')
      return
    }

    if (this.$route.params.component === 'main-wallet') {
      this.activeKey = '1'
      this.SET_CURRENT_TAB('MainWallet')
    } else if (this.$route.params.component === 'fiat-wallet') {
      this.activeKey = '2'
      this.SET_CURRENT_TAB('Price')
    } else if (this.$route.params.component === 'p2p-wallet') {
      this.activeKey = '3'
      this.SET_CURRENT_TAB('P2P')
    } else if (this.$route.params.component === 'history') {
      this.activeKey = '4'
      this.SET_CURRENT_TAB('History')
    }
  },

  computed: {
    ...mapGetters({
      CURRENT_TAB: 'wallet/CURRENT_TAB',
    }),
  },

  methods: {
    ...mapMutations({
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
      SET_SELECTED_ASSET: 'mainwallet/SET_SELECTED_ASSET',
    }),
  },

  async asyncData({
    $axios,
    store,
    redirect,
    $config: { FINANCE_API_URL },
    params,
    $cookies,
  }) {
    try {
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }

      const response = await $axios.get(FINANCE_API_URL + '/GetAssetList', {
        headers: authHeaders,
      })
      if (response.data) {
        let assets = response.data['Assets']
        store.commit('swap/SET_ASSETS', assets)
      }

      const responseUserBalance = await $axios.get(
        FINANCE_API_URL + `/GetUserBalance`,
        { headers: authHeaders }
      )
      if (responseUserBalance.data) {
        store.commit('mainwallet/SET_USER_BALANCE', responseUserBalance.data)
      }

      const responseDepositHistory = await $axios.get(
        FINANCE_API_URL + `/GetDepositHistory`,
        { headers: authHeaders }
      )
      if (responseDepositHistory.data) {
        store.commit(
          'mainwallet/SET_DEPOSIT_HISTORY',
          responseDepositHistory.data['DepositHistory'].slice(0, 5)
        )
      }

      const responseWithdrawHistory = await $axios.get(
        FINANCE_API_URL + `/GetWithdrawHistory?Offset=0&RowSize=5`,
        {
          headers: authHeaders,
        }
      )
      if (responseWithdrawHistory.data) {
        const withdrawHistory = []
        let resWithdrawHistory =
          responseWithdrawHistory.data['WithdrawRecordList']
        resWithdrawHistory.forEach((his) => {
          withdrawHistory.push({
            Asset: his['Asset'],
            Address: his['Address'],
            InsertTime: his['CreatedOn'],
            CreatedOn: his['CreatedOn'],
            UpdatedOn: his['UpdatedOn'],
            Amount: his['Amount'],
            Status: his['Status'],
            AssetName: his['AssetName'],
            TxHash: his['TxHash'],
          })
        })

        store.commit('mainwallet/SET_WITHDRAW_HISTORY', withdrawHistory)
      }

      await store.dispatch('fiatwallet/GET_USER_FIAT_WALLET_DEPOSIT')
      await store.dispatch('fiatwallet/GET_FIAT_WALLET_WITHDRAW_HISTORY')
    } catch (e) {}
  },

  watch: {
    $route: {
      handler: function (v) {
        if (v.path.includes('main-wallet')) {
          this.activeKey = '1'
          this.SET_CURRENT_TAB('MainWallet')
        } else if (v.path.includes('fiat-wallet')) {
          this.activeKey = '2'
          this.SET_CURRENT_TAB('Price')
        } else if (v.path.includes('p2p-wallet')) {
          this.activeKey = '3'
          this.SET_CURRENT_TAB('P2P')
        } else if (v.path.includes('history')) {
          this.activeKey = '4'
          this.SET_CURRENT_TAB('History')
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 16px 16px 16px 16px;
  width: 100%;
}
* {
  background-color: #fafafa;
}

.navbar {
  background-color: white;
}

.wallet {
  display: flex;
  min-height: 80vh;
}
</style>
