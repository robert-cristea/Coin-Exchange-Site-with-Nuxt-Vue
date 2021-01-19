<template>
  <div class="fiat-symbol-list-wrapper" style="height: 280px">
    <a-list class="fiat-symbol-list" :data-source="UserBalance">
      <div slot="header" class="symbol-table-head-title Roboto-Regular">
        {{$t('text_tl_wallet_balances')}}
      </div>
      <a-list-item
        class="symbol-list-item cursor-pointer"
        slot="renderItem"
        slot-scope="item, index"
      >
        <a-list-item-meta>
          <div slot="title" class="symbol-list-title-row">
            <a-row>
              <a-col :span="12">
                <span>
                  <img
                    :src="getAssetIcon(item.asset)"
                    width="18px"
                    height="18px"
                    style="margin-bottom: 2px; margin-right: 4px"
                    alt="alt-asset-icon"
                  />
                </span>
                <span class="asset-name text-white Roboto-Regular">
                  {{ item.asset }}
                </span>
                <span class="asset-symbol Roboto-Regular text-right">
                  {{ item.Name }}
                </span>
              </a-col>

              <a-col :span="6">
                <span class="text-white symbol-list-value Roboto-Regular">
                  {{ item.free }}
                </span>
              </a-col>
              <a-col :span="6" class="text-right">
                <span
                  @click="visible = true"
                  class="cursor-pointer transfer-popup-wrapper text-right Roboto-Medium"
                >
                  Transfer
                </span>
                <a-modal
                  style="position: relative"
                  v-model="visible"
                  size="small"
                  :width="464"
                  @ok="visible = false"
                  :mask-style="{ background: '#1e2430', opacity: '0.2' }"
                  :body-style="{
                    padding: '32px',
                    borderBottomRightRadius: '20px',
                    borderBottomLeftRadius: '20px',
                  }"
                  :footer="null"
                >
                  <div slot="title">
                    <h4 class="m-0 Roboto-Medium">Transfer Et</h4>
                  </div>

                  <div slot="closeIcon" class="close-icon-transfer">
                    <a-icon type="close"></a-icon>
                  </div>
                  <TransferPopUp />
                </a-modal>
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

export default {
  name: 'FiatTransferList',
  props: {
    UserBalance: {
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    selectSymbol(item) {
      this.$store.dispatch('symbol/updateData', [
        item.BaseAsset,
        item.QuatoAsset,
      ])
      this.$store.commit('transactions/updateActionPrice', item.LastPrice)
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
    getTryAssets() {
      return this.getSymbols.filter((symbol) => symbol.QuatoAsset === 'TRY')
    },
  },
}
</script>

<style scoped>
.fiat-symbol-list-wrapper {
  padding: 14px 0 16px;
  border-radius: 6px;
  border: solid 1px #293248;
  background-color: #1e2430;
}
.fiat-symbol-list >>> .ant-list-header {
  padding: 0;
  border-bottom: 0;
}
.symbol-list-header {
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
.transfer-popup-wrapper {
  color: rgb(27, 164, 232);
}

@media screen and (max-width: 1000px) {
  .transfer-popup-wrapper {
    font-size: 12px;
  }
}
</style>
