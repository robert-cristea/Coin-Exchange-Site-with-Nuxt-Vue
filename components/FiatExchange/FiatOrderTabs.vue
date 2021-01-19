<template>
  <a-tabs
    class="fiat-orders-tabs"
    v-model="activeOrderTypeKey"
    :tabBarStyle="{ width: '100%' }"
  >
    <a-tab-pane v-for="ord in orderTypes" :key="ord.key" class="Roboto-Medium">
      <span
        v-if="ord.key === 'OPEN_ORDERS'"
        class="Roboto-Medium tab-title"
        :class="{
          'tab-label-active': activeOrderTypeKey === 'OPEN_ORDERS',
          'tab-label-inactive': activeOrderTypeKey !== 'OPEN_ORDERS',
        }"
        slot="tab"
      >
        {{ $t('exchange_open_orders') }}
      </span>
      <span
        v-if="ord.key === 'LAST_ORDERS'"
        class="Roboto-Medium tab-title"
        :class="{
          'tab-label-active': activeOrderTypeKey === 'LAST_ORDERS',
          'tab-label-inactive': activeOrderTypeKey !== 'LAST_ORDERS',
        }"
        slot="tab"
      >
        {{ $t('exchange_last24H_orders') }}
      </span>
      <FiatTransactions
        v-if="ord.key === 'OPEN_ORDERS'"
        order-type="OPEN_ORDERS"
        :is-loading="isLoading"
        :Orders="OpenOrders"
        :show-cancel-button="true"
        @cancelOpenOrder="(e) => $emit('cancelOpenOrder', e)"
        @cancelAllOpenOrder="$emit('cancelAllOpenOrder')"
      />
      <FiatTransactions
        v-if="ord.key === 'LAST_ORDERS'"
        order-type="LAST_ORDERS"
        :Orders="LastOrders"
      />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  name: 'FiatOrderTabs',
  props: {
    OpenOrders: {
      required: true,
      default: [],
    },
    LastOrders: {
      required: true,
      default: [],
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      orderTypes: [{ key: 'OPEN_ORDERS' }, { key: 'LAST_ORDERS' }],
      activeOrderTypeKey: 'OPEN_ORDERS',
    }
  },
}
</script>

<style scoped>
.fiat-orders-tabs {
  padding: 20px 39px 20px 52px;
}
.tab-title {
  font-size: 18px;
}
.tab-label-active {
  color: #ffffff;
}
.tab-label-inactive {
  color: #778090;
}
@media screen and (max-width: 1000px) {
  .fiat-orders-tabs {
    padding: 12px 4px 12px 4px;
  }
  .tab-title {
    font-size: 12px;
  }
}

.fiat-orders-tabs >>> .ant-tabs-nav {
  width: 100%;
}
.fiat-orders-tabs >>> .ant-tabs-nav > div {
  width: 100%;
  display: flex;
}
</style>
