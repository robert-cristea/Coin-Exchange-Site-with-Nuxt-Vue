<template>
  <div class="side-transaction-container">
    <TransacitonTypeCard :active-tab="type" @change="(e) => (type = e)" />
    <div class="side-flex" v-if="isActiveTab(1)">
      <Transactions
        :list="getAsks"
        :tab="1"
        :styles="{ borderBottom: 0 }"
        scrollPos="bottom"
        type="asks"
        value-col-class="text-danger"
      />
      <ValueCard
        style="border-top: 0px; border-bottom: 0px"
        :value="lastPrice"
      />
      <Transactions
        :show-table-headers="false"
        :list="getBids"
        :tab="1"
        :styles="{ borderTop: 0 }"
        type="bids"
        value-col-class="text-success"
      />
    </div>
    <div class="side-flex" v-if="isActiveTab(2)">
      <ValueCard :value="lastPrice" />
      <Transactions
        :list="getBids"
        :tab="2"
        :styles="{ borderTop: 0 }"
        value-col-class="text-success"
        class="bids-table"
        type="bids"
        :limit="20"
      />
    </div>
    <div class="side-flex" v-if="isActiveTab(3)">
      <Transactions
        :styles="{ borderBottom: 0 }"
        :list="getAsks"
        :tab="3"
        value-col-class="text-danger"
        class="bids-table"
        type="asks"
        :limit="20"
      />
      <ValueCard :value="lastPrice" />
    </div>
  </div>
</template>

<script>
import TransacitonTypeCard from './TransacitonTypeCard'
import ValueCard from './ValueCard'
import Transactions from './Transactions'

export default {
  components: {
    TransacitonTypeCard,
    ValueCard,
    Transactions,
  },
  props: {
    transactions: {
      type: Object,
      default: () => {},
    },
    lastPrice: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      type: 1,
    }
  },
  computed: {
    getBids() {
      return this.transactions.bids
    },
    getAsks() {
      return this.transactions.asks
    },
  },
  methods: {
    isActiveTab(v) {
      return this.type === v
    },
  },
}
</script>

<style lang="scss">
.side-transaction-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.side-flex {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.bids-table {
  .exchange-table .table-overlay {
    /* height: 650px; */
  }
}
</style>
