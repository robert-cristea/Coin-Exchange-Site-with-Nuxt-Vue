<template>
  <a-tabs v-model="activeMobileOrderTab">
    <a-tab-pane v-for="(ot, index) in mobileOrderTabs" :key="ot.key">
      <span
        v-if="ot.key === 'openOrders'"
        slot="tab"
        class="Roboto-Medium"
        :class="{
          'tab-label-active-mobile': ot.key === activeMobileOrderTab,
          'tab-label-inactive-mobile': ot.key !== activeMobileOrderTab,
        }"
      >
        {{ $t('text_open_orders') }} ({{ openOrdersData.length }})
      </span>
      <span
        v-if="ot.key === 'last24HOrders'"
        slot="tab"
        class="Roboto-Medium"
        :class="{
          'tab-label-active-mobile': ot.key === activeMobileOrderTab,
          'tab-label-inactive-mobile': ot.key !== activeMobileOrderTab,
        }"
      >
        {{ $t('history_title') }}
      </span>

      <div
        class="order-list-container"
        v-show="activeMobileOrderTab === 'openOrders'"
      >
        <a-spin :spinning="isOpenOrdersLoading">
          <a-list item-layout="horizontal" :data-source="openOrdersData">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta>
                <div
                  slot="title"
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div class="order-list-item-title Roboto-Regular">
                    {{ item.Symbol }}
                    <span
                      :class="{
                        'order-buy': item.Side === 'BUY',
                        'order-sell': item.Side === 'SELL',
                      }"
                    >
                      <span class="order-list-item-side Roboto-Regular">
                        {{ item.Side }}
                      </span>
                      <span class="order-list-item-type Roboto-Regular">
                        {{ item.Type }}
                      </span>
                      <span
                        class="order-list-item-status Roboto-Regular order-status"
                      >
                        {{ item.Status }}
                      </span>
                    </span>
                  </div>
                  <div class="order-list-item-title Roboto-Regular">
                    <a-button
                      size="small"
                      type="secondary"
                      @click="$emit('cancelOpenOrder', item)"
                      >iptal</a-button
                    >
                  </div>
                </div>
                <div slot="description">
                  <a-row :gutter="16">
                    <a-col :span="12" class="text-left">
                      <span class="order-list-desc-label Roboto-Regular"
                        >Gerçekleştirilen / Miktar</span
                      >
                    </a-col>
                    <a-col :span="12" class="text-right">
                      <span class="order-list-desc-value Roboto-Regular">
                        {{ item.ExecutedBaseQuantity }}/{{
                          item.BaseQuantity
                        }}</span
                      >
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="12" class="text-left">
                      <span class="order-list-desc-label Roboto-Regular"
                        >Ortalama / Fiyat</span
                      >
                    </a-col>
                    <a-col :span="12" class="text-right">
                      <span class="order-list-desc-value Roboto-Regular">
                        {{ item.AveragePrice }}/{{ item.Price }}</span
                      >
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="12" class="text-left">
                      <span class="order-list-desc-label Roboto-Regular"
                        >Toplam</span
                      >
                    </a-col>
                    <a-col :span="12" class="text-right">
                      <span class="order-list-desc-value Roboto-Regular">
                        {{ item.ExecutedQuatoQuantity }}</span
                      >
                    </a-col>
                  </a-row>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-spin>
      </div>
      <div
        class="order-list-container"
        v-show="activeMobileOrderTab === 'last24HOrders'"
      >
        <a-list item-layout="horizontal" :data-source="last24HoursData">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <div slot="title">
                <div class="order-list-item-title">
                  {{ item.Symbol }}
                  <span
                    :class="{
                      'order-buy': item.Side === 'BUY',
                      'order-sell': item.Side === 'SELL',
                    }"
                  >
                    <span class="order-list-item-side">
                      {{ item.Side }}
                    </span>
                    <span class="order-list-item-type">
                      {{ item.Type }}
                    </span>
                    <span
                      class="order-list-item-status Roboto-Regular order-status"
                    >
                      {{ item.Status }}
                    </span>
                  </span>
                </div>
              </div>
              <div slot="description">
                <a-row :gutter="16">
                  <a-col :span="12" class="text-left">
                    <span class="order-list-desc-label Roboto-Regular"
                      >Gerçekleştirilen / Miktar</span
                    >
                  </a-col>
                  <a-col :span="12" class="text-right">
                    <span class="order-list-desc-value Roboto-Regular">
                      {{ String(item.ExecutedBaseQuantity) }}/{{
                        String(item.BaseQuantity)
                      }}</span
                    >
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12" class="text-left">
                    <span class="order-list-desc-label Roboto-Regular"
                      >Ortalama / Fiyat</span
                    >
                  </a-col>
                  <a-col :span="12" class="text-right">
                    <span class="order-list-desc-value Roboto-Regular">
                      <span>
                        {{
                          item.ExecutedBaseQuantity === 0
                            ? item.ExecutedBaseQuantity
                            : item.ExecutedBaseQuantity /
                              item.ExecutedQuatoQuantity
                        }}
                      </span>
                      /{{
                        parseFloat(item.Price) ? item.Price : 'Piyasa'
                      }}</span
                    >
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12" class="text-left">
                    <span class="order-list-desc-label Roboto-Regular"
                      >Toplam</span
                    >
                  </a-col>
                  <a-col :span="12" class="text-right">
                    <span class="order-list-desc-value Roboto-Regular">
                      {{ String(item.ExecutedQuatoQuantity) }}</span
                    >
                  </a-col>
                </a-row>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import formatter from '~/Mixins/formatter'
export default {
  mixins: [formatter],
  props: {
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
  data() {
    return {
      mobileOrderTabs: [
        { key: 'openOrders', scopedSlots: { tab: 'titleSlot' } },
        { key: 'last24HOrders', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeMobileOrderTab: 'openOrders',
    }
  },
}
</script>

<style scoped>
.order-list-container {
  max-height: 500px;
  overflow-y: scroll;
}
.order-list-container::-webkit-scrollbar {
  display: none;
}
.order-list-item-title {
  font-size: 14px;
  color: white;
}
.order-list-desc-label {
  color: #9399a4;
}
.order-list-desc-value {
  color: #ffffff;
}
.order-buy {
  color: #56bd8b;
}
.order-sell {
  color: #e35663;
}
.order-status {
  background-color: #1a342e;
  padding: 5px;
  border-radius: 3px;
}
.tab-label-active-mobile {
  color: white !important;
  font-size: 14px;
}
.tab-label-inactive-mobile {
  color: #868d9a !important;
  font-size: 14px;
}
</style>
