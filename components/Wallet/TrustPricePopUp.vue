<template>
  <div class="popup">
    <a-icon v-if="loading" type="sync" spin />
    <a-form v-else :form="form" @submit="handleSubmit">
      <div class="fromToRow">
        <a-form-item v-bind:label="$t('transfer_sender')">
          <a-select
            v-decorator="[
              'From',
              {
                rules: [
                  { required: true, message: this.$t('text_required_field') },
                ],
                initialValue: fromValue,
              },
            ]"
            class="fromToSelects"
            @change="handleFromChange"
            :disabled="true"
          >
            <a-select-option
              v-for="item in fromToDropdownContent"
              :value="item"
              :key="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <img
          @click="switchWallets"
          src="~/assets/images/switch.svg"
          class="switch-icon"
          height="32"
        />
        <a-form-item v-bind:label="$t('transfer_receiver')">
          <a-select
            v-decorator="[
              'To',
              {
                rules: [
                  { required: true, message: this.$t('text_required_field') },
                ],
                initialValue: toValue,
              },
            ]"
            class="fromToSelects"
            @change="handleToChange"
            :disabled="true"
          >
            <a-select-option
              v-for="item in fromToDropdownContent"
              :value="item"
              :key="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </div>

      <a-form-item>
        <a-input-number
          style="width: 300px"
          v-decorator="[
            'Amount',
            {
              rules: [
                { required: true, message: this.$t('text_required_field') },
              ],
            },
          ]"
        />
      </a-form-item>

      <div class="avaiable">
        <span>{{ $t('transfer_available_amount') }}</span>
        <span
          v-if="this.fromValue === $t('text_security_deposit')"
          class="total"
          >{{ showingData.usdtSecurityBalance.toFixed(8) }} USDT</span
        >
        <span v-else class="total" @click="setMax"
          >{{ showingData.usdtP2PBalance }} USDT</span
        >
      </div>

      <a-button type="primary" style="width: 300px" html-type="submit">
        {{ $t('text_send') }}
      </a-button>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'TransferPopUp',

  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      fromToDropdownContent: [],
      unitDromDownContent: [],
      fromValue: this.$t('text_security_deposit'),
      toValue: this.$t('text_p2p_wallet'),

      showingData: {
        usdtP2PBalance: 0,
        usdtSecurityBalance: 0,
      },
      loading: true,
      UserBalance: {},
    }
  },
  mounted() {
    this.getDropdownContent()
    this.getMainWallet()
  },
  methods: {
    handleFromChange() {},
    handleToChange() {},
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.postData(values)
        }
      })
    },
    setMax() {},
    switchWallets() {
      const { fromValue, toValue } = this
      this.fromValue = toValue
      this.toValue = fromValue
    },
    async postData(data) {
      try {
        this.loading = true
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }
        let payload = {
          ...data,
        }

        const response = await this.$axios.post(
          this.$config.FINANCE_API_URL + `/Transfer`,
          payload,
          {
            headers: authHeaders,
          }
        )

        if (response.data.Success) {
          this.$notification.success({
            message: this.$t('text_success'),
            description: response.data.Message,
          })
          this.getMainWallet()
        } else {
          this.$notification['error']({
            message: this.$t('text_error'),
            description: response.data.Message,
          })
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$notification['error']({
          message: this.$t('text_error'),
          description: e,
        })
      }
    },
    async getDropdownContent() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL + `/GetFilters`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          // TODO: response.data['Message']
          this.loading = false

          this.fromToDropdownContent = response.data.TransferList.map(
            ({ Name }) => Name
          )
          this.fromToDropdownContent = this.fromToDropdownContent.filter(
            (word) => word !== this.$t('text_security_deposit')
          )
          this.unitDromDownContent = response.data.AssetList.map(
            ({ Name }) => Name
          )
        }
      } catch (e) {
        this.$notification['error']({
          message: this.$t('text_error'),
          description: e,
        })
      }
    },
    async getMainWallet() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL + '/GetUserBalance',
          {
            headers: authHeaders,
          }
        )
        if (response.data) {
          this.loading = false
          const { SecurityBalance, UserP2PBalance } = response.data
          this.showingData.usdtSecurityBalance = SecurityBalance
          let wa = Object.values(UserP2PBalance).filter(
            (wa) => wa.asset === 'USDT'
          )
          this.showingData.usdtP2PBalance = wa[0].free.toFixed(8)
        }
      } catch (e) {
        
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.fromToRow {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
}
.fromToSelects {
  width: 120px;
}
.avaiable {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .total {
    color: #1ba4e8;
  }
}
</style>
