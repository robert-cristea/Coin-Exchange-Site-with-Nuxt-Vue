<template>
  <div>
    <a-alert
      v-if="err.show"
      :description="err.msg"
      type="error"
      style="margin: 10px auto"
      closable
      @close="(e) => (err.show = false)"
    >
    </a-alert>

    <!-- BUY CARD -->

    <a-card
      v-if="ActionType === 'BUY'"
      class="trade-form-card-mobile h-100 w-100 border-none"
      :body-style="{ padding: '0' }"
    >
      <div class="trade-form-card-mobile-head">
        <img
          class="trade-form-card-mobile-head-item"
          src="~/assets/icons/wallet.svg"
          alt="wallet"
        />
        <span class="trade-form-card-mobile-head-item Roboto-Regular">
          {{ getSymbolData.QuatoAssetBalance }}
          {{ getSymbolData.QuatoAsset }}
        </span>
      </div>
      <div class="trade-form-card-mobile-content">
        <a-row :gutter="[6, 6]">
          <a-col>
            <a-input-number
              v-if="ShowStop"
              v-bind:placeholder="$t('placeholders_text_stop')"
              class="Roboto-Regular w-100 trade-form-card-mobile-input"
              :parser="(v) => (isNaN(v) ? Number(buyForm.Stop) : v)"
              v-model.Number="buyForm.Stop"
            />
          </a-col>
          <a-col>
            <a-input-number
              v-if="ShowLimit"
              v-bind:placeholder="$t('placeholders_text_limit')"
              class="Roboto-Regular w-100 trade-form-card-mobile-input"
              :parser="(v) => (isNaN(v) ? Number(buyForm.Limit) : v)"
              v-model.Number="buyForm.Limit"
            />
          </a-col>
          <a-col>
            <a-input-number
              v-if="ShowPrice"
              :disabled="Type === 'MARKET'"
              v-bind:placeholder="$t('placeholders_text_price')"
              class="Roboto-Regular w-100 trade-form-card-mobile-input"
              :parser="(v) => (isNaN(v) ? Number(buyForm.Price) : v)"
              v-model.Number="buyForm.Price"
            />
          </a-col>
          <a-col>
            <div class="QuantityContainer">
              <a-input-number
                v-bind:placeholder="$t('placeholders_text_amount')"
                class="Roboto-Regular w-100 trade-form-card-mobile-input"
                :parser="(v) => (isNaN(v) ? Number(this.buyForm.Quantity) : v)"
                v-model="buyForm.Quantity"
              />
              <span class="AssetSuffix"> {{ getSymbolData.BaseAsset }}</span>
            </div>
          </a-col>
          <a-col>
            <a-row :gutter="6">
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(25, 'BUY')"
                  class="trade-form-card-button"
                  block
                  >25%</a-button
                >
              </a-col>
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(50, 'BUY')"
                  class="trade-form-card-button"
                  block
                  >50%</a-button
                >
              </a-col>
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(75, 'BUY')"
                  class="trade-form-card-button"
                  block
                  >75%</a-button
                >
              </a-col>
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(100, 'BUY')"
                  class="trade-form-card-button"
                  block
                  >100%</a-button
                >
              </a-col>
            </a-row>
          </a-col>
          <a-col>
            <div class="TotalContainer" v-if="isTotalShow">
              <a-input-number
                v-bind:placeholder="$t('placeholders_text_total')"
                class="Roboto-Regular w-100 trade-form-card-mobile-input"
                :parser="(v) => (isNaN(v) ? Number(buyForm.Total) : v)"
                v-model="buyForm.Total"
              />
              <span class="AssetSuffix"> {{ getSymbolData.QuatoAsset }}</span>
            </div>
          </a-col>
          <a-col>
            <a-button
              style="margin: 10px auto"
              v-if="isLoggedIn"
              :loading="isBuyLoading"
              @click="trade('BUY')"
              size="large"
              class="trade-form-card-button isBuy w-100"
            >
              {{ $t('text_buy_asset', { asset: getSymbolData.BaseAsset }) }}
              <!-- Asset Al -->
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="trade-form-card-mobile-footer">
        <div class="login-warning" v-if="!isLoggedIn">
          <div class="text-center">
            <nuxt-link :to="localePath('/login')">
              {{ $t('exchange_text_login') }}
            </nuxt-link>
            {{ $t('exchange_text_or') }}
            <nuxt-link :to="localePath('/signup')">
              {{ $t('exchange_text_signup') }}
            </nuxt-link>
            {{ $t('exchange_text_create') }}
          </div>
        </div>
      </div>
    </a-card>

    <!-- SELL CARD -->

    <a-card
      v-if="ActionType === 'SELL'"
      class="trade-form-card-mobile h-100 w-100 border-none"
      :body-style="{ padding: '0' }"
    >
      <div class="trade-form-card-mobile-head">
        <img
          class="trade-form-card-mobile-head-item"
          src="~/assets/icons/wallet.svg"
          alt="wallet"
        />
        <span class="trade-form-card-mobile-head-item Roboto-Regular">
          {{ getSymbolData.BaseAssetBalance }}
          {{ getSymbolData.BaseAsset }}
        </span>
      </div>
      <div class="trade-form-card-mobile-content">
        <a-row :gutter="[6, 6]">
          <a-col>
            <a-input-number
              v-if="ShowStop"
              v-bind:placeholder="$t('placeholders_text_stop')"
              class="Roboto-Regular w-100 trade-form-card-mobile-input"
              :parser="(v) => (isNaN(v) ? Number(sellForm.Stop) : v)"
              v-model.Number="sellForm.Stop"
            />
          </a-col>
          <a-col>
            <a-input-number
              v-if="ShowLimit"
              v-bind:placeholder="$t('placeholders_text_limit')"
              class="Roboto-Regular w-100 trade-form-card-mobile-input"
              :parser="(v) => (isNaN(v) ? Number(sellForm.Limit) : v)"
              v-model.Number="sellForm.Limit"
            />
          </a-col>
          <a-col>
            <a-input-number
              v-if="ShowPrice"
              v-bind:placeholder="$t('placeholders_text_price')"
              :disabled="Type === 'MARKET'"
              class="Roboto-Regular w-100 trade-form-card-mobile-input"
              :parser="(v) => (isNaN(v) ? Number(sellForm.Price) : v)"
              v-model.Number="sellForm.Price"
            />
          </a-col>
          <a-col>
            <div class="QuantityContainer">
              <a-input-number
                v-bind:placeholder="$t('placeholders_text_amount')"
                class="Roboto-Regular w-100 trade-form-card-mobile-input"
                :parser="(v) => (isNaN(v) ? Number(sellForm.Quantity) : v)"
                v-model.Number="sellForm.Quantity"
              />
              <span class="AssetSuffix"> {{ getSymbolData.BaseAsset }}</span>
            </div>
          </a-col>
          <a-col>
            <a-row :gutter="6">
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(25, 'SELL')"
                  class="trade-form-card-button"
                  block
                  >25%</a-button
                >
              </a-col>
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(50, 'SELL')"
                  class="trade-form-card-button"
                  block
                  >50%</a-button
                >
              </a-col>
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(75, 'SELL')"
                  class="trade-form-card-button"
                  block
                  >75%</a-button
                >
              </a-col>
              <a-col :span="6">
                <a-button
                  @click="calculatePercent(100, 'SELL')"
                  class="trade-form-card-button"
                  block
                  >100%</a-button
                >
              </a-col>
            </a-row>
          </a-col>
          <a-col>
            <div class="TotalContainer" v-if="isTotalShow">
              <a-input-number
                v-bind:placeholder="$t('placeholders_text_total')"
                class="Roboto-Regular w-100 trade-form-card-mobile-input"
                :parser="(v) => (isNaN(v) ? Number(sellForm.Total) : v)"
                v-model="sellForm.Total"
              />
              <span class="AssetSuffix"> {{ getSymbolData.QuatoAsset }}</span>
            </div>
          </a-col>
          <a-col>
            <a-button
              v-if="isLoggedIn"
              :loading="isSellLoading"
              style="margin: 10px auto"
              @click="trade('SELL')"
              size="large"
              class="trade-form-card-button isSell w-100"
              >{{ $t('text_sell_asset', { asset: getSymbolData.BaseAsset }) }}
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="trade-form-card-mobile-footer">
        <div class="login-warning" v-if="!isLoggedIn">
          <div class="text-center">
            <nuxt-link :to="localePath('/login')">
              {{ $t('exchange_text_login') }}
            </nuxt-link>
            {{ $t('exchange_text_or') }}
            <nuxt-link :to="localePath('/signup')">
              {{ $t('exchange_text_signup') }}
            </nuxt-link>
            {{ $t('exchange_text_create') }}
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    UserBalance: {
      required: true,
      type: Object,
    },
    isTotalShow: {
      type: Boolean,
      default: true,
    },
    ShowPrice: {
      type: Boolean,
      default: true,
    },
    ShowStop: {
      type: Boolean,
      default: false,
    },
    ShowLimit: {
      type: Boolean,
      default: false,
    },
    Type: {
      type: String,
      required: true,
    },
    ActionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      buyForm: {
        Stop: '',
        Price: '',
        Quantity: '',
        Total: '',
      },
      sellForm: {
        Stop: '',
        Price: '',
        Quantity: '',
        Total: '',
      },
      err: {
        show: false,
        msg: '',
      },
      isBuyLoading: false,
      isSellLoading: false,
    }
  },
  mounted() {
    const { LastPrice } = this.getSymbolData
    this.buyForm.Price = this.sellForm.Price = LastPrice
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
      getActionPrice: 'transactions/getActionPrice',
    }),
    getTotalBalanceBySymbol() {
      if (this.UserBalance) {
        const { BaseAsset, QuatoAsset } = this.getSymbolData
        if (QuatoAsset === 'TRY') {
          let index = this.UserBalance.UserFiatBalance.findIndex(
            (item) => item.asset === BaseAsset
          )
          return this.UserBalance.UserFiatBalance[index]['TotalTRY']
        } else {
          let index = this.UserBalance.UserSpotBalance.findIndex(
            (item) => item.asset === BaseAsset
          )
          return this.UserBalance.UserSpotBalance[index]['TotalUSD']
        }
      } else {
        return 0
      }
    },
    isLoggedIn() {
      return !!this.$cookies.get('Token')
    },
  },
  methods: {
    async trade(side) {
      try {
        const { Symbol, LastPrice } = this.getSymbolData
        let payload
        if (side === 'BUY') {
          this.isBuyLoading = true
          payload = {
            ...this.buyForm,
            Type: this.Type,
            Side: side,
            Symbol: Symbol,
          }
        }
        if (side === 'SELL') {
          this.isSellLoading = true
          payload = {
            ...this.sellForm,
            Type: this.Type,
            Side: side,
            Symbol: Symbol,
          }
        }

        const {
          $axios,
          $cookies,
          $config: { FINANCE_API_URL },
        } = this
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.post(
          FINANCE_API_URL + '/Trade',
          payload,
          {
            headers: authHeaders,
          }
        )
        const { Success, Message } = data
        if (Success) {
          this.$notification.open({
            message: this.$t('text_success'),
            description: 'Successfull !',
          })

          const { Order } = data
          if (Order.status !== 'FILLED') {
            this.$emit('tradeUpdate', Order)
          }
          this.$notification['success']({
            message: Message,
          })
        } else {
          this.$notification['error']({
            message: Message,
          })
        }
      } catch (e) {
        if (e.response) {
          const { Message } = e.response.data
          this.$notification['error']({
            message: Message,
          })
        }
      } finally {
        if (side === 'SELL') {
          this.isSellLoading = false
        }
        if (side === 'BUY') {
          this.isBuyLoading = false
        }
      }
    },
    calculatePercent(percent, type) {
      const { QuatoAssetBalance, BaseAssetBalance } = this.getSymbolData
      if (type === 'BUY') {
        this.buyForm.Total = (percent / 100) * QuatoAssetBalance
        this.buyForm.Quantity = this.buyForm.Total / this.buyForm.Price
      }
      if (type === 'SELL') {
        this.sellForm.Quantity = (percent / 100) * BaseAssetBalance
        this.sellForm.Total = this.sellForm.Quantity * this.sellForm.Price
      }
    },
    getActiveItem(percent, type) {
      if (type === 'BUY') {
        const { QuatoAssetBalance } = this.getSymbolData
        if (QuatoAssetBalance) {
          return this.buyForm.Total === (percent / 100) * QuatoAssetBalance
        } else {
          return false
        }
      }
      if (type === 'SELL') {
        const { BaseAssetBalance } = this.getSymbolData
        if (BaseAssetBalance) {
          return this.sellForm.Total === (percent / 100) * BaseAssetBalance
        } else {
          return false
        }
      }
    },
  },
  watch: {
    'buyForm.Price': {
      handler(Price) {
        this.buyForm.Total = Price * this.buyForm.Quantity
      },
    },
    'buyForm.Quantity': {
      handler(Quantity) {
        const { SymbolStepSize } = this.getSymbolData
        const FixedQuantity = Number(Quantity).toFixed(SymbolStepSize)
        const QuantityRoundedDown =
          Math.trunc(FixedQuantity * Math.pow(10, SymbolStepSize)) /
          Math.pow(10, SymbolStepSize)
        this.buyForm.Quantity = QuantityRoundedDown
        if (this.buyForm.Quantity !== Quantity) {
          this.buyForm.Total = this.buyForm.Price * Quantity
        }
      },
    },
    'buyForm.Total': {
      handler(Total) {
        if (this.buyForm.Price) {
          const { SymbolStepSize } = this.getSymbolData
          this.buyForm.Quantity = (Total / this.buyForm.Price).toFixed(
            SymbolStepSize
          )
        }
      },
    },
    'sellForm.Price': {
      handler(Price) {
        this.sellForm.Total = Price * this.sellForm.Quantity
      },
    },
    'sellForm.Quantity': {
      handler(Quantity) {
        const { SymbolStepSize } = this.getSymbolData
        this.sellForm.Quantity = parseFloat(Quantity).toFixed(SymbolStepSize)
        if (this.sellForm.Quantity !== Quantity) {
          this.sellForm.Total = this.sellForm.Price * Quantity
        }
      },
    },
    'sellForm.Total': {
      handler(Total) {
        if (this.sellForm.Price) {
          const { SymbolStepSize } = this.getSymbolData
          this.sellForm.Quantity = (Total / this.sellForm.Price).toFixed(
            SymbolStepSize
          )
        }
      },
    },
    getActionPrice(v) {
      this.buyForm.Price = v
      this.sellForm.Price = v
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/ant/variables.less';

.trade-form-card-mobile {
  background: transparent;
  border: 1px solid red;
  color: #9399a4;
  &-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-item:first-child {
      margin-right: 5px;
    }
  }
  &-input {
    background: transparent;
    color: #9399a4;
    font-family: 'Roboto-Regular';
    border-color: #484c56;
    &:focus,
    &:active {
      box-shadow: none;
      border-color: #484c56;
    }
  }
  .trade-form-card-button {
    box-shadow: none;
    background: transparent;
    border-color: #484c56;
    color: #9399a4;
    font-family: 'Roboto-Regular';
  }
  .isBuy {
    color: white;
    background-color: #51b375;
  }
  .isSell {
    color: white;
    background-color: #e55764;
  }
}

.QuantityContainer,
.TotalContainer {
  position: relative;
}
.AssetSuffix {
  position: absolute;
  right: 10px;
  top: 6px;
}
</style>
