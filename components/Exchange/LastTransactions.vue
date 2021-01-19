<template>
  <div class="last-transactions h-100" :class="`last-transactions-${getTheme}`">
    <a-card class="h-100">
      <span slot="title" class="last-transactions-title Roboto-Regular">{{
        $t('exchange_trade_history')
      }}</span>
      <div class="exchange-table">
        <div class="exchange-table__head">
          <div class="exchange-table__head-item Roboto-Medium">
            {{ $t('exchange_date') }}
          </div>
          <div class="exchange-table__head-item Roboto-Medium">
            {{ $t('exchange_amount') }} ({{ getSymbolData.BaseAsset }})
          </div>
          <div class="exchange-table__head-item Roboto-Medium">
            {{ $t('exchange_price') }}
          </div>
        </div>
        <div class="table-overlay">
          <table class="Roboto-Medium">
            <tbody>
              <tr v-for="(item, index) in LastTransactionsData" :key="index">
                <td>
                  {{
                    computeTime(
                      item.Time,
                      getSymbolData.QuatoAsset == 'TRY' ? true : false
                    )
                  }}
                </td>
                <td>{{ formatAll(item.Qty, 'AMOUNT') }}</td>
                <td :class="item.IsBuyerMaker ? 'text-success' : 'text-danger'">
                  {{ formatAll(item.Price, 'PRICE') }}
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
import dateFormatMixin from '~/Mixins/dateFormatMixin'
import moment from 'moment'
import backTop from 'ant-design-vue/lib/back-top'

export default {
  mixins: [formatter, dateFormatMixin],
  props: {
    LastTransactionsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      list: [],
    }
  },
  computed: {
    ...mapGetters({
      getTheme: 'common/getTheme',
    }),
  },
  methods: {
    computeTime(v, b) {
      if (b) {
        v = new Date(v).getTime()
        return moment(new Date(Math.trunc(v * 1000))).format('HH:mm:ss')
      } else {
        v = new Date(v).getTime()
        return moment(new Date(Math.round(v))).format('HH:mm:ss')
      }
    },
  },
}
</script>

<style lang="scss">
.last-transactions {
  &-light {
    .ant-card-head-title {
      color: #1ba4e8;
    }
  }
  .exchange-table__head {
    padding: 10px 0px 0px;
  }
  .exchange-table__head-item {
    color: #b1b2b2;
  }

  .ant-card {
    display: flex;
    flex-direction: column;

    &-head {
      padding-left: 16px;
    }

    &-body {
      height: 100%;
      padding: 0 16px 16px 16px;
    }
  }
}
</style>
