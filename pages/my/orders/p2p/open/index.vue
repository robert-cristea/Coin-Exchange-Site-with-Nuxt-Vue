<template>
  <div class="Roboto-Regular">
    <a-breadcrumb class="p2p-breadcrumb">
      <span slot="separator" style="color: 000">></span>
      <a-breadcrumb-item>{{ $t('p2p_order_breadcrum_1') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('p2p_order_breadcrum_2') }}</a-breadcrumb-item>
      <a-breadcrumb-item style="color: #000">{{
        breadcrumb
      }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="p2p-background-image"></div>

    <div>
      <component :is="current[0]"></component>
    </div>
  </div>
</template>

<script>
import Market from '~/components/P2P/AllP2POrders'
import History from '~/components/P2P/History'

export default {
  middleware: ['auth'],
  head(){
    return{
      title: 'P2P Açık İşlemler | Cointral.com',
    }
  },
  data: () => ({
    title: null,
    breadcrumb: null,
    current: ['Market'],
    currentComponent: 'Market',
  }),

  components: {
    Market,
    History,
  },

  mounted() {
    //this.$router.push(this.localeRoute('/soon'))
    // Change name of the title and breadcrumb
    this.displayTitle()
    this.displayBreadcrumbName()
  },

  methods: {
    menuChanged() {
      // Change name of the title and breadcrumb
      this.displayTitle()
      this.displayBreadcrumbName()
    },

    displayTitle() {
      if (this.currentComponent === 'Market') {
        this.title = this.$t('p2p_market')
      } else if (this.currentComponent === 'History') {
        this.title = 'P2P İŞLEM GEÇMİŞİ'
      }
    },

    displayBreadcrumbName() {
      if (this.currentComponent === 'Market') {
        this.breadcrumb = this.$t('market')
      } else if (this.currentComponent === 'History') {
        this.title = 'P2P İşlem Geçmişi'
      }
    },

    changeCurrentComponent(component) {
      // Change name of the title and breadcrumb
      this.displayTitle()
      this.displayBreadcrumbName()

      // Change Current Displayed Component
      this.currentComponent = component
    },
  },
}
</script>

<style scoped>  
.p2p-breadcrumb {
  position: absolute;
  top: 80px;
  left: 140px;
  color: #000 !important;
  z-index: 5;
}

.p2p-background-image {
    height: 50px;
    width: 100%;
    background: #FAFAFA;
}

.centered {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 40px;
}

.p2p-main-tab {
  position: absolute;
  top: 250px;
  color: white !important;
  z-index: 5;
}

.p2p-another-tab {
  position: absolute;
  top: 250px;
  color: white !important;
  z-index: 5;
}

.p2p-menu {
  background-color: transparent;
  color: white;
  border-bottom: 2px solid transparent !important;
}
</style>
