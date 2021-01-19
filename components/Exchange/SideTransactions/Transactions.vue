<template>
  <div class="transactions h-100">
    <a-card :style="styles" class="h-100">
      <div class="exchange-table">
        <div v-if="showTableHeaders" class="exchange-table__head">
          <div class="exchange-table__head-item Roboto-Regular">
            {{ $t('exchange_price') }} ({{ getSymbolData.QuatoAsset }})
          </div>
          <div class="exchange-table__head-item Roboto-Regular">
            {{ $t('exchange_amount') }} ({{ getSymbolData.BaseAsset }})
          </div>
          <div class="exchange-table__head-item Roboto-Regular">
            {{ $t('exchange_total') }} ({{ getSymbolData.QuatoAsset }})
          </div>
        </div>
        <div
          class="table-overlay"
          id="dataTable"
          ref="dataTable"
          :class="{ cardHeight: tab === 2 || tab === 3 }"
        >
          <table class="no-even-bg">
            <tbody class="Roboto-Medium">
              <tr
                v-for="(item, index) in list"
                :key="index"
                class="cursor-pointer"
                @click="updateActionItems(item)"
              >
                <td :class="valueColClass">
                  {{ formatAll(item[0], 'PRICE') }}
                </td>
                <td style="text-align: right">
                  {{ formatAll(item[1], 'AMOUNT') }}
                </td>
                <td style="text-align: right">
                  {{ formatAll(Number(item[0]) * Number(item[1]), 'TOTAL') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatter from '~/Mixins/formatter'
export default {
  mixins: [formatter],
  props: {
    type: {
      type: String,
      default: 'asks',
    },
    list: {
      default: () => [],
      type: Array,
    },
    tab: {
      type: Number,
    },
    valueColClass: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 9,
    },
    styles: {
      type: Object,
      required: false,
    },
    showTableHeaders: {
      required: false,
      default: true,
    },
    scrollPos: {
      type: String,
      default: 'top',
    },
  },
  methods: {
    updateActionItems(v) {
      this.$store.commit('transactions/updateActionPrice', Number(v[0]))
      if (this.type === 'asks') {
        this.$store.commit(
          'transactions/updateActionBuyTotal',
          Number(v[0]) * Number(v[1])
        )
      }
      if (this.type === 'bids') {
        this.$store.commit(
          'transactions/updateActionSellQuantity',
          Number(v[1])
        )
      }
    },
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
    }),
    listLimit() {
      const { list } = this
      if (list.length === 0) return
      return new Array(this.limit).fill(0).map((v, i) => {
        return list[i]
      })
    },
  },
  watch: {
    list: {
      handler() {
        if (this.scrollPos === 'bottom') {
          const container = this.$el.querySelector('#dataTable')
          container.scrollTop = container.scrollHeight
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (process.client && this.scrollPos === 'bottom') {
      const container = this.$el.querySelector('#dataTable')
      container.scrollTop = container.scrollHeight
    }
  },
}
</script>

<style lang="scss">
.cardHeight {
  height: 100% !important;
}
.transactions {
  .exchange-table__head-item {
    color: #b1b2b2;
  }

  .table-overlay {
    overflow-y: scroll !important;
    padding: 0 3px;

    table tbody tr td:first-child {
      cursor: pointer;
    }
  }

  .ant-card {
    display: flex;
    flex-direction: column;

    &-body {
      height: 100%;
      padding: 16px;
    }
  }
}
</style>
