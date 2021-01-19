<template>
  <div class="Roboto-Regular">
    <a-breadcrumb class="p2p-breadcrumb">
      <span slot="separator" style="color: white">></span>
      <a-breadcrumb-item>{{ $t('processes') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('p2p_processes') }}</a-breadcrumb-item>
      <a-breadcrumb-item style="color: white">{{
        breadcrumb
      }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="p2p-background-image"></div>

    <div class="centered">{{ title }}</div>

    <a-col class="p2p-main-tab" offset="2" :span="10">
      <a-menu v-model="current" class="p2p-menu" mode="horizontal">
        <a-menu-item key="Market" @click="menuChanged">{{
          $t('p2p_market')
        }}</a-menu-item>
        <a-menu-item key="History" @click="menuChanged">{{
          $t('p2p_history')
        }}</a-menu-item>
      </a-menu>
    </a-col>

    <a-col class="p2p-another-tab" offset="12" :span="11" align="right">
      <a-menu v-model="current" class="p2p-menu" mode="horizontal">
        <a-menu-item key="Settings"
          ><a-icon type="setting" />{{ $t('payment_settings') }}</a-menu-item
        >
        <a-menu-item key="Orders"
          ><a-icon type="setting" />{{ $t('p2p_orders') }}</a-menu-item
        >
        <a-button
          class="ant-btn-primary"
          @click="$router.push(localePath('/P2PMarket/create'))"
          >{{ $t('p2p_place_new_order') }}</a-button
        >
      </a-menu>
    </a-col>

    <div>
      <component :is="current[0]"></component>
    </div>
  </div>
</template>

<script>
import Market from '~/components/P2P/Market'
import History from '~/components/P2P/History'

export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'P2P Market | Cointral.com',
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
  beforeMount() {
    const allowedHosts = ['localhost']
    if (!allowedHosts.includes(window.location.hostname)) {
      this.$router.push(this.localeRoute('/soon'))
    }
  },
  mounted() {
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
  color: white !important;
  z-index: 5;
}

.p2p-background-image {
  height: 256px;
  width: 100%;
  background: linear-gradient(
      to bottom,
      rgb(18, 57, 102),
      rgba(28, 36, 62, 0.73)
    ),
    url('../../assets/images/swap/background.png');
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
