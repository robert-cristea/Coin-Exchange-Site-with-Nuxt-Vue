<template>
  <div :class="!isMobile ? 'orders-page' : null">
    <div v-if="!isMobile" class="orders-page-navigation">
      <a-card class="cointral-card h-100 w-100" :bodyStyle="{ padding: 0 }">
        <a-menu @click="changeComponent" mode="inline" class="order-menu">
          <a-sub-menu key="sm1">
            <span slot="title" class="Roboto-Regular order-menu-item">
              <img src="~/assets/icons/wallet.svg" alt="wallet" />
              <span>{{ $t('text_spot_orders') }}</span>
            </span>
            <a-menu-item class="Roboto-Regular order-menu-item" key="OpenOrders">
              <span>{{ $t('text_orders') }}</span>
            </a-menu-item>
            <a-menu-item class="Roboto-Regular order-menu-item" key="OrderHistory">
              <span>{{ $t('text_orderhistory') }}</span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item class="Roboto-Regular order-menu-item" key="BuyingSellingHistory">
            <img src="~/assets/icons/wallet.svg" />
            <span>{{ $t('text_buyingsellinghistory') }}</span>
          </a-menu-item>
        </a-menu>
      </a-card>
    </div>
    <div v-if="!isMobile" class="orders-page-content">
      <component :is="currentComponent"></component>
    </div>

    <a-tabs
      v-if="isMobile"
      mode="inline"
      :tabBarStyle="{ 'background-color': 'black', color: 'gray' }"
      v-model="activeTab"
    >
      <a-tab-pane key="1">
        <span slot="tab">
          <img style="margin-right: 15px" src="~/assets/images/wallet.svg" alt />
          {{ $t('text_orders') }}
        </span>
        <OpenOrdersMobile />
      </a-tab-pane>

      <a-tab-pane key="2">
        <span slot="tab">
          <img style="margin-right: 15px" src="~/assets/images/wallet.svg" alt />
          {{ $t('text_orderhistory') }}
        </span>
        <OrderHistoryMobile />
      </a-tab-pane>

      <a-tab-pane key="3">
        <span slot="tab">
          <img style="margin-right: 15px" src="~/assets/images/wallet.svg" alt />
          {{ $t('text_buyingsellinghistory') }}
        </span>
        <BuyingSellingHistoryMobile />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import OrderHistory from '@/components/Orders/OrderHistory'
import OpenOrders from '@/components/Orders/OpenOrders'
import OpenOrdersMobile from '@/components/Orders/OpenOrdersMobile'
import BuyingSellingHistory from '@/components/Orders/BuyingSellingHistory'
import OrderHistoryMobile from '@/components/Orders/OrderHistoryMobile'

export default {
  head(){
    return{
      title: 'Emirler | Cointral.com',
    }
  },
  data() {
    return {
      isMobile: null,
      currentComponent: 'OpenOrders',
      activeTab: '1',
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

    if (this.$route.params.main === 'buy-sell') {
      if (this.$route.params.component === 'history') {
        this.currentComponent = 'BuyingSellingHistory'
        this.activeTab = '3'
        return
      }
    }

    if (this.$route.params.component === 'open') {
      this.currentComponent = 'OpenOrders'
      this.activeTab = '1'
    } else if (this.$route.params.component === 'history') {
      this.currentComponent = 'OrderHistory'
      this.activeTab = '2'
    }
  },
  components: {
    OpenOrders,
    OpenOrdersMobile,
    OrderHistory,
    BuyingSellingHistory,
    OrderHistoryMobile,
  },
  methods: {
    changeComponent(e) {
      this.currentComponent = e.key
    },
  },
}
</script>

<style lang="less" scoped>
.cointral-card .ant-card-body {
  padding: 0 !important;
}

.orders-page {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
}

.orders-page-navigation {
  min-width: 180px;
  width: 200px;
}

.orders-page-content {
  min-width: 1180px !important;
  padding: 16px 0px 16px 16px;
}

.order-menu .ant-menu-item-selected {
  background-color: #f5f5f5;
  color: #000000;
}

.order-menu-item img {
  margin-right: 10px;
}

.ant-menu-item::after {
  right: unset;
  left: 0;
}
</style>
