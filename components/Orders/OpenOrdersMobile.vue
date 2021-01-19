<template>
  <div class="order-page-content-container">
    <div class="ordr-page-content-header">
      <h1 class="Roboto-Regular">{{ $t('text_open_orders') }}</h1>
    </div>
    <a-card
      class="bs-tab-card border-none"
      :bordered="false"
      :tabList="tabList"
      style="margin-bottom: 50px"
      :active-tab-key="activeKey"
      @tabChange="(key) => (activeKey = key)"
    >
      <span
        slot="titleSlot"
        slot-scope="item"
        class="Roboto-Regular"
        :class="{
          'tab-label-active': item.key === activeKey,
          'tab-label-inactive': item.key !== activeKey,
        }"
      >
        <span v-if="item.key === 'CRYPTO'">Kripto Cüzdan</span>
        <span v-if="item.key === 'TL'">TL Cüzdan</span>
      </span>
    </a-card>
    <div v-if="activeKey === 'CRYPTO'">
      <div v-if="isLoadingOpenOrders">
        <a-icon type="sync" spin />
      </div>
      <div
        v-if="OpenOrdersData.length === 0"
        class="d-flex"
        style="justify-content: center"
      >
        <img src="~/assets/images/NotFound.svg" alt="" />
      </div>
      <template v-else v-for="(item, index) in OpenOrdersData">
        <div :class="['mobile-dataDisplay', { 'bg-blue': visible === index }]">
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_date') }}</span>
            <span class="data">{{ item.Time }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_symbol') }}</span>
            <span class="data">{{ item.Symbol }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_side') }}</span>
            <span class="data">{{ item.Side }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_price') }}</span>
            <span class="data">{{ item.Price }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_quantity') }}</span>
            <span class="data">{{ item.BaseQuantity }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_executed_quantity') }}</span>
            <span class="data">{{ item.ExecutedBaseQuantity }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_total') }}</span>
            <span class="data">{{ item.QuatoQuantity }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_executed_total') }}</span>
            <span class="data">{{ item.ExecutedQuatoQuantity }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_stop_price') }}</span>
            <span class="data">{{ item.StopPrice }}</span>
          </div>
          <a-button
            class="text-danger Roboto-Medium"
            @click="cancelOrder(item, 'TL', 'CRYPTO')"
            shape="round"
            >{{ $t('text_cancel') }}</a-button
          >
        </div>

        <div v-if="index === visible">
          <div class="total-amount bg-blue">
            {{ $t('orders_text_buy_sell_total') }}:
            {{ item.ExecutedQuatoQuantity }} {{ item.QuatoAsset }}
          </div>
          <div
            class="mobile-dataDisplay bg-blue"
            v-for="trade in item.TradeList"
          >
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_date') }}</span>
              <span class="data">{{ trade.Time }}</span>
            </div>
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_symbol') }}</span>
              <span class="data">{{ trade.CommissionAsset }}</span>
            </div>
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_quantity') }}</span>
              <span class="data">{{ trade.Qty }}</span>
            </div>
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_price') }}</span>
              <span class="data">{{ trade.Price }}</span>
            </div>

            <div class="data-grid">
              <span class="label">{{ $t('orders_text_total') }}</span>
              <span class="data">{{ trade.Qty * trade.Price }}</span>
            </div>
          </div>
        </div>
      </template>

      <a-pagination
        v-model="OrderHistoryPagination.current"
        :defaultPageSize="OrderHistoryPagination.pageSize"
        :total="OrderHistoryPagination.total"
      />
    </div>
    <div v-if="activeKey === 'TL'">
      <div v-if="isLoadingOpenOrdersTL">
        <a-icon type="sync" spin />
      </div>
      <div
        v-if="OpenOrdersDataTL.length === 0"
        class="d-flex"
        style="justify-content: center"
      >
        <img src="~/assets/images/NotFound.svg" alt="" />
      </div>
      <template v-else v-for="(item, index) in OpenOrdersDataTL">
        <div :class="['mobile-dataDisplay', { 'bg-blue': visible === index }]">
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_date') }}</span>
            <span class="data">{{ item.Time }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_symbol') }}</span>
            <span class="data">{{ item.Symbol }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_side') }}</span>
            <span class="data">{{ item.Side }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_price') }}</span>
            <span class="data">{{ item.Price }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_quantity') }}</span>
            <span class="data">{{ item.BaseQuantity }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_executed_quantity') }}</span>
            <span class="data">{{ item.ExecutedBaseQuantity }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_total') }}</span>
            <span class="data">{{ item.QuatoQuantity }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_executed_total') }}</span>
            <span class="data">{{ item.ExecutedQuatoQuantity }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_stop_price') }}</span>
            <span class="data">{{ item.StopPrice }}</span>
          </div>
          <a-button
            class="text-danger Roboto-Medium"
            @click="cancelOrder(item, 'TL')"
            shape="round"
            >{{ $t('text_cancel') }}</a-button
          >
        </div>

        <div v-if="index === visible">
          <div class="total-amount bg-blue">
            {{ $t('orders_text_buy_sell_total') }}:
            {{ item.ExecutedQuatoQuantity }} {{ item.QuatoAsset }}
          </div>
          <div
            class="mobile-dataDisplay bg-blue"
            v-for="trade in item.TradeList"
          >
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_date') }}</span>
              <span class="data">{{ trade.Time }}</span>
            </div>
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_symbol') }}</span>
              <span class="data">{{ trade.CommissionAsset }}</span>
            </div>
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_quantity') }}</span>
              <span class="data">{{ trade.Qty }}</span>
            </div>
            <div class="data-grid">
              <span class="label">{{ $t('orders_text_price') }}</span>
              <span class="data">{{ trade.Price }}</span>
            </div>

            <div class="data-grid">
              <span class="label">{{ $t('orders_text_total') }}</span>
              <span class="data">{{ trade.Qty * trade.Price }}</span>
            </div>
          </div>
        </div>
      </template>

      <a-pagination
        v-model="OrderHistoryPaginationTL.current"
        :defaultPageSize="OrderHistoryPaginationTL.pageSize"
        :total="OrderHistoryPaginationTL.total"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tabList: [
        { key: 'CRYPTO', scopedSlots: { tab: 'titleSlot' } },
        { key: 'TL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'CRYPTO',

      OpenOrdersData: [],
      OpenOrdersDataTL: [],

      orderHistoryExpandedRowKeys: [],
      orderHistoryExpandedRowKeysTL: [],
      OrderHistoryPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },
      OrderHistoryPaginationTL: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },

      OrderHistoryFilters: {
        From: undefined,
        To: undefined,
        Symbol: undefined,
        OrderType: undefined,
      },

      OrderHistoryFiltersTL: {
        From: undefined,
        To: undefined,
        Symbol: undefined,
        OrderType: undefined,
      },
      Filters: {
        OrderTypes: [],
        SymbolsFilters: [],
      },
      FiltersTL: {
        OrderTypes: [],
        SymbolsFilters: [],
      },
      isLoadingOpenOrders: false,
      isLoadingOrderHistory: false,
      isLoadingOrderHistoryTL: false,
      visible: null,
      visibleTL: null,
    }
  },
  mounted() {
    this.getOpenOrders()
    this.getOpenOrdersTL()
  },
  methods: {
    async getOpenOrders() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingOpenOrders = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOpenOrdersCrypto',
        {
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { OpenOrdersList } = response.data
        this.OpenOrdersData = OpenOrdersList
        this.isLoadingOpenOrders = false
      }
    },
    async getOpenOrdersTL() {
      this.isLoadingOpenOrdersTL = true
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }

      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOpenOrdersTRY',
        {
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { OpenOrdersList } = response.data
        this.OpenOrdersDataTL = OpenOrdersList
        this.isLoadingOpenOrdersTL = false
      }
    },
    async cancelOrder(record, type) {
      const { Symbol, OrderID } = record
      let {
        $axios,
        $config: { FINANCE_API_URL },
        $cookies,
      } = this
      let token = $cookies.get('Token')

      const response = await $axios({
        method: 'delete',
        url: FINANCE_API_URL + '/CancelOrder',
        data: {
          symbol: Symbol,
          orderId: OrderID,
        },
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      if (response.data.Success) {
        if (response.data.Success) {
          if (type === 'CRYPTO') {
            this.getOpenOrders()
          }
          if (type === 'TL') {
            this.getOpenOrdersTL()
          }
        }
      }
    },
  },
  computed: {
    isOrderHistoryFiltered() {
      return (
        !!this.OrderHistoryFilters.From ||
        !!this.OrderHistoryFilters.To ||
        !!this.OrderHistoryFilters.OrderType ||
        !!this.OrderHistoryFilters.Symbol
      )
    },
  },
  filters: {
    dateFormat(val) {
      return moment(val).format('yyy-mm-DD hh:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttons {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

.collapse {
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
  .arrow {
    cursor: pointer;
    &.rotate {
      transform: rotate(180deg);
    }
  }
}

.mobile-dataDisplay {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0;
  font-size: 14px;
  .data {
    max-width: 75%;
    &_overflow {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .ant-tag {
    margin-right: 0;
  }
  .data-grid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3px;

    .label {
      font-family: Roboto-Bold;
    }
  }
}

.total-amount {
  height: 50px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.bg-blue {
  background-color: #f0fdff;
}
</style>
