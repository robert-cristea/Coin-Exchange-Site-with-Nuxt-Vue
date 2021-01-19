<template>
  <div class="market-page">
    <div class="filter" style="padding-left: 100px; padding-right: 100px">
      <a-tabs
        v-model="activeMarketTab"
        class="market-tabs"
        default-active-key="Almak İstiyorum"
      >
        <a-tab-pane key="Almak İstiyorum">
          <h3 slot="tab" class="Roboto-Medium m-0">Almak İstiyorum</h3>
          <a-form :form="buylistForm" @submit="buyhandleSubmit">
            <a-row :gutter="16" type="flex" align="bottom">
              <a-col :span="4">
                <p class="Roboto-Regular m-0">Coinler</p>
                <a-form-item>
                  <a-select
                    :loading="selectLoading"
                    placeholder="Para Birimi"
                    size="large"
                    v-decorator="[
                      'Currency',
                      {
                        rules: [
                          {
                            required: true,
                            message: this.$t('text_required_field'),
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="currency in fiatDropdown"
                      :value="currency.Name"
                      :key="currency.Name"
                      >{{ currency.Name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <p class="Roboto-Regular m-0">Emir Türü</p>
                <a-form-item>
                  <a-select
                    size="large"
                    placeholder="Birim"
                    v-decorator="['Asset', { rules: [{ required: false }] }]"
                  >
                    <a-select-option
                      v-for="asset in assetDropdown"
                      :value="asset.Name"
                      :key="asset.Name"
                      >{{ asset.Name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item>
                  <a-button
                    size="large"
                    block
                    class="market-search-button"
                    html-type="submit"
                    >Ara</a-button
                  >
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item>
                  <a size="large" @click="buyresetFilter"><u>Reset</u></a>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="Satmak İstiyorum">
          <h3 slot="tab" class="Roboto-Medium m-0">Satmak İstiyorum</h3>
          <a-form :form="selllistForm" @submit="sellhandleSubmit">
            <a-row :gutter="16" type="flex" align="bottom">
              <a-col :span="4">
                <p class="Roboto-Regular m-0">Coinler</p>
                <a-form-item>
                  <a-select
                    placeholder="Para Birimi"
                    size="large"
                    :loading="selectLoading"
                    v-decorator="[
                      'Currency',
                      {
                        rules: [
                          {
                            required: true,
                            message: this.$t('text_required_field'),
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="currency in fiatDropdown"
                      :value="currency.Name"
                      :key="currency.Name"
                      >{{ currency.Name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <p class="Roboto-Regular m-0">Birim</p>
                <a-form-item>
                  <a-select
                    placeholder="Birim"
                    size="large"
                    v-decorator="['Asset', { rules: [{ required: false }] }]"
                  >
                    <a-select-option
                      v-for="asset in assetDropdown"
                      :value="asset.Name"
                      :key="asset.Name"
                      >{{ asset.Name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item>
                  <a-button
                    size="large"
                    block
                    class="market-search-button"
                    html-type="submit"
                    >Ara</a-button
                  >
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item>
                  <a @click="sellresetFilter"><u>Reset</u></a>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="container">
      <div v-if="activeMarketTab === 'Almak İstiyorum'" class="table">
        <div v-if="sellList.length">
          <a-collapse
            v-model="activePanelKey"
            :bordered="false"
            :accordion="true"
          >
            <a-collapse-panel
              class="collapse-panel"
              v-for="(item, index) in sellList"
              :key="index"
              :show-arrow="false"
            >
              <div slot="header">
                <a-row
                  :gutter="16"
                  type="flex"
                  align="middle"
                  class="Roboto-Regular"
                >
                  <a-col :span="6"> {{ item.OTC_Username }} </a-col>
                  <a-col :span="5">
                    <h2 class="m-0">
                      {{ item.FiatPrice }} {{ item.FiatCurrency }}
                    </h2>
                  </a-col>
                  <a-col :span="5">
                    <a-row>
                      <a-col :span="12">
                        <span class="limit-kulanlilabilir mr-1"
                          >Kullanılabilir</span
                        >
                      </a-col>
                      <a-col :span="12">
                        <span> {{ item.Available }} {{ item.Asset }} </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <span class="limit-kulanlilabilir mr-1">Limit</span>
                      </a-col>
                      <a-col :span="12">
                        <span>
                          {{ item.Min }} {{ item.FiatCurrency }} -
                          {{ item.Max }}
                          {{ item.FiatCurrency }}
                        </span>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="4">
                    <img src="~/assets/images/walletP2P.svg" alt />
                    <span>Banka Transferi</span>
                  </a-col>
                  <a-col :span="4">
                    <a-button
                      @click="activePanelKey = index"
                      class="float-right button"
                    >
                      {{ item.Asset }} AL
                    </a-button>
                  </a-col>
                </a-row>
              </div>
              <div class="collapse-panel-content">
                <CollapseForm
                  FormTitle="Almak İstiyorum"
                  :FormData="item"
                  ListType="SELL"
                />
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
        <div v-else>
          <a-empty description="Data Not Found" />
        </div>
      </div>

      <div v-if="activeMarketTab === 'Satmak İstiyorum'" class="table">
        <div v-if="buyList.length">
          <a-collapse
            v-model="activePanelKey"
            :bordered="false"
            :accordion="true"
          >
            <a-collapse-panel
              class="collapse-panel"
              v-for="(item, index) in buyList"
              :key="index"
              :show-arrow="false"
            >
              <div slot="header">
                <a-row
                  :gutter="16"
                  type="flex"
                  align="middle"
                  class="Roboto-Regular"
                >
                  <a-col :span="6"> {{ item.OTC_Username }} </a-col>
                  <a-col :span="5">
                    <h2 class="m-0">
                      {{ item.FiatPrice }} {{ item.FiatCurrency }}
                    </h2>
                  </a-col>
                  <a-col :span="5">
                    <a-row>
                      <a-col :span="12">
                        <span class="limit-kulanlilabilir mr-1"
                          >Kullanılabilir</span
                        >
                      </a-col>
                      <a-col :span="12">
                        <span> {{ item.Available }} {{ item.Asset }} </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <span class="limit-kulanlilabilir mr-1">Limit</span>
                      </a-col>
                      <a-col :span="12">
                        <span>
                          {{ item.Min }} {{ item.FiatCurrency }} -
                          {{ item.Max }}
                          {{ item.FiatCurrency }}
                        </span>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="4">
                    <img src="~/assets/images/walletP2P.svg" alt />
                    <span>Banka Transferi</span>
                  </a-col>
                  <a-col :span="4">
                    <a-button
                      @click="activePanelKey = index"
                      class="float-right button"
                    >
                      {{ item.Asset }} AL
                    </a-button>
                  </a-col>
                </a-row>
              </div>
              <div class="collapse-panel-content">
                <CollapseForm
                  :key="index"
                  FormTitle="Satmak İstiyorum"
                  :FormData="item"
                  :Banks="bankAccountList"
                  ListType="BUY"
                />
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
        <div v-else>
          <a-empty description="Data Not Found"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Market',
  data() {
    return {
      activePanelKey: '',
      activeMarketTab: 'Almak İstiyorum',
      buylistForm: this.$form.createForm(this, { name: 'buyListSearch' }),
      selllistForm: this.$form.createForm(this, { name: 'sellListSearch' }),
      filter: {
        Asset: undefined,
        Currency: undefined,
      },
      buyList: [],
      sellList: [],
      assetDropdown: [],
      fiatDropdown: [],
      bankAccountList: [],
      selectLoading: true,
    }
  },
  mounted() {
    this.getData()
    this.getDropdown()
    this.getBankAccounts()
  },

  methods: {
    buyresetFilter() {
      this.buylistForm.setFieldsValue({
        Asset: null,
        Currency: null,
      })
      this.getData()
    },
    sellresetFilter() {
      this.selllistForm.setFieldsValue({
        Asset: null,
        Currency: null,
      })
      this.getData()
    },
    buyhandleSubmit(e) {
      e.preventDefault()
      this.buylistForm.validateFields((err, values) => {
        if (!err) {
          this.getData(values)
        }
      })
    },
    sellhandleSubmit(e) {
      e.preventDefault()
      this.selllistForm.validateFields((err, values) => {
        if (!err) {
          this.getData(values)
        }
      })
    },
    async getBankAccounts() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.get(
        $config.FINANCE_API_URL + '/GetCustomerBankAccountList',
        {
          headers: authHeader,
        }
      )
      if (data.Success) {
        this.bankAccountList = data.BankAccounts
      }
    },
    async getData(filter = this.filter) {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetP2POpenOrders',
        {
          params: {
            ...filter,
          },
          headers: authHeader,
        }
      )
      if (response.data) {
        const { BuyList, SellList } = response.data
        this.buyList = BuyList
        this.sellList = SellList
        
        
      }
    },
    async getDropdown() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetP2PDataList',
        {
          headers: authHeader,
        }
      )
      if (response.data) {
        const { AssetList, FiatList } = response.data

        this.assetDropdown = AssetList
        this.fiatDropdown = FiatList
        
        
        this.selectLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter {
  background-color: white;
}

.collapse-panel {
  padding: 25px;
  background-color: white;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16078);
  margin-bottom: 5px;
}
.collapse-panel-content {
  margin-top: 20px;
}
.limit-kulanlilabilir {
  font-size: 12px;
  color: #8a8e91;
}
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
  .table-header {
    padding: 20px 10px;
    width: 100%;
    font-family: 'Roboto-Medium';
    color: #9fa0a3;
    display: flex;
    justify-content: space-between;
  }
  .table-content {
    .table-item-extra {
      margin: 5px auto;
    }
  }
  .table-item {
    padding: 30px;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 3px #00000029;
    border-bottom: 1px solid #00000029;

    .name-group {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: black;
      width: 200px;
      .name-info {
        display: flex;
        color: #8a8e91;
        font-size: 12px;
        justify-content: space-between;
        width: 100%;
      }
    }
    .price-group {
      padding-left: 50px;
      color: black;
      font-size: 20px;
    }

    .limit-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 420px;
      color: black;
      font-size: 14px;
      .limit-info {
        display: flex;
        flex-direction: column;
        margin-left: 50px;
      }
      .limit-label {
        color: #8a8e91;
        font-size: 12px;
      }
      .limit-first {
        display: flex;

        width: 250px;
        span {
          margin-right: 30px;
        }
      }
    }
  }
  .table-item-form {
    padding: 20px;
    background-color: white;
    box-shadow: 0px 0px 3px #00000029;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
}
.button {
  background-color: #52c274;
  color: white;
}
.market-page {
  background-color: #fafafa;
}
.market-search-button {
  background-color: #52c274;
  color: white;
}
.filter {
  box-shadow: 0px 0px 6px #00000029;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 20px;
}
/* .addon-bg-none {
  .ant-input-wrapper {
    .ant-input-group-addon {
      background-color: transparent;
    }
  }
}  */
</style>
