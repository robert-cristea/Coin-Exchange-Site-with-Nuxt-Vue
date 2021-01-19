<template>
  <div class="Roboto-Regular" style="background-color: #fafafa">
    <a-breadcrumb
      class="Roboto-Regular"
      style="margin-top: 20px; margin-left: 20px; margin-bottom: 30px"
    >
      <a-breadcrumb-item
        ><a
          @click="
            SET_CURRENT_TAB('Price'),
              $router.push(localeRoute('/my/wallet/fiat-wallet'))
          "
          >{{ $t('text_fiat_wallet') }}</a
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>{{ $t('text_withdraw') }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row style="margin-bottom: 20px">
      <a-col :offset="1" :span="23" style="text-align: start">
        <div class="Roboto-Regular" style="font-size: 32px; color: #1c2640">
          {{ $t('fiat_wallet_withdraw') }}
        </div>
      </a-col>
    </a-row>

    <a-row
      :class="!isMobile ? 'main-row' : 'main-row-mobile'"
      style="border-radius: 10px"
    >
      <a-col
        :offset="!isMobile ? 1 : 0"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="10"
        :xl="10"
        style="text-align: start"
      >
        <a-row class="amount-row">
          <a-col :span="12" align="start">
            <p style="color: #48567e">{{ $t('available_amount') }}</p>
          </a-col>
          <a-col :span="12" align="end">
            <p style="color: #0d1324">
              {{ USER_BALANCE['UserFiatBalance'][4].free }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="amount-row">
          <a-col :span="12" align="start">
            <p style="color: #48567e">{{ $t('used_amount') }}</p>
          </a-col>
          <a-col :span="12" align="end">
            <p style="color: #0d1324">
              {{ USER_BALANCE['UserFiatBalance'][4].locked }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="amount-row">
          <a-col :span="12" align="start">
            <p style="color: #48567e">{{ $t('total_amount') }}</p>
          </a-col>
          <a-col :span="12" align="end">
            <p style="color: #0d1324">
              {{ USER_BALANCE.TotalFiatBalanceInTRY }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="amount-row">
          <a-col :span="12" align="start">
            <p style="color: #48567e">{{ $t('fiat_wallet_min_amount') }}</p>
          </a-col>
          <a-col :span="12" align="end">
            <p style="color: #0d1324">
              {{ limits.FiatLimits.MinWithdrawAmount }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="amount-row">
          <a-col :span="12" align="start">
            <p style="color: #48567e">{{ $t('fiat_wallet_withdraw_fee') }}</p>
          </a-col>
          <a-col :span="12" align="end">
            <p style="color: #0d1324">
              {{ limits.FiatLimits.WithdrawFee }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="amount-row">
          <a-col :span="12" align="start">
            <p style="color: #48567e">
              {{ $t('fiat_wallet_daily_withdraw_limit') }}
            </p>
          </a-col>
          <a-col :span="12" align="end">
            <p style="color: #0d1324">
              {{ limits.FiatLimits.DailyWithdraw }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row>
          <a-col
            :span="23"
            class="tip"
            :style="isMobile ? 'margin-top: 0' : null"
          >
            <a-col>
              <img
                style="position: relative"
                src="@/assets/icons/Bulb.png"
                alt="Bulb"
              />
              {{ $t('fiat_wallet_tips') }}:
            </a-col>
            <a-col style="margin-top: 10px" :span="24">
              <li>{{ $t('fiat_wallet_tips_item_one') }}</li>
            </a-col>
            <a-col :span="24">
              <li>{{ $t('fiat_wallet_tips_item_two') }}</li>
            </a-col>
          </a-col>
        </a-row>
      </a-col>

      <a-col
        :class="!isMobile ? 'second-row' : 'second-row-mobile'"
        :offset="!isMobile ? 1 : 0"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="11"
        :xl="11"
      >
        <a-col style="margin-top: 80px">
          <a-col
            offset="1"
            :span="7"
            :align="!isMobile ? 'right' : 'left'"
            style="padding-top: 5px"
          >
            {{ $t('fiat_wallet_label_bank_account') }}
          </a-col>

          <a-col offset="1" :span="15">
            <a-form class="Roboto-Regular">
              <a-form-item
                :has-feedback="bankAccountAlert"
                :validate-status="bankAccountAlert ? 'error' : null"
                :help="bankAccountErrorMessage"
              >
                <a-select
                  style="width: 90%; z-index: 1"
                  show-search
                  placeholder="Seçiniz"
                  @change="handleChange"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                >
                  <a-select-option
                    v-for="item in bankAccounts['BankAccounts']"
                    v-bind:key="item['BankAccountId']"
                    v-bind:value="item['FriendlyName']"
                  >
                    {{ item['FriendlyName'] }}
                  </a-select-option>
                  <a-select-option key="999" value="click">
                    <img
                      height="20"
                      :src="require(`~/assets/icons/add-home.png`)"
                      style="margin-bottom: 2px"
                      alt
                    />
                    <span style="color: #1ba4e8">
                      {{ $t('fiat_wallet_new_bank') }}</span
                    >
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </a-col>
        </a-col>

        <a-col style="margin-top: 70px">
          <a-col
            offset="1"
            :span="7"
            :align="!isMobile ? 'right' : 'left'"
            style="padding-top: 5px"
          >
            {{ $t('fiat_wallet_quantity') }}
          </a-col>

          <a-col offset="1" :span="15">
            <a-form class="Roboto-Regular">
              <a-form-item
                :has-feedback="amountAlert"
                :validate-status="amountAlert ? 'error' : null"
                :help="amountErrorMessage"
              >
                <a-input-number
                  class="no-focus-shadow Roboto-Regular"
                  style="width: 90%; z-index: 1"
                  v-model="amount"
                  @keyup="checkAmount"
                />
              </a-form-item>
            </a-form>
          </a-col>
        </a-col>

        <hr class="modal-horizontal-line" />

        <a-row class="send-row">
          <a-col offset="1" :span="11" align="start">
            <p style="color: #48567e">{{ $t('available_amount') }}</p>
          </a-col>
          <a-col :span="11" align="end">
            <p style="color: #1ba4e8">
              {{ USER_BALANCE['UserFiatBalance'][4].free }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="send-row">
          <a-col offset="1" :span="11" align="start">
            <p style="color: #48567e">{{ $t('fiat_wallet_withdraw_fee') }}</p>
          </a-col>
          <a-col :span="11" align="end">
            <p style="color: #0d1324">
              {{ limits.FiatLimits.WithdrawFee }} TRY
            </p>
          </a-col>
        </a-row>

        <a-row class="send-row">
          <a-col offset="1" :span="11" align="start">
            <p style="color: #48567e">{{ $t('fiat_wallet_amount') }}</p>
          </a-col>
          <a-col :span="11" align="end">
            <p style="color: #0d1324">
              {{
                amount - limits.FiatLimits.WithdrawFee < 0 ||
                amount > USER_BALANCE['UserFiatBalance'][4].free
                  ? 0.0
                  : amount - limits.FiatLimits.WithdrawFee
              }}
              TRY
            </p>
          </a-col>
        </a-row>

        <a-col offset="1" :span="22">
          <a-button
            v-on:click="startWithdraw"
            class="ant-btn-primary"
            style="width: 100%; margin-top: 20px; z-index: 1"
            :disabled="isButton"
            >{{ $t('fiat_wallet_send') }}
          </a-button>
        </a-col>
      </a-col>
    </a-row>

    <a-row style="margin-top: 20px; margin-bottom: 20px">
      <FiatWalletHistoryWithdraw
        v-if="!isMobile"
        :historyData="FIAT_WALLET_WITHDRAW['FiatWalletWithdraw']"
        :title="$t('fiat_wallet_withdraw_history')"
      />
      <FiatWalletHistoryWithdrawMobile
        v-if="isMobile"
        :historyData="FIAT_WALLET_WITHDRAW['FiatWalletWithdraw']"
        :title="$t('fiat_wallet_withdraw_history')"
      />
    </a-row>

    <!-- MODAL -->
    <a-modal
      id="verify-modal"
      :visible="isModalVisible"
      @ok="verify"
      @cancel="cancelVerify"
      :centered="true"
      :destroyOnClose="true"
      :footer="null"
      :width="384"
      :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
      :maskClosable="false"
    >
      <h3 slot="title" class="security-modal-title">
        {{ $t('text_security_verification') }}
      </h3>
      <div class="modal-body">
        <p class="Roboto-Regular">
          {{ $t('text_p2p_warning') }}
        </p>

        <div class="invite-verify-box">
          <div
            class="invite-verify-box-item"
            @click="
              $router.push(
                localeRoute('/account/security/enable-sms-authenticator')
              )
            "
          >
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/security_settings/ss-sms.svg"
              alt=""
            />
            <p class="Roboto-Medium">{{ $t('text_phone_verification') }}</p>
          </div>
          <div
            class="invite-verify-box-item"
            @click="
              $router.push(
                localeRoute('/account/security/enable-google-authenticator')
              )
            "
          >
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/security_settings/ss-2fa.svg"
              alt=""
            />
            <p class="Roboto-Medium">{{ $t('text_twofa_verification') }}</p>
          </div>
        </div>
        <p align="right" class="Roboto-Medium remind-me-text">
          {{ $t('text_remind') }}
        </p>
      </div>
    </a-modal>

    <KycWarningPopup
      :visible="showKycWarning"
      @close="showKycWarning = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FiatWithdraw',
  head() {
    return {
      title: 'TL Cüzdanı Çekme | Cointral.com',
    }
  },
  data: () => ({
    showKycWarning: false,
    amount: 0,
    isMobile: null,
    bankAccounts: [],
    selectedBankAccount: null,

    isModalVisible: false,
    isSmsExist: false,

    isButton: false,

    amountAlert: false,
    amountErrorMessage: null,

    bankAccountAlert: false,
    bankAccountErrorMessage: null,

    errorMessage: null,

    limits: {
      FiatLimits: {
        DailyWithdraw: 0,
        MinWithdrawAmount: 0,
        WithdrawFee: 0,
      },
    },
  }),

  async mounted() {
    await this.getLimits()

    await this.getCustomerBankAccountList()
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  computed: {
    ...mapGetters({
      USER_BALANCE: 'mainwallet/USER_BALANCE',
      FIAT_WALLET_WITHDRAW: 'fiatwallet/FIAT_WALLET_WITHDRAW',
    }),
  },

  methods: {
    ...mapMutations({
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
    }),

    ...mapActions({
      POST_FIAT_WALLET_WITHDRAW: 'fiatwallet/POST_FIAT_WALLET_WITHDRAW',
    }),

    checkAmount() {
      if (this.amountAlert) {
        this.amountAlert = false
        this.amountErrorMessage = null
      }
      this.isButton = false
    },

    verify() {
      this.isModalVisible = false
    },

    cancelVerify() {
      this.isModalVisible = false
    },

    remindMeLater() {
      this.isModalVisible = false
    },

    modalClicked() {
      this.$router.push(this.localeRoute('/account'))
    },

    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: this.$t('text_error'),
        description: this.errorMessage,
      })
    },

    async startWithdraw() {
      if (this.selectedBankAccount !== null) {
        let data = await this.POST_FIAT_WALLET_WITHDRAW({
          Amount: this.amount,
          IBAN: this.selectedBankAccount['IBAN'],
          $store,
        })

        const { $store, $router } = this
        if (data['Success'] && data['SecurityVerificationToken'] !== '') {
          const { SecurityVerificationToken } = data
          $store.commit('auth/setVerficationData', {
            SecurityVerificationToken,
            status: true,
            redirectURI: '/my/wallet/fiat-wallet/withdraw',
          })
          this.isButton = true
          $router.push(this.localeRoute('/security-verification'))
        } else if (data['ErrorCode'] === 98) {
          let messages = data['Message']
          let messageArray = messages.split(',')
          messageArray.forEach((mes) => {
            if (mes === 'sms') {
              this.isSmsExist = true
            }
          })
          this.isModalVisible = true
        } else if (data['ErrorCode'] === 1) {
          this.amountErrorMessage = data['Message']
          this.amountAlert = true
          this.isButton = true
        } else if (data['ErrorCode'] === 2) {
          this.amountErrorMessage = data['Message']
          this.amountAlert = true
          this.isButton = true
        } else if (data['ErrorCode'] === 99) {
          this.showKycWarning = true
        } else {
          this.$notification['error']({
            message: this.$t('text_error'),
            description: data['Message'],
          })
        }
      } else {
        this.bankAccountErrorMessage = this.$t('withdraw_bankaccount_warning')
        this.bankAccountAlert = true
        this.isButton = true
      }
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[1].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },

    handleChange(val) {
      if (val === 'click') {
        this.$router.push(this.localeRoute('/account/bank-accounts'))
      }
      this.selectedBankAccount = this.bankAccounts['BankAccounts'].filter(
        (item) => item['FriendlyName'] === val
      )[0]

      if (this.bankAccountAlert) {
        this.bankAccountAlert = false
        this.bankAccountErrorMessage = null
      }
      this.isButton = false
    },

    handleBlur() {},

    handleFocus() {},

    async getCustomerBankAccountList() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }
        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL + `/GetCustomerBankAccountList`,
          {
            headers: authHeaders,
          }
        )
        if (response.data) {
          this.bankAccounts = response.data
          return response.data['Success']
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    },

    async getLimits() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetLimits',
        {
          headers: authHeader,
        }
      )
      if (response.data) {
        this.limits = response.data
      }
    },
  },
}
</script>

<style scoped>
.main-row {
  height: 588px;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-right: 80px;
  margin-left: 40px;
  background: #fff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000a;
  opacity: 1;
}

.main-row-mobile {
  height: 630px;
  padding-top: 50px;
  padding-bottom: 50px;
  background: #fff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000a;
  opacity: 1;
}

.tip {
  padding: 22px 30px 22px 30px;
  margin-top: 10px;
  text-align: left;
  background: #f5fcff 0 0 no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
}

.second-row {
  height: 504px;
  text-align: start;
  background: #fff 0 0 no-repeat padding-box;
  box-shadow: 0 0 10px #0001f;
  border-radius: 10px;
  opacity: 1;
}

.second-row-mobile {
  height: 504px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: start;
  background: #fff 0 0 no-repeat padding-box;
  box-shadow: 0 0 10px #0001f;
  border-radius: 10px;
  opacity: 1;
}

.amount-row {
  margin-right: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
}

.send-row {
  margin-bottom: 5px;
}

.modal-horizontal-line {
  width: 90%;
  height: 2px;
  margin-top: 70px;
  margin-bottom: 70px;
  color: gray;
  background-color: #f4f4f4;
  border-width: 0;
}

.ant-select-dropdown-menu-item {
  background-color: white;
}

.ant-select-selection__rendered {
  background-color: white;
}

.invite-verify-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
}
.invite-verify-box-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 120px;
  text-align: center;
  border: 1px solid #e6e8ea;
  border-radius: 3px;
  cursor: pointer;
}

.remind-me-text {
  color: #1ca4e8;
  cursor: pointer;
}
.security-modal-title {
  margin-bottom: 10px;
  text-align: center;
}

.custom-modal-icon {
  position: absolute;
  top: -70%;
  right: -50%;
  color: #c1c6cd;
}
</style>
