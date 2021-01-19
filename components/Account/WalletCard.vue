<template>
  <a-card class="account-card border-none h-100" :bodyStyle="{ padding: 0 }">
    <h4
      slot="title"
      style="margin: 0"
      class="Roboto-Bold account-default-text-color"
    >
      {{ $t('text_wallets') }}
    </h4>
    <div slot="extra" class="Roboto-Medium">
      <a-button
        v-if="activeKey !== 'P2P Wallet'"
        type="primary"
        @click="$router.push(localeRoute('/my/wallet/main-wallet/deposit/BTC'))"
      >
        {{ $t('text_deposit') }}
      </a-button>
      <a-button
        v-if="activeKey !== 'P2P Wallet'"
        @click="
          $router.push(localeRoute('/my/wallet/main-wallet/withdraw/BTC'))
        "
      >
        {{ $t('text_donotpull') }}
      </a-button>
      <a-button
        v-if="activeKey == 'P2P Wallet'"
        type="primary"
        @click="$router.push(localeRoute('/P2P/Market'))"
      >
        {{ $t('text_purchase') }}
      </a-button>
      <a-button
        v-if="activeKey == 'P2P Wallet'"
        @click="$router.push(localeRoute('/P2P/Market'))"
      >
        {{ $t('text_sale') }}
      </a-button>
      <a-button
        class="border-none"
        @click="$router.push(localeRoute('/my/wallet/main-wallet'))"
        ><a-icon type="right"
      /></a-button>
    </div>
    <a-card
      :tabList="tabList"
      :active-tab-key="activeKey"
      @tabChange="(key) => (activeKey = key)"
      class="border-none"
    >
      <span
        slot="titleSlot"
        slot-scope="item"
        class="Roboto-Medium account-default-text-color"
        :class="{
          'tab-label-active': item.key === activeKey,
          'tab-label-inactive': item.key !== activeKey,
        }"
      >
        <span v-if="item.key === 'Main Wallet'">{{
          $t('text_main_wallet')
        }}</span>
        <!-- <span v-if="item.key === 'P2P Wallet'">{{
          $t('text_p2p_wallet')
        }}</span> -->
        <span v-if="item.key === 'Fiat Wallet'">{{
          $t('text_fiat_wallet')
        }}</span>
      </span>
      <a-row v-if="activeKey === 'Main Wallet'" class="account-card-tab-row">
        <a-col :span="16">
          <div class="Roboto-Medium">
            <p
              style="margin: 0"
              class="account-card-secondary-text Roboto-Regular"
            >
              {{ $t('text_account_balance') }}
            </p>
            <div class="account-card-flex">
              <h1 class="account-default-text-color">
                <span v-if="hideMainBalance">*****</span>
                <span v-else>{{ UserBalance.TotalSpotBalanceInBtc }}</span>
                &nbsp;<small>BTC</small>
              </h1>
              <a-button
                class="account-card-flex-button"
                shape="round"
                @click="hideMainBalance = !hideMainBalance"
              >
                <img
                  v-if="hideMainBalance"
                  src="~/assets/images/eye.svg"
                  width="15"
                  style="margin-right: 5px"
                />
                <img
                  v-else
                  src="~/assets/images/eye.svg"
                  width="15"
                  style="margin-right: 5px"
                />
                <span v-if="hideMainBalance">
                  {{ $t('text_show_balance') }}
                </span>
                <span v-else>{{ $t('text_hide_balance') }}</span>
              </a-button>
            </div>
          </div>
          <div class="Roboto-Medium">
            <p
              style="margin: 0"
              class="account-card-secondary-text Roboto-Regular"
            >
              {{ $t('text_estimated_value') }}
            </p>
            <h2 class="account-default-text-color">
              <span v-if="hideMainBalance">*****</span>
              <span v-else>{{ UserBalance.TotalSpotBalanceInTRY }}</span>
              &nbsp;<small>TRY</small>
              <br />
              <span v-if="hideMainBalance">*****</span>
              <span v-else>{{ UserBalance.TotalSpotBalanceInUSD }}</span>
              &nbsp;<small>USD</small>
            </h2>
          </div>
        </a-col>
      </a-row>
      <a-row v-if="activeKey === 'P2P Wallet'" class="account-card-tab-row">
        <a-col :span="16">
          <div class="Roboto-Medium">
            <p
              style="margin: 0"
              class="account-card-secondary-text Roboto-Regular"
            >
              {{ $t('text_account_balance') }}
            </p>
            <div class="account-card-flex">
              <h1 class="account-default-text-color">
                <span v-if="hideP2PBalance">*****</span>
                <span v-else>{{ UserBalance.TotalP2PBalanceInBtc }}&nbsp;</span>
                <small>BTC</small>
              </h1>
              <a-button
                class="account-card-flex-button"
                shape="round"
                @click="hideP2PBalance = !hideP2PBalance"
              >
                <span v-if="hideP2PBalance">{{ $t('text_show_balance') }}</span>
                <span v-else>{{ $t('text_hide_balance') }}</span>
              </a-button>
            </div>
          </div>
          <div class="Roboto-Medium">
            <p
              style="margin: 0"
              class="account-card-secondary-text Roboto-Regular"
            >
              {{ $t('text_estimated_value') }}
            </p>
            <h2 class="account-default-text-color">
              <span v-if="hideP2PBalance">*****</span>
              <span v-else>{{ UserBalance.TotalP2PBalanceInTRY }}</span>
              &nbsp;<small>TRY</small>
              <br />
              <span v-if="hideP2PBalance">*****</span>
              <span v-else>{{ UserBalance.TotalP2PBalanceInUSD }}</span>
              &nbsp;<small>USD</small>
            </h2>
          </div>
        </a-col>
      </a-row>
      <a-row v-if="activeKey === 'Fiat Wallet'" class="account-card-tab-row">
        <a-col :span="16">
          <div class="Roboto-Medium">
            <p
              style="margin: 0"
              class="account-card-secondary-text Roboto-Regular"
            >
              {{ $t('text_account_balance') }}
            </p>
            <div class="account-card-flex">
              <h1 class="account-default-text-color">
                <span v-if="hideFiatBalance">*****</span>
                <span v-else>{{ UserBalance.TotalFiatBalanceInBtc }}</span
                >&nbsp;
                <small>BTC</small>
              </h1>
              <a-button
                class="account-card-flex-button"
                shape="round"
                @click="hideFiatBalance = !hideFiatBalance"
              >
                <span v-if="hideFiatBalance">{{
                  $t('text_show_balance')
                }}</span>
                <span v-else>{{ $t('text_hide_balance') }}</span>
              </a-button>
            </div>
          </div>
          <div class="Roboto-Medium">
            <p
              style="margin: 0"
              class="account-card-secondary-text Roboto-Regular"
            >
              {{ $t('text_estimated_value') }}
            </p>
            <h2 class="account-default-text-color">
              <span v-if="hideFiatBalance">*****</span>
              <span v-else>{{ UserBalance.TotalFiatBalanceInTRY }}</span>
              &nbsp;<small>TRY</small>
              <br />
              <span v-if="hideFiatBalance">*****</span>
              <span v-else>{{ UserBalance.TotalFiatBalanceInUSD }}</span>
              &nbsp;<small>USD</small>
            </h2>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </a-card>
</template>
<script>
import tree from 'ant-design-vue/lib/tree'
export default {
  data() {
    return {
      tabList: [
        { key: 'Main Wallet', scopedSlots: { tab: 'titleSlot' } },
        { key: 'P2P Wallet', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Fiat Wallet', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKey: 'Main Wallet',
      UserBalance: {},
      hideMainBalance: true,
      hideP2PBalance: true,
      hideFiatBalance: true,
    }
  },
  mounted() {
    this.getUserBalance()
  },
  methods: {
    async getUserBalance() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetUserBalance', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        this.UserBalance = response.data
      }
    },
  },
}
</script>

<style lang="less" scoped>
.account-card {
  box-shadow: 0px 0px 9px #00000012;
  border-radius: 4px;
}
.account-card-flex {
  display: flex;
  justify-content: unset;
}

.account-card-secondary-text {
  color: #778090;
}
.account-default-text-color {
  color: var(--text-color);
}

.account-card-flex-button {
  font-size: 12px;
  margin-top: 5px;
  margin-left: 15px;
}
</style>
