<template>
  <div class="fiat-orderbook-container h-100 w-100">
    <a-table
      :columns="getColumns"
      :data-source="mappedData"
      :pagination="false"
      :scroll="{ y: getScrollPoint }"
      :bordered="false"
      class="transactions-table"
      :rowKey="(record, index) => index"
      :rowClassName="() => ['transactions-table-row']"
    >
      <template slot="title">
        <div
          class="transactions-title Roboto-Medium"
          :class="{
            'text-danger': Type === 'SELL',
            'text-success': Type === 'BUY',
          }"
        >
          {{ Type === 'SELL' ? $t('text_fiat_sell') : $t('text_fiat_buy') }}
        </div>
      </template>

      <span slot="PriceTitle">
        {{ $t('orders_text_price') }} ({{ getSymbolData.QuatoAsset }})
      </span>
      <span slot="QuantityTitle">
        {{ $t('orders_text_quantity') }} ({{ getSymbolData.BaseAsset }})
      </span>
      <span v-if="!isMobile" slot="TotalTitle">
        {{ $t('orders_text_total') }} ({{ getSymbolData.QuatoAsset }})
      </span>

      <span
        slot="Price"
        slot-scope="v, r"
        class="transactions-table-column"
        :class="{
          'text-danger': Type === 'SELL',
          'text-success': Type === 'BUY',
        }"
        @click="updateActionItems(r)"
      >
        {{ formatAll(v, 'PRICE') }}
      </span>
      <span
        slot="Quantity"
        slot-scope="v, r"
        class="transactions-table-column"
        @click="updateActionItems(r)"
      >
        {{ formatAll(v, 'AMOUNT') }}
      </span>
      <span
        v-if="!isMobile"
        slot="Total"
        slot-scope="v, r"
        class="transactions-table-column"
        @click="updateActionItems(r)"
      >
        {{ formatAll(v, 'TOTAL') }}
      </span>
    </a-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatter from '~/Mixins/formatter'

export default {
  name: 'FiatOrderBook',
  mixins: [formatter],
  props: {
    Transactions: {
      default: () => [],
      type: Array,
    },
    Type: {
      type: String,
      default: 'SELL',
    },
  },
  data() {
    return {
      isMobile: false,
      Columns: [
        {
          dataIndex: 'Price',
          slots: {
            title: 'PriceTitle',
          },
          class: 'Roboto-Regular',
          align: 'center',
          ellipsis: true,
          width: '33.33%',
          scopedSlots: { customRender: 'Price' },
        },
        {
          dataIndex: 'Quantity',
          slots: {
            title: 'QuantityTitle',
          },
          class: 'Roboto-Regular',
          align: 'center',
          ellipsis: true,
          width: '33.33%',
          scopedSlots: { customRender: 'Quantity' },
        },
        {
          dataIndex: 'Total',
          slots: {
            title: 'TotalTitle',
          },
          class: 'Roboto-Regular',
          align: 'center',
          ellipsis: true,
          width: '33.33%',
          scopedSlots: { customRender: 'Total' },
        },
      ],
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  methods: {
    updateActionItems({ Price, Quantity, Total }) {
      this.$store.commit('transactions/updateActionPrice', Number(Price))
      if (this.Type === 'SELL') {
        this.$store.commit('transactions/updateActionBuyTotal', Number(Total))
      }
      if (this.Type === 'BUY') {
        this.$store.commit(
          'transactions/updateActionSellQuantity',
          Number(Quantity)
        )
      }
    },
  },
  computed: {
    getScrollPoint() {
      const r = document.querySelector('.transactions-table-row')
      const rowHeight = r ? (r[0] ? r[0].clientHeight : 36) : 36
      return rowHeight * 12
    },
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
    }),
    mappedData() {
      return this.Transactions.map(([p, q]) => ({
        Price: p,
        Quantity: q,
        Total: p * q,
      }))
    },
    getColumns() {
      if (this.Type === 'BUY') {
        this.Columns = this.Columns.reverse()
      }
      if (this.isMobile) {
        if (this.Type === 'BUY') {
          return this.Columns.filter((c) => c.dataIndex !== 'Total').reverse()
        } else {
          return this.Columns.filter((c) => c.dataIndex !== 'Total')
        }
      }
      return this.Columns
    },
  },
  watch: {
    getActionPrice(v) {
      if (this.Type !== 'MARKET') {
        this.buyForm.Price = v
        this.sellForm.Price = v
      }

      this.buyForm.Quantity = ''
      this.buyForm.Total = ''

      this.sellForm.Quantity = ''
      this.sellForm.Total = ''
    },
    getActionBuyTotal(v) {
      this.buyForm.Total = v.toFixed(8)
    },
    getActionSellQuantity(v) {
      if (this.Type !== 'MARKET') {
        this.sellForm.Quantity = v
      }
    },
  },
}
</script>

<style scoped>
.fiat-orderbook-container {
  padding: 5px;
  border-radius: 6px;
  border: solid 1px #293248;
  background-color: #1e2430;
}
.transactions-table >>> .ant-table-body {
  height: 440px;
  background-color: #1e2430;
}
.transactions-table >>> .ant-table table {
  border-collapse: collapse;
}
.transactions-table >>> .ant-table .ant-table-tbody > tr > td {
  padding: 8px !important;
  border: 1px solid #414d65;
  white-space: nowrap;
}

.transactions-table >>> .ant-table .ant-table-tbody > tr:nth-of-type(even) {
  background: rgba(42, 51, 69, 0.59);
}
.transactions-table >>> .ant-table .ant-table-tbody > tr {
  cursor: pointer;
}
.transactions-table >>> .ant-table .ant-table-tbody > tr:hover td {
  background: transparent;
}
.transactions-table >>> .ant-table-header {
  background: transparent;
  margin-bottom: 0;
  overflow: unset;
}
.transactions-table >>> .ant-table-header {
  min-width: 0;
}
.transactions-table >>> .ant-table-thead > tr > th {
  background: transparent;
  border: none;
  padding-bottom: 5px !important;
}
.transactions-table >>> .ant-table-body::-webkit-scrollbar {
  width: 0;
}
.transactions-table >>> .ant-table-header::-webkit-scrollbar {
  visibility: hidden;
}
.transactions-table
  >>> .ant-table-fixed-header
  > .ant-table-content
  > .ant-table-scroll
  > .ant-table-body {
  background-color: #1e2430;
}
.transactions-table-row {
  border: 0.5px solid #414d65;
  color: #414d65;
  cursor: pointer;
}
.transactions-table-column {
  color: #ffffff;
  font-size: 13px;
  font-family: 'Roboto-Regular';
  display: block;
}

.transactions-table >>> .ant-table-title {
  padding: 5px 5px 0px 5px;
  font-size: 18px;
}
.transactions-table >>> .ant-table-placeholder {
  display: none;
}
</style>
