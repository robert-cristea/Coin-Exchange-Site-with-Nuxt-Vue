<template>
  <a-col style="background-color: #ffffff">
    <a-col :span="24">
      <div
        class="Roboto-Regular"
        :key="index"
        v-for="(item, index) in historyData.slice(0, 5)"
      >
        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('orders_text_date') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item['CreatedOn'] }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('orders_text_provider') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item.Provider }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12"
            >{{ $t('orders_text_fiat_amount') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item.FiatCurrencyAmount }} {{ item.FiatCurrency }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('orders_text_coin_amount') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item.DigitalAssetAmount }} {{ item.DigitalAsset }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" style="margin-bottom: 20px" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('orders_text_status') }}
          </a-col>
          <a-col :span="12" align="right">
            <a-tag :color="item.StatusColor">
              {{ item.Status }}
            </a-tag>
          </a-col>
        </a-col>

        <a-divider class="mobile-row" type="horizontal" />
      </div>

      <a-pagination
        v-model="pagination.current"
        :total="pagination.total"
        @change="$emit('getBuyingHistory')"
      />
    </a-col>
  </a-col>
</template>

<script>
export default {
  name: 'BuyingTableMobile',

  props: {
    historyData: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getTime(val) {
      return new Date(val).toUTCString()
    },
  },
}
</script>

<style scoped>
.mobile-row {
  margin-top: 10px;
}
</style>
