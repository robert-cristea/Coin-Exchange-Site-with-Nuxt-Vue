<template>
  <div style="background-color: #fafafa">
    <a-breadcrumb
      v-if="!isMobile"
      class="breadcrumb"
      style="margin-top: 20px; margin-left: 20px"
    >
      <nuxt-link :to="localePath('/my/wallet/main-wallet')">
        <a-breadcrumb-item @click="SET_CURRENT_TAB('MainWallet')">
          {{ $t('main_wallet_label') }}</a-breadcrumb-item
        >
      </nuxt-link>
      <a-breadcrumb-item>{{ $t('main_text_deposit') }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row style="margin-bottom: 20px">
      <a-col :offset="1" :span="23" style="text-align: start">
        <div class="Roboto-Regular" style="font-size: 32px; color: #1c2640">
          {{ $t('deposit_title') }}
        </div>
      </a-col>
    </a-row>

    <a-row :class="!isMobile ? 'main-row' : 'main-row-mobile'" class="d-flex">
      <Asset @change="changeAsset" :transactionType="'deposit'" />
      <Network
        class="ml-auto"
        :style="responsiveStyleBelowNineHundredPixels"
        :networkTitle="$t('deposit_network')"
        :networkType="'deposit'"
      />
    </a-row>
    <a-row style="margin-top: 20px; margin-bottom: 20px">
      <MainWalletHistory
        v-if="!isMobile"
        historyType="DEPOSIT"
        :historyData="DEPOSIT_HISTORY"
        :title="$t('deposit_history')"
      />
      <MainWalletHistoryMobile
        v-if="isMobile"
        historyType="DEPOSIT"
        :historyData="DEPOSIT_HISTORY"
        :title="$t('deposit_history')"
      />
    </a-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Deposit',
  head() {
    return {
      title: 'Ana Cüzdan Yatırma | Cointral.com',
    }
  },
  data: () => ({
    windowWidth: null,
    isMobile: null,
  }),

  async asyncData({ app, params, redirect, $axios, $config, $cookies }) {
    if (!params.asset) {
      redirect(app.localeRoute('/my/wallet/main-wallet/deposit/BTC'))
    } else {
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.get(
        $config.FINANCE_API_URL + '/GetSymbols',
        {
          headers: authHeaders,
        }
      )
      const { SymbolList, Success } = data
      if (Success) {
        let index = SymbolList.findIndex(
          (sym) => sym.BaseAsset === params.asset.toUpperCase()
        )
        if (index === -1) {
          redirect(app.localeRoute('/my/wallet/main-wallet/deposit/BTC'))
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      USER_BALANCE: 'mainwallet/USER_BALANCE',
      DEPOSIT_HISTORY: 'mainwallet/DEPOSIT_HISTORY',
    }),

    responsiveStyleBelowNineHundredPixels() {
      if (this.windowWidth < 990) {
        return ''
      } else {
        return ''
      }
    },
  },

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
      this.windowWidth = window.innerWidth
    })
  },

  methods: {
    ...mapMutations({
      SET_ASSETS: 'swap/SET_ASSETS',
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
    }),
    changeAsset(val) {
      const path = this.$route.path
      const pathSplit = path.split('/')
      if (pathSplit[pathSplit.length - 1] !== '') {
        pathSplit[pathSplit.length - 1] = val.toLowerCase()
      } else {
        pathSplit[pathSplit.length - 2] = val.toLowerCase()
      }

      const newPath = pathSplit.join('/')
      history.pushState({}, null, newPath)
    },
  },
}
</script>

<style scoped>
.main-row {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000000a;
  opacity: 1;
  padding: 46px 0;
  margin-left: 40px;
  margin-right: 80px;
  justify-content: space-between;
}

.main-row-mobile {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000000a;
  opacity: 1;
  padding-top: 50px;
  padding-bottom: 50px;
}

.breadcrumb {
  font-size: 12px;
  padding-bottom: 20px;
}
</style>
