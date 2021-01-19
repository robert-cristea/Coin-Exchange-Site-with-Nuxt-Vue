<template>
  <div class="bs-page-content-container">
    <div class="bs-page-content-header">
      <!-- <a-breadcrumb class="bs-breadcumb Roboto-Regular">
        <a-breadcrumb-item>{{ $t('text_orders') }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{
          $t('text_buyingsellinghistory')
        }}</a-breadcrumb-item>
      </a-breadcrumb> -->
      <h1 class="Roboto-Regular">{{ $t('text_buyingsellinghistory') }}</h1>
    </div>
    <div class="bs-page-content-wrapper h-100 w-100">
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
          <span v-if="item.key === 'Buy'">{{ $t('text_buy') }}</span>
          <span v-if="item.key === 'Sell'">{{ $t('text_sell') }</span>
        </span>
      </a-card>
      <a-card
        v-if="activeKey === 'Sell'"
        class="cointral-card bs-table-card border-none"
        :bordered="false"
      >
        <a-table
          id="swap-history-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Regular']"
          :loading="isLoadingSwapHistory"
          :columns="SwapHistoryColumns"
          :data-source="SwapHistoryData"
          :rowKey="(record) => record.SwapUniqueId"
          :pagination="SwapHistoryPagination"
          @change="SwapHistoryTableChange"
        >
          <span slot="ÇİFT" slot-scope="record">
            {{ record.InAsset }} / {{ record.OutAsset }}
          </span>
          <span slot="Miktar" slot-scope="record">
            {{ record.InAmount }} {{ record.InAsset }}
          </span>
          <span slot="Fiyat" slot-scope="record">
            1 {{ record.InAsset }} = {{ record.OutAmount / record.InAmount }}
            {{ record.OutAsset }}
          </span>
          <span slot="Final" slot-scope="record">
            {{ record.OutAmount }} {{ record.OutAsset }}
          </span>
        </a-table>
      </a-card>
      <a-card
        v-if="activeKey === 'Buy'"
        class="cointral-card bs-table-card border-none"
        :bordered="false"
      >
        <a-table
          id="buying-history-table"
          class="Roboto-Medium"
          :rowClassName="() => ['Roboto-Regular']"
          :loading="isLoadingBuyHistory"
          :columns="BuyHistoryColumns"
          :data-source="BuyHistoryData"
          :rowKey="(record) => record.PaymentId"
          :pagination="BuyHistoryPagination"
          @change="BuyingHistoryTableChange"
          @expand="setExpandedRowKeys"
          :expandIconColumnIndex="BuyHistoryColumns.length - 1"
          :expandedRowKeys="BuyingHistoryExpandedRowKeys"
          :expandIconAsCell="false"
        >
          <span slot="expandIcon">&times;</span>
          <div
            class="BuyingHistoryExpandedRow"
            slot="expandedRowRender"
            slot-scope="record"
          >
            <div class="ExpandedRowItem Roboto-Regular">
              {{ $t('orders_text_paymentid') }} {{ record.PaymentId }}
            </div>
          </div>
          <span slot="Miktar" slot-scope="record">
            {{ record.FiatCurrencyAmount }} {{ record.FiatCurrency }}
          </span>
          <span slot="NihaiMiktar" slot-scope="record">
            {{ record.DigitalAssetAmount }} {{ record.DigitalAsset }}
          </span>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        { key: 'Sell', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Buy', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'Sell',
      SwapHistoryColumns: [
        { title: 'Tarih', dataIndex: 'CreatedOn', key: 'Tarih' },
        {
          title: 'Çift',
          key: 'ÇİFT',
          scopedSlots: { customRender: 'ÇİFT' },
        },
        {
          title: 'Miktar',
          key: 'Miktar',
          scopedSlots: { customRender: 'Miktar' },
        },
        {
          title: 'Fiyat',
          key: 'Fiyat',
          scopedSlots: { customRender: 'Fiyat' },
        },
        {
          title: 'Final',
          key: 'Final',
          scopedSlots: { customRender: 'Final' },
        },
      ],
      SwapHistoryData: [],
      SwapHistoryPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },
      isLoadingSwapHistory: false,

      BuyHistoryColumns: [
        { title: 'Tarih', dataIndex: 'CreatedOn', key: 'CreatedOn' },
        { title: 'Sağlayıcı', dataIndex: 'Provider', key: 'Sağlayıcı' },
        {
          title: 'Tutar',
          key: 'Miktar',
          scopedSlots: { customRender: 'Miktar' },
        },
        {
          title: 'Gerçekleşen Miktar',
          key: 'Nihai Miktar',
          scopedSlots: { customRender: 'NihaiMiktar' },
        },
        { title: 'Durum', dataIndex: 'Status', key: 'Status' },
        {
          title: '',
          dataIndex: 'Action',
          key: 'Action',
        },
      ],
      BuyHistoryData: [],
      BuyHistoryPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 10,
      },
      BuyingHistoryExpandedRowKeys: [],
      isLoadingBuyHistory: false,
    }
  },
  created() {
    this.getSwapHistory()
    this.getBuyingHistory()
  },
  methods: {
    async getSwapHistory() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingSwapHistory = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetSwapHistory',
        {
          params: {
            Offset:
              this.SwapHistoryPagination.current * 10 -
              this.SwapHistoryPagination.pageSize,
            RowSize: this.SwapHistoryPagination.pageSize,
          },
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { Str_SwapList, Max } = response.data
        this.SwapHistoryData = Str_SwapList
        this.SwapHistoryPagination.total = Max
        this.isLoadingSwapHistory = false
      }
    },
    async getBuyingHistory() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingBuyHistory = true
      const response = await $axios.get($config.FINANCE_API_URL + '/GetBuyTx', {
        params: {
          Offset:
            this.BuyHistoryPagination.current * 10 -
            this.BuyHistoryPagination.pageSize,
          RowSize: this.BuyHistoryPagination.pageSize,
        },
        headers: authHeader,
      })
      if (response.data.Success) {
        const { BuyTx, Max } = response.data
        this.BuyHistoryData = BuyTx
        this.BuyHistoryPagination.total = Max
        this.isLoadingBuyHistory = false
      }
    },

    BuyingHistoryTableChange(pagination) {
      this.BuyHistoryPagination = pagination
      this.getBuyingHistory()
    },
    SwapHistoryTableChange(pagination) {
      this.SwapHistoryPagination = pagination
      this.getSwapHistory()
    },
    setExpandedRowKeys(expanded, record) {
      if (expanded) {
        this.BuyingHistoryExpandedRowKeys = [record.PaymentId]
      } else {
        this.BuyingHistoryExpandedRowKeys = []
      }
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
.tab-label-active,
.tab-label-inactive {
  font-size: 20px;
}
.bs-breadcumb {
  margin-bottom: 50px;
}
.bs-page-content-wrapper {
  display: flex;
  flex-direction: column;
}
.bs-tab-card {
  margin-bottom: 20px;
  padding: 16px 0;
  box-shadow: 0px 0px 4px #0000000d;
}
.bs-table-card {
  box-shadow: 0px 0px 3px #0000000f;
}
.BuyingHistoryExpandedRow {
  padding: 16px 16px;
  display: flex;
  justify-content: flex-end;
}
.ExpandedRowItem {
  font-size: 14px;
  margin-right: 100px;
}
</style>
