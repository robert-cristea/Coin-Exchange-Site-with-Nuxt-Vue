<template>
  <div class="transaction-mobile-wrapper w-100">
    <table class="w-100 transactions-table Roboto-Regular">
      <thead class="Roboto-Regular">
        <tr class="transactions-table-header">
          <th class="text-left font-normal">Fiyat</th>
          <th class="text-right font-normal">Miktar</th>
          <th v-if="showTotal" class="text-right font-normal">Toplam</th>
        </tr>
      </thead>
      <tbody class="Roboto-Regular">
        <tr
          v-for="(item, index) in list"
          :key="index"
          class="cursor-pointer"
          @click="updateActionPrice(item[0])"
        >
          <td class="text-left font-normal" :class="valueColClass">
            {{ formatAll(item[0], 'PRICE') }}
          </td>
          <td class="text-white text-right font-normal">
            {{ formatAll(item[1], 'AMOUNT') }}
          </td>
          <td v-if="showTotal" class="text-right text-white font-normal">
            {{ formatAll(item[0] * item[1], 'TOTAL') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import formatter from '~/Mixins/formatter'

export default {
  mixins: [formatter],

  props: {
    list: {
      default: () => [],
      type: Array,
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
    showTotal: {
      type: Boolean,
      required: false,
      defaut: false,
    },
  },
  methods: {
    updateActionPrice(v) {
      this.$store.commit('transactions/updateActionPrice', v)
    },
  },
  computed: {
    listLimit() {
      const { list } = this
      if (list.length === 0) return
      return new Array(this.limit).fill(0).map((v, i) => {
        return list[i]
      })
    },
  },
}
</script>

<style lang="less" scoped>
.transaction-mobile-wrapper {
  max-height: 600px;
  overflow-y: scroll;
}
.transactions-table thead {
  position: relative;
}
.transactions-table thead tr th {
  position: sticky;
  top: 0;
}
.transactions-table {
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
.transactions-table-header {
  color: #9399a4;
}
</style>
