<template>
  <a-form-model
    ref="CollapseFormRef"
    id="p2p-request-form"
    :rules="CollapseFormRules"
    :model="CollapseForm"
    :hideRequiredMark="true"
  >
    <a-row
      type="flex"
      justify="center"
      align="top"
      :gutter="10"
      class="h-100"
      style="padding-top: 25px"
    >
      <a-col :span="24" :md="3">
        <div class="Roboto-Medium form-title">{{ FormTitle }}</div>
      </a-col>
      <a-col :span="24" :md="5">
        <a-form-model-item prop="FiatAmount">
          <a-input v-model="CollapseForm.FiatAmount" placeholder="Miktar">
            <span slot="suffix">
              {{ FormData.FiatCurrency }}
            </span>
          </a-input>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :md="5">
        <a-form-model-item prop="Amount">
          <a-input
            v-model="CollapseForm.Amount"
            placeholder="Miktar"
            @change="handleAmountChange(FormData.FiatPrice)"
          >
            <span slot="suffix">
              <a-button size="small" type="link" @click="wholeAmount">
                Tumu </a-button
              >{{ FormData.Asset_ }}
            </span>
          </a-input>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :md="5">
        <a-form-model-item v-if="ListType === 'BUY'" prop="Bank">
          <a-select
            v-model="CollapseForm.Bank"
            placeholder="Banka Seciniz"
            class="selection-input"
          >
            <a-select-option
              v-for="acc in banks"
              :value="acc.BankAccountId"
              :key="acc.BankAccountId"
              >{{ acc.FriendlyName }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :md="2">
        <a-button
          class="form-button"
          type="primary"
          block
          @click="validateCollapseForm"
          >Satın al</a-button
        >
      </a-col>
      <a-col :span="24" :md="3">
        <a-button class="form-button text-danger" block @click="$emit('cancel')"
          >Iptal</a-button
        >
      </a-col>
    </a-row>
    <!-- <a-form-model-item>
      <div slot="label" class="Roboto-Medium">{{ FormTitle }}</div>
    </a-form-model-item>
    <a-form-model-item prop="FiatAmount">
      <a-input
        v-model="CollapseForm.FiatAmount"
        class="addon-bg-none"
        placeholder="FiatAmount"
      >
        <div slot="addonAfter" class="Roboto-Medium">
          {{ FormData.FiatCurrency }}
        </div>
      </a-input>
    </a-form-model-item>
    <a-form-model-item prop="Amount">
      <a-input
        v-model="CollapseForm.Amount"
        placeholder="Amount"
        @change="handleAmountChange(FormData.FiatPrice)"
      >
        <div slot="addonAfter" class="Roboto-Medium">
          <span>Tumu</span>
          {{ FormData.Asset }}
        </div>
      </a-input>
    </a-form-model-item>
    <a-form-model-item v-if="ListType === 'BUY'" prop="Bank">
      <a-select
        v-model="CollapseForm.Bank"
        placeholder="Banka Seciniz"
        style="width: 200px"
      >
        <a-select-option
          v-for="(acc, index) in Banks"
          :value="acc.BankAccountId"
          :key="acc.BankAccountId"
          >{{ acc.FriendlyName }}</a-select-option
        >
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" block @click="validateCollapseForm"
        >Satın al</a-button
      >
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="secondary" class="text-danger" block>Iptal</a-button>
    </a-form-model-item> -->
    <KycWarningPopup
      :visible="showKycWarning"
      @close="showKycWarning = false"
    />
    <P2PUserNamePopUp
      :visible="showP2PUserNamePopUp"
      @close="showP2PUserNamePopUp = false"
    />
  </a-form-model>
</template>

<script>
export default {
  name: 'P2PRequestForm',
  props: {
    FormTitle: {
      required: true,
      type: String,
    },
    FormData: {
      required: true,
      type: Object,
    },
    ListType: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      CollapseForm: {
        FiatAmount: '',
        Amount: '',
        Bank: '',
      },
      CollapseFormRules: {
        FiatAmount: [{ validator: this.required, trigger: 'change' }],
        Amount: [{ validator: this.required, trigger: 'change' }],
        Bank: [{ validator: this.required, trigger: 'change' }],
      },
      banks: [],
      showKycWarning: false,
      showP2PUserNamePopUp: false,
    }
  },
  watch: {
    'CollapseForm.FiatAmount': {
      handler: function (val) {
        this.CollapseForm.Amount =
          this.CollapseForm.FiatAmount / this.FormData.FiatPrice
      },
    },
    'CollapseForm.Amount': {
      handler: function (val) {
        this.CollapseForm.FiatAmount =
          this.CollapseForm.Amount * this.FormData.FiatPrice
      },
    },
  },
  mounted() {
    this.getBankAccounts()
  },
  methods: {
    wholeAmount() {
      if (this.ListType === 'BUY')
        this.CollapseForm.Amount = this.FormData.Available
      else {
        return
      }
    },

    validateCollapseForm() {
      this.$refs.CollapseFormRef.validate((valid) => {
        if (valid) {
          this.createP2PRequest()
        }
      })
    },

    async createP2PRequest() {
      try {
        let payload = {}
        if (this.ListType === 'BUY') {
          let index = this.banks.findIndex(
            (bank) => this.CollapseForm.Bank === bank.BankAccountId
          )
          let bankInfo = this.banks[index]
          payload = {
            Amount: this.CollapseForm.Amount,
            OTC_UserBankUniqueID: bankInfo.BankAccountId,
            OrderId: this.FormData.OTC_OrderUniqueID,
          }
        }
        if (this.ListType === 'SELL') {
          payload = {
            Amount: this.CollapseForm.Amount,
            OrderId: this.FormData.OTC_OrderUniqueID,
          }
        }

        const { $axios, $config, $cookies } = this
        let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.post(
          $config.FINANCE_API_URL + '/CreateP2PRequest',
          payload,
          {
            headers: authHeader,
          }
        )
        if (data.Success) {
          this.$router.push(
            this.localeRoute(`/P2PMarket/request/${data.RequestId}`)
          )
        } else {
          if (data.ErrorCode === 97) {
            this.showKycWarning = true
            return
          } else if (data.ErrorCode === 96) {
            this.showP2PUserNamePopUp = true
          } else {
            this.$notification['info']({
              message: data.Message,
            })
          }
        }
      } catch (e) {
        if (e.response) {
          this.$notification['error']({
            message: e.response.data.Message,
          })
        }
      } finally {
      }
    },

    required(rule, value, callback) {
      if (value === '' || value === null || !value) {
        callback(new Error(this.$t('validation_text_required')))
      } else {
        callback()
      }
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
        this.banks = data.BankAccounts
      }
    },
  },
}
</script>

<style lang="less" scoped>
// #p2p-request-form .selection-input {
//   border: 1px solid #d9d9d9 !important;
//   border-radius: 4px;
//   background-color: #aeaeae;
// }
.form-title {
  padding: 10px 0;
}
.form-button {
  margin-top: 4px;
}
</style>
<style lang="less">
#p2p-request-form .selection-input .ant-select-selection {
  border: 1px solid #d9d9d9 !important;
}
</style>
