<template>
  <div class="order-page-content-container">
    <div class="ordr-page-content-header">
      <h1 class="Roboto-Regular">{{ $t('text_orderhistory') }}</h1>
    </div>
    <div class="order-page-content-wrapper h-100 w-100">
      <a-card class="cointral-card order-filter-card border-none" :bordered="false">
        <a-row :gutter="16">
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
              <a-select-option value>{{ $t('text_select') }}</a-select-option>
              <a-select-option
                v-for="ot in Filters.OrderTypes"
                :key="ot.Key"
                :value="ot.Key"
              >{{ ot.Name }}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="OrderHistoryFilters.Symbol"
              size="large"
              v-bind:placeholder="$t('placeholders_text_symbol')"
              class="Roboto-Regular"
              style="width: 100%"
            >
              <a-select-option value>{{ $t('text_select') }}</a-select-option>
              <a-select-option
                v-for="ot in Filters.SymbolFilters"
                :key="ot.Key"
                :value="ot.Key"
              >{{ ot.Name }}</a-select-option>
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
            >{{ $t('text_filter') }}</a-button>
            <a-button
              class="Roboto-Medium Reset-Button"
              :disabled="!isOrderHistoryFiltered"
              size="large"
              style="width: 30%"
              @click="resetOrderHistoryFilters"
            >{{ $t('text_reset') }}</a-button>
          </a-col>
        </a-row>
      </a-card>
      <a-card class="cointral-card order-table-card border-none" :bordered="false">
        <a-table
          id="order-history-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Regular', 'expanded-row']"
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
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">{{ record.Time}}</div>
          <div slot="expandedRowRender" slot-scope="record">
            <h3 class="Roboto-Regular order-slot-calc">
              {{ $t('orders_text_buy_sell_total') }}:
              <span
                class="Roboto-Bold"
              >{{ calcToplam(record) }}&nbsp;{{ record.QuatoAsset }}</span>
            </h3>
            <a-table
              class="Roboto-Medium"
              :rowClassName="() => ['Roboto-Regular']"
              :pagination="false"
              :columns="OrderHistoryInnerColumns"
              :data-source="record.TradeList"
              :rowKey="(record) => record.TradeId"
            >
              <span
                slot="Total"
                slot-scope="Total, record"
              >{{ (record.Qty * record.Price).toFixed(8) }}</span>
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
  data() {
    return {
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
          title: '',
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

      OrderHistoryFilters: {
        From: undefined,
        To: undefined,
        Symbol: '',
        OrderType: '',
      },
      Filters: {
        OrderTypes: [],
        SymbolsFilters: [],
      },
      isLoadingOrderHistory: false,
    }
  },
  created() {
    this.getFilters()
    this.getOrderHistory()
  },
  methods: {
    async getOrderHistory() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingOrderHistory = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOrderHistory',
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
      }
    },
    setOrderHistoryFilterTime(dateArray) {
      this.OrderHistoryFilters.From = moment(dateArray[0]).format()
      this.OrderHistoryFilters.To = moment(dateArray[1]).format()
    },
    resetOrderHistoryFilters() {
      Object.keys(this.OrderHistoryFilters).forEach((k) => {
        this.OrderHistoryFilters[k] = undefined
      })
      this.getOrderHistory()
    },
    OrderHistoryTableChange(pagination) {
      this.OrderHistoryPagination = pagination
      this.getOrderHistory()
    },
    setExpandedRowKeys(expanded, record) {
      if (expanded) {
        this.orderHistoryExpandedRowKeys = [record.OrderId]
      } else {
        this.orderHistoryExpandedRowKeys = []
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
