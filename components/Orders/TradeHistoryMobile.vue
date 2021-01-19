<template>
  <div class="order-page-content-container">
    <div class="ordr-page-content-header">
      <a-breadcrumb class="order-breadcumb Roboto-Regular">
        <a-breadcrumb-item>{{ $t('text_orders') }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('text_tradehistory') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="Roboto-Regular">{{ $t('text_tradehistory') }}</h1>
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
          :value="[TradeHistoryFilters.From, TradeHistoryFilters.To]"
          format="YYYY-MM-DD HH:mm"
          @change="setOrderHistoryFilterTime"
          style="width: 100%"
        />
        <a-select
          v-model="TradeHistoryFilters.OrderType"
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
          v-model="TradeHistoryFilters.Symbol"
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
        </div>
      </div>
      <div v-if="isLoadingOrderHistory">
        <a-icon type="sync" spin />
      </div>
      <div
        v-if="TradeHistoryData.length === 0"
        class="d-flex"
        style="justify-content: center"
      >
        <img src="~/assets/images/NotFound.svg" alt="" />
      </div>
      <template v-else v-for="(item, index) in TradeHistoryData">
        <div class="mobile-dataDisplay">
          <div class="data-grid">
            <span class="label">{{ $t('history_date') }}</span>
            <span class="data">{{ item.Time }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_symbol') }}</span>
            <span class="data">{{ item.Symbol }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_side') }}</span>
            <span class="data">{{ item.Side }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_price') }}</span>
            <span class="data">{{ item.Price }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_amount') }}</span>
            <span class="data">{{ item.Qty }}</span>
          </div>

          <div class="data-grid">
            <span class="label">{{ $t('history_quote_qty') }}</span>
            <span class="data">{{ item.Commission }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_actual_qty') }}</span>
            <span class="data">{{ item.Total }}</span>
          </div>
        </div>
      </template>

      <a-pagination
        v-model="TradeHistoryPagination.current"
        :defaultPageSize="TradeHistoryPagination.pageSize"
        :total="TradeHistoryPagination.total"
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
          :value="[TradeHistoryFiltersTL.From, TradeHistoryFiltersTL.To]"
          format="YYYY-MM-DD HH:mm"
          @change="setOrderHistoryFilterTimeTL"
          style="width: 100%"
        />
        <a-select
          v-model="TradeHistoryFiltersTL.OrderType"
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
          v-model="TradeHistoryFiltersTL.Symbol"
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
        </div>
      </div>
      <div v-if="isLoadingOrderHistoryTL">
        <a-icon type="sync" spin />
      </div>
      <div
        v-if="TradeHistoryDataTL.length === 0"
        class="d-flex"
        style="justify-content: center"
      >
        <img src="~/assets/images/NotFound.svg" alt="" />
      </div>
      <template v-else v-for="(item, index) in TradeHistoryDataTL">
        <div class="mobile-dataDisplay">
          <div class="data-grid">
            <span class="label">{{ $t('history_date') }}</span>
            <span class="data">{{ item.Time }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_symbol') }}</span>
            <span class="data">{{ item.Symbol }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_side') }}</span>
            <span class="data">{{ item.Side }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_price') }}</span>
            <span class="data">{{ item.Price }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_amount') }}</span>
            <span class="data">{{ item.Qty }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_quote_qty') }}</span>
            <span class="data">{{ item.Commission }}</span>
          </div>
          <div class="data-grid">
            <span class="label">{{ $t('history_actual_qty') }}</span>
            <span class="data">{{ item.Total }}</span>
          </div>
        </div>
      </template>

      <a-pagination
        v-model="TradeHistoryPaginationTL.current"
        :defaultPageSize="TradeHistoryPaginationTL.pageSize"
        :total="TradeHistoryPaginationTL.total"
        @change="TradeHistoryTableChangeTL"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TradeHistoryMobile',
  data() {
    return {
      tabList: [
        { key: 'CRYPTO', scopedSlots: { tab: 'titleSlot' } },
        { key: 'TL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'CRYPTO',
      TradeHistoryData: [],
      TradeHistoryExpandedRowKeys: [],
      TradeHistoryPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },
      TradeHistoryDataTL: [],
      TradeHistoryExpandedRowKeysTL: [],
      TradeHistoryPaginationTL: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },

      TradeHistoryFilters: {
        From: undefined,
        To: undefined,
        Symbol: undefined,
        OrderType: undefined,
      },
      TradeHistoryFiltersTL: {
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
    this.getTradeHistoryCrypto()
    this.getTradeHistoryTL()
  },
  methods: {
    showModal(i) {
      if (i === this.visible) {
        this.visible = null
      } else {
        this.visible = i
      }
    },

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
      if (response.data) {
        this.TradeHistoryData = response.data.Trades
        this.TradeHistoryPagination.total = response.data.Max

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
      if (response.data) {
        this.TradeHistoryDataTL = response.data.Trades
        this.TradeHistoryPaginationTL.total = response.data.Max
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
      this.TradeHistoryFilters.From = moment(dateArray[0]).format()
      this.TradeHistoryFilters.To = moment(dateArray[1]).format()
    },
    setOrderHistoryFilterTimeTL(dateArray) {
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
      this.TradeHistoryPagination.current = pagination

      this.getTradeHistoryCrypto()
    },
    TradeHistoryTableChangeTL(pagination) {
      this.TradeHistoryPaginationTL.current = pagination

      this.getTradeHistoryTL()
    },
    setExpandedRowKeys(expanded, record) {
      if (expanded) {
        this.TradeHistoryExpandedRowKeys = [record.OrderId]
      } else {
        this.TradeHistoryExpandedRowKeys = []
      }
    },
    setExpandedRowKeysTL(expanded, record) {
      if (expanded) {
        this.TradeHistoryExpandedRowKeysTL = [record.OrderId]
      } else {
        this.TradeHistoryExpandedRowKeysTL = []
      }
    },
    calcToplam(record) {
      const coef1 = parseFloat(record.ActualQty)
      const coef2 = parseFloat(record.AveragePrice)
      return (coef1 * coef2).toFixed(8)
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
