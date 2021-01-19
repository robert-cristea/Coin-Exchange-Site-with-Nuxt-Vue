<template>
  <a-spin :spinning="isTradeLoading">
    <a-card
      class="lite-card border-none"
      :head-style="{ padding: 0 }"
      :body-style="{ padding: 0 }"
    >
      <div slot="title" class="lite-card-title">
        <a-dropdown
          v-model="liteSymbolListDropdown"
          @click="liteSymbolListDropdown = true"
        >
          <div class="lite-dropdown-content">
            <span class="asset-icon">
              <img
                :src="getAssetIcon()"
                style="vertical-align: bottom"
                alt="alt-asset-icon"
              />
            </span>
            <span class="asset-name text-white Roboto-Regular">
              {{ getSymbolData.BaseAssetName }}
            </span>
            <span class="base-asset-symbol text-white Roboto-Regular">
              {{ getSymbolData.BaseAsset }}
            </span>
            <a-icon
              class="lite-dropdown-icon"
              :type="liteSymbolListDropdown ? 'down' : 'up'"
            />
          </div>
          <FiatSymbolList
            type="LITE"
            @AssetSelect="liteSymbolListDropdown = false"
            slot="overlay"
            :style="{ width: '80%' }"
          />
        </a-dropdown>
      </div>
      <div class="lite-card-content">
        <div class="lite-card-price-wrapper">
          <h1 align="center" class="lite-card-price m-0 text-white Roboto-Bold">
            ₺
            {{
              formatAll(
                activeLiteTab === 'SELL' ? HighestBid[0] : LowestAsk[0],
                'PRICE'
              )
            }}
          </h1>
          <p
            align="center"
            class="lite-card-price-change m-0 Roboto-Regular"
            :class="{
              'text-danger': statistics.P <= 0,
              'text-success': statistics.P > 0,
            }"
          >
            {{ formatPriceWithGivenDecimalLength(statistics.P, 2) }}

            <a-icon
              v-if="statistics.P > 0"
              class="text-success"
              type="arrow-up"
            />
            <a-icon
              v-if="statistics.P <= 0"
              class="text-danger"
              type="arrow-down"
            />
          </p>
        </div>
        <a-tabs id="lite-card-tabs" v-model="activeLiteTab">
          <a-tab-pane
            v-for="t in tabListLite"
            :key="t.key"
            class="Roboto-Bold lite-tab-inactive"
          >
            <span
              v-if="t.key === 'BUY'"
              slot="tab"
              class="lite-tab lite-tab-inactive Roboto-Bold"
              :class="{
                'text-success': activeLiteTab === 'BUY',
              }"
            >
              {{ $t('text_buy_asset', { asset: getSymbolData.BaseAssetName }) }}
            </span>
            <span
              v-if="t.key === 'SELL'"
              slot="tab"
              class="lite-tab lite-tab-inactive Roboto-Bold"
              :class="{
                'text-danger': activeLiteTab === 'SELL',
              }"
            >
              {{
                $t('text_sell_asset', { asset: getSymbolData.BaseAssetName })
              }}
            </span>
          </a-tab-pane>
        </a-tabs>
        <a-row type="flex" align="middle" justify="center" :gutter="[12, 12]">
          <a-col :span="22">
            <div class="wrapper-amount-input">
              <label
                id="buy-amount-label"
                v-show="showBuyAmountLabel"
                for="buy-amount"
              >
                {{
                  $t('text_amounttobuy', {
                    BaseAssetName: getSymbolData.BaseAssetName,
                    BaseAsset: getSymbolData.BaseAsset,
                  })
                }}
              </label>
              <a-input-number
                id="buy-amount"
                @blur="showBuyAmountLabel = false"
                @focus="showBuyAmountLabel = true"
                :placeholder="
                  $t('text_amounttobuy', {
                    BaseAssetName: getSymbolData.BaseAssetName,
                    BaseAsset: getSymbolData.BaseAsset,
                  })
                "
                @keyup.enter="trade"
                :parser="(v) => (isNaN(v) ? Number(buyQuantity) : v)"
                class="amount-input"
                v-if="activeLiteTab === 'BUY'"
                v-model="buyQuantity"
                size="large"
              >
              </a-input-number>
              <label
                id="sell-amount-label"
                v-show="showSellAmountLabel"
                for="sell-amount"
              >
                {{
                  $t('text_amounttosell', {
                    BaseAssetName: getSymbolData.BaseAssetName,
                    BaseAsset: getSymbolData.BaseAsset,
                  })
                }}
              </label>
              <a-input-number
                id="sell-amount"
                @blur="showSellAmountLabel = false"
                @focus="showSellAmountLabel = true"
                :placeholder="
                  $t('text_amounttosell', {
                    BaseAssetName: getSymbolData.BaseAssetName,
                    BaseAsset: getSymbolData.BaseAsset,
                  })
                "
                @keyup.enter="trade"
                :parser="(v) => (isNaN(v) ? Number(sellQuantity) : v)"
                class="amount-input"
                v-if="activeLiteTab === 'SELL'"
                v-model="sellQuantity"
                size="large"
              >
              </a-input-number>
            </div>
          </a-col>
          <a-col :span="2">
            <a-icon
              @click="calculatePercent"
              class="percent-icon"
              type="plus-square"
            ></a-icon>
          </a-col>
        </a-row>

        <p align="right" class="lite-card-available Roboto-Regular">
          Kullanılabilir
          {{
            activeLiteTab === 'BUY'
              ? getSymbolData.QuatoAssetBalance
              : getSymbolData.BaseAssetBalance
          }}
        </p>

        <a-button
          :class="{
            'btn-success': activeLiteTab === 'BUY',
            'btn-danger': activeLiteTab === 'SELL',
          }"
          size="large"
          class="lite-card-btn border-none Roboto-Regular"
          block
          @click="trade"
          :loading="false"
        >
          {{
            activeLiteTab === 'BUY'
              ? $t('text_buy_asset', { asset: getSymbolData.BaseAssetName })
              : $t('text_sell_asset', { asset: getSymbolData.BaseAssetName })
          }}
        </a-button>
      </div>
    </a-card>
  </a-spin>
