<template>
  <a-col
    style="background-color: #ffffff; padding-left: 10px; padding-right: 10px"
  >
    <a-col :span="24" style="text-align: start">
      <div style="font-size: 32px; color: #1c2640">{{ title }}</div>
    </a-col>
    <a-col v-if="historyData.length" :span="24">
      <div
        class="Roboto-Regular"
        :key="index"
        v-for="(item, index) in historyData"
      >
        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('main_wallet_asset') }}
          </a-col>
          <a-col :span="12" align="right">
            <img
              height="20"
              :src="require(`~/assets/icons/${item.Asset.toLowerCase()}.svg`)"
              style="margin-bottom: 2px"
              alt
            />
            {{ item.Asset }}
            <u>{{ item['AssetName'] }}</u>
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('main_wallet_status') }}
          </a-col>
          <a-col :span="12" align="right">
            <a-tag color="green">
              <!-- v-if="item.status === 1" -->
              {{ item.Status }}
            </a-tag>
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('main_wallet_amount') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item.Amount }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="4">
            {{ $t('main_wallet_address') }}
          </a-col>
          <a-col :span="20" align="right">
            {{ item.Address }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('main_wallet_date') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ getTime(item.CreatedOn) }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" style="margin-bottom: 20px" :span="24">
          <a-col class="Roboto-Bold" :span="12"> TxId </a-col>
          <a-col :span="12" align="right">
            {{
              item['TxId']
                ? item['TxId']
                : item['TxHash']
                ? item['TxHash']
                : 'Not available'
            }}
          </a-col>
        </a-col>

        <a-divider class="mobile-row" type="horizontal" />
      </div>
    </a-col>
    <a-empty v-else />
  </a-col>
</template>

<script>
export default {
  name: 'MainWalletHistoryMobile',

  props: {
    historyData: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    columns: null,
    withdrawColumns: null,
    loading: false,
  }),

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
