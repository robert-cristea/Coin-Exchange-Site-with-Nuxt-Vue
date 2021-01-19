<template>
  <a-col>
    <a-col>
      <a-col offset="1" :xs="22" :sm="22" :md="22" style="margin-bottom: 20px">
        <a-breadcrumb class="Roboto-Regular">
          <a-breadcrumb-item>{{ $t('text_orders') }}</a-breadcrumb-item>
          <a-breadcrumb-item
            >{{ $t('text_buyingsellinghistory') }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>

      <a-divider type="horizontal" />

      <a-col offset="1" :xs="22" :sm="22" :md="22">
        <h1 class="Roboto-Regular">{{ $t('text_buyingsellinghistory') }}</h1>
      </a-col>
    </a-col>

    <a-col :xs="24" :sm="24" :md="24">
      <a-card
        class="border-none"
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
          <span v-if="item.key === 'Sell'">{{ $t('text_sell') }}</span>
        </span>
      </a-card>
      <a-card
        v-if="activeKey === 'Sell'"
        class="cointral-card bs-table-card border-none"
        :bordered="false"
      >
        <SwapTableMobile
          v-if="SwapHistoryData.length"
          :history-data="SwapHistoryData"
          :pagination.sync="SwapHistoryPagination"
          @getSwapData="getSwapHistory"
        />
        <a-empty v-else />
      </a-card>
      <a-card
        v-if="activeKey === 'Buy'"
        class="cointral-card bs-table-card border-none"
        :bordered="false"
      >
        <BuyingTableMobile
          v-if="BuyHistoryData.length"
          :history-data="BuyHistoryData"
          :pagination.sync="BuyHistoryPagination"
          @getBuyingHistory="getBuyingHistory"
        />
        <a-empty v-else />
      </a-card>
    </a-col>
  </a-col>
</template>

<script>
import SwapTableMobile from '~/components/Orders/SwapTableMobile'
import BuyingTableMobile from '~/components/Orders/BuyingTableMobile'
export default {
  components: { BuyingTableMobile, SwapTableMobile },
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
        { title: 'Tarih', dataIndex: 'Tarih', key: 'CreatedOn' },
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
        { title: 'Durum', dataIndex: 'Durum', key: 'Status' },
        {
          title: 'Action',
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
        this.BuyingHistoryExpandedRowKeys = [record.CreatedOn]
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
