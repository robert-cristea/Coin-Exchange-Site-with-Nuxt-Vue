<template>
  <a-row :gutter="[8, 8]">
    <a-col>
      <a-button-group class="w-100" size="large">
        <a-button
          @click="ActionType = 'BUY'"
          class="w-50 action-mobile-header-button"
          :class="{ isBuy: ActionType === 'BUY' }"
          >{{ $t('text_mobile_trade_buy') }}</a-button
        >
        <a-button
          @click="ActionType = 'SELL'"
          class="w-50 action-mobile-header-button"
          :class="{ isSell: ActionType === 'SELL' }"
          >{{ $t('text_mobile_trade_sell') }}</a-button
        >
      </a-button-group>
    </a-col>
    <a-col>
      <a-tabs
        v-model="actionActiveKey"
        :forceRender="true"
        :tabBarStyle="{ borderBottom: '1px solid #2B2E35' }"
      >
        <a-tab-pane
          v-for="(act, index) in actionTabs"
          :key="act.key"
          class="Roboto-Medium"
        >
          <span
            v-if="act.key === 'Limit'"
            slot="tab"
            :class="{
              'tab-label-action-active': act.key === actionActiveKey,
              'tab-label-action-inactive': act.key !== actionActiveKey,
            }"
          >
            Limit
          </span>
          <span
            v-if="act.key === 'Market'"
            slot="tab"
            :class="{
              'tab-label-action-active': act.key === actionActiveKey,
              'tab-label-action-inactive': act.key !== actionActiveKey,
            }"
          >
            Market
          </span>
          <span
            v-if="act.key === 'Stop-Limit'"
            slot="tab"
            :class="{
              'tab-label-action-active': act.key === actionActiveKey,
              'tab-label-action-inactive': act.key !== actionActiveKey,
            }"
          >
            Stop-Limit
          </span>

          <div v-if="actionActiveKey === 'Limit'">
            <ActionTabMobile
              :ActionType="ActionType"
              :UserBalance="UserBalance"
              @tradeUpdate="(payload) => $emit('tradeUpdate', payload)"
              Type="LIMIT"
            />
          </div>
          <div v-if="actionActiveKey === 'Market'">
            <ActionTabMobile
              :ActionType="ActionType"
              :UserBalance="UserBalance"
              @tradeUpdate="(payload) => $emit('tradeUpdate', payload)"
              Type="MARKET"
              :is-total-show="false"
            />
          </div>
          <div v-if="actionActiveKey === 'Stop-Limit'">
            <ActionTabMobile
              :ActionType="ActionType"
              :UserBalance="UserBalance"
              @tradeUpdate="(payload) => $emit('tradeUpdate', payload)"
              Type="STOP-LIMIT"
              :show-stop="true"
              :show-limit="false"
              :show-price="true"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import ActionTabMobile from '~/components/Exchange/ExchangeMobile/ActionTabMobile'
export default {
  props: {
    UserBalance: {
      required: true,
      type: Object,
    },
    ActionType: {
      required: true,
      type: String,
      default: 'BUY',
    },
  },
  components: {
    ActionTabMobile,
  },
  data() {
    return {
      actionTabs: [
        { key: 'Limit', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Market', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Stop-Limit', scopedSlots: { tab: 'titleSlot' } },
      ],
      actionActiveKey: 'Limit',
    }
  },
}
</script>

<style lang="less" scoped>
.tab-label-action-active {
  color: white;
}
.tab-label-action-inactive {
  color: #9399a4;
}
.action-mobile-header-button {
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
