<template>
  <div class="order-page-content-container">
    <div class="ordr-page-content-header">
      <h1 class="Roboto-Regular">{{ $t('text_orderhistory') }}</h1>
    </div>
    <div class="order-page-content-wrapper h-100 w-100">
      <a-card
        class="bs-tab-card border-none"
        :bordered="false"
        :tabList="tabList"
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
          <span v-if="item.key === 'CRYPTO'"> Kripto Cüzdan </span>
          <span v-if="item.key === 'TL'">TL Cüzdan</span>
        </span>
      </a-card>
      <a-card
        class="cointral-card order-filter-card border-none"
        :bordered="false"
      >
        <a-row v-if="activeKey === 'CRYPTO'" :gutter="16">
          <a-col :span="5">
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
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="OrderHistoryFilters.OrderType"
              v-bind:placeholder="$t('placeholders_text_type')"
              class="Roboto-Regular"
              size="large"
              style="width: 100%"
            >
              <a-select-option value>
                {{ $t('history_transfer_list_all') }}
              </a-select-option>
              <a-select-option
                v-for="ot in Filters.OrderTypes"
                :key="ot.Key"
                :value="ot.Key"
                >{{ ot.Name }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="OrderHistoryFilters.Symbol"
              size="large"
              placeholder="Sembol"
              class="Roboto-Regular"
              style="width: 100%"
            >
              <a-select-option value>
                {{ $t('history_transfer_list_all') }}
              </a-select-option>
              <a-select-option
                v-for="ot in Filters.SymbolFilters"
                :key="ot.Key"
                :value="ot.Key"
                >{{ ot.Name }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="9">
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
          </a-col>
        </a-row>
        <a-row v-if="activeKey === 'TL'" :gutter="16">
          <a-col :span="5">
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
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="OrderHistoryFiltersTL.OrderType"
              v-bind:placeholder="$t('placeholders_text_type')"
              class="Roboto-Regular"
              size="large"
              style="width: 100%"
            >
              <a-select-option value>
                {{ $t('history_transfer_list_all') }}
              </a-select-option>
              <a-select-option
                v-for="ot in FiltersTL.OrderTypes"
                :key="ot.Key"
                :value="ot.Key"
                >{{ ot.Name }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="OrderHistoryFiltersTL.Symbol"
              size="large"
              placeholder="Sembol"
              class="Roboto-Regular"
              style="width: 100%"
            >
              <a-select-option value>
                {{ $t('history_transfer_list_all') }}
              </a-select-option>
              <a-select-option
                v-for="ot in FiltersTL.SymbolFilters"
                :key="ot.Key"
                :value="ot.Key"
                >{{ ot.Name }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="9">
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
          </a-col>
        </a-row>
      </a-card>
      <a-card
        class="cointral-card order-table-card border-none"
        :bordered="false"
      >
        <a-table
          v-if="activeKey === 'CRYPTO'"
          id="order-history-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Medium', 'expanded-row']"
          :loading="isLoadingOrderHistory"
          :columns="OrderHistoryColumns"
          :data-source="OrderHistoryData"
          :rowKey="(record) => record.OrderId"
          :pagination="OrderHistoryPagination"
          @change="OrderHistoryTableChange"
          @expand="setExpandedRowKeys"
          :expandIconColumnIndex="OrderHistoryColumns.length - 1"
          :expandedRowKeys="orderHistoryExpandedRowKeys"
          :expandIconAsCell="false"
          :expandIcon="expandIcon"
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">
            {{ record.Time }}
          </div>
          <div slot="expandedRowRender" slot-scope="record">
            <h3 class="Roboto-Regular order-slot-calc">
              {{ $t('orders_text_buy_sell_total') }}:
              <span class="Roboto-Bold"
                >{{ calcToplam(record) }}&nbsp;{{ record.QuatoAsset }}</span
              >
            </h3>
            <a-table
              v-if="record.TradeList && record.TradeList.length > 0"
              class="Roboto-Medium"
              :rowClassName="() => ['Roboto-Regular']"
              :pagination="false"
              :columns="OrderHistoryInnerColumns"
              :data-source="record.TradeList"
              :rowKey="(record) => record.TradeId"
            >
              <span slot="Total" slot-scope="Total, record">
                {{ (record.Qty * record.Price).toFixed(8) }}
              </span>
            </a-table>
          </div>
        </a-table>
        <a-table
          v-if="activeKey === 'TL'"
          id="order-history-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Medium', 'expanded-row']"
          :loading="isLoadingOrderHistoryTL"
          :columns="OrderHistoryColumns"
          :data-source="OrderHistoryDataTL"
          :rowKey="(record) => record.OrderId"
          :pagination="OrderHistoryPaginationTL"
          @change="OrderHistoryTableChangeTL"
          @expand="setExpandedRowKeysTL"
          :expandIconColumnIndex="OrderHistoryColumns.length - 1"
          :expandedRowKeys="orderHistoryExpandedRowKeysTL"
          :expandIconAsCell="false"
          :expandIcon="expandIcon"
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">
            {{ record.Time }}
          </div>
          <div slot="expandedRowRender" slot-scope="record">
            <h3 class="Roboto-Regular order-slot-calc">
              {{ $t('orders_text_buy_sell_total') }}:
              <span class="Roboto-Bold"
                >{{ calcToplam(record) }}&nbsp;{{ record.QuatoAsset }}</span
              >
            </h3>
            <a-table
              v-if="record.TradeList && record.TradeList.length > 0"
              class="Roboto-Medium"
              :rowClassName="() => ['Roboto-Regular']"
              :pagination="false"
              :columns="OrderHistoryInnerColumns"
              :data-source="record.TradeList"
              :rowKey="(record) => record.TradeId"
            >
              <span slot="Total" slot-scope="Total, record">
                {{ (record.Qty * record.Price).toFixed(8) }}
              </span>
            </a-table>
          </div>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  head() {
    return {
      title: 'Spot Emir Geçmişi | Cointral.com',
    }
  },
  data() {
    return {
      tabList: [
        { key: 'CRYPTO', scopedSlots: { tab: 'titleSlot' } },
        { key: 'TL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'CRYPTO',

      OrderHistoryColumns: [
        {
          title: this.$t('history_date'),
          dataIndex: 'Time',
          key: 'Time',
        },
        {
          title: this.$t('history_symbol'),
          dataIndex: 'Symbol',
          key: 'Symbol',
        },
        {
          title: this.$t('history_status'),
          dataIndex: 'Status',
          key: 'Status',
        },
        { title: this.$t('history_price'), dataIndex: 'Price', key: 'Price' },
        { title: this.$t('history_amount'), dataIndex: 'Qty', key: 'Qty' },
        {
          title: this.$t('history_quote_qty'),
          dataIndex: 'QuoteQty',
          key: 'QuoteQty',
        },
        {
          title: this.$t('history_actual_qty'),
          dataIndex: 'ActualQty',
          key: 'ActualQty',
        },
        {
          title: this.$t('history_average_price'),
          dataIndex: 'AveragePrice',
          key: 'AveragePrice',
        },
        { title: this.$t('history_type'), dataIndex: 'Type', key: 'Type' },
        { title: this.$t('history_side'), dataIndex: 'Side', key: 'Side' },
        {
          title: this.$t('history_stop_limit'),
          dataIndex: 'StopPrice',
          key: 'StopPrice',
        },
        {
          title: '',
          dataIndex: 'Action',
          key: 'Action',
        },
      ],
      OrderHistoryInnerColumns: [
        {
          title: this.$t('history_date'),
          dataIndex: 'Time',
          key: 'Time',
        },
        {
          title: this.$t('history_price'),
          dataIndex: 'Price',
          key: 'Price',
        },
        {
          title: this.$t('history_amount'),
          dataIndex: 'Qty',
          key: 'Qty',
        },
        {
          title: this.$t('history_commission'),
          dataIndex: 'Commission',
          key: 'Commission',
        },
        {
          title: this.$t('history_commission_asset'),
          dataIndex: 'CommissionAsset',
          key: 'CommissionAsset',
        },
        {
          title: this.$t('history_total'),
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
        Symbol: '',
        OrderType: '',
      },
      OrderHistoryFiltersTL: {
        From: undefined,
        To: undefined,
        Symbol: '',
        OrderType: '',
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
    }
  },
  created() {
    this.getFilters()
    this.getOrderHistory()
    this.getOrderHistoryTL()
  },
  methods: {
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
      if (response.data.Success) {
        const { Orders, Max } = response.data
        this.OrderHistoryData = Orders
        this.OrderHistoryPagination.total = Max
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
      if (response.data.Success) {
        const { Orders, Max } = response.data
        this.OrderHistoryDataTL = Orders
        this.OrderHistoryPaginationTL.total = Max
        this.isLoadingOrderHistoryTL = false
      }
    },

    calcToplam(record) {
      const coef1 = parseFloat(record.ActualQty)
      const coef2 = parseFloat(record.AveragePrice)
      return (coef1 * coef2).toFixed(8)
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
      this.OrderHistoryPagination = pagination
      this.getOrderHistory()
    },
    OrderHistoryTableChangeTL(pagination) {
      this.OrderHistoryPaginationTL = pagination
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
    expandIcon(props) {
      const close = (
        <span>
          <svg
            id="Component_3_39"
            data-name="Component 3 – 39"
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="5"
            viewBox="0 0 7 4"
          >
            <path
              id="Polygon_5"
              data-name="Polygon 5"
              d="M3.5,0,7,4H0Z"
              transform="translate(7 4) rotate(180)"
              fill="#858e9d"
            />
          </svg>
        </span>
      )

      const open = (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="5"
            viewBox="0 0 7 4"
          >
            <g
              id="Component_24"
              data-name="Component 24"
              transform="translate(7 4) rotate(180)"
            >
              <path
                id="Polygon_5"
                data-name="Polygon 5"
                d="M3.5,0,7,4H0Z"
                transform="translate(7 4) rotate(180)"
                fill="#858e9d"
              />
            </g>
          </svg>
        </span>
      )

      const icon = props.expanded ? open : close

      return (
        <a
          class="expand-row-icon"
          onClick={(e) => props.onExpand(props.record, e)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {icon}
        </a>
      )
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

<style lang="less" scoped>
.tab-label-active {
  color: var(--active-tab-text-color);
}
.tab-label-inactive {
  color: var(--inactive-tab-text-color);
}
.order-breadcumb {
  margin-bottom: 50px;
}
.order-page-content-wrapper {
  display: flex;
  flex-direction: column;
}
.order-filter-card {
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px #0000000d;
}
.order-table-card {
  box-shadow: 0px 0px 3px #0000000f;
}
.order-slot-calc {
  margin: 20px auto;
  padding-left: 16px;
  font-size: 20px;
}
.Reset-Button {
  background-color: #f4f4f4;
  border: 0;
  color: #868f9e;
}
.momentFormattedTime {
  white-space: nowrap;
}
</style>
