<template>
  <div class="trades-table-wrapper">
    <table class="w-100 trades-table Roboto-Regular">
      <thead class="Roboto-Regular">
        <tr class="trades-table-header">
          <th class="text-left font-normal">
            Fiyat ({{ getSymbolData.QuatoAsset }})
          </th>
          <th class="font-normal">Miktar</th>
          <th class="text-right font-normal">Saat</th>
        </tr>
      </thead>
      <tbody class="Roboto-Regular">
        <tr v-for="(item, index) in LastTransactionsData" :key="index">
          <td
            :class="item.IsBuyerMaker ? 'text-success' : 'text-danger'"
            class="font-normal"
          >
            {{ formatAll(item.Price, 'PRICE') }}
          </td>
          <td class="text-white font-normal">
            {{ formatAll(item.Qty, 'AMOUNT') }}
          </td>
          <td class="text-white text-right font-normal">
            {{ computeTime(item.Time) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatter from '~/Mixins/formatter'
import moment from 'moment'

export default {
  mixins: [formatter],
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
      getSymbolData: 'symbol/getSymbolData',
    }),
  },
  methods: {
    computeTime(v) {
      return moment(new Date(Math.round(v * 1000))).format('H:mm:ss')
    },
  },
}
</script>

<style lang="less" scoped>
.trades-table-wrapper {
  max-height: 600px;
  overflow-y: scroll;
}
.trades-table thead {
  position: relative;
}
.trades-table thead tr th {
  position: sticky;
  top: 0;
  background-color: #141519;
}
.trades-table {
  font-size: 12px;
}
.font-normal {
  font-weight: normal !important;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-white {
  color: white;
}
.trades-table-header {
  color: #9399a4;
}
</style>
