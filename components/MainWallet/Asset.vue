<template>
  <a-col
    offset="1"
    :xs="22"
    :sm="22"
    :md="10"
    :lg="10"
    :xl="10"
    style="text-align: start"
  >
    <a-col>
      <a-select
        v-model="asset"
        class="asset-select"
        show-search
        size="large"
        v-bind:placeholder="$t('placeholders_text_select')"
        option-filter-prop="children"
        :filter-option="filterOption"
        @change="handleAssetChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <a-select-option
          v-for="item in ASSETS"
          v-bind:key="item['Name']"
          v-bind:value="item['Symbol']"
          style="background-color: white"
        >
          <img
            :src="getAssetIcon(item['Symbol'])"
            height="20"
            style="margin-bottom: 2px"
            alt
          />
          {{ item['Symbol'] }} - {{ item['Name'] }}
        </a-select-option>
      </a-select>
    </a-col>
    <div class="asset-item">
      <p style="color: #48567e">{{ $t('available_amount') }}</p>
      <p style="color: #0d1324; font-weight: bold">
        {{ freeAmount }} {{ SELECTED_ASSET }}
      </p>
    </div>
    <div class="asset-item">
      <p style="color: #48567e">{{ $t('used_amount') }}</p>
      <p style="color: #0d1324; font-weight: bold">
        {{ lockedAmount }}
        {{ SELECTED_ASSET }}
      </p>
    </div>
    <div class="asset-item">
      <p style="color: #48567e">{{ $t('total_amount') }}</p>
      <p style="color: #0d1324; font-weight: bold">
        {{ totalAmount }} {{ SELECTED_ASSET }}
      </p>
    </div>
    <a-row v-if="transactionType === 'deposit'">
      <a-col :span="23" class="tip">
        <a-col>
          <div class="tips-image">
            <span style="margin-left: 23px; font-weight: bold"
              >{{ $t('deposit_tips') }}:</span
            >
          </div>
        </a-col>
        <a-col style="margin-top: 10px" :span="24">
          <li>{{ $t('deposit_tips_item_one') }}</li>
        </a-col>
        <a-col :span="24">
          <li>{{ $t('deposit_tips_item_two') }}</li>
        </a-col>
      </a-col>
    </a-row>
    <a-row v-if="transactionType === 'withdraw'">
      <a-col :span="23" class="tip">
        <a-col>
          <div class="tips-image">
            <span style="margin-left: 23px; font-weight: bold"
              >{{ $t('withdraw_tips') }}:</span
            >
          </div>
        </a-col>
        <a-col style="margin-top: 10px" :span="24">
          <li>{{ $t('withdraw_tips_item_one') }}</li>
        </a-col>
        <a-col :span="24">
          <li>{{ $t('withdraw_tips_item_two') }}</li>
        </a-col>
      </a-col>
    </a-row>
    <!-- delete 
    <p class="symbol-label">{{ $t('main_wallet_exchange_link') }}:</p>
    <a-row v-if="SELECTED_ASSET !== 'USDT'">
      <a-col v-for="(sym, idx) in FILTERED_SYMBOLS" :key="idx" :span="6">
        <nuxt-link
          :to="localePath(`/trade/${sym.BaseAsset}_${sym.QuatoAsset}`)"
        >
          <span class="symbol">{{ sym.BaseAsset }}/{{ sym.QuatoAsset }}</span>
        </nuxt-link>
      </a-col>
    </a-row>
    <a-row v-else>
      <a-col :span="6">
        <nuxt-link :to="localePath('/trade/BTC_USDT')">
          <span class="symbol">BTC/USDT</span>
        </nuxt-link>
      </a-col>
      <a-col :span="6">
        <nuxt-link :to="localePath('/trade/ETH_USDT')">
          <span class="symbol">ETH/USDT</span>
        </nuxt-link>
      </a-col>
      <a-col :span="6">
        <nuxt-link :to="localePath('/trade/XRP_USDT')">
          <span class="symbol">XRP/USDT</span>
        </nuxt-link>
      </a-col>
    </a-row>
    -->
  </a-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Asset',

  data: () => ({
    freeAmount: null,
    totalAmount: null,
    lockedAmount: null,
    asset: null,
    network: 'ERC20',
  }),
  props: {
    transactionType: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.$store.dispatch('mainwallet/FECTCH_SYMBOLS')
    if (this.$route.params.asset) {
      this.SET_SELECTED_ASSET_MUTATION(this.$route.params.asset.toUpperCase())
      await this.SET_SELECTED_ASSET(this.$route.params.asset.toUpperCase())
    }

    await this.$store.commit(
      'mainwallet/SET_FILTERED_SYMBOLS',
      this.SELECTED_ASSET
    )

    this.USER_BALANCE['UserSpotBalance'].forEach((item) => {
      if (item.asset === this.SELECTED_ASSET) {
        this.lockedAmount = parseFloat(item.locked).toFixed(8)
        this.freeAmount = parseFloat(item.free).toFixed(8)
        this.totalAmount = parseFloat(item['TotalQty']).toFixed(8)
        this.SET_AVAILABLE_PRICE(this.freeAmount)
      }
    })
  },
  mounted() {
    this.asset = (this.$route.params.asset ?? 'btc').toUpperCase()
    if (this.asset) this.handleAssetChange(this.asset)
  },
  computed: {
    ...mapGetters({
      ASSETS: 'swap/ASSETS',
      USER_BALANCE: 'mainwallet/USER_BALANCE',
      SELECTED_ASSET: 'mainwallet/SELECTED_ASSET',
      FILTERED_SYMBOLS: 'mainwallet/GET_FILTERED_SYMBOLS',
    }),
  },
  methods: {
    getAssetIcon(symbol) {
      try {
        return require(`~/assets/icons/${symbol.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },

    ...mapMutations({
      SET_ASSETS: 'swap/SET_ASSETS',
      SET_SELECTED_ASSET_MUTATION: 'mainwallet/SET_SELECTED_ASSET',
      SET_FILTERED_SYMBOLS: 'mainwallet/SET_FILTERED_SYMBOLS',
      SET_AVAILABLE_PRICE: 'mainwallet/SET_AVAILABLE_PRICE',
    }),

    ...mapActions({
      SET_SELECTED_ASSET: 'mainwallet/SET_SELECTED_ASSET',
    }),

    onCopy(e) {
      alert('You just copied: ' + e.text)
    },

    onError(e) {
      alert('Failed to copy texts')
    },

    callback(key) {},

    async handleAssetChange(val) {
      let success = this.SET_SELECTED_ASSET(val)
      this.SET_FILTERED_SYMBOLS(val)
      if (success) {
        this.USER_BALANCE['UserSpotBalance'].forEach((item) => {
          if (item.asset === this.SELECTED_ASSET) {
            this.lockedAmount = parseFloat(item.locked).toFixed(8)
            this.freeAmount = parseFloat(item.free).toFixed(8)
            this.totalAmount = parseFloat(item['TotalQty']).toFixed(8)
            this.SET_AVAILABLE_PRICE(this.freeAmount)
          }
        })
        this.$emit('change', val)
      } else {
        this.freeAmount = null
        this.totalAmount = null
      }
    },

    handleBlur() {},

    handleFocus() {},

    filterOption(input, option) {
      return (
        option.componentOptions.children[1].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      )
    },
  },
  watch: {
    SELECTED_ASSET: {
      handler: function (val) {
        let prefix = this.$cookies.get('i18n_redirected')
        let path =
          '/' +
          prefix +
          '/my/wallet/main-wallet/' +
          this.transactionType +
          '/' +
          this.SELECTED_ASSET.toString().toUpperCase()

        window.history.pushState({}, null, path)
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.tip {
  margin-top: 90px;
  padding: 15px 30px 15px 30px;
  background: #f5fcff 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  text-align: left;
}

.tips-image {
  width: 20px;
  height: 24px;
  background-image: url('../../assets/icons/Bulb.png');
}
.asset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
}
.asset-select {
  width: 100%;
  margin-bottom: 50px;
  border-color: white;
}
.symbol {
  text-decoration: underline;
}
</style>
