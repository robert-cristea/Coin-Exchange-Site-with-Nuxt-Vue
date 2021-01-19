<template>
  <div id="fiat-trade-lite-page">
    <a-row class="lite-page-row" type="flex" align="middle" justify="center">
      <a-col :xs="22" :sm="20" :md="12" :lg="10">
        <h1 align="center" class="lite-active-asset m-0">
          {{ getSymbolData.BaseAssetName }}
        </h1>
      </a-col>
    </a-row>
    <a-row class="lite-page-row" type="flex" align="middle" justify="center">
      <a-col :xs="22" :sm="20" :md="12" :lg="10">
        <LiteCard
          @tabChange="getTabChange"
          :statistics="LiteTicker"
          :HighestBid="getHighestBid"
          :LowestAsk="getHighestAsk"
        />
      </a-col>
    </a-row>
    <a-row class="lite-page-row" type="flex" align="middle" justify="center">
      <a-col :xs="22" :sm="20" :md="12" :lg="10">
        <div class="lite-list-wrapper">
          <h3 class="lite-list-heading">{{ $t('text_information') }}</h3>
          <ul v-if="activeLiteCardTab === 'BUY'" class="lite-list">
            <li>
              {{ $t('text_info_buy_p1') }}
            </li>
            <li>
              {{ $t('text_info_buy_p2') }}
            </li>
            <li>
              {{ $t('text_info_buy_p3') }}
            </li>
          </ul>
          <ul v-if="activeLiteCardTab === 'SELL'" class="lite-list">
            <li>
              {{ $t('text_info_sell_p1') }}
            </li>
            <li>
              {{ $t('text_info_sell_p2') }}
            </li>
            <li>
              {{ $t('text_info_sell_p3') }}
            </li>
          </ul>
        </div>
        <!-- <LiteCard :statistics="LiteTicker" /> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatter from '~/Mixins/formatter'

