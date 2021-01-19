<template>
  <a-spin :spinning="P2PSpinner">
    <a-form-model
      class="P2POrderForm"
      ref="P2POrderFormRef"
      :rules="P2POrderRules"
      :model="P2POrder"
    >
      <a-row :gutter="[12, 12]">
        <a-col :span="12">
          <a-form-model-item prop="FiatCurrency" has-feedback>
            <a-select
              v-model="P2POrder.FiatCurrency"
              show-search
              size="large"
              placeholder="para birim"
            >
              <a-select-option
                v-for="sym in FiatList"
                :key="sym.Name"
                :value="sym.Symbol"
                style="background-color: white"
              >
                <img
                  height="20"
                  :src="getAssetIcon(sym.Symbol)"
                  style="margin-bottom: 2px"
                  alt
                />
                {{ sym.Symbol }} - {{ sym.Name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item prop="Asset" has-feedback>
            <a-select
              v-model="P2POrder.Asset"
              show-search
              size="large"
              :placeholder="$t('placeholders_text_select')"
            >
              <a-select-option
                v-for="sym in SymbolList"
                :key="sym.Name"
                :value="sym.Symbol"
                style="background-color: white"
              >
                <img
                  height="20"
                  :src="getAssetIcon(sym.Symbol)"
                  style="margin-bottom: 2px"
                  alt
                />
                {{ sym.Symbol }} - {{ sym.Name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="5">
          <a-form-model-item>
            <p class="m-0 p2p-text">Fiayatiniz</p>
            <h3>
              <b>
                {{ this.P2POrder.FiatPrice }} {{ this.P2POrder.FiatCurrency }}
              </b>
            </h3>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item>
            <p class="m-0 p2p-text">En Yuksek</p>
            <h3>
              <b> {{ _AssetMaxPriceInMarket }} {{ this.P2POrder.Asset }} </b>
            </h3>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="6">
          <a-form-model-item prop="FiatPrice" :colon="false" has-feedback>
            <span slot="label" class="p2p-text">Fiyat Alanı Örneği</span>
            <a-input
              v-model.Number="P2POrder.FiatPrice"
              class="text-center"
              size="large"
            >
              <div slot="prefix">
                <a-button
                  size="small"
                  icon="minus"
                  @click="
                    P2POrder.FiatPrice = (
                      Number(P2POrder.FiatPrice) - 1
                    ).toFixed(2)
                  "
                ></a-button>
              </div>
              <div slot="suffix">
                <a-button
                  size="small"
                  icon="plus"
                  @click="
                    P2POrder.FiatPrice = (
                      Number(P2POrder.FiatPrice) + 1
                    ).toFixed(2)
                  "
                ></a-button>
              </div>
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="16">
          <a-form-model-item prop="AssetAmount" has-feedback>
            <a-input
              v-model="P2POrder.AssetAmount"
              size="large"
              v-bind:placeholder="$t('placeholders_text_amount')"
            >
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="16">
          <a-form-model-item prop="Partially" has-feedback>
            <a-input
              size="large"
              class="rounded-input"
              placeholder="Parçalı İstek"
              style="border-radius: 50px"
            >
              <div slot="suffix">
                <a-switch
                  style="pointer-events: all"
                  v-model="P2POrder.Partially"
                ></a-switch>
              </div>
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col v-if="P2POrder.Partially" :span="6">
          <a-form-model-item prop="Min" has-feedback>
            <a-input v-model="P2POrder.Min" size="large" placeholder="Min">
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col v-if="P2POrder.Partially" :span="6">
          <a-form-model-item has-feedback>
            <a-input size="large" placeholder="Maks"> </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="P2POrder.Partially ? 4 : 16">
          <a-form-model-item prop="RequestValidityMinutes" has-feedback>
            <a-select
              v-model="P2POrder.RequestValidityMinutes"
              show-search
              size="large"
              placeholder="RequestValidityMinutes"
            >
              <a-select-option value="15" style="background-color: white">
                15 {{ $t('text_min') }}
              </a-select-option>
              <a-select-option value="30" style="background-color: white">
                30 {{ $t('text_min') }}
              </a-select-option>
              <a-select-option value="45" style="background-color: white">
                45 {{ $t('text_min') }}
              </a-select-option>
              <a-select-option value="60" style="background-color: white">
                1 {{ $t('text_hr') }}
              </a-select-option>
              <a-select-option value="120" style="background-color: white">
                2 {{ $t('text_hr') }}
              </a-select-option>
              <a-select-option value="180" style="background-color: white">
                3 {{ $t('text_hr') }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row v-if="P2PType === 'SELL'" :gutter="12">
        <a-col :span="12">
          <a-form-model-item prop="UserBankUniqueID" has-feedback>
            <a-select
              v-model="P2POrder.UserBankUniqueID"
              size="large"
              placeholder="Bank Hesabi Sezniniz"
            >
              <a-select-option
                v-for="(bank, index) in bankAccountList"
                :value="bank.BankAccountId"
                :key="bank.BankAccountId"
              >
                {{ bank.FriendlyName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col>
          <a-form-model-item>
            <a-button
              class="Roboto-Medium"
              :loading="P2PBtnLoader"
              @click="ValidateP2PForm"
              type="primary"
              block
              size="large"
            >
              İlan Oluştur
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col>
          <a-form-model-item>
            <a-alert show-icon type="info" class="border-none">
              <span slot="description" class="Roboto-Regular">
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </span>
            </a-alert>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <KycWarningPopup :visible="showKycWarning" />
  </a-spin>
</template>

<script>
export default {
  props: {
    P2PType: {
      required: true,
      type: String,
    },
    FiatList: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      P2POrder: {
        FiatCurrency: undefined,
        FiatPrice: 0,
        Asset: undefined,
        AssetAmount: '',
        Min: '',
        RequestValidityMinutes: '',
        Partially: true,
        Type: this.P2PType,
        UserBankUniqueID: undefined,
      },
      P2POrderRules: {
        Asset: [{ validator: this.required, trigger: 'change' }],
        FiatCurrency: [{ validator: this.required, trigger: 'change' }],
        FiatPrice: [{ validator: this.required, trigger: 'change' }],
        Asset: [{ validator: this.required, trigger: 'change' }],
        AssetAmount: [{ validator: this.required, trigger: 'change' }],
        Min: [{ validator: this.required, trigger: 'change' }],
        RequestValidityMinutes: [
          { validator: this.required, trigger: 'change' },
        ],
        Type: [{ validator: this.required, trigger: 'change' }],
        UserBankUniqueID: [{ validator: this.required, trigger: 'change' }],
      },
      showKycWarning: false,
      SymbolList: [],
      bankAccountList: [],

      // extras
      P2PSpinner: false,
      P2PBtnLoader: false,
    }
  },
  computed: {
    _AssetFiatPrice() {
      const index = this.SymbolList.findIndex(
        (symb) => symb.Symbol === this.P2POrder.Asset
      )
      if (index >= 0) {
        const symbol = this.SymbolList[index]
        return symbol.Price
      }
    },
    _AssetMaxPriceInMarket() {
      const index = this.SymbolList.findIndex(
        (symb) => symb.Symbol === this.P2POrder.Asset
      )
      if (index >= 0) {
        const symbol = this.SymbolList[index]
        return symbol.MaxPriceInMarket
      }
    },
  },
  watch: {
    'P2POrder.Partially': {
      handler: function (val) {
        if (!val) {
          this.P2POrder.Min = ''
        }
      },
    },
  },
  created() {
    this.GetP2PDataList()
  },
  methods: {
    getAssetIcon(symbol) {
      try {
        return require(`~/assets/icons/${symbol.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },
    async GetP2PDataList() {
      try {
        this.P2PSpinner = true
        const { $cookies, $config, $axios } = this
        const authHeaders = {
          Authorization: 'Bearer ' + $cookies.get('Token'),
        }
        const { data } = await $axios.get(
          $config.FINANCE_API_URL + '/GetP2PDataList',
          {
            headers: authHeaders,
          }
        )
        if (data.Success) {
          const { BankAccountList, AssetList } = data
          this.bankAccountList = BankAccountList
          this.SymbolList = AssetList
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.P2PSpinner = false
      }
    },
    ValidateP2PForm() {
      this.$refs.P2POrderFormRef.validate((valid) => {
        if (valid) {
          this.CreateP2POrder()
        }
      })
    },
    async CreateP2POrder() {
      try {
        this.P2PSpinner = true
        this.P2PBtnLoader = true
        const { $cookies, $axios, $config } = this
        let authHeaders = {
          Authorization: 'Bearer ' + $cookies.get('Token'),
        }

        const { data } = await $axios.post(
          $config.FINANCE_API_URL + '/CreateP2POrder',
          this.P2POrder,
          {
            headers: authHeaders,
          }
        )
        const { Success, Message, ErrorCode } = data
        if (Success) {
          this.P2POrder.FiatCurrency = undefined
          this.P2POrder.FiatPrice = 0
          this.P2POrder.Asset = undefined
          this.P2POrder.AssetAmount = ''
          this.P2POrder.Min = ''
          this.P2POrder.Max = ''
          this.P2POrder.Partially = true
          this.P2POrder.UserBankUniqueID = undefined
          this.P2POrder.RequestValidityMinutes = undefined
          this.$notification.success({
            message: 'P2P Order',
            description: Message,
          })
        } else {
          if (ErrorCode === 97) {
            this.showKycWarning = true
          }
          this.$notification.error({
            message: 'P2P Order',
            description: Message,
          })
        }
      } catch (e) {
        if (e.response) {
          this.$notification.error({
            message: 'P2P Order',
            description: e.response.data.Message,
          })
        } else {
          console.error(e)
        }
      } finally {
        this.P2PSpinner = false
        this.P2PBtnLoader = false
      }
    },
    required(rule, value, callback) {
      if (value === '' || value === null || !value) {
        callback(new Error(this.$t('validation_text_required')))
      } else {
        callback()
      }
    },
  },
}
</script>

<style scoped>
.p2p-text {
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #bcc3ca;
}
.P2POrderForm input::placeholder {
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #334150;
}
.P2POrderForm input {
  font-family: 'Roboto-Regular';
}
.rounded-input {
  pointer-events: none;
}
.rounded-input >>> .ant-input {
  border-radius: 50px;
}
</style>
