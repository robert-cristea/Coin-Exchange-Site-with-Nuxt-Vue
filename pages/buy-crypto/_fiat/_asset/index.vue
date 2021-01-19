<template>
  <div class="buy-container">
    <div v-if="!isMobile" class="buy-header-container">
      <div class="buy-header">
        <div class="buy-header-heading buy-primary-color Roboto-Medium">
          {{ $t('buy_text_header') }}
        </div>
        <a-input-group class="compact-group" compact>
          <p class="header-group-label Roboto-Medium mb-0">
            {{ $t('buy_spending_amount') }}
          </p>
          <a-input-number
            v-model="BuyForm.FiatAmount"
            class="Roboto-Medium"
            size="large"
            :min="0"
            type="number"
            style="
              width: 80%;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            "
          />
          <a-select
            v-model="BuyForm.Fiat"
            class="Roboto-Medium header-input-text-color"
            size="large"
            style="width: 20%"
            @change="currencyChange"
          >
            <a-select-option
              v-for="(c, i) in BuyCurrencies.BuyFiatCurrencies"
              :key="i"
              :value="c.Key"
              class="Roboto-Medium"
              >{{ c.Name }}</a-select-option
            >
          </a-select>
        </a-input-group>
        <a-icon class="buy-header-icon" type="arrow-right" />
        <div class="header-select-wrapper">
          <p class="header-group-label Roboto-Medium mb-0">
            {{ $t('buy_you_will_get') }}
          </p>
          <a-select
            v-model="BuyForm.Asset"
            size="large"
            class="buy-header-get Roboto-Medium"
            @change="currencyChange"
          >
            <a-select-option
              v-for="(c, i) in BuyCurrencies.BuyCryptoCurrencies"
              :key="i"
              :value="c.Key"
              class="Roboto-Medium"
            >
              <img
                width="24px"
                height="24px"
                :src="require(`~/assets/icons/${c.Key.toLowerCase()}.svg`)"
                alt
              />
              {{ c.Name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div v-if="!isMobile" class="buy-content">
      <div class="buy-methods">
        <a-spin :spinning="getProvidersLoader">
          <h3 class="Roboto-Medium buy-methods-heading buy-primary-color">
            {{ $t('buy_select_provider') }}
          </h3>
          <div class="buy-method-cards">
            <a-card
              class="buy-method-card"
              :class="{
                'buy-method-card-selected': p.Provider === selectedProvider,
                disabled: !isBuyFormValid,
              }"
              v-for="(p, i) in Providers"
              :key="i"
              @click="selectProvider(p)"
            >
              <span slot="title" class="buy-method-card-title">
                <component
                  :is="cardIcon(p.Provider)"
                  width="80px"
                  height="30px"
                />
              </span>
              <span slot="extra"></span>
            </a-card>
          </div>
        </a-spin>
      </div>
      <div class="buy-details">
        <a-spin :spinning="selectProviderLoader">
          <h3 class="Roboto-Medium buy-methods-heading buy-primary-color">
            {{ $t('buy_payment_detail') }}
          </h3>
          <div class="buy-details-content">
            <div class="buy-details-item">
              <span class="Roboto-Regular buy-details-item-label">{{
                $t('buy_provider')
              }}</span>
              <span class="Roboto-Medium buy-details-item-value">{{
                selectedProvider
              }}</span>
            </div>
            <div class="buy-details-item">
              <span class="Roboto-Regular buy-details-item-label">{{
                $t('buy_total')
              }}</span>
              <span class="Roboto-Medium buy-details-item-value"
                >{{ BuyForm.FiatAmount }}&nbsp;{{ BuyForm.Fiat }}</span
              >
            </div>
            <div class="buy-details-item">
              <span class="Roboto-Regular buy-details-item-label">{{
                $t('buy_you_will_get')
              }}</span>
              <span class="Roboto-Medium buy-details-item-value"
                >{{ BuyTrans.GetAmount }}&nbsp;{{ BuyForm.Asset }}</span
              >
            </div>
          </div>
          <div class="buy-disclaimer">
            <h3 class="buy-primary-color">{{ $t('buy_disclaimer_header') }}</h3>
            <p class="Roboto-Regular">{{ $t('buy_disclaimer') }}</p>
          </div>
          <div class="buy-actions">
            <a-checkbox
              :disabled="!selectedProvider"
              class="Roboto-Medium buy-action-item"
              :checked="BuyActions.isChecked"
              size="large"
              @change="(e) => (BuyActions.isChecked = e.target.checked)"
              >{{ $t('buy_terms_of_use') }}</a-checkbox
            >
            <a-button
              :disabled="!BuyActions.isChecked"
              class="Roboto-Medium buy-action-item"
              size="large"
              block
              type="primary"
              @click="BuyActions.showConfirmation = true"
              >{{ $t('buy_continue') }}</a-button
            >
          </div>
        </a-spin>

        <a-modal
          :visible="BuyActions.showConfirmation"
          :confirm-loading="BuyActions.confirmLoading"
          @ok="confirmBuy"
          @cancel="confirmCancel"
          :centered="true"
          :destroyOnClose="true"
          :footer="null"
          :width="384"
          :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
          :maskClosable="false"
        >
          <h3 slot="title" class="Roboto-Medium">
            {{ $t('buy_confirm_transaction') }}
          </h3>
          <span class="custom-modal-icon" slot="closeIcon">
            <a-icon type="close"></a-icon>
          </span>
          <p class="confirm-modal-text Roboto-Regular">
            {{ BuyActions.BuyMethod }} İlgili servis sağlayıcıya
            yönlendirileceksiniz. Cointral, kredi kartı ödemeleri hizmetinin
            kullanımından doğacak herhangi bir kayıp ya da zarara yönelik hiçbir
            sorumluluk kabul etmez.
          </p>
          <a-checkbox
            :value="BuyActions.isCheckedModal"
            @change="(e) => (BuyActions.isCheckedModal = e.target.checked)"
            class="confirm-modal-check-box Roboto-Medium"
            >{{ $t('buy_text_agreement') }}</a-checkbox
          >
          <a-button
            @click="confirmBuy"
            :loading="startTransLoader"
            :disabled="!BuyActions.isCheckedModal"
            class="confirm-modal-button Roboto-Medium"
            type="primary"
            size="large"
            block
            >{{ selectedProvider }} ile Satın Al</a-button
          >
        </a-modal>
      </div>
    </div>

    <a-col v-if="isMobile">
      <a-col
        offset="1"
        :span="22"
        class="buy-primary-color Roboto-Medium"
        style="margin-top: 20px"
      >
        <span class="buy-header-heading buy-primary-color Roboto-Medium">{{
          $t('buy_text_header')
        }}</span>
      </a-col>

      <a-col
        offset="1"
        :span="23"
        style="margin-top: 30px; padding-right: 30px"
        align="middle"
      >
        <a-input-group compact>
          <p class="header-group-label Roboto-Medium">
            {{ $t('buy_spending_amount') }}
          </p>
          <a-input-number
            v-model="BuyForm.FiatAmount"
            class="Roboto-Medium"
            size="large"
            :min="0"
            type="number"
            style="
              width: 80%;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            "
          />
          <a-select
            v-model="BuyForm.Fiat"
            class="Roboto-Medium header-input-text-color"
            size="large"
            style="width: 20%"
          >
            <a-select-option
              v-for="(c, i) in BuyCurrencies.BuyFiatCurrencies"
              :key="i"
              :value="c.Key"
              class="Roboto-Medium"
            >
              <!-- <img
                width="24px"
                height="24px"
                :src="require(`~/assets/icons/${c.Key.toLowerCase()}.svg`)"
                alt=""
              />-->
              {{ c.Name }}
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-col>

      <a-col :span="24" align="middle" style="margin-top: 20px">
        <a-icon class="buy-header-icon" type="arrow-down" />
      </a-col>

      <a-col
        offset="1"
        :span="23"
        style="margin-top: 30px; padding-right: 30px"
        align="middle"
      >
        <div class="header-select-wrapper">
          <p class="header-select-label Roboto-Medium">Alacaksınız</p>
          <a-select
            v-model="BuyForm.Asset"
            size="large"
            class="Roboto-Medium"
            style="width: 100%"
          >
            <a-select-option
              v-for="(c, i) in BuyCurrencies.BuyCryptoCurrencies"
              :key="i"
              :value="c.Key"
              class="Roboto-Medium"
            >
              <img
                width="24px"
                height="24px"
                :src="require(`~/assets/icons/${c.Key.toLowerCase()}.svg`)"
                alt
              />
              {{ c.Name }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>

      <a-col offset="1" :span="22">
        <h3 class="Roboto-Medium buy-methods-heading buy-primary-color">
          {{ $t('buy_select_provider') }}
        </h3>
        <div class="buy-method-cards">
          <a-card
            class="buy-method-card"
            :class="{
              'buy-method-card-selected': p.Provider === BuyActions.BuyMethod,
              disabled: !isBuyFormValid,
            }"
            v-for="(p, i) in Providers"
            :key="i"
            @click="selectProvider(p)"
          >
            <span slot="title" class="buy-method-card-title">
              <component
                :is="cardIcon(p.Provider)"
                width="80px"
                height="30px"
              />
            </span>
            <span slot="extra"></span>
          </a-card>
        </div>
      </a-col>

      <a-col offset="1" :span="22">
        <h3 class="Roboto-Medium buy-methods-heading buy-primary-color">
          {{ $t('buy_payment_detail') }}
        </h3>
        <div class="buy-details-content">
          <div class="buy-details-item">
            <span class="Roboto-Regular buy-details-item-label"
              >Ödeme Metodu</span
            >
            <span class="Roboto-Medium buy-details-item-value">{{
              selectedProvider
            }}</span>
          </div>
          <div class="buy-details-item">
            <span class="Roboto-Regular buy-details-item-label"
              >Ücret dahil toplam</span
            >
            <span class="Roboto-Medium buy-details-item-value"
              >{{ BuyForm.FiatAmount }}&nbsp;{{ BuyForm.Fiat }}</span
            >
          </div>
          <div class="buy-details-item">
            <span class="Roboto-Regular buy-details-item-label">{{
              $t('buy_you_will_get')
            }}</span>
            <span class="Roboto-Bold buy-details-item-value"
              >{{ BuyTrans.GetAmount }}&nbsp;{{ BuyForm.Asset }}</span
            >
          </div>
        </div>
        <div class="buy-disclaimer">
          <h3 class="buy-primary-color">{{ $t('buy_disclaimer_header') }}</h3>
          <p class="Roboto-Regular">{{ $t('buy_disclaimer') }}</p>
        </div>
        <div class="buy-actions">
          <a-checkbox
            :disabled="!selectedProvider"
            class="Roboto-Medium buy-action-item"
            :checked="BuyActions.isChecked"
            size="large"
            @change="(e) => (BuyActions.isChecked = e.target.checked)"
            >{{ $t('buy_terms_of_use') }}</a-checkbox
          >
          <a-button
            :disabled="!BuyActions.isChecked"
            class="Roboto-Medium buy-action-item"
            size="large"
            block
            type="primary"
            @click="BuyActions.showConfirmation = true"
            >{{ $t('buy_continue') }}</a-button
          >
          <a-modal
            :visible="BuyActions.showConfirmation"
            :confirm-loading="BuyActions.confirmLoading"
            @ok="confirmBuy"
            @cancel="confirmCancel"
            :centered="true"
            :destroyOnClose="true"
            :footer="null"
            :width="384"
            :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
            :maskClosable="false"
          >
            <h3 slot="title" class="Roboto-Medium">
              {{ $t('buy_confirm_transaction') }}
            </h3>
            <span
              :class="{
                'custom-modal-icon': !isMobile,
                'custom-modal-icon-mobile': isMobile,
              }"
              slot="closeIcon"
            >
              <a-icon type="close"></a-icon>
            </span>
            <p class="confirm-modal-text Roboto-Regular">
              {{ BuyActions.BuyMethod }} İlgili servis sağlayıcıya
              yönlendirileceksiniz. Cointral, kredi kartı ödemeleri hizmetinin
              kullanımından doğacak herhangi bir kayıp ya da zarara yönelik
              hiçbir sorumluluk kabul etmez. dsfdsfds
            </p>
            <a-checkbox
              :checked="BuyActions.isCheckedModal"
              @change="(e) => (BuyActions.isCheckedModal = e.target.checked)"
              class="confirm-modal-check-box Roboto-Medium"
              >{{ $t('buy_text_agreement') }}</a-checkbox
            >
            <a-button
              @click="confirmBuy"
              :disabled="!BuyActions.isCheckedModal"
              class="confirm-modal-button Roboto-Medium"
              type="primary"
              size="large"
              block
              >{{ BuyActions.BuyMethod }} ile Satın Al</a-button
            >
          </a-modal>
        </div>
      </a-col>
    </a-col>
  </div>
