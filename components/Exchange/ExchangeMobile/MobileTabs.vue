<template>
  <div class="mobile-tabs-container">
    <a-tabs
      v-model="activeMobileTab"
      :forceRender="true"
      :tabBarStyle="{ borderBottom: '1px solid #2B2E35' }"
    >
      <a-tab-pane
        v-for="tab in MobileTabs"
        :key="tab.key"
        class="Roboto-Medium"
      >
        <span
          v-if="tab.key === 'Grafik'"
          slot="tab"
          :class="{
            'tab-label-active-mobile': tab.key === activeMobileTab,
            'tab-label-inactive-mobile': tab.key !== activeMobileTab,
          }"
        >
          {{ $t('text_graphic') }}
        </span>
        <span
          v-if="tab.key === 'Emir Defteri'"
          slot="tab"
          :class="{
            'tab-label-active-mobile': tab.key === activeMobileTab,
            'tab-label-inactive-mobile': tab.key !== activeMobileTab,
          }"
        >
          {{ $t('text_order_book') }}
        </span>
        <span
          v-if="tab.key === 'Alim Satimlar'"
          slot="tab"
          :class="{
            'tab-label-active-mobile': tab.key === activeMobileTab,
            'tab-label-inactive-mobile': tab.key !== activeMobileTab,
          }"
        >
          {{ $t('text_last_trades') }}
        </span>
        <div v-if="activeMobileTab === 'Grafik'">
          <MobileChart />
          <OrderTabsMobile
            :isOpenOrdersLoading="isOpenOrdersLoading"
            @cancelOpenOrder="(e) => $emit('cancelOpenOrder', e)"
            :openOrdersData="openOrdersData"
            :last24HoursData="last24HoursData"
          />
          <TradeDrawer :UserBalance="UserBalance" />
        </div>
        <div v-if="activeMobileTab === 'Emir Defteri'">
          <MobileOrderBook
            :transactions="transactions"
            :last-price="lastPrice"
          />
          <TradeDrawer :UserBalance="UserBalance" />
        </div>
        <div v-if="activeMobileTab === 'Alim Satimlar'">
          <TradesMobile :LastTransactionsData="LastTransactionsData" />
          <TradeDrawer :UserBalance="UserBalance" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import MobileChart from '~/components/Exchange/ExchangeMobile/MobileChart'
import OrderTabsMobile from '~/components/Exchange/ExchangeMobile/OrderTabsMobile'
import MobileOrderBook from '~/components/Exchange/ExchangeMobile/MobileOrderBook'
import TradesMobile from '~/components/Exchange/ExchangeMobile/TradesMobile'
import TradeDrawer from '~/components/Exchange/ExchangeMobile/TradeDrawer'
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
    LastTransactionsData: {
      type: Array,
      required: true,
    },
    UserBalance: {
      required: true,
      type: Object,
    },
    openOrdersData: {
      required: true,
      type: Array,
    },
    last24HoursData: {
      required: true,
      type: Array,
    },
    isOpenOrdersLoading: {
      required: false,
      type: Boolean,
    },
  },
  components: {
    MobileChart,
    MobileOrderBook,
    TradesMobile,
    OrderTabsMobile,
    TradeDrawer,
  },
  data() {
    return {
      activeMobileTab: 'Grafik',
      MobileTabs: [
        { key: 'Grafik', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Emir Defteri', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Alim Satimlar', scopedSlots: { tab: 'titleSlot' } },
      ],
    }
  },
}
</script>

<style scoped>
.mobile-tabs-container {
  background: #141519;
  min-height: 600px;
  padding: 10px;
}
.tab-label-active-mobile {
  color: white !important;
}
.tab-label-inactive-mobile {
  color: #868d9a !important;
}
</style>
