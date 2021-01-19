<template>
  <div id="tradeDrawerContainer" style="position: relative">
    <a-row
      v-if="isLoggedIn"
      class="w-100"
      style="margin: 10px auto"
      :gutter="16"
    >
      <a-col :span="12">
        <a-button
          @click="showDrawer('BUY', true)"
          class="action-mobile-drawer-button isBuy"
          size="large"
          block
          >{{ $t('text_mobile_trade_buy') }}</a-button
        >
      </a-col>
      <a-col :span="12">
        <a-button
          @click="showDrawer('SELL', true)"
          class="action-mobile-drawer-button isSell"
          size="large"
          block
          >{{ $t('text_mobile_trade_sell') }}</a-button
        >
      </a-col>
    </a-row>
    <!-- <p v-show="showTest" style="color: white; font-size: 28px">
      this is testttt xxxxx
    </p> -->
    <a-row v-if="!isLoggedIn" style="margin: 25px auto">
      <a-col :span="24">
        <div class="login-warning" v-if="!isLoggedIn">
          <div class="text-center text-white">
            <nuxt-link :to="localePath('/login')"> Giriş yapın </nuxt-link>
            veya
            <nuxt-link :to="localePath('/signup')"> Yeni Üyelik </nuxt-link>
            oluşturun.
          </div>
        </div>
      </a-col>
    </a-row>
    <a-drawer
      v-show="containerState"
      placement="bottom"
      :get-container="false"
      :closable="false"
      @close="containerState = false"
      :visible="containerState"
      :wrap-style="{ position: 'absolute' }"
      :header-style="{
        backgroundColor: '#1E2025',
        color: '#ffffff',
        borderBottom: '0',
        padding: '12px',
      }"
      :body-style="{
        backgroundColor: '#1E2025',
        padding: '12px',
        height: 'fit-content',
      }"
      :drawer-style="{ backgroundColor: '#1E2025' }"
    >
      <div class="drawer-header text-white Roboto-Regular" slot="title">
        <span> Emir oluştur </span>
        <span>
          <a-icon @click="containerState = false" type="menu" />
          <a-icon @click="containerState = false" type="close" />
        </span>
      </div>

      <div class="drawer-content">
        <ActionMobile
          :ActionType.sync="drawerType"
          :UserBalance="UserBalance"
        />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import ActionMobile from '~/components/Exchange/ExchangeMobile/ActionMobile'

export default {
  props: {
    UserBalance: {
      require: true,
      type: Object,
    },
  },
  components: {
    ActionMobile,
  },
  data() {
    return {
      containerState: false,
      drawerType: 'BUY',
      showTest: false,
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.$cookies.get('Token')
    },
  },
  methods: {
    showDrawer(type, state) {
      this.drawerType = type
      this.containerState = state
      this.showTest = state
      // alert(type)
    },
  },
}
</script>

<style lang="less" scoped>
.text-white {
  color: #fff !important;
}
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-mobile-drawer-button {
  box-shadow: none;
  background: transparent;
  border-color: #484c56;
  color: #9399a4;
  font-family: 'Roboto-Regular';
}
.isBuy {
  color: white;
  background-color: #51b375;
}
.isSell {
  color: white;
  background-color: #e55764;
}
</style>
<style>
.ant-drawer-content-wrapper {
  height: unset !important;
  max-height: 100vh;
}
</style>
