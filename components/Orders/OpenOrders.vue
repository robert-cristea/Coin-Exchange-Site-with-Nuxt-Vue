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
    <div class="order-page-content-wrapper h-100 w-100">
      <a-card class="cointral-card order-table-card border-none" :bordered="false">
        <a-table
          id="open-orders-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Regular']"
          :loading="isLoadingOpenOrders"
          :columns="OpenOrdersColumns"
          :data-source="OpenOrdersData"
          :rowKey="(record) => record.OrderID"
        >
          <div
            class="momentFormattedTime"
            slot="Time"
            slot-scope="record"
          >{{ record.Time | dateFormat }}</div>
          <div slot="cancelOrder" slot-scope="record">
            <a-button
              class="text-danger Roboto-Medium"
              @click="cancelOrder(record)"
              shape="round"
            >{{ $t('text_cancel') }}</a-button>
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
      OpenOrdersColumns: [
        {
          title: 'Tarih',
          dataIndex: 'Time',
          key: 'Tarih',
          scopedSlots: { customRender: 'updateTime' },
        },
        {
          title: 'Çift',
          dataIndex: 'Symbol',
          key: 'symbol',
        },
        { title: 'Tip', dataIndex: 'Type', key: 'type' },
        { title: 'Taraf', dataIndex: 'Side', key: 'side' },
        { title: 'Fiyat', dataIndex: 'Price', key: 'price' },
        { title: 'Miktar', dataIndex: 'BaseQuantity', key: 'origQty' },
        {
          title: 'Gerçekleşen',
          dataIndex: 'ExecutedBaseQuantity',
          key: 'executedQty',
        },
        {
          title: 'Toplam',
          dataIndex: 'ExecutedQuatoQuantity',
          key: 'cummulativeQuoteQty',
        },
        { title: 'Stop', dataIndex: 'StopPrice', key: 'stopPrice' },
        {
          title: '',
          key: '',
          scopedSlots: { customRender: 'cancelOrder' },
        },
      ],
      OpenOrdersData: [],
      isLoadingOpenOrders: true,
    }
  },
  created() {
    this.getOpenOrders()
  },
  methods: {
    async getOpenOrders() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }

      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOpenOrders',
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
    async cancelOrder(record) {
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
        this.getOpenOrders()
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
