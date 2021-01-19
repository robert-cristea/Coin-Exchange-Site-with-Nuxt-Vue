<template>
    <div class="mobile-order-book-container">
        <TransactionTypeCardMobile :activeTab="type" @change="(e) => (type = e)"  />
        <div v-show="type === 1" style="display: flex">
            <TransactionMobile :list="getBids" value-col-class="text-success" />
            <div style="width: 10px"></div> 
            <TransactionMobile :list="getAsks" value-col-class="text-danger" />
        </div>   
        <div v-show="type === 2" style="display: flex">
            <TransactionMobile :list="getBids" :show-total="true" value-col-class="text-success" />
        </div>   
        <div v-show="type === 3" style="display: flex">
            <TransactionMobile :list="getAsks" :show-total="true" value-col-class="text-danger" />
        </div>   
    </div>  
</template>

<script>
import TransactionTypeCardMobile from "~/components/Exchange/ExchangeMobile/TransactionTypeCardMobile"
import TransactionMobile from "~/components/Exchange/ExchangeMobile/TransactionMobile"

export default {
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
    components: {
        TransactionTypeCardMobile,
        TransactionMobile
    },
    data () {
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
}
</script>

<style scoped>

</style>