export default {
  mixins: [formatter],
  head() {
    const { getSymbolData } = this
    if (this.LiteTicker.last) {
      return {
        title:
          this.formatAll(this.LiteTicker.last, 'PRICE') +
          ' | ' +
          getSymbolData.Symbol +
          ' | ' +
          this.$t('text_fiat_crypto') +
          ' | ' +
          'Cointral.com',
      }
    } else {
      return {
        title:
          getSymbolData.Symbol +
          ' | ' +
          this.$t('text_fiat_crypto') +
          ' | ' +
          'Cointral.com',
      }
    }
  },
  data() {
    return {
      LiteWsCon: null,
      LiteTransactions: {
        bids: [],
        asks: [],
      },
      FiatWalletListenKey: null,
      LiteTicker: {},
      activeLiteCardTab: null,
    }
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
    }),
    isLoggedIn: {
      get() {
        let token = this.$cookies.get('Token')
        return !!token ? true : false
      },
      cache: false,
    },
    getHighestAsk() {
      return this.LiteTransactions.asks[this.LiteTransactions.asks.length - 1]
    },
    getHighestBid() {
      return this.LiteTransactions.bids[0]
    },
  },
  created() {
    if (process.client) {
      if (this.LiteWsCon) this.LiteWsCon.close()
      this.setupLiteWs()
      if (this.isLoggedIn) {
        this.getListenKey()
      }
    }
  },
  beforeDestroy() {
    if (this.LiteWsCon.readyState < 2) {
      this.LiteWsCon.close()
    }
  },

  async asyncData({
    app,
    params,
    $axios,
    $cookies,
    $config: { FINANCE_API_URL },
    redirect,
    store,
  }) {
    if (!params.symbol) {
      redirect(app.localeRoute('/trade/lite/BTC_TRY'))
    } else {
      if (params.symbol.indexOf('_') === -1) {
        redirect(app.localeRoute('/trade/lite/BTC_TRY'))
      } else {
        if (params.symbol.split('_')[1] !== 'TRY') {
          redirect(app.localeRoute('/trade/lite/BTC_TRY'))
        }
      }
    }
    try {
      let symbols
      const token = $cookies.get('Token')
      if (!!token) {
        let authHeaders = { Authorization: 'Bearer ' + token }
        symbols = await $axios.get(FINANCE_API_URL + '/GetSymbols', {
          headers: authHeaders,
        })
      } else {
        symbols = await $axios.get(FINANCE_API_URL + '/GetSymbols')
      }
      store.commit('symbol/updateList', symbols.data.SymbolList)
      store.dispatch('symbol/updateData', params.symbol.split('_'))

      if (!store.state.symbol.data) {
        throw new Error('symbol data not found')
      }
    } catch (e) {
      if ('response' in e) {
        console.error(e.response)
      } else {
        console.error(e)
      }
    }
  },

  methods: {
    getTabChange(e) {
      console.log(e)
      this.activeLiteCardTab = e
    },
    async getListenKey() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetListenKey', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { FiatWalletListenKey } = response.data
        this.FiatWalletListenKey = FiatWalletListenKey
      }
    },
    setupLiteWs() {
      this.LiteWsCon = new WebSocket(this.$config.FIAT_WALLET_SOCKET_URL)
      const { Symbol } = this.getSymbolData
      this.LiteWsCon.onopen = () => {
        this.LiteWsCon.send(
          JSON.stringify({
            method: 'state.subscribe',
            params: ['BTCTRY', 'ETHTRY', 'XRPTRY', 'USDTTRY'],
            id: 101,
          })
        )
        this.LiteWsCon.send(
          JSON.stringify({
            method: 'depth.subscribe',
            params: [Symbol, 20, '0'],
            id: 102,
          })
        )
      }
      this.LiteWsCon.onmessage = this.updateLiteStream
    },
    updateLiteStream(stream) {
      if (this.isLoggedIn && this.FiatWalletListenKey !== null) {
        this.LiteWsCon.send(
          JSON.stringify({
            method: 'server.auth',
            params: [this.FiatWalletListenKey, 'web'],
            id: 150,
          })
        )
        this.FiatWalletListenKey = null
      }

      const { Symbol, BaseAsset, QuatoAsset } = this.getSymbolData
      let payload = JSON.parse(stream.data)
      if ('id' in payload && payload.id === 150) {
        this.LiteWsCon.send(
          JSON.stringify({
            method: 'asset.subscribe',
            params: ['TRY', 'BTC', 'USDT', 'XRP'],
            id: 120,
          })
        )
      }

      const { method, params } = JSON.parse(stream.data)
      if (method === 'state.update') {
        const { Symbol } = this.getSymbolData

        this.$store.commit('symbol/updateFiatSymbolList', params)

        if (params[0] === Symbol) {
          params[1]['volume'] = params[1]['deal']
          this.LiteTicker = params[1]
          params[1]['volume'] = params[1]['deal']
          this.LiteTicker.period = params[1]['close'] - params[1]['open']
          this.LiteTicker.P =
            params[1]['open'] == 0
              ? 0
              : (this.LiteTicker.period * 100) / params[1]['open']
        }
      } else if (method === 'depth.update') {
        this.updateLiteOrderBook(params)
      } else if (method === 'asset.update') {
        const { BaseAsset, QuatoAsset } = this.getSymbolData
        const { $store } = this
        const balances = Object.entries(params[0])
        balances.forEach(([asset, details]) => {
          if (asset === BaseAsset) {
            $store.commit('symbol/updateBaseBalance', details.available)
          }
          if (asset === QuatoAsset) {
            $store.commit('symbol/updateQuatoBalance', details.available)
          }
        })
      }
    },

    updateLiteOrderBook(params) {
      if (params[0]) {
        this.LiteTransactions = params[1]
        this.LiteTransactions.asks = this.LiteTransactions.asks.sort(
          ([price1, amount1], [price2, amount2]) => price1 - price2
        )
      } else {
        if (Object.keys(params[1]).includes('asks')) {
          let asks = params[1]['asks']
          asks.forEach(([oldAsk, newAsk]) => {
            if (newAsk === '0') {
              this.LiteTransactions.asks = this.LiteTransactions.asks.filter(
                ([oldval, newval]) => oldval !== oldAsk
              )
            } else {
              const index = this.LiteTransactions.asks.findIndex(
                ([oldval, newval]) => oldval === oldAsk
              )
              if (index === -1) {
                this.LiteTransactions.asks.unshift([oldAsk, newAsk])

                // sorting asks by price
                this.LiteTransactions.asks = this.LiteTransactions.asks.sort(
                  ([price1, amount1], [price2, amount2]) => price1 - price2
                )
              } else {
                this.$set(this.LiteTransactions.asks, index, [oldAsk, newAsk])
              }
            }
          })
        }
        if (Object.keys(params[1]).includes('bids')) {
          let bids = params[1]['bids']

          bids.forEach(([oldBid, newBid]) => {
            if (newBid === '0') {
              this.LiteTransactions.bids = this.LiteTransactions.bids.filter(
                ([oldval, newval]) => oldval !== oldBid
              )
            } else {
              const index = this.LiteTransactions.bids.findIndex(
                ([oldval, newval]) => oldval === oldBid
              )
              if (index === -1) {
                this.LiteTransactions.bids.unshift([oldBid, newBid])
                // sorting bids by price
                this.LiteTransactions.bids = this.LiteTransactions.bids.sort(
                  ([price1, amount1], [price2, amount2]) => price2 - price1
                )
              } else {
                this.$set(this.LiteTransactions.bids, index, [oldBid, newBid])
              }
            }
          })
        }
      }
    },
  },

  watch: {
    getSymbolData(newVal, oldVal) {
      this.$nuxt.$loading.start()
      if (this.LiteWsCon) this.LiteWsCon.close()
      const { BaseAsset, QuatoAsset } = this.getSymbolData
      const { path } = this.localeRoute(
        '/trade/lite/' + BaseAsset.toString().concat('_', QuatoAsset.toString())
      )
      window.history.pushState({}, null, path)

      this.LiteTicker = {}

      if (this.isLoggedIn) {
        this.getListenKey()
      }
      this.setupLiteWs()

      this.$nextTick(() => {
        this.$nuxt.$loading.finish()
      })
    },
  },
}
</script>

<style scoped>
#fiat-trade-lite-page {
  position: relative;
  min-height: 90vh;
  z-index: 1;
  padding: 39.4px 0 0;
  background-image: url('../../../assets/images/common/Arkaplan.png'),
    linear-gradient(181deg, #000000, #080a10, #1b2034, #20273e);
  background-size: contain;
}
.lite-page-row {
  margin-bottom: 50px;
}
.lite-page-row:last-child {
  margin-bottom: 0px;
}
.lite-active-asset {
  font-family: 'Roboto-Light';
  font-size: 53px;
  color: #ffffff;
}
.lite-list-heading {
  font-family: 'Roboto-Medium';
  font-size: 18px;
  text-align: left;
  color: #ffffff;
}
.lite-list {
  padding: 0;
  list-style-type: none;
  font-family: 'Roboto-Regular';
  font-size: 12px;
  text-align: left;
  color: #ffffff;
}
.lite-list li {
  margin-bottom: 5px;
}
.lite-list-wrapper {
  margin: auto;
  width: 80%;
}
</style>
