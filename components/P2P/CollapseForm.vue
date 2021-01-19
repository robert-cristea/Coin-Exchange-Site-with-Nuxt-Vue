<template>
  <a-spin :spinning="isCollapseFormLoading">
    <a-form-model
      layout="inline"
      ref="CollapseFormRef"
      :rules="CollapseFormRules"
      :model="CollapseForm"
      :hideRequiredMark="true"
    >
      <a-form-model-item>
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
        <a-button
          :loading="isCollapseFormLoading"
          type="primary"
          block
          @click="validateCollapseForm"
          >Satın al</a-button
        >
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="secondary" class="text-danger" block>Iptal</a-button>
      </a-form-model-item>
      <KycWarningPopup
        :visible="showKycWarning"
        @close="showKycWarning = false"
      />
      <P2PUserNamePopUp
        :visible="showP2PUserNamePopUp"
        @close="showP2PUserNamePopUp = false"
      />
    </a-form-model>
  </a-spin>
</template>

<script>
export default {
  name: 'CollapseForm',
  props: {
    FormTitle: {
      required: true,
      type: String,
    },
    FormData: {
      required: true,
      type: Object,
    },
    Banks: {
      required: false,
      type: Array,
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
      showKycWarning: false,
      showP2PUserNamePopUp: false,
      isCollapseFormLoading: false,
    }
  },
  mounted() {},
  methods: {
    validateCollapseForm() {
      this.$refs.CollapseFormRef.validate((valid) => {
        if (valid) {
          this.createP2PRequest()
        }
      })
    },

    async createP2PRequest() {
      try {
        this.isCollapseFormLoading = true
        let payload = {}
        if (this.ListType === 'BUY') {
          let index = this.Banks.findIndex(
            (bank) => this.CollapseForm.Bank === bank.BankAccountId
          )
          let bankInfo = this.Banks[index]
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
          this.$notification['success']({
            message: this.$t('text_success'),
          })
          this.$nextTick(() => {
            this.$router.push(
              this.localeRoute(`/P2PMarket/request/${data.RequestId}`)
            )
          })
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
        this.isCollapseFormLoading = false
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
}
</script>
