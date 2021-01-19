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
          <span v-if="item.key === 'Sell'">{{ $t('swap_text') }}</span>
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
          :rowClassName="() => ['Roboto-Medium', 'expanded-row']"
          :loading="isLoadingSwapHistory"
          :columns="SwapHistoryColumns"
          :data-source="SwapHistoryData"
          :rowKey="(record) => record.SwapUniqueId"
          :pagination="SwapHistoryPagination"
          @change="SwapHistoryTableChange"
        >
          <span slot="Tarih" slot-scope="record">
            {{ record.CreatedOn | dateFormat }}
          </span>
          <span slot="ÇİFT" slot-scope="record">
            {{ record.InAsset }} / {{ record.OutAsset }}
          </span>
          <span slot="Miktar" slot-scope="record">
            {{ record.InAmount }} {{ record.InAsset }}
          </span>
          <span slot="İşlem sonucu" slot-scope="record">
            {{ record.OutAmount.toFixed(8) }}&nbsp;{{ record.OutAsset }}
          </span>
          <span slot="Fiyat" slot-scope="record">
            1 {{ record.InAsset }} =
            {{ (record.OutAmount / record.InAmount).toFixed(8) }}
            {{ record.OutAsset }}
          </span>
          <span slot="İşlem numarası" slot-scope="record">
            {{ record.SwapUniqueId }}
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
          :rowClassName="setRowClassName"
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
          :expandIcon="expandIcon"
        >
          <div
            class="BuyingHistoryExpandedRow"
            slot="expandedRowRender"
            slot-scope="record"
          >
            <div class="ExpandedRowItem Roboto-Regular">
              {{ $t('buy_text_payment_id', { id: record.PaymentId }) }}
            </div>
          </div>
          <span slot="Miktar" slot-scope="record">
            {{ record.FiatCurrencyAmount }} {{ record.FiatCurrency }}
          </span>
          <span slot="NihaiMiktar" slot-scope="record">
            {{ record.DigitalAssetAmount }} {{ record.DigitalAsset }}
          </span>

          <template slot="Durum" slot-scope="record">
            <span v-if="record.Status === 'NEW'">
              <a-tag color="record.StatusColor">
                {{ $t(record.Status) }}
              </a-tag>
            </span>
          </template>
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
      title: 'Alım - Satım Geçmişi | Cointral.com',
    }
  },
  data() {
    return {
      tabList: [
        { key: 'Sell', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Buy', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'Sell',
      SwapHistoryColumns: [
        {
          title: this.$t('buy_sell_text_date'),
          key: 'Tarih',
          scopedSlots: { customRender: 'Tarih' },
        },
        {
          title: this.$t('buy_sell_text_pair'),
          key: 'ÇİFT',
          scopedSlots: { customRender: 'ÇİFT' },
        },
        {
          title: this.$t('buy_sell_text_amount'),
          key: 'Miktar',
          scopedSlots: { customRender: 'Miktar' },
        },
        {
          title: this.$t('buy_sell_text_result'),
          key: 'İşlem sonucu',
          scopedSlots: { customRender: 'İşlem sonucu' },
        },
        {
          title: this.$t('buy_sell_text_price'),
          key: 'Fiyat',
          scopedSlots: { customRender: 'Fiyat' },
        },
        {
          title: this.$t('buy_sell_text_transaction_id'),
          key: 'İşlem numarası',
          scopedSlots: { customRender: 'İşlem numarası' },
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
        {
          title: this.$t('buy_history_text_date'),
          dataIndex: 'CreatedOn',
          key: 'CreatedOn',
        },
        {
          title: this.$t('buy_history_text_provider'),
          dataIndex: 'Provider',
          key: 'Sağlayıcı',
        },
        {
          title: this.$t('buy_history_text_total'),
          key: 'Miktar',
          scopedSlots: { customRender: 'Miktar' },
        },
        {
          title: this.$t('buy_history_text_executed_amount'),
          key: 'Nihai Miktar',
          scopedSlots: { customRender: 'NihaiMiktar' },
        },
        {
          title: this.$t('buy_history_text_status'),
          dataIndex: 'Status',
          key: 'Status',
        },

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
  filters: {
    dateFormat(val) {
      return moment(val).format('yyy-mm-DD hh:mm:ss')
    },
  },
  methods: {
    setRowClassName(record) {
      return record.Status === 'NEW'
        ? ['color-red', 'Roboto-Medium', 'expanded-row']
        : ['', 'Roboto-Medium', 'expanded-row']
    },
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

    BuyingHistoryTableChange(pagination) {
      this.BuyHistoryPagination = pagination
      this.getBuyingHistory()
    },
    SwapHistoryTableChange(pagination) {
      this.SwapHistoryPagination = pagination
      this.getSwapHistory()
    },
    setExpandedRowKeys(expanded, record) {
      try {
        if (expanded) {
          this.BuyingHistoryExpandedRowKeys = [record.PaymentId]
        } else {
          this.BuyingHistoryExpandedRowKeys = []
        }
      } catch (e) {
        console.error(e)
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

::ng-deep .color-red.ant-table-row > td:nth-child(5) {
  color: red !important;
}
</style>
