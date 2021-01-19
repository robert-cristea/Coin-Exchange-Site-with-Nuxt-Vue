<template>
  <div
    class="fiat-symbol-list-wrapper"
    :class="{ rounded: !isLiteType, 'lite-background': isLiteType }"
  >
    <a-list class="fiat-symbol-list" :data-source="getTryAssets">
      <div v-if="!isLiteType" slot="header" class="symbol-list-header">
        <div class="symbol-table-head-title Roboto-Regular">
          {{ $t('text_crypto_markets') }}
        </div>
      </div>
      <a-list-item
        class="symbol-list-item cursor-pointer"
        slot="renderItem"
        slot-scope="item, index"
        :key="index"
        @click="selectSymbol(item)"
      >
        <a-list-item-meta>
          <div slot="title" class="symbol-list-title-row">
            <a-row>
              <a-col :span="12">
                <span>
                  <img
                    :src="getAssetIcon(item.BaseAsset)"
                    width="18px"
                    height="18px"
                    alt="alt-asset-icon"
                    style="margin-bottom: 2px; margin-right: 4px"
                  />
                </span>
                <span class="asset-name text-white Roboto-Regular">
                  {{ isLiteType ? item.BaseAssetName : item.BaseAsset }}
                </span>
                <span
                  class="asset-symbol Roboto-Regular"
                  :class="{ 'small-text': isLiteType }"
                >
                  {{ item.QuatoAsset }}
                </span>
              </a-col>
              <a-col :span="5" class="text-right">
                <span
                  v-if="!isLiteType"
                  class="text-white symbol-list-value Roboto-Regular"
                >
                  {{
                    formatPriceWithGivenDecimalLength(
                      item.LastPrice,
                      item.SymbolPriceDecimalLenght
                    )
                  }}
                </span>
              </a-col>
              <a-col :span="2">
                <span
                  v-if="!isLiteType"
                  class="text-white symbol-list-value Roboto-Regular"
                >
                  TL
                </span>
              </a-col>
              <a-col :span="4" class="text-right">
                <span
                  class="symbol-list-value Roboto-Regular"
                  :class="{
                    'text-danger': item.ChangePercent24H <= 0,
                    'text-success': item.ChangePercent24H > 0,
                  }"
                >
                  %{{ item.ChangePercent24H.toFixed(2) }}
                </span>
              </a-col>
              <a-col :span="1">
                <span>
                  <a-icon
                    v-if="item.ChangePercent24H > 0"
                    class="text-success"
                    type="arrow-up"
                  />
                  <a-icon
                    v-if="item.ChangePercent24H <= 0"
                    class="text-danger"
                    type="arrow-down"
                  />
                </span>
              </a-col>
            </a-row>
          </div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatter from '~/Mixins/formatter'
export default {
  name: 'FiatSymbolList',
  props: {
    type: {
      type: String,
      default: 'list',
      required: false,
    },
  },
  mixins: [formatter],
  methods: {
    selectSymbol(item) {
      this.$emit('AssetSelect')
      this.$store.dispatch('symbol/updateData', [
        item.BaseAsset,
        item.QuatoAsset,
      ])
      this.$store.commit('transactions/updateActionPrice', item.LastPrice)
      this.$emit('SymbolSelect')
    },
    getAssetIcon(BaseAsset) {
      try {
        return require(`~/assets/icons/${BaseAsset.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
      getSymbols: 'symbol/getSymbols',
    }),
    isLiteType() {
      return this.type === 'LITE'
    },
    getTryAssets() {
      return this.getSymbols.filter((symbol) => symbol.QuatoAsset === 'TRY')
    },
  },
}
</script>

<style scoped>
.fiat-symbol-list-wrapper {
  padding: 14px 0 16px;
  border: solid 1px #293248;
  background-color: #1e2430;
}
.lite-background {
  background-color: #1f2333;
}
.rounded {
  border-radius: 6px;
}
.fiat-symbol-list >>> .ant-list-header {
  padding: 0;
  border-bottom: 0;
}
.symbol-list-item {
  padding: 6px 12px;
  border-bottom: 1px solid #2a3245;
}
.symbol-list-item:hover {
  background-color: #394152;
}
.asset-name,
.asset-symbol,
.symbol-list-value,
.symbol-table-breadcrumb {
  font-size: 12px;
}
.symbol-table-breadcrumb {
  padding: 6px 12px;
  color: #7889aa;
}
.symbol-table-breadcrumb >>> .ant-breadcrumb-separator {
  color: #7889aa;
}
.symbol-table-head-title {
  padding: 6px 12px;
  background-color: #333b4b;
  color: #7889aa;
}
.asset-symbol {
  color: #7889aa;
}
.small-text {
  font-size: 10px !important;
  color: #86878e !important;
}
</style>
