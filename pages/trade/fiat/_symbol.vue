<template>
  <div class="trade-fiat-container">
    <a-spin :spinning="pageLoader">
      <FiatTicker @openSymbolDrawer="drawer = true" :statistics="fiatTicker" />
      <a-row
        id="trade-form-row"
        type="flex"
        align="stretch"
        justify="center"
        style="margin: 0"
        :gutter="[12, 12]"
      >
        <a-col :xs="24" :sm="24" :md="6">
          <FiatTradeForm />
        </a-col>
        <a-col :xs="12" :sm="12" :md="6">
          <FiatOrderBook :Transactions="fiatTransactions.bids" Type="BUY" />
        </a-col>
        <a-col :xs="12" :sm="12" :md="6">
          <FiatOrderBook :Transactions="fiatTransactions.asks" Type="SELL" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="6">
          <a-row type="flex" align="middle" justify="center" :gutter="[12, 12]">
            <a-col :xs="24" :sm="24" :md="24">
              <FiatSymbolList v-if="!isMobile" />
            </a-col>
            <a-col :xs="24" :sm="24" :md="24">
              <FiatTransferList v-if="isLoggedIn" :UserBalance="UserBalance" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <FiatOrderTabs
            :OpenOrders="openOrdersList"
            :LastOrders="ordersLast24Hour"
            :is-loading="isOpenOrdersLoading"
            @cancelOpenOrder="cancelOrder"
            @cancelAllOpenOrder="cancelAllOrder"
          />
        </a-col>
      </a-row>
      <a-drawer
        v-if="drawer"
        placement="top"
        :get-container="false"
        :closable="true"
        @close="drawer = false"
        :visible="drawer"
        :mask-style="{ backgroundColor: 'rgb( 22 ,28 ,41)' }"
        :drawer-style="{ backgroundColor: 'rgb( 22 ,28 ,41)' }"
      >
        <FiatSymbolList @SymbolSelect="drawer = false" />
      </a-drawer>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import formatter from '~/Mixins/formatter'

