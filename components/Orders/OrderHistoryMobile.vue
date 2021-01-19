<template>
  <div class="order-page-content-container">
    <div class="ordr-page-content-header">
      <a-breadcrumb class="order-breadcumb Roboto-Regular">
        <a-breadcrumb-item>{{ $t('text_orders') }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('text_orderhistory') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="Roboto-Regular">{{ $t('text_orderhistory') }}</h1>
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
      <div class="search">
        <a-range-picker
          class="Roboto-Regular"
          :allowClear="false"
          :placeholder="[
            $t('placeholders_text_from_date'),
            $t('placeholders_text_to_date'),
          ]"
          size="large"
          :show-time="{ format: 'HH:mm' }"
          :value="[OrderHistoryFilters.From, OrderHistoryFilters.To]"
          format="YYYY-MM-DD HH:mm"
          @change="setOrderHistoryFilterTime"
          style="width: 100%"
        />
        <a-select
          v-model="OrderHistoryFilters.OrderType"
          v-bind:placeholder="$t('placeholders_text_type')"
          class="Roboto-Regular"
          size="large"
          style="width: 100%"
        >
          <a-select-option
            v-for="(ot, index) in Filters.OrderTypes"
            :key="ot.Key"
            :value="ot.Key"
          >
            {{ ot.Name }}</a-select-option
          >
        </a-select>
        <a-select
          v-model="OrderHistoryFilters.Symbol"
          size="large"
          placeholder="Sembol"
          class="Roboto-Regular"
          style="width: 100%"
        >
          <a-select-option
            v-for="(ot, index) in Filters.SymbolFilters"
            :key="ot.Key"
            :value="ot.Key"
          >
            {{ ot.Name }}</a-select-option
          >
        </a-select>
        <div class="buttons">
          <a-button
            class="Roboto-Medium"
            :disabled="!isOrderHistoryFiltered"
            size="large"
            type="primary"
            @click="getOrderHistory"
            style="width: 30%"
            >{{ $t('text_filter') }}</a-button
          >
          <a-button
            class="Roboto-Medium Reset-Button"
            :disabled="!isOrderHistoryFiltered"
            size="large"
            style="width: 30%"
            @click="resetOrderHistoryFilters"
            >{{ $t('text_reset') }}</a-button
          >
        </div>
      </div>
      <div v-if="isLoadingOrderHistory">
        <a-icon type="sync" spin />
      </div>
      <div
        v-if="OrderHistoryData.length === 0"
        class="d-flex"
        style="justify-content: center"
      >
        <img src="~/assets/images/NotFound.svg" alt="" />
      </div>
      <template v-else v-for="(item, index) in OrderHistoryData">
        <div
          class="mobile-dataDisplay"
          :class="{ 'bg-blue': visible === index }"
        >
          <div class="collapse">
            <img
              src="~/assets/images/collapseArrow.svg"
              :class="['arrow', { rotate: visible === index }]"
              @click="showModal(index)"
            />
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_date') }}</span>
            <span class="data">{{ item.Time }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_symbol') }}</span>
            <span class="data">{{ item.Symbol }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_total') }}</span>
            <span class="data">{{ item.QuoteQty }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_status') }}</span>
            <span class="data">{{ item.Status }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_type') }}</span>
            <span class="data">{{ item.Type }}</span>
          </div>
        </div>

        <div v-if="index === visible">
          <div class="total-amount bg-blue">
            {{ $t('orders_text_buy_sell_total') }}:
            <strong>{{ calcToplam(item) }} {{ item.QuatoAsset }}</strong>
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
          </div>
        </div>
      </template>

      <a-pagination
        v-model="OrderHistoryPagination.current"
        :defaultPageSize="OrderHistoryPagination.pageSize"
        :total="OrderHistoryPagination.total"
        @change="OrderHistoryTableChange"
      />
    </div>
    <div v-if="activeKey === 'TL'">
      <div class="search">
        <a-range-picker
          class="Roboto-Regular"
          :allowClear="false"
          :placeholder="[
            $t('placeholders_text_from_date'),
            $t('placeholders_text_to_date'),
          ]"
          size="large"
          :show-time="{ format: 'HH:mm' }"
          :value="[OrderHistoryFiltersTL.From, OrderHistoryFiltersTL.To]"
          format="YYYY-MM-DD HH:mm"
          @change="setOrderHistoryFilterTimeTL"
          style="width: 100%"
        />
        <a-select
          v-model="OrderHistoryFiltersTL.OrderType"
          v-bind:placeholder="$t('placeholders_text_type')"
          class="Roboto-Regular"
          size="large"
          style="width: 100%"
        >
          <a-select-option
            v-for="(ot, index) in FiltersTL.OrderTypes"
            :key="ot.Key"
            :value="ot.Key"
          >
            {{ ot.Name }}</a-select-option
          >
        </a-select>
        <a-select
          v-model="OrderHistoryFiltersTL.Symbol"
          size="large"
          placeholder="Sembol"
          class="Roboto-Regular"
          style="width: 100%"
        >
          <a-select-option
            v-for="(ot, index) in FiltersTL.SymbolFilters"
            :key="ot.Key"
            :value="ot.Key"
          >
            {{ ot.Name }}</a-select-option
          >
        </a-select>
        <div class="buttons">
          <a-button
            class="Roboto-Medium"
            :disabled="!isOrderHistoryFilteredTL"
            size="large"
            type="primary"
            @click="getOrderHistoryTL"
            style="width: 30%"
            >{{ $t('text_filter') }}</a-button
          >
          <a-button
            class="Roboto-Medium Reset-Button"
            :disabled="!isOrderHistoryFilteredTL"
            size="large"
            style="width: 30%"
            @click="resetOrderHistoryFiltersTL"
            >{{ $t('text_reset') }}</a-button
          >
        </div>
      </div>
      <div v-if="isLoadingOrderHistoryTL">
        <a-icon type="sync" spin />
      </div>
      <div
        v-if="OrderHistoryDataTL.length === 0"
        class="d-flex"
        style="justify-content: center"
      >
        <img src="~/assets/images/NotFound.svg" alt="" />
      </div>
      <template v-else v-for="(item, index) in OrderHistoryDataTL">
        <div
          class="mobile-dataDisplay"
          :class="{ 'bg-blue': visible === index }"
        >
          <div class="collapse">
            <img
              src="~/assets/images/collapseArrow.svg"
              :class="['arrow', { rotate: visible === index }]"
              @click="showModal(index)"
            />
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_date') }}</span>
            <span class="data">{{ item.Time }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_symbol') }}</span>
            <span class="data">{{ item.Symbol }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_total') }}</span>
            <span class="data">{{ item.QuoteQty }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('orders_text_status') }}</span>
            <span class="data">{{ item.Status }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('orders_text_type') }}</span>
            <span class="data">{{ item.Type }}</span>
          </div>
        </div>

        <div v-if="index === visible">
          <div class="total-amount bg-blue">
            {{ $t('orders_text_buy_sell_total') }}:
            <strong>{{ calcToplam(item) }} {{ item.QuatoAsset }}</strong>
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
          </div>
        </div>
      </template>

      <a-pagination
        v-model="OrderHistoryPaginationTL.current"
        :defaultPageSize="OrderHistoryPaginationTL.pageSize"
        :total="OrderHistoryPaginationTL.total"
        @change="OrderHistoryTableChangeTL"
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

      OrderHistoryColumns: [
        {
          title: 'Time',
          dataIndex: 'Time',
          key: 'Time',
          scopedSlots: { customRender: 'Time' },
        },
        {
          title: 'Symbol',
          dataIndex: 'Symbol',
          key: 'Symbol',
        },
        { title: 'Status', dataIndex: 'Status', key: 'Status' },
        { title: 'Price', dataIndex: 'Price', key: 'Price' },
        { title: 'Qty', dataIndex: 'Qty', key: 'Qty' },
        { title: 'QuoteQty', dataIndex: 'QuoteQty', key: 'QuoteQty' },
        { title: 'ActualQty', dataIndex: 'ActualQty', key: 'ActualQty' },
        {
          title: 'AveragePrice',
          dataIndex: 'AveragePrice',
          key: 'AveragePrice',
        },
        { title: 'Type', dataIndex: 'Type', key: 'Type' },
        { title: 'Side', dataIndex: 'Side', key: 'Side' },
        {
          title: 'StopPrice',
          dataIndex: 'StopPrice',
          key: 'StopPrice',
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          key: 'Action',
        },
      ],
      OrderHistoryInnerColumns: [
        {
          title: 'Time',
          dataIndex: 'Time',
          key: 'Time',
        },
        {
          title: 'Price',
          dataIndex: 'Price',
          key: 'Price',
        },
        {
          title: 'Qty',
          dataIndex: 'Qty',
          key: 'Qty',
        },
        {
          title: 'Commission',
          dataIndex: 'Commission',
          key: 'Commission',
        },
        {
          title: 'CommissionAsset',
          dataIndex: 'CommissionAsset',
          key: 'CommissionAsset',
        },
        {
          title: 'Total',
          dataIndex: 'Total',
          key: 'Total',
          scopedSlots: { customRender: 'Total' },
        },
      ],
      OrderHistoryData: [],
      orderHistoryExpandedRowKeys: [],
      OrderHistoryPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },
      OrderHistoryDataTL: [],
      orderHistoryExpandedRowKeysTL: [],
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
      isLoadingOrderHistory: false,
      isLoadingOrderHistoryTL: false,
      visible: null,
    }
  },
  mounted() {
    this.getFilters()
    this.getOrderHistory()
    this.getOrderHistoryTL()
  },
  methods: {
    showModal(i) {
      if (i === this.visible) {
        this.visible = null
      } else {
        this.visible = i
      }
    },

    async getOrderHistory() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingOrderHistory = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOrderHistoryCrypto',
        {
          params: {
            Offset:
              this.OrderHistoryPagination.current * 10 -
              this.OrderHistoryPagination.pageSize,
            RowSize: this.OrderHistoryPagination.pageSize,
            ...this.OrderHistoryFilters,
          },
          headers: authHeader,
        }
      )
      if (response.data) {
        this.OrderHistoryData = response.data.Orders
        this.OrderHistoryPagination.total = response.data.Max

        this.isLoadingOrderHistory = false
      }
    },
    async getOrderHistoryTL() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingOrderHistoryTL = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOrderHistoryTRY',
        {
          params: {
            Offset:
              this.OrderHistoryPaginationTL.current * 10 -
              this.OrderHistoryPaginationTL.pageSize,
            RowSize: this.OrderHistoryPaginationTL.pageSize,
            ...this.OrderHistoryFiltersTL,
          },
          headers: authHeader,
        }
      )
      if (response.data) {
        this.OrderHistoryDataTL = response.data.Orders
        this.OrderHistoryPaginationTL.total = response.data.Max

        this.isLoadingOrderHistoryTL = false
      }
    },

    async getFilters() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }

      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetFilters',
        {
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { SymbolFilters, OrderTypes } = response.data
        this.Filters = { SymbolFilters, OrderTypes }
        this.FiltersTL = { SymbolFilters, OrderTypes }
      }
    },
    setOrderHistoryFilterTime(dateArray) {
      this.OrderHistoryFilters.From = moment(dateArray[0]).format()
      this.OrderHistoryFilters.To = moment(dateArray[1]).format()
    },
    setOrderHistoryFilterTimeTL(dateArray) {
      this.OrderHistoryFiltersTL.From = moment(dateArray[0]).format()
      this.OrderHistoryFiltersTL.To = moment(dateArray[1]).format()
    },
    resetOrderHistoryFilters() {
      Object.keys(this.OrderHistoryFilters).forEach((k) => {
        this.OrderHistoryFilters[k] = undefined
      })
      this.getOrderHistory()
    },
    resetOrderHistoryFiltersTL() {
      Object.keys(this.OrderHistoryFiltersTL).forEach((k) => {
        this.OrderHistoryFiltersTL[k] = undefined
      })
      this.getOrderHistoryTL()
    },
    OrderHistoryTableChange(pagination) {
      this.OrderHistoryPagination.current = pagination

      this.getOrderHistory()
    },
    OrderHistoryTableChangeTL(pagination) {
      this.OrderHistoryPaginationTL.current = pagination

      this.getOrderHistoryTL()
    },
    setExpandedRowKeys(expanded, record) {
      if (expanded) {
        this.orderHistoryExpandedRowKeys = [record.OrderId]
      } else {
        this.orderHistoryExpandedRowKeys = []
      }
    },
    setExpandedRowKeysTL(expanded, record) {
      if (expanded) {
        this.orderHistoryExpandedRowKeysTL = [record.OrderId]
      } else {
        this.orderHistoryExpandedRowKeysTL = []
      }
    },
    calcToplam(record) {
      const coef1 = parseFloat(record.ActualQty)
      const coef2 = parseFloat(record.AveragePrice)
      return (coef1 * coef2).toFixed(8)
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
    isOrderHistoryFilteredTL() {
      return (
        !!this.OrderHistoryFiltersTL.From ||
        !!this.OrderHistoryFiltersTL.To ||
        !!this.OrderHistoryFiltersTL.OrderType ||
        !!this.OrderHistoryFiltersTL.Symbol
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
  @media (max-width: 1000px) {
    display: grid;
    grid-gap: 15px;
    .buttons {
      button,
      a {
        margin-right: 15px;
      }
    }
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
  padding: 10px;
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
  font-size: 17px;
}

.bg-blue {
  background-color: #f0fdff;
}
</style>
