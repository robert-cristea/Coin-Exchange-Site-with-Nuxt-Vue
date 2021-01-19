<template>
  <div class="actions">
    <a-tabs type="card" :animated="false">
      <a-tab-pane key="1" tab="Limit">
        <ActionTab
          :UserBalance="UserBalance"
          @tradeUpdate="(payload) => $emit('tradeUpdate', payload)"
          Type="LIMIT"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Piyasa">
        <ActionTab
          :UserBalance="UserBalance"
          @tradeUpdate="(payload) => $emit('tradeUpdate', payload)"
          Type="MARKET"
          :is-total-show="false"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Stop-Limit">
        <ActionTab
          :UserBalance="UserBalance"
          @tradeUpdate="(payload) => $emit('tradeUpdate', payload)"
          Type="STOP-LIMIT"
          :show-stop="true"
          :show-limit="false"
          :show-price="true"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import ActionTab from './ActionTab'
export default {
  props: {
    UserBalance: {
      require: true,
      type: Object,
    },
  },
  components: {
    ActionTab,
  },
  methods: {},
}
</script>

<style lang="less">
.actions {
  .ant-tabs {
    .ant-tabs-content {
      height: 100%;
    }
  }
  .ant-tabs-bar {
    border-bottom: 0;
    .ant-tabs-nav {
      width: 100%;
      display: flex;

      > div {
        flex: 1;
        display: flex;
      }

      .ant-tabs-tab {
        flex: 1;
        background: transparent;
        color: var(--action-tabs-item-text-color);
        border: 1px solid var(--action-tabs-item-border-color);
        border-radius: 6px;
        font-family: Roboto-Medium;
        transition: none;
        text-align: center;
        margin-right: 2px;
        margin-left: 2px;

        /* &:nth-child(3) {
          margin-left: 10px;
        } */

        &-active {
          color: #161b22;
          background: #90dafe;
          font-weight: initial;
          border: none;
        }
      }
    }
  }
}
.ant-tabs-ink-bar {
  display: none;
}
</style>
