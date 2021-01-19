<template>
  <div style="background-color: #fafafa">
    <a-breadcrumb
      v-if="!isMobile"
      class="breadcrumb"
      style="margin-top: 20px; margin-left: 20px"
    >
      <a-breadcrumb-item>
        <a @click="SET_CURRENT_TAB('MainWallet')">
          {{ $t('main_wallet_label') }}
        </a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('main_text_withdraw') }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row style="margin-bottom: 20px">
      <a-col :offset="1" :span="23" style="text-align: start">
        <div class="Roboto-Regular" style="font-size: 32px; color: #1c2640">
          {{ $t('main_text_withdraw') }}
        </div>
      </a-col>
    </a-row>

    <a-row :class="!isMobile ? 'main-row' : 'main-row-mobile'">
      <Asset :transactionType="'withdraw'" />

      <Network
        :style="responsiveStyleBelowNineHundredPixels"
        :networkTitle="$t('withdraw_network')"
        :networkType="'withdraw'"
      />
    </a-row>

    <a-row style="margin-top: 20px; margin-bottom: 20px">
      <MainWalletHistory
        v-if="!isMobile"
        :historyData="WITHDRAW_HISTORY"
        :title="$t('withdraw_history')"
      />
      <MainWalletHistoryMobile
        v-if="isMobile"
        :historyData="WITHDRAW_HISTORY"
        :title="$t('withdraw_history')"
      />
    </a-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Withdraw',

  data: () => ({
    isMobile: null,
    windowWidth: null,
  }),

  computed: {
    ...mapGetters({
      USER_BALANCE: 'mainwallet/USER_BALANCE',
      WITHDRAW_HISTORY: 'mainwallet/WITHDRAW_HISTORY',
    }),

    responsiveStyleBelowNineHundredPixels() {
      if (this.windowWidth < 990) {
        return 'margin-top: 50px'
      } else {
        return ''
      }
    },
  },

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth

      this.isMobile = window.innerWidth < 1000
    })
  },

  methods: {
    ...mapMutations({
      SET_ASSETS: 'swap/SET_ASSETS',
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
    }),
  },
}
</script>

<style scoped>
.main-row {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000000a;
  opacity: 1;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-left: 40px;
  margin-right: 80px;
}

.main-row-mobile {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000000a;
  opacity: 1;
  padding-top: 50px;
  padding-bottom: 50px;
}

.breadcrumb {
  font-size: 12px;
  padding-bottom: 20px;
}
</style>
