<template>
  <div class="">
    <a-spin :spinning="isTransferPopBusy">
      <a-form-model
        :model="TransferData"
        :rules="TransferDataRules"
        ref="TransferForm"
      >
        <a-row :gutter="16" type="flex" align="middle">
          <a-col :span="10">
            <a-form-model-item class="" prop="From">
              <h4 class="m-0 Roboto-Bold text-left">
                {{ $t('transfer_sender') }}
              </h4>
              <a-select
                v-model="TransferData.From"
                class="Roboto-Regular"
                size="large"
              >
                <a-select-option
                  v-for="(item, index) in TransferWalletsFrom"
                  :value="item.Key"
                  :key="index"
                >
                  {{ item.Name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="4">
            <div class="text-center">
              <img
                @click="switchWallets"
                src="~/assets/images/switch.svg"
                class="switch-wallets-icon"
              />
            </div>
          </a-col>
          <a-col :span="10">
            <a-form-model-item prop="To">
              <h4 class="m-0 Roboto-Bold text-right">
                {{ $t('transfer_receiver') }}
              </h4>
              <a-select
                size="large"
                v-model="TransferData.To"
                class="Roboto-Regular"
              >
                <a-select-option
                  v-for="(item, index) in TransferWalletsTo"
                  :value="item.Key"
                  :key="index"
                >
                  {{ item.Name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-model-item prop="Asset" has-feedback>
              <a-select
                v-model="TransferData.Asset"
                class="Roboto-Regular"
                size="large"
                v-bind:placeholder="$t('main_wallet_asset')"
              >
                <a-select-option
                  v-for="(item, index) in WalletAssets"
                  :value="item.asset"
                  :key="index"
                >
                  <div class="d-flex align-items-center justify-content-start">
                    <img
                      :src="getAssetIcon(item.asset)"
                      style="margin-right: 6px"
                      width="18px"
                    />
                    <span class="Roboto-Bold">
                      {{ item.asset }}
                    </span>
                  </div>
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-model-item prop="Amount" has-feedback>
              <a-input-number
                v-model.Number="TransferData.Amount"
                size="large"
                class="w-100 Roboto-Regular"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row :gutter="0" style="margin: 10px auto">
          <a-col :span="12">
            <h4 class="text-left Roboto-Regular">
              {{ $t('transfer_available_amount') }}
            </h4>
          </a-col>
          <a-col :span="12">
            <h4 class="text-right primary-text Roboto-Bold">
              <a-button
                @click="TransferData.Amount = TransferAssetAvailableAmount"
                type="link"
              >
                {{ TransferAssetAvailableAmount }} {{ TransferData.Asset }}
              </a-button>
            </h4>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="24">
            <a-button
              size="large"
              :loading="isTransferLoading"
              type="primary"
              class="Roboto-Medium"
              @click="ValidateAndTransfer"
              block
            >
              {{ $t('transfer_start') }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: 'TransferPopUp',
  data() {
    const validValue = (rule, value, callback) => {
      if (!!value) {
        callback()
      } else {
        callback(new Error(this.$t('text_required_field')))
      }
    }
    const AmountCheck = (rule, value, callback) => {
      if (value <= this.TransferAssetAvailableAmount) {
        callback()
      } else {
        callback(new Error(this.$t('text_insufficient_balance')))
      }
    }
    return {
      TransferWallets: [],
      FIAT_WALLETS: ['Fiat Wallet'],
      UserWalletsBalance: [],
      TransferData: {
        From: 'Main Wallet',
        To: 'Fiat Wallet',
        Amount: 0,
        Asset: undefined,
      },

      TransferDataRules: {
        From: [
          {
            validator: validValue,
            trigger: 'change',
          },
        ],
        To: [
          {
            validator: validValue,
            trigger: 'change',
          },
        ],
        Amount: [
          {
            validator: validValue,
            trigger: 'change',
          },
          {
            validator: AmountCheck,
            trigger: 'change',
          },
        ],
        Asset: [
          {
            validator: validValue,
            trigger: 'change',
          },
        ],
      },
      isTransferLoading: false,
      isTransferPopBusy: false,
    }
  },
  mounted() {
    this.getTransferWallets()
    this.getUserBalance()

    this.$nextTick(() => {
      this.TransferData.Asset = 'BTC'
    })
  },
  methods: {
    getAssetIcon(symbol) {
      try {
        return require(`~/assets/icons/${symbol.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },

    switchWallets() {
      const { From, To } = this.TransferData
      this.TransferData.From = To
      this.TransferData.To = From
    },

    ValidateAndTransfer() {
      this.$refs.TransferForm.validate((valid) => {
        if (valid) {
          this.Transfer()
        }
      })
    },
    async Transfer(data) {
      try {
        this.isTransferLoading = true
        this.isTransferPopBusy = true
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }
        const { data } = await this.$axios.post(
          this.$config.FINANCE_API_URL + `/Transfer`,
          this.TransferData,
          {
            headers: authHeaders,
          }
        )

        if (data.Success) {
          this.$notification.success({
            message: this.$t('text_success'),
            description: data.Message,
          })
          this.getUserBalance()
        } else {
          this.$notification['info']({
            message: this.$t('text_failed'),
            description: data.Message,
          })
        }
      } catch (e) {
        if (e.response) {
          this.$notification['info']({
            message: this.$t('text_failed'),
            description: e.response.data.Message,
          })
        } else {
          console.error(e)
        }
      } finally {
        this.isTransferLoading = false
        this.isTransferPopBusy = false
      }
    },

    async getTransferWallets() {
      try {
        this.isTransferPopBusy = true
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const { data } = await this.$axios.get(
          this.$config.FINANCE_API_URL + `/GetFilters`,
          {
            headers: authHeaders,
          }
        )

        if (data.Success) {
          const { TransferList } = data
          this.TransferWallets = TransferList.filter(
            ({ Key }) => Key !== 'Security Wallet'
          )
        }
      } catch (e) {
      } finally {
        this.isTransferPopBusy = false
      }
    },

    async getUserBalance() {
      try {
        this.isTransferPopBusy = true
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const { data } = await this.$axios.get(
          this.$config.FINANCE_API_URL + '/GetUserBalance',
          {
            headers: authHeaders,
          }
        )
        if (data.Success) {
          this.UserWalletsBalance = data
        }
      } catch (e) {
      } finally {
        this.isTransferPopBusy = false
      }
    },
  },
  computed: {
    TransferWalletsFrom() {
      return this.TransferWallets.filter(
        (item) => item.Key !== this.TransferData.To
      )
    },
    TransferWalletsTo() {
      return this.TransferWallets.filter(
        (item) => item.Key !== this.TransferData.From
      )
    },

    // Active Wallet Assets
    WalletAssets() {
      if (
        this.TransferData.From === 'Fiat Wallet' ||
        this.TransferData.To === 'Fiat Wallet'
      ) {
        if (this.UserWalletsBalance.UserFiatBalance) {
          return this.UserWalletsBalance.UserFiatBalance.filter(
            (wa) => wa.asset !== 'TRY'
          )
        }
      }
      if (
        this.TransferData.From === 'P2P Wallet' ||
        this.TransferData.To === 'P2P Wallet'
      ) {
        return this.UserWalletsBalance.UserP2PBalance
      }
    },

    // Compute User Wallet Balance
    TransferAssetAvailableAmount() {
      if (this.TransferData.From === 'Main Wallet') {
        if (this.UserWalletsBalance.UserSpotBalance) {
          let wa = Object.values(
            this.UserWalletsBalance.UserSpotBalance
          ).filter((wa) => wa.asset === this.TransferData.Asset)
          return wa[0] ? wa[0].free.toFixed(8) : ''
        }
      } else if (this.TransferData.From === 'Fiat Wallet') {
        if (this.UserWalletsBalance.UserFiatBalance) {
          let wa = Object.values(
            this.UserWalletsBalance.UserFiatBalance
          ).filter((wa) => wa.asset === this.TransferData.Asset)
          return wa[0] ? wa[0].free.toFixed(8) : ''
        }
      } else if (this.TransferData.From === 'P2P Wallet') {
        if (this.UserWalletsBalance.UserP2PBalance) {
          let wa = Object.values(this.UserWalletsBalance.UserP2PBalance).filter(
            (wa) => wa.asset === this.TransferData.Asset
          )
          return wa[0] ? wa[0].free.toFixed(8) : ''
        }
      }
    },
  },
  watch: {
    'TransferData.From': {
      handler: function (val, old) {
        if (val !== 'Main Wallet' && this.TransferData.To !== 'Main Wallet') {
          this.TransferData.To = old

          this.TransferData.Asset = undefined
        }
      },
      deep: true,
    },
    'TransferData.To': {
      handler: function (val, old) {
        if (val !== 'Main Wallet' && this.TransferData.From !== 'Main Wallet') {
          this.TransferData.From = old

          this.TransferData.Asset = undefined
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.switch-wallets-icon {
  cursor: pointer;
}
</style>
