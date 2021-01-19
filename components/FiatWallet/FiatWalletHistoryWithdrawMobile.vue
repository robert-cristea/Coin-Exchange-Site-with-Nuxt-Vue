<template>
  <a-col
    style="background-color: #ffffff; padding-left: 10px; padding-right: 10px"
  >
    <a-col :span="24" style="text-align: start">
      <div style="font-size: 32px; color: #1c2640">{{ title }}</div>
    </a-col>

    <a-col :span="24">
      <div v-if="historyData.length === 0" class="Roboto-Regular empty-wrapper">
        <icon-not-found />
      </div>
      <div v-if="historyData">
        <div
          class="Roboto-Regular"
          :key="index"
          v-for="(item, index) in historyData"
        >
          <a-col class="mobile-row" :span="24">
            <a-col class="Roboto-Bold" :span="12">
              {{ $t('fiat_wallet_asset') }}</a-col
            >
            <a-col :span="12" align="right">
              <img
                height="20"
                :src="
                  require(`~/assets/icons/${item['Asset'].toLowerCase()}.svg`)
                "
                style="margin-bottom: 2px"
                alt
              />
              {{ item['Asset'] }}
              <u>{{ item['Asset'] }}</u>
            </a-col>
          </a-col>

          <a-col class="mobile-row" :span="24">
            <a-col class="Roboto-Bold" :span="12">
              {{ $t('fiat_wallet_status') }}
            </a-col>
            <a-col :span="12" align="right">
              <a-tag color="green">
                <!-- v-if="item.status === 1" -->
                {{ item['Status'] }}
              </a-tag>
              <!--            <a-tag v-else color="red">-->
              <!--              Tamamlanmadı-->
              <!--            </a-tag>-->
            </a-col>
          </a-col>

          <a-col class="mobile-row" :span="24">
            <a-col class="Roboto-Bold" :span="12">
              {{ $t('fiat_wallet_quantity') }}
            </a-col>
            <a-col :span="12" align="right">
              {{ item['Amount'] }}
            </a-col>
          </a-col>

          <a-col class="mobile-row" :span="24">
            <a-col class="Roboto-Bold" :span="8">
              {{ $t('fiat_wallet_address') }}
            </a-col>
            <a-col :span="16" align="right">
              {{ item['To'] }}
            </a-col>
          </a-col>

          <a-col class="mobile-row" style="margin-bottom: 20px" :span="24">
            <a-col class="Roboto-Bold" :span="8">
              {{ $t('fiat_wallet_date') }}
            </a-col>
            <a-col :span="16" align="right">
              {{ getTime(item['DateTime']) }}
            </a-col>
          </a-col>

          <a-divider class="mobile-row" type="horizontal" />
        </div>
      </div>
    </a-col>
  </a-col>
</template>

<script>
import IconNotFound from '@/components/Icons/IconNotFound.vue'
export default {
  name: 'FiatWalletHistoryMobile',
  components: {
    IconNotFound,
  },
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

  data: () => ({}),

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
.empty-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