</template>

<script>
import IconKoinal from '@/components/Icons/IconKoinal.vue'
import IconMoonpay from '@/components/Icons/IconMoonpay.vue'
import IconPaxful from '@/components/Icons/IconPaxful.vue'
import IconSimplex from '@/components/Icons/IconSimplex.vue'
export default {
  components: {
    IconKoinal,
    IconMoonpay,
    IconPaxful,
    IconSimplex,
  },
  middleware: ['auth'],
  head() {
    return {
      title: 'Satın Al | Cointral.com',
    }
  },
  data() {
    return {
      BuyCurrencies: {
        BuyFiatCurrencies: [],
        BuyCryptoCurrencies: [],
      },
      BuyForm: {
        FiatAmount: null,
        Fiat: null,
        Asset: null,
      },
      selectedProvider: null,
      getProvidersLoader: false,
      selectProviderLoader: false,
      startTransLoader: false,
      BuyTrans: {
        GetAmount: null,
        PaymentId: null,
      },
      BuyActions: {
        BuyMethod: null,
        isChecked: false,
        isCheckedModal: false,
        showConfirmation: false,
        confirmLoading: false,
      },
      Providers: [],
      isMobile: null,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    this.BuyForm.FiatAmount = 100
    this.BuyForm.Fiat = this.BuyCurrencies.BuyFiatCurrencies[1].Key
    this.BuyForm.Asset = this.BuyCurrencies.BuyCryptoCurrencies[0].Key
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

    if (this.$route.params.fiat && this.$route.params.asset) {
      this.BuyForm.Fiat = this.$route.params.fiat
      this.BuyForm.Asset = this.$route.params.asset
    }

    this.BuyCurrencies.BuyFiatCurrencies.filter((item) => {
      if (item.Key.indexOf(this.BuyForm.Fiat) < 0) {
        this.BuyForm.Fiat = 'USD'

        this.$router.push(this.localeRoute('/buy-crypto/USD/BTC'))
      }
    })

    this.BuyCurrencies.BuyCryptoCurrencies.filter((item2) => {
      if (item2.Key.indexOf(this.BuyForm.Asset) < 0) {
        this.BuyForm.Asset = 'BTC'

        this.$router.push(this.localeRoute('/buy-crypto/USD/BTC'))
      }
    })
  },
  async asyncData({ app, redirect, $axios, $config, $cookies, route }) {

    if(!route.params.fiat || !route.params.asset) {
      redirect(app.localePath('/buy-crypto/USD/BTC'))
    }

    let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
    const response = await $axios.get($config.FINANCE_API_URL + '/GetFilters', {
      headers: authHeader,
    })
    if (response.data.Success) {
      const { BuyFiatCurrencies, BuyCryptoCurrencies } = response.data

      return {
        BuyCurrencies: {
          BuyFiatCurrencies,
          BuyCryptoCurrencies,
        },
      }
    }
  },
  methods: {
    async getBuyProviders() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.getProvidersLoader = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetBuyProvider',
        {
          params: {
            ...this.BuyForm,
          },
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        this.getProvidersLoader = false
        const { Providers } = response.data
        this.Providers = Providers
      } else {
        this.getProvidersLoader = false
      }
    },
    async selectProvider(p) {
      this.selectedProvider = p.Provider
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.selectProviderLoader = true
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetBuyQuote',
        {
          params: {
            ...this.BuyForm,
            Provider: this.selectedProvider,
          },
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { CryptoAmount, PaymentId } = response.data
        this.BuyTrans.GetAmount = CryptoAmount
        this.BuyTrans.PaymentId = PaymentId
        this.selectProviderLoader = false
      } else {
        const { Message } = response.data
        this.$notification.open({
          description: Message,
        })
        this.selectProviderLoader = false
      }
    },
    async confirmBuy() {
      this.BuyActions.isCheckedModal = false
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.startTransLoader = true
      const response = await $axios.post(
        $config.FINANCE_API_URL + '/StartPayment',
        {
          PaymentId: this.BuyTrans.PaymentId,
        },
        {
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { CheckOutURL } = response.data
        this.startTransLoader = false
        window.open(CheckOutURL)
        this.BuyForm.FiatAmount = 100
        this.BuyTrans.GetAmount = null
        this.BuyTrans.PaymentId = null
        this.selectedProvider = null
        this.confirmCancel()
      } else {
        const { Message } = response.data
        this.startTransLoader = false
        this.BuyActions.showConfirmation = false
        this.$notification.open({
          description: Message,
        })
      }
    },
    confirmCancel() {
    this.BuyForm.FiatAmount = 100
      this.BuyTrans.GetAmount = null
      this.BuyTrans.PaymentId = null
      this.selectedProvider = null
      this.BuyActions.isChecked = false
      this.BuyActions.isCheckedModal = false
      this.BuyActions.showConfirmation = false
    },
    cardIcon(provider) {
      switch (provider) {
        case 'KOINAL':
          return 'IconKoinal'
        case 'MOONPAY':
          return 'IconMoonpay'
        case 'PAXFUL':
          return 'IconPaxful'
        case 'SIMPLEX':
          return 'IconSimplex'
        default:
          return 'IconKoinal'
      }
    },
    currencyChange() {
      const path = this.$route.path
      const pathSplit = path.split('/')
      if (pathSplit[pathSplit.length - 1] !== '') {
        pathSplit[pathSplit.length - 1] = this.BuyForm.Asset
        pathSplit[pathSplit.length - 2] = this.BuyForm.Fiat
      } else {
        pathSplit[pathSplit.length - 2] = this.BuyForm.Asset
        pathSplit[pathSplit.length - 3] = this.BuyForm.Fiat
      }

      const newPath = pathSplit.join('/')
      history.pushState({}, null, newPath)
    },
  },
  watch: {
    BuyForm: {
      handler: function (to) {
        if (this.isBuyFormValid) {
          this.selectedProvider = null
          this.getBuyProviders()
        }
      },
      deep: true,
    },
  },
  computed: {
    isBuyFormValid() {
      return (
        !!this.BuyForm.FiatAmount && !!this.BuyForm.Fiat && !!this.BuyForm.Asset
      )
    },
  },
}
</script>

<style scoped>
.buy-primary-color {
  color: #1e2126;
}

.buy-container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  min-height: 100vh;
}

