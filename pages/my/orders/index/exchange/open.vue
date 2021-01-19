<template>
  <div class="order-page-content-container">
    <div v-if="isLoadingOpenOrders">
      <a-icon type="sync" spin />
    </div>
    <div v-else class="ordr-page-content-header">
      <!-- <a-breadcrumb class="order-breadcumb Roboto-Regular">
          <a-breadcrumb-item>{{ $t('text_orders') }}</a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('text_open_orders') }}</a-breadcrumb-item>
      </a-breadcrumb>-->
      <h1 class="Roboto-Regular">{{ $t('text_open_orders') }}</h1>
    </div>

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
        <span v-if="item.key === 'TL'"> TL Cüzdan </span>
      </span>
    </a-card>
    <div class="order-page-content-wrapper h-100 w-100">
      <a-card
        class="cointral-card order-table-card border-none"
        :bordered="false"
      >
        <a-table
          v-if="activeKey === 'CRYPTO'"
          id="open-orders-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Regular']"
          :loading="isLoadingOpenOrders"
          :columns="OpenOrdersColumns"
          :data-source="OpenOrdersData"
          :rowKey="(record) => record.OrderID"
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">
            {{ record.Time }}
          </div>
          <div slot="cancelOrder" slot-scope="record">
            <a-button
              class="text-danger Roboto-Medium"
              @click="cancelOrder(record, 'CRYPTO')"
              shape="round"
              >{{ $t('text_cancel') }}</a-button
            >
          </div>
        </a-table>
        <a-table
          v-if="activeKey === 'TL'"
          id="open-orders-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Regular']"
          :loading="isLoadingOpenOrders"
          :columns="OpenOrdersColumns"
          :data-source="OpenOrdersDataTL"
          :rowKey="(record) => record.OrderID"
        >
          <div class="momentFormattedTime" slot="Time" slot-scope="record">
            {{ record.Time }}
          </div>
          <div slot="cancelOrder" slot-scope="record">
            <a-button
              class="text-danger Roboto-Medium"
              @click="cancelOrder(record, 'TL')"
              shape="round"
              >{{ $t('text_cancel') }}</a-button
            >
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
      title: 'Spot Açık Emirler | Cointral.com',
    }
  },
  data() {
    return {
      tabList: [
        { key: 'CRYPTO', scopedSlots: { tab: 'titleSlot' } },
        { key: 'TL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'CRYPTO',

      OpenOrdersColumns: [
        {
          title: this.$t('orders_text_date'),
          dataIndex: 'Time',
          key: 'Tarih',
        },
        {
          title: this.$t('orders_text_symbol'),
          dataIndex: 'Symbol',
          key: 'symbol',
        },
        { title: this.$t('orders_text_type'), dataIndex: 'Type', key: 'type' },
        { title: this.$t('orders_text_side'), dataIndex: 'Side', key: 'side' },
        {
          title: this.$t('orders_text_price'),
          dataIndex: 'Price',
          key: 'price',
        },
        {
          title: this.$t('orders_text_quantity'),
          dataIndex: 'BaseQuantity',
          key: 'origQty',
        },
        {
          title: this.$t('orders_text_executed_quantity'),
          dataIndex: 'ExecutedBaseQuantity',
          key: 'executedQty',
        },
        {
          title: this.$t('orders_text_total'),
          dataIndex: 'ExecutedQuatoQuantity',
          key: 'cummulativeQuoteQty',
        },
        {
          title: this.$t('history_stop_limit'),
          dataIndex: 'StopPrice',
          key: 'stopPrice',
        },
        {
          title: '',
          key: '',
          scopedSlots: { customRender: 'cancelOrder' },
        },
      ],
      OpenOrdersData: [],
      OpenOrdersDataTL: [],
      isLoadingOpenOrders: false,
    }
  },
  created() {
    this.getOpenOrders()
    this.getOpenOrdersTL()
  },
  methods: {
    async getOpenOrders() {
      this.isLoadingOpenOrders = true
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }

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
      this.isLoadingOpenOrders = true
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
        this.isLoadingOpenOrders = false
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
          Symbol,
          OrderID,
        },
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      if (response.data.Success) {
        if (type === 'CRYPTO') {
          this.getOpenOrders()
        }
        if (type === 'TL') {
          this.getOpenOrdersTL()
        }
      }
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
