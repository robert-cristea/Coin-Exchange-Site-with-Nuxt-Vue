<template>
  <a-card class="fiat-trade-form-card h-100">
    <div slot="title">
      <a-tabs v-model="activeTab" class="fiat-trade-tabs">
        <a-tab-pane v-for="act in tabList" :key="act.key" class="Roboto-Medium">
          <span
            v-if="act.key === 'BUY'"
            slot="tab"
            :class="{
              'tab-label-active': act.key === activeTab,
              'tab-label-inactive': act.key !== activeTab,
            }"
          >
            {{ $t('text_fiat_buy') }}
          </span>
          <span
            v-if="act.key === 'SELL'"
            slot="tab"
            :class="{
              'tab-label-active': act.key === activeTab,
              'tab-label-inactive': act.key !== activeTab,
            }"
          >
            {{ $t('text_fiat_sell') }}
          </span>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-tabs
      v-model="actionActiveKey"
      type="card"
      class="action-tabs"
      :forceRender="true"
    >
      <a-tab-pane
        v-for="(act, index) in actionTabs"
        :key="act.key"
        class="Roboto-Medium"
      >
        <span
          v-if="act.key === 'Limit'"
          slot="tab"
          class="w-100 Roboto-Medium"
          :class="{
            'tab-label-action-active': act.key === actionActiveKey,
            'tab-label-action-inactive': act.key !== actionActiveKey,
          }"
        >
          {{ $t('text_limit') }}
        </span>
        <span
          v-if="act.key === 'Market'"
          class="w-100 Roboto-Medium"
          slot="tab"
          :class="{
            'tab-label-action-active': act.key === actionActiveKey,
            'tab-label-action-inactive': act.key !== actionActiveKey,
          }"
        >
          {{ $t('text_market') }}
        </span>
        <span
          v-if="act.key === 'Stop-Limit'"
          class="Roboto-Medium"
          slot="tab"
          :class="{
            'tab-label-action-active': act.key === actionActiveKey,
            'tab-label-action-inactive': act.key !== actionActiveKey,
          }"
        >
          Stop-Limit
        </span>

        <div v-if="actionActiveKey === 'Limit'">
          <FiatActionTab :ActionType="activeTab" Type="LIMIT" />
        </div>
        <div v-if="actionActiveKey === 'Market'">
          <FiatActionTab
            :ActionType="activeTab"
            Type="MARKET"
            :is-total-show="false"
          />
        </div>
        <div v-if="actionActiveKey === 'Stop-Limit'">
          <FiatActionTab
            :ActionType="activeTab"
            Type="STOP-LIMIT"
            :show-stop="true"
            :show-limit="false"
            :show-price="true"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
export default {
  name: 'FiatTradeForm',
  data() {
    return {
      tabList: [
        { key: 'BUY', scopedSlots: { tab: 'titleSlot' } },
        { key: 'SELL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeTab: 'BUY',

      actionTabs: [
        { key: 'Limit', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Market', scopedSlots: { tab: 'titleSlot' } },
      ],
      actionActiveKey: 'Limit',
    }
  },
}
</script>

<style scoped>
.fiat-trade-form-card {
  border-radius: 7px;
  border: solid 1px #2f3a51;
  background-color: #1e2430;
}
.tab-label-active {
  font-size: 19px;
  color: #90dafe;
}
.tab-label-inactive {
  color: #71798a;
  font-size: 19px;
}
.action-tabs >>> .ant-tabs-bar {
  border-bottom: 0;
}
.action-tabs >>> .ant-tabs-nav {
  width: 100%;
  display: flex;
}
.action-tabs >>> .ant-tabs-tab {
  flex: 1 !important;
  background: transparent !important;
  color: #7889aa !important;
  border: solid 1px #47587e !important;
  border-radius: 3px !important;
  font-family: Roboto-Medium !important;
  transition: none !important;
  text-align: center !important;
  margin-right: 2px !important;
  margin-left: 2px !important;
}
.action-tabs >>> .ant-tabs-tab-active {
  color: #161b22 !important;
  background-color: #90dafe !important;
  border: none !important;
}
.action-tabs >>> .ant-tabs-nav div {
  display: flex;
  text-align: center;
  width: 100%;
}
.ant-tabs-ink-bar {
  display: none;
}
.fiat-trade-tabs >>> .ant-tabs-nav {
  width: 100%;
}
.fiat-trade-tabs >>> .ant-tabs-nav > div {
  width: 100%;
  display: flex;
}
</style>
