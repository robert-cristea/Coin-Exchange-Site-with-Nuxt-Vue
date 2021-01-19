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
            {{ $t('swap_history_date') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item['CreatedOn'] }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('swap_history_amount') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item.InAmount }} {{ item.InAsset }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="6">
            {{ $t('swap_history_price') }}
          </a-col>
          <a-col :span="18" align="right">
            1 {{ item.InAsset }} =
            {{ (item.OutAmount / item.InAmount).toFixed(6) }}
            {{ item.OutAsset }}
          </a-col>
        </a-col>

        <a-col class="mobile-row" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('swap_history_status') }}
          </a-col>
          <a-col :span="12" align="right">
            <a-tag color="green">
              {{ item.Status }}
            </a-tag>
            <!--{{ item.InAsset }} / {{ item.OutAsset }}-->
          </a-col>
        </a-col>

        <a-col class="mobile-row" style="margin-bottom: 20px" :span="24">
          <a-col class="Roboto-Bold" :span="12">
            {{ $t('swap_history_transaction_id') }}
          </a-col>
          <a-col :span="12" align="right">
            {{ item.SwapUniqueId }}
          </a-col>
        </a-col>
        <a-divider class="mobile-row" type="horizontal" />
      </div>

      <a-pagination
        v-model="pagination.current"
        :total="pagination.total"
        @change="$emit('getSwapData')"
      />
    </a-col>
  </a-col>
</template>

<script>
export default {
  name: 'SwapTableMobile',

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
