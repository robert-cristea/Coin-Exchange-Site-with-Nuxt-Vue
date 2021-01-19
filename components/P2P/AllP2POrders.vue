<template>
  <div class="market-page">
    <div class="filter" style="padding-left: 100px; padding-right: 100px">
      <a-tabs
        v-model="activeMarketTab"
        class="market-tabs"
        default-active-key="Almak İstiyorum"
      >
        <a-tab-pane key="Almak İstiyorum">
          <h3 slot="tab" class="Roboto-Medium m-0">
            {{ $t('p2p_order_text_tab_1') }}
          </h3>
          <a-form :form="buylistForm" @submit="buyhandleSubmit">
            <a-row
              :gutter="16"
              type="flex"
              align="bottom"
              class="form-container"
            >
              <a-col :span="5" class="form-fields">
                <p class="Roboto-Regular m-0">
                  {{ $t('p2p_order_field_label_1') }}
                </p>
                <a-form-item>
                  <a-select
                    :loading="selectLoading"
                    placeholder="Para Birimi"
                    class="select-field"
                    @change="buyhandleSubmit"
                    size="large"
                    v-decorator="[
                      'FiatCurrency',
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
              <a-col :span="5" class="form-fields">
                <p class="Roboto-Regular m-0">
                  {{ $t('p2p_order_field_label_2') }}
                </p>
                <a-form-item>
                  <a-select
                    @change="buyhandleSubmit"
                    class="select-field"
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
              <a-col :span="5" class="form-fields">
                <p class="Roboto-Regular m-0">
                  {{ $t('p2p_order_field_label_3') }}
                </p>
                <a-form-item>
                  <a-select
                    size="large"
                    @change="buyhandleSubmit"
                    class="select-field"
                    placeholder="Status"
                    v-decorator="['Status', { rules: [{ required: false }] }]"
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
            </a-row>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="Satmak İstiyorum">
          <h3 slot="tab" class="Roboto-Medium m-0">
            {{ $t('p2p_order_text_tab_2') }}
          </h3>
          <a-form :form="selllistForm" @submit="sellhandleSubmit">
            <a-row :gutter="16" type="flex" align="bottom">
              <a-col :span="5" class="form-fields">
                <p class="Roboto-Regular m-0">
                  {{ $t('p2p_order_field_label_1') }}
                </p>
                <a-form-item>
                  <a-select
                    @change="sellhandleSubmit"
                    class="select-field"
                    :loading="selectLoading"
                    placeholder="Para Birimi"
                    size="large"
                    v-decorator="[
                      'FiatCurrency',
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
              <a-col :span="5" class="form-fields">
                <p class="Roboto-Regular m-0">
                  {{ $t('p2p_order_field_label_2') }}
                </p>
                <a-form-item>
                  <a-select
                    size="large"
                    @change="sellhandleSubmit"
                    class="select-field"
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
              <a-col :span="5" class="form-fields">
                <p class="Roboto-Regular m-0">
                  {{ $t('p2p_order_field_label_3') }}
                </p>
                <a-form-item>
                  <a-select
                    class="select-field"
                    size="large"
                    @change="sellhandleSubmit"
                    placeholder="Status"
                    v-decorator="['Status', { rules: [{ required: false }] }]"
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
            </a-row>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="container">
      <a-row
        :gutter="16"
        type="flex"
        align="middle"
        class="Roboto-Regular table-heading-container"
      >
        <a-col class="table-heading" :span="5">
          <p>{{ $t('p2p_order_field_table_heading_1') }}</p>
        </a-col>
        <a-col class="table-heading" :span="5">
          <p>{{ $t('p2p_order_field_table_heading_2') }}</p>
        </a-col>
        <a-col class="table-heading" :span="5">
          <p>{{ $t('p2p_order_field_table_heading_3') }}</p>
        </a-col>
        <a-col class="table-heading" :span="3">
          <p>{{ $t('p2p_order_field_table_heading_4') }}</p>
        </a-col>
        <a-col class="table-heading" :span="3">
          <p>{{ $t('p2p_order_field_table_heading_5') }}</p>
        </a-col>
        <a-col class="table-heading" :span="3">
          <p>{{ $t('p2p_order_field_table_heading_6') }}</p>
        </a-col>
      </a-row>
      <div v-if="activeMarketTab === 'Almak İstiyorum'" class="table">
        <div
          class="collapse-panel"
          v-for="(item, index) in buyList"
          :key="index"
          :show-arrow="false"
        >
          <div slot="header">
            <h4 class="h4-desc">
              {{ item.Type }} | <b>{{ item.OTC_RequestUniqueID }}</b>
              {{ item.UpdatedOn }}
            </h4>
            <a-row
              :gutter="16"
              type="flex"
              align="middle"
              class="Roboto-Regular card"
            >
              <a-col :span="5"> {{ item.Asset }} </a-col>
              <a-col :span="5">
                <h2 class="m-0">
                  {{ item.FiatPrice }} {{ item.FiatCurrency }}
                </h2>
              </a-col>
              <a-col :span="5">
                <a-row>
                  <a-col :span="12">
                    <span class="limit-kulanlilabilir mr-1">{{
                      $t('p2p_table_rowName_1')
                    }}</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ item.Amount }} {{ item.Asset }} </span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <span class="limit-kulanlilabilir mr-1">{{
                      $t('p2p_table_rowName_2')
                    }}</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ item.Total }} {{ item.FiatCurrency }} </span>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="4">
                <span class="Siberancat"> {{ item.Counterparty }}</span>
              </a-col>
              <a-col :span="4">
                <span> {{ item.StatusLabel }}</span>
                <nuxt-link
                  :to="`P2PMarket/request/${item.OTC_RequestUniqueID}`"
                  >{{ $t('p2p_information') }}</nuxt-link
                >
              </a-col>
              <a-col :span="4"> </a-col>
            </a-row>
          </div>
        </div>
      </div>

      <div v-if="activeMarketTab === 'Satmak İstiyorum'" class="table">
        <div
          class="collapse-panel"
          v-for="(item, index) in sellList"
          :key="index"
          :show-arrow="false"
        >
          <div slot="header">
            <h4 class="h4-desc">
              Type | <b>{{ item.OTC_RequestUniqueID }}</b> {{ item.UpdatedOn }}
            </h4>
            <a-row
              :gutter="16"
              type="flex"
              align="middle"
              class="Roboto-Regular card"
            >
              <a-col :span="5"> {{ item.Asset }} </a-col>
              <a-col :span="5">
                <h2 class="m-0">
                  {{ item.FiatPrice }} {{ item.FiatCurrency }}
                </h2>
              </a-col>
              <a-col :span="5">
                <a-row>
                  <a-col :span="12">
                    <span class="limit-kulanlilabilir mr-1">{{
                      $t('p2p_table_rowName_1')
                    }}</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ item.Amount }} {{ item.Asset }} </span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <span class="limit-kulanlilabilir mr-1">{{
                      $t('p2p_table_rowName_2')
                    }}</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ item.Total }} {{ item.FiatCurrency }} </span>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="4">
                <span class="Siberancat"> {{ item.Counterparty }}</span>
              </a-col>
              <a-col :span="4">
                <span>{{ item.StatusLabel }}</span>
              </a-col>
              <a-col :span="4"> </a-col>
            </a-row>
          </div>
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
        FiatCurrency: undefined,
        Status: undefined,
      },
      buyList: [],
      sellList: [],
      assetDropdown: [],
      fiatDropdown: [],
      allOrders: [],
      processing: [],
      bankAccountList: [],
      selectLoading: true,
    }
  },
  mounted() {
    this.getData()
    this.getDropdown()
    // this.getBankAccounts()
  },

  methods: {
    buyresetFilter() {
      this.buylistForm.setFieldsValue({
        Asset: null,
        FiatCurrency: null,
        Status: null,
      })
      this.getData()
    },
    sellresetFilter() {
      this.selllistForm.setFieldsValue({
        Asset: null,
        FiatCurrency: null,
        Status: null,
      })
      this.getData()
    },
    buyhandleSubmit(e) {
      this.buylistForm.validateFields((err, values) => {
        if (!err) {
          this.getData(values)
        }
      })
    },
    sellhandleSubmit(e) {
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
        $config.FINANCE_API_URL + '/GetP2PMyAllOrderAndRequestList',
        {
          params: {
            ...filter,
          },
          headers: authHeader,
        }
      )
      if (response.data) {
        const {
          RequestList,
          OpenRequestList,
          OpenOrderList,
          OrderList,
        } = response.data
        this.buyList = OpenRequestList
        this.sellList = RequestList
        if (this.allOrders.length === 0) {
          this.allOrders = OpenRequestList
          this.processing = RequestList
        }
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
.container {
  margin: 10px auto;
}
.filter {
  background-color: white;
}

.collapse-panel {
  position: relative;
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

.card {
  margin-top: 20px;
}

.h4-desc {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 5px;
  background: #fcfcfc;
  font-size: 13px;
  padding: 5px 20px;
}
.table-heading > p {
  margin: 0 auto;
}

.table-heading > p:nth-child(1) {
  margin-left: 20px;
}

.button {
  background-color: #52c274;
  color: white;
}
.market-page {
  background-color: #fafafa;
}

.select-field {
  border: 1px solid #f2f2f2;
  border-radius: 4px;
}

.market-search-button {
  background-color: #52c274;
  color: white;
}
.filter {
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16078);
  padding-top: 20px;
  padding-bottom: 00px;
  margin-bottom: 20px;
}
/* .addon-bg-none {
  .ant-input-wrapper {
    .ant-input-group-addon {
      background-color: transparent;
    }
  }
}  */
.table-heading-container {
  display: flex;
  padding: 15px 0;
}

.Siberancat {
  color: #13b8f4;
}

@media (max-width: 768px) {
  .container {
    display: block;
    overflow-x: auto;
    margin: 0 20px;
    padding-right: 0;
    padding-left: 0;
  }
  .table-heading-container {
    width: 1000px;
  }

  .table > div {
    width: 1000px;
  }

  .form-container {
    flex-direction: column;
  }
  .form-fields {
    width: 100% !important;
  }
}
</style>