export default {
  mixins: [formatter],
  head() {
    const { getSymbolData } = this
    if (this.fiatTicker.last) {
      return {
        title:
          this.formatAll(this.fiatTicker.last, 'PRICE') +
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
      fiatTicker: {},
      fiatWsCon: null,
      FiatWalletListenKey: null,
      fiatTransactions: {
        bids: [],
        asks: [],
      },
      lastTransactionsData: [],
      openOrdersList: [],
      ordersLast24Hour: [],
      UserBalance: [],
      drawer: false,
      isMobile: false,
      isOpenOrdersLoading: false,
      pageLoader: false,
    }
  },
  async asyncData({
    app,
    $axios,
    store,
    redirect,
    $config: { FINANCE_API_URL },
    params,
    $cookies,
  }) {
    if (!params.symbol) {
      redirect(app.localeRoute('/trade/fiat/BTC_TRY'))
    } else {
      if (params.symbol.indexOf('_') === -1) {
        redirect(app.localeRoute('/trade/fiat/BTC_TRY'))
      } else {
        if (params.symbol.split('_')[1] !== 'TRY') {
          redirect(app.localeRoute('/trade/fiat/BTC_TRY'))
        }
      }
    }
    try {
      let symbolresponse
      let balanceresponse
      const token = $cookies.get('Token')
      if (!!token) {
        let authHeaders = { Authorization: 'Bearer ' + token }
        symbolresponse = await $axios.get(FINANCE_API_URL + '/GetSymbols', {
          headers: authHeaders,
        })
        balanceresponse = await $axios.get(
          FINANCE_API_URL + '/GetUserBalance',
          {
            headers: authHeaders,
          }
        )
      } else {
        symbolresponse = await $axios.get(FINANCE_API_URL + '/GetSymbols')
      }
      store.commit('symbol/updateList', symbolresponse.data.SymbolList)
      store.dispatch('symbol/updateData', params.symbol.split('_'))

      if (!store.state.symbol.data) {
        throw new Error('symbol data not found')
      }
      const { Symbol } = store.state.symbol.data
      // Get last Orders
      const lastTrades = await $axios.get(FINANCE_API_URL + '/GetLastTrades', {
        params: {
          Symbol: Symbol,
        },
      })
      const { Trades } = lastTrades.data
      if (!!token) {
        let authHeaders = { Authorization: 'Bearer ' + token }
        // Get Open Orders
        const openOrdersResponse = await $axios.get(
          FINANCE_API_URL + '/GetOpenOrdersTRY',
          {
            headers: authHeaders,
          }
        )
        // Get 24 Hours Orders
        const _24HOrdersResponse = await $axios.get(
          FINANCE_API_URL + '/Get24HOrdersTRY',
          {
            headers: authHeaders,
          }
        )

        if (
          openOrdersResponse.data.Success &&
          _24HOrdersResponse.data.Success
        ) {
          const { OpenOrdersList } = openOrdersResponse.data
          const { OrderList } = _24HOrdersResponse.data
          const { Trades } = lastTrades.data
          const { UserFiatBalance } = balanceresponse.data
          return {
            openOrdersList: OpenOrdersList,
            ordersLast24Hour: OrderList,
            lastTransactionsData: Trades,
            UserBalance: UserFiatBalance,
          }
        }
      } else {
        return {
          lastTransactionsData: Trades,
          UserBalance: [],
        }
      }
    } catch (e) {
      if ('response' in e) {
        console.error(e.response)
      } else {
        console.error(e)
      }
    }
  },
  created() {
    if (process.client) {
      const {
        $cookies,
        $store,
        $axios,
        $config: { FINANCE_API_URL },
      } = this
      if (this.isLoggedIn) {
        this.getListenKey()
      }
      // create fiat websocket connection
      if (this.fiatWsCon) this.fiatWsCon.close()
      this.setupFiatWS()
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  beforeDestroy() {
    // close fiatsocket connection
    if (this.fiatWsCon.readyState < 2) {
      this.fiatWsCon.close()
    }
  },

  methods: {
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
    setupFiatWS() {
      this.fiatWsCon = new WebSocket(this.$config.FIAT_WALLET_SOCKET_URL)

      const { Symbol } = this.getSymbolData

      this.fiatWsCon.onopen = () => {
        this.startFiatPing()

        this.fiatWsCon.send(
          JSON.stringify({
            method: 'state.subscribe',
            params: ['BTCTRY', 'ETHTRY', 'XRPTRY', 'USDTTRY'],
            id: 101,
          })
        )
        this.fiatWsCon.send(
          JSON.stringify({
            method: 'depth.subscribe',
            params: [Symbol, 20, '0'],
            id: 102,
          })
        )
        // this.fiatWsCon.send(
        //   JSON.stringify({
        //     method: 'deals.subscribe',
        //     params: [Symbol],
        //     id: 103,
        //   })
        // )
      }
      // listen to stream
      this.fiatWsCon.onmessage = this.updateFiatStream
    },
    startFiatPing() {
      var FiatInterval = setInterval(() => {
        if (this.fiatWsCon) {
          this.fiatWsCon.send(
            JSON.stringify({
              method: 'server.ping',
              params: [],
              id: 111,
            })
          )
        } else {
          clearInterval(FiatInterval)
        }
      }, 60000)
    },
    updateFiatStream(stream) {
      if (this.isLoggedIn && this.FiatWalletListenKey !== null) {
        this.fiatWsCon.send(
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
        this.fiatWsCon.send(
          JSON.stringify({
            method: 'order.subscribe',
            params: ['BTCTRY', 'ETHTRY', 'XRPTRY', 'USDTTRY'],
            id: 110,
          })
        )
        this.fiatWsCon.send(
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
          this.fiatTicker = params[1]
          params[1]['volume'] = params[1]['deal']
          this.fiatTicker.period = params[1]['close'] - params[1]['open']
          this.fiatTicker.P =
            params[1]['open'] == 0
              ? 0
              : (this.fiatTicker.period * 100) / params[1]['open']
        }
      } else if (method === 'depth.update') {
        this.updateFiatOrderBook(params)
      } else if (method === 'deals.update') {
        if (Array.isArray(params[1])) {
          if (!this.isFirstDealsResponse) {
            let dealsUpdate = params[1]
            dealsUpdate.forEach((deal) => {
              this.lastTransactionsData.unshift({
                Time: deal.time,
                Qty: deal.amount,
                Price: deal.price,
                IsBuyerMaker: deal.type,
              })
              this.lastTransactionsData.pop()
            })

            this.lastTransactionsData = this.lastTransactionsData.sort((a, b) =>
              moment(a.Time).isBefore(b.Time) ? 1 : -1
            )
          }
        } else {
          let dealUpdate = {
            Time: params[1]['time'],
            Qty: params[1]['amount'],
            Price: params[1]['price'],
            IsBuyerMaker: params[1]['type'],
          }
          this.lastTransactionsData.unshift(dealUpdate)
          this.lastTransactionsData.pop()
          this.lastTransactionsData = this.lastTransactionsData.sort((a, b) =>
            moment(a.Time).isBefore(b.Time) ? 1 : -1
          )
        }
        this.isFirstDealsResponse = false
      } else if (method === 'order.update') {
        this.updateOpenOrder(params)
      } else if (method === 'asset.update') {
        this.getUserBalance()
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
    updateOpenOrder(params) {
      const code = params[0]
      const data = params[1]

      const index = this.openOrdersList.findIndex(
        (order) => order.OrderID == data.id
      )

      let type
      if (data.type === 1) {
        type = 'LIMIT'
      }
      if (data.type === 2) {
        type = 'MARKET'
      }
      let side
      if (data.side === 1) {
        side = 'SELL'
      }
      if (data.side === 2) {
        side = 'BUY'
      }

      const order = {
        OrderID: data.id,
        Time: Math.trunc(data.ctime * 1000),
        Symbol: data.market,
        Type: type,
        Side: side,
        Price: data.price,
        BaseQuantity: data.amount,
        ExecutedBaseQuantity: data.deal_stock,
        ExecutedQuatoQuantity: data.deal_money,
        Status:
          data.deal_stock == 0
            ? 'NEW'
            : data.deal_stock == data.amount
            ? 'FILLED'
            : 'PARTIALLY_FILLED',
      }
      if (index !== -1) {
        //update
        if (code === 2) {
          this.$set(this.openOrdersList, index, order)
          //this.openOrdersList[index] = order
          //this.openOrdersList.push()
        }
        // finish
        if (code === 3) {
          if (order.ExecutedBaseQuantity == 0) {
            order.Status = 'CANCELED'
          }
          this.$delete(this.openOrdersList, index)
          this.ordersLast24Hour.unshift(order)
        }
      } else {
        if (code == 1 || code == 2) {
          this.openOrdersList.unshift(order)
        } else if (code == 3) {
          if (order.ExecutedBaseQuantity == 0) {
            order.Status = 'CANCELED'
          }
          this.ordersLast24Hour.unshift(order)
        }
      }
    },
    updateFiatOrderBook(params) {
      if (params[0]) {
        this.fiatTransactions = params[1]
        this.fiatTransactions.asks = this.fiatTransactions.asks.sort(
          ([price1, amount1], [price2, amount2]) => price1 - price2
        )
      } else {
        if (Object.keys(params[1]).includes('asks')) {
          let asks = params[1]['asks']
          asks.forEach(([oldAsk, newAsk]) => {
            if (newAsk === '0') {
              this.fiatTransactions.asks = this.fiatTransactions.asks.filter(
                ([oldval, newval]) => oldval !== oldAsk
              )
            } else {
              const index = this.fiatTransactions.asks.findIndex(
                ([oldval, newval]) => oldval === oldAsk
              )
              if (index === -1) {
                this.fiatTransactions.asks.unshift([oldAsk, newAsk])

                // sorting asks by price
                this.fiatTransactions.asks = this.fiatTransactions.asks.sort(
                  ([price1, amount1], [price2, amount2]) => price1 - price2
                )
              } else {
                this.$set(this.fiatTransactions.asks, index, [oldAsk, newAsk])
              }
            }
          })
        }
        if (Object.keys(params[1]).includes('bids')) {
          let bids = params[1]['bids']

          bids.forEach(([oldBid, newBid]) => {
            if (newBid === '0') {
              this.fiatTransactions.bids = this.fiatTransactions.bids.filter(
                ([oldval, newval]) => oldval !== oldBid
              )
            } else {
              const index = this.fiatTransactions.bids.findIndex(
                ([oldval, newval]) => oldval === oldBid
              )
              if (index === -1) {
                this.fiatTransactions.bids.unshift([oldBid, newBid])
                // sorting bids by price
                this.fiatTransactions.bids = this.fiatTransactions.bids.sort(
                  ([price1, amount1], [price2, amount2]) => price2 - price1
                )
              } else {
                this.$set(this.fiatTransactions.bids, index, [oldBid, newBid])
              }
            }
          })
        }
      }
    },

    async cancelOrder(order) {
      // api requesst to cancel order
      let {
        $axios,
        $config: { FINANCE_API_URL },
        $cookies,
      } = this
      let token = $cookies.get('Token')
      this.isOpenOrdersLoading = true
      try {
        const response = await $axios({
          method: 'delete',
          url: FINANCE_API_URL + '/CancelOrder',
          data: {
            Symbol: order.Symbol,
            OrderId: order.OrderID,
          },
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        this.isOpenOrdersLoading = false
        if (response.data.Success) {
          this.getOpenOrders()
        }
      } catch (e) {
        console.error('Failed !', e)
        this.isOpenOrdersLoading = false
      }
    },

    async cancelAllOrder() {
      // api requesst to cancel All order
      let {
        $axios,
        $config: { FINANCE_API_URL },
        $cookies,
      } = this
      let token = $cookies.get('Token')
      this.isOpenOrdersLoading = true
      try {
        const response = await $axios({
          method: 'delete',
          url: FINANCE_API_URL + '/CancelAllOrdersTRY',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        this.isOpenOrdersLoading = false
        if (response.data.Success) {
          this.$notification['success']({
            message: 'Success',
          })
          this.getOpenOrders()
        }
      } catch (e) {
        this.$notification['error']({
          message: 'Error',
        })
        console.error('Failed !', e)
        this.isOpenOrdersLoading = false
      } finally {
        this.isOpenOrdersLoading = false
      }
    },

    async getOpenOrders() {
      try {
        const {
          $axios,
          $cookies,
          $config: { FINANCE_API_URL },
        } = this
        let token = $cookies.get('Token')
        let authHeaders = { Authorization: 'Bearer ' + token }
        this.isOpenOrdersLoading = true
        const response = await $axios.get(
          FINANCE_API_URL + '/GetOpenOrdersTRY',
          {
            headers: authHeaders,
          }
        )
        if (response.data.Success) {
          const { OpenOrdersList } = response.data
          this.openOrdersList = OpenOrdersList
        }
        this.isOpenOrdersLoading = false
      } catch (e) {
        this.$notification['error']({
          message: 'Error',
        })
      } finally {
        this.isOpenOrdersLoading = false
      }
    },

    async getUserBalance() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetUserBalance', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { UserFiatBalance } = response.data
        this.UserBalance = UserFiatBalance
      }
    },
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
      getTheme: 'common/getTheme',
    }),
    isLoggedIn: {
      get() {
        let token = this.$cookies.get('Token')
        return !!token ? true : false
      },
      cache: false,
    },
  },
  watch: {
    getSymbolData(newVal, oldVal) {
      this.pageLoader = true
      if (this.fiatWsCon) this.fiatWsCon.close()
      const { BaseAsset, QuatoAsset } = this.getSymbolData
      let prefix = this.$cookies.get('i18n_redirected')
      window.history.pushState(
        {},
        null,
        '/' +
          prefix +
          '/trade/fiat/' +
          BaseAsset.toString().concat('_', QuatoAsset.toString())
      )

      // reset all data
      this.lastTransactionsData = []
      this.fiatTransactions = {}
      this.fiatTicker = {}

      const { $cookies, $store } = this
      if (this.isLoggedIn) {
        this.getListenKey()
      }

      this.setupFiatWS()

      const { Symbol } = this.getSymbolData
      const {
        $axios,
        $config: { FINANCE_API_URL },
      } = this
      $axios
        .get(FINANCE_API_URL + '/GetLastTrades', {
          params: {
            Symbol,
          },
        })
        .then((response) => {
          const { Trades } = response.data
          this.lastTransactionsData = Trades
          this.$nextTick(() => {
            this.pageLoader = false
          })
        })
        .catch((e) => {})
        .finally(() => {
          this.pageLoader = false
        })
    },
  },
}
</script>

<style scoped>
.trade-fiat-container {
  background-color: #161c29;
  min-height: 90vh;
}
#trade-form-row {
  max-width: 1800px;
  padding: 20px 39px 20px 52px;
}

@media screen and (max-width: 1000px) {
  #trade-form-row {
    padding: 12px 4px 12px 4px;
  }
}
</style>