.buy-header-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 135px;
  padding-bottom: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 15px #00000029;
}

.buy-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buy-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.buy-header-heading {
  color: #1e2126;
  font-size: 32px;
  margin-right: 50px;
}

.compact-group {
  height: 40px;
  width: 429px;
}

.header-group-label {
  position: absolute;
  left: 0px;
  top: -25px;
  color: #6b7078;
}

.header-select-wrapper {
  position: relative;
}

.header-select-label {
  position: absolute;
  left: 0px;
  top: -25px;
  color: #6b7078;
}

.header-input-text-color {
  color: black;
}

.buy-header-get {
  width: 177px;
}

.buy-header-icon {
  margin: 0px 20px;
}

.buy-methods {
  width: 628px;
  margin-right: 100px;
}

.buy-details {
  width: 520px;
}

.buy-methods,
.buy-details {
  margin-top: 50px;
  margin-bottom: 50px;
}

.buy-methods-heading {
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 0px;
}

.buy-method-cards {
  display: flex;
  flex-wrap: wrap;
}

.buy-method-card {
  margin: 5px 4px;
  min-width: 306px;
  height: 63px;
  border: 1px solid #eff0f2;
  border-radius: 3px;
  cursor: pointer;
}

.buy-method-card:hover {
  border: 1px solid #1ba4e8;
}

.buy-method-card-title {
  text-transform: lowercase !important;
  /* text-transform: capitalize !important; */
}

.buy-method-card-selected {
  border: 1px solid #1ba4e8;
}

.provider-icon {
  min-width: 24px;
  min-height: 24px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 50%;
}

.provider-text {
  font-size: 16px;
}

.buy-details-content {
  margin-bottom: 30px;
}

.buy-details-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
}

.buy-details-item-label {
  color: #6e757f;
}

.buy-details-item-label {
  color: #4e5155;
}

.buy-action-item {
  margin: 20px 0px;
}

/* common */
.disabled {
  pointer-events: none;
}

.confirm-modal-text,
.confirm-modal-check-box {
  margin-bottom: 20px;
}

.confirm-modal-text {
  color: #2e4153;
  text-align: center;
}

.confirm-modal-check-box {
  color: #1e2126;
}

.confirm-modal-button {
  margin-bottom: 10px;
}

.ant-modal-close {
  top: -12px !important;
}

.custom-modal-icon {
  position: absolute;
  top: -70%;
  right: -50%;
  color: #c1c6cd;
}
.custom-modal-icon-mobile {
  position: absolute;
  top: -70%;
  right: 0;
  color: #c1c6cd;
}
</style>