</template>

<script>
import formatter from '~/Mixins/formatter'
import { mapGetters } from 'vuex'

export default {
  name: 'LiteCard',
  mixins: [formatter],
  props: {
    statistics: {
      type: Object,
      default: () => {},
    },
    HighestBid: {
      type: Array,
      default: () => [],
    },
    LowestAsk: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
    }),
  },
  data() {
    return {
      sellQuantity: undefined,
      buyQuantity: undefined,
      liteSymbolListDropdown: false,
      isTradeLoading: false,
      tabListLite: [
        { key: 'BUY', scopedSlots: { tab: 'titleSlot' } },
        { key: 'SELL', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeLiteTab: 'BUY',

      showBuyAmountLabel: false,
      showSellAmountLabel: false,
    }
  },
  methods: {
    async trade() {
      try {
        const { Symbol, LastPrice } = this.getSymbolData
        this.isTradeLoading = true
        const {
          $axios,
          $cookies,
          $config: { FINANCE_API_URL },
        } = this
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const {
          data: { Success, Message, Order },
        } = await $axios.post(
          FINANCE_API_URL + '/Trade',
          {
            Price: LastPrice,
            ReverseMarketBuy: true,
            Type: 'MARKET',
            Side: this.activeLiteTab,
            Symbol,
            Quantity:
              this.activeLiteTab === 'BUY'
                ? this.buyQuantity
                : this.sellQuantity,
          },
          {
            headers: authHeaders,
          }
        )
        if (Success) {
          this.$notification.open({
            message: this.$t('text_success'),
            description: this.$t('text_transaction_success'),
          })
        } else {
          this.$notification.open({
            message: this.$t('text_failed'),
            description: Message,
          })
        }
      } catch (e) {
        if ('response' in e) {
          const { Message } = e.response.data
          this.$notification.open({
            message: this.$t('text_error'),
            description: Message,
          })
        }
      } finally {
        this.isTradeLoading = false
        this.sellQuantity = undefined
        this.buyQuantity = undefined
      }
    },
    getAssetIcon() {
      const { BaseAsset } = this.getSymbolData
      try {
        return require(`~/assets/icons/${BaseAsset.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },

    calculatePercent() {
      const { QuatoAssetBalance, BaseAssetBalance } = this.getSymbolData
      if (this.activeLiteTab === 'BUY') {
        this.buyQuantity = QuatoAssetBalance / Number(this.LowestAsk[0])
      }
      if (this.activeLiteTab === 'SELL') {
        this.sellQuantity = BaseAssetBalance / Number(this.HighestBid[0])
      }
    },
  },

  watch: {
    activeLiteTab: {
      handler: function () {
        this.$emit('tabChange', this.activeLiteTab)
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper-amount-input {
  position: relative;
  #buy-amount-label,
  #sell-amount-label {
    font-family: 'Roboto-Regular';
    color: #ffffff;
    position: absolute;
    z-index: 1;
    top: -10px;
    left: 5px;
    font-size: 12px;
    transition: display 1s;
  }
}
</style>

<style scoped>
.lite-card-price-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.lite-card {
  padding: 33.9px 35px 24px 37px;
  background-color: #2c3248;
  border-radius: 12px;
}
.lite-card-price {
  font-size: 41px;
}
.lite-card-price {
  font-size: 41px;
}
.lite-card-available {
  margin-top: 5px;
  font-size: 12px;
  color: #bbbcbf;
}
#lite-card-tabs >>> .ant-tabs-nav {
  width: 100%;
}
#lite-card-tabs >>> .ant-tabs-nav > div {
  width: 100%;
  display: flex;
}
.lite-tab-inactive {
  color: #86878e;
}
.lite-card-btn {
  color: #ffffff;
}
.btn-success {
  background-color: #1dc076;
}
.btn-danger {
  background-color: #e84362;
}
.lite-tab {
  font-size: 14px;
}
#lite-collapse >>> .ant-collapse-header {
  color: #bbbcbf;
}

.lite-dropdown-content {
  cursor: pointer;
  padding: 8px 20.6px 10px 10px;
  border-radius: 4px;
}
.lite-dropdown-icon {
  width: 18.7px;
  height: 10.4px;
  color: #869dcc;
}

.asset-name {
  font-size: 23px;
}
.base-asset-symbol {
  opacity: 0.5;
  font-size: 15px;
}
.lite-card-title {
  border-bottom: 1px solid #5b6996;
}
.amount-input {
  width: 100%;
  border: none;
  background: transparent;
  color: white;
}
#lite-collapse >>> .ant-collapse-content-box {
  padding: 0;
}
.percent-icon {
  cursor: pointer;
  color: #bbbcbf;
  font-size: 14px;
}
</style>
