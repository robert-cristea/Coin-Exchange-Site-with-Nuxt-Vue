<template>
  <div class="order-page-content-container">
    <div class="ordr-page-content-header">
      <h1 class="Roboto-Regular">{{ $t('text_tradehistory') }}</h1>
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
              :value="[TradeHistoryFilters.From, TradeHistoryFilters.To]"
              format="YYYY-MM-DD HH:mm"
              @change="setTradeHistoryFilterTime"
              style="width: 100%"
            />
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="TradeHistoryFilters.OrderType"
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
              v-model="TradeHistoryFilters.Symbol"
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
              :disabled="!isTradeHistoryFiltered"
              size="large"
              type="primary"
              @click="getTradeHistoryCrypto"
              style="width: 30%"
              >{{ $t('text_filter') }}</a-button
            >
            <a-button
              class="Roboto-Medium Reset-Button"
              :disabled="!isTradeHistoryFiltered"
              size="large"
              style="width: 30%"
              @click="resetTradeHistoryFilters"
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
              :value="[TradeHistoryFiltersTL.From, TradeHistoryFiltersTL.To]"
              format="YYYY-MM-DD HH:mm"
              @change="setTradeHistoryFilterTimeTL"
              style="width: 100%"
            />
          </a-col>
          <a-col :span="5">
            <a-select
              v-model="TradeHistoryFiltersTL.OrderType"
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
              v-model="TradeHistoryFiltersTL.Symbol"
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
              :disabled="!isTradeHistoryFilteredTL"
              size="large"
              type="primary"
              @click="getTradeHistoryTL"
              style="width: 30%"
              >{{ $t('text_filter') }}</a-button
            >
            <a-button
              class="Roboto-Medium Reset-Button"
              :disabled="!isTradeHistoryFilteredTL"
              size="large"
              style="width: 30%"
              @click="resetTradeHistoryFiltersTL"
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
          :columns="TradeHistoryColumns"
          :data-source="TradeHistoryData"
          :rowKey="(record) => record.OrderId"
          :pagination="TradeHistoryPagination"
          @change="OrderHistoryTableChange"
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">
            {{ record.Time }}
          </div>
        </a-table>
        <a-table
          v-if="activeKey === 'TL'"
          id="order-history-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Medium', 'expanded-row']"
          :loading="isLoadingOrderHistoryTL"
          :columns="TradeHistoryColumns"
          :data-source="TradeHistoryDataTL"
          :rowKey="(record) => record.OrderId"
          :pagination="TradeHistoryPaginationTL"
          @change="OrderHistoryTableChangeTL"
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">
            {{ record.Time }}
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
      title: 'Alım Satım Geçmişi | Cointral.com',
    }
  },
  data() {
    return {
      tabList: [
        { key: 'CRYPTO', scopedSlots: { tab: 'titleSlot' } },
        { key: 'TL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'CRYPTO',

      TradeHistoryColumns: [
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
        { title: this.$t('history_side'), dataIndex: 'Side', key: 'Side' },
        { title: this.$t('history_price'), dataIndex: 'Price', key: 'Price' },
        { title: this.$t('history_amount'), dataIndex: 'Qty', key: 'Qty' },
        {
          title: this.$t('history_quote_qty'),
          dataIndex: 'Commission',
          key: 'Commission',
        },
        {
          title: this.$t('history_actual_qty'),
          dataIndex: 'Total',
          key: 'Total',
        },
      ],
      TradeHistoryData: [],
      orderHistoryExpandedRowKeys: [],
      TradeHistoryPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },
      TradeHistoryDataTL: [],
      orderHistoryExpandedRowKeysTL: [],
      TradeHistoryPaginationTL: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },

      TradeHistoryFilters: {
        From: undefined,
        To: undefined,
        Symbol: '',
        OrderType: '',
      },
      TradeHistoryFiltersTL: {
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
    this.getTradeHistoryCrypto()
    this.getTradeHistoryTL()
  },
  methods: {
    async getTradeHistoryCrypto() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingOrderHistory = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetTradeHistoryCrypto',
        {
          params: {
            Offset:
              this.TradeHistoryPagination.current * 10 -
              this.TradeHistoryPagination.pageSize,
            RowSize: this.TradeHistoryPagination.pageSize,
            ...this.TradeHistoryFilters,
          },
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { Trades, Max } = response.data
        this.TradeHistoryData = Trades
        this.TradeHistoryPagination.total = Max
        this.isLoadingOrderHistory = false
      }
    },
    async getTradeHistoryTL() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingOrderHistoryTL = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetTradeHistoryTRY',
        {
          params: {
            Offset:
              this.TradeHistoryPaginationTL.current * 10 -
              this.TradeHistoryPaginationTL.pageSize,
            RowSize: this.TradeHistoryPaginationTL.pageSize,
            ...this.TradeHistoryFiltersTL,
          },
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { Trades, Max } = response.data
        this.TradeHistoryDataTL = Trades
        this.TradeHistoryPaginationTL.total = Max
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
    setTradeHistoryFilterTime(dateArray) {
      this.TradeHistoryFilters.From = moment(dateArray[0]).format()
      this.TradeHistoryFilters.To = moment(dateArray[1]).format()
    },
    setTradeHistoryFilterTimeTL(dateArray) {
      this.TradeHistoryFiltersTL.From = moment(dateArray[0]).format()
      this.TradeHistoryFiltersTL.To = moment(dateArray[1]).format()
    },
    resetTradeHistoryFilters() {
      Object.keys(this.TradeHistoryFilters).forEach((k) => {
        this.TradeHistoryFilters[k] = undefined
      })
      this.getTradeHistoryCrypto()
    },
    resetTradeHistoryFiltersTL() {
      Object.keys(this.TradeHistoryFiltersTL).forEach((k) => {
        this.TradeHistoryFiltersTL[k] = undefined
      })
      this.getTradeHistoryTL()
    },
    OrderHistoryTableChange(pagination) {
      this.TradeHistoryPagination = pagination
      this.getTradeHistoryCrypto()
    },
    OrderHistoryTableChangeTL(pagination) {
      this.TradeHistoryPaginationTL = pagination
      this.getTradeHistoryTL()
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
    isTradeHistoryFiltered() {
      return (
        !!this.TradeHistoryFilters.From ||
        !!this.TradeHistoryFilters.To ||
        !!this.TradeHistoryFilters.OrderType ||
        !!this.TradeHistoryFilters.Symbol
      )
    },
    isTradeHistoryFilteredTL() {
      return (
        !!this.TradeHistoryFiltersTL.From ||
        !!this.TradeHistoryFiltersTL.To ||
        !!this.TradeHistoryFiltersTL.OrderType ||
        !!this.TradeHistoryFiltersTL.Symbol
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
