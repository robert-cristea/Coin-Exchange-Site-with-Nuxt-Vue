<template>
  <div class="Cash" v-if="isLoggedIn">
    <div class="Cash-sidebar">
      <div class="Cash-sidebar-body">
        <img src="~/assets/images/logo.svg" alt="" />
        <div>{{ $t('cash_heading_text') }}</div>
      </div>
    </div>
    <PaymentModal
      :visible="visible"
      @closeModal="visible = false"
      @verify="verify"
    />

    <div class="Cash-wrapper">
      <div class="Cash-header">
        <div class="Cash-left">
          <div class="Cash-title">
            {{ $t('cash_sub_heading_text') }}
          </div>
          <div class="Cash-desc" v-if="userBalance && userBalance.Balance">
            {{ userBalance && userBalance.Balance }} USDT
          </div>
          <div class="Cash-desc" v-if="!userBalance">0 USDT</div>
        </div>
        <div class="Cash-right">
          <div class="Cash-title">
            {{ $t('cash_title') }}
          </div>
          <div class="Cash-desc">
            {{ $t('cash_tips') }}
          </div>
        </div>
      </div>

      <div class="Cash-body">
        <a-row :gutter="32">
          <a-col :span="12" class="col-container">
            <div class="Cash-body-item">
              <div class="Cash-body-item-title">
                {{ $t('cash_form_deposit_heading_text') }}
              </div>
              <div class="Cash-body-item-desc">
                {{ $t('cash_form_deposit_sub_heading_text') }}
              </div>
              <div class="Cash-body-form">
                <div class="Cash-body-form-item">
                  <a-input-number
                    v-model.number="deposit.amount"
                    v-bind:placeholder="this.$t('cash_deposit_amount')"
                    class="no-focus-shadow Roboto-Bold"
                  />
                  <label class="Roboto-Bold Cash-body-form-label">USDT</label>
                </div>
                <div class="Cash-body-form-item">
                  <a-input-number
                    v-model.number="deposit.total"
                    disabled
                    placeholder=""
                    class="no-focus-shadow Roboto-Bold"
                  />
                  <label class="Roboto-Bold Cash-body-form-label">USD</label>
                </div>
                <a-button
                  :loading="depositLoader"
                  class="Roboto-Medium"
                  type="primary"
                  @click="depositMoney"
                  >{{ $t('cash_form_btn_text') }}</a-button
                >
              </div>
              <div class="Cash-item-desc">{{ $t('cash_desc1_deposit') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc2') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc3') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc4_deposit') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc5') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc6') }}</div>
              <div class="Cash-item-table-title">
                {{ $t('cash_deposit_table_text') }}
              </div>
              <div class="Cash-item-table">
                <a-table
                  class="Roboto-Bold"
                  :columns="depositColumns"
                  :rowKey="(record) => record.TxID"
                  :data-source="filteredInbound"
                  :pagination="depositPagination"
                  @change="depositTableChange"
                  :loading="loading"
                  :expand-icon-column-index="5"
                  :expand-icon-as-cell="false"
                ></a-table>
              </div>
            </div>
          </a-col>
          <a-col :span="12" class="col-container">
            <div class="Cash-body-item">
              <div class="Cash-body-item-title">
                {{ $t('cash_form_dpn_heading_text') }}
              </div>
              <div class="Cash-body-item-desc">
                {{ $t('cash_form_dpn_sub_heading_text') }}
              </div>
              <div class="Cash-body-form">
                <div class="Cash-body-form-item">
                  <div class="alert-message">
                    <a-input-number
                      v-model.number="withdraw.amount"
                      v-bind:placeholder="this.$t('cash_withdrawal_amount')"                     
                      class="no-focus-shadow Roboto-Bold"
                    />
                    <div class="error-message" v-if="withDrawErrorMsg">
                      {{ withDrawErrorMsg }}
                    </div>
                  </div>

                  <label class="Roboto-Bold Cash-body-form-label">USDT</label>
                </div>
                <div class="Cash-body-form-item">
                  <a-input-number
                    v-model.number="withdraw.total"
                    disabled
                    placeholder=""
                    class="no-focus-shadow Roboto-Bold"
                  />
                  <label class="Roboto-Bold Cash-body-form-label">USD</label>
                </div>

                <a-button
                  class="Roboto-Medium"
                  type="primary"
                  @click="withdrawMoney"
                  :loading="withdrawLoader"
                  >{{ $t('cash_form_btn_text') }}</a-button
                >
              </div>
              <div class="Cash-item-desc">{{ $t('cash_desc1_withdraw') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc2') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc3') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc4_withdraw') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc5') }}</div>
              <div class="Cash-item-desc">{{ $t('cash_desc6') }}</div>
              <div class="Cash-item-table-title">
                {{ $t('cash_withdraw_table_text') }}
              </div>
              <div class="Cash-item-table">
                <a-table
                  class="Roboto-Bold"
                  :columns="withDrawColumns"
                  :rowKey="(record) => record.TxID"
                  :data-source="filteredOutbound"
                  :pagination="withdrawPagination"
                  @change="withDrawTableChange"
                  :loading="withDrawTableloading"
                  :expand-icon-column-index="5"
                  :expand-icon-as-cell="false"
                >
                  <span slot="Amount" slot-scope="record">
                    {{ record.Amount.toFixed(8) }} 
                  </span>

                  <span slot="Total" slot-scope="record">
                    {{ record.Total.toFixed(8) }}
                  </span>

                  <span slot="ID" slot-scope="record">
                    {{ record.TxID }}
                  </span>

                  <span slot="Durum" slot-scope="record">
                    <template
                      v-if="
                        record.Status === 'ready_for_cash' ||
                        record.Status === 'ready_for_cash'
                      "
                    >
                      <button class="btn-cancel" @click="onCancel(record.TxID)">
                        {{ $t('text_cancel') }}
                      </button>
                    </template>

                    <template
                      v-if="
                        record.Status !== 'ready_for_cash' &&
                        record.Status !== 'ready_for_cash'
                      "
                    >
                      {{ $t(record.Status) }}
                    </template>
                  </span>

                  <span slot="Date" slot-scope="record">
                    {{ record.CreatedOn | dateFormat }}
                  </span>
                </a-table>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <KycWarningPopup
      :visible="showKycWarning"
      @close="showKycWarning = false"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Nakit | Cointral.com',
    }
  },
  data() {
    return {
      showKycWarning: false,
      showError: true,
      visible: false,
      errorMsg: 'Error',
      withdrawLoader: false,
      withDrawTableloading: false,
      depositLoader: false,
      withDrawErrorMsg: '',
      depositErrorMsg: '',
      userBalance: null,
      message: null,
      deposit: {
        amount: null,
        total: null,
      },
      depositPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 3,
      },
      withdrawPagination: {
        current: 1,
        total: 0,
        position: 'bottom',
        pageSize: 3,
      },
      withdraw: {
        amount: null,
        total: null,
      },
      tableData: [],
      withDrawtableData: [],
      loading: false,

      withDrawColumns: [
        {
          title: 'Miktar',
          key: 'Amount',
          scopedSlots: { customRender: 'Amount' },
        },
        {
          title: 'Toplam',
          key: 'Total',
          scopedSlots: { customRender: 'Total' },
        },
        {
          title: 'İşlem No.',
          key: 'ID',
          scopedSlots: { customRender: 'ID' },
        },
        {
          title: 'Durum',
          key: 'Durum',
          scopedSlots: { customRender: 'Durum' },
        },
        {
          title: 'Tarih',
          key: 'Date',
          scopedSlots: { customRender: 'Date' },
        },
      ],

      depositColumns: [
        {
          title: 'Miktar',
          dataIndex: 'Amount',
        },
        {
          title: 'Toplam',
          dataIndex: 'Total',
        },
        {
          title: 'İşlem No.',
          dataIndex: 'TxID',
        },
        {
          title: 'Durum',
          dataIndex: 'Status',
        },
        {
          title: 'Tarih',
          dataIndex: 'UpdatedOn',
        },
      ],
    }
  },
  middleware: ['auth'],
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
    filteredInbound() {
      return this.tableData.filter((el) => el.InBound === true)
    },
    filteredOutbound() {
      return this.withDrawtableData.filter((el) => el.InBound === false)
    },
  },
  watch: {
    'deposit.amount'(val) {
      this.depositErrorMsg = ''
      if (!val) {
        this.deposit.total = null
      } else {
        this.deposit.total = val + val * (3 / 100)
      }
    },
    'withdraw.amount'(val) {
      this.withDrawErrorMsg = ''
      if (!val) {
        this.withdraw.total = null
      } else {
        let threePercent = val * (3 / 100)
        val = val - threePercent
        this.withdraw.total = val
      }
    },
  },
  created() {
    this.getUserBalance()
    this.getCashTransaction()
    this.getOutBoundCashTransaction()
  },
  mounted() {},
  filters: {
    dateFormat(val) {
      return moment(val).format('yyy-mm-DD hh:mm:ss')
    },
  },
  methods: {
    clearForm() {
      this.deposit.amount = null
      this.deposit.total = null
      this.withdraw.amount = null
      this.withdraw.total = null
    },
    dateFormater(val) {
      return moment(val).format('yyy-mm-DD hh:mm:ss')
    },
    onCancel(txtId) {
      this.cancelWithDrawMoney(txtId)
    },
    async getUserBalance() {
      const { $axios, $config, $cookies } = this
      const authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetUserCashBalance',
        {
          headers: authHeader,
        }
      )
      if (response.data) {
        this.userBalance = response.data
      }
    },
    async getCashTransaction() {
      const { $axios, $config, $cookies } = this
      const authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }

      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetUserInboundCashTransactions',
        {
          params: {
            Offset:
              this.depositPagination.current * 3 -
              this.depositPagination.pageSize,
            RowSize: this.depositPagination.pageSize,
          },
          headers: authHeader,
        }
      )
      this.loading = false
      if (response.data) {
        response.data.Cash_Transaction.map((res) => {
          res.UpdatedOn = this.dateFormater(res.UpdatedOn)
        })
        const { Cash_Transaction, Max } = response.data
        this.tableData = Cash_Transaction
        this.depositPagination.total = Max
      }
    },
    async getOutBoundCashTransaction() {
      const { $axios, $config, $cookies } = this
      const authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.get(
        $config.FINANCE_API_URL + '/GetUserOutboundCashTransactions',
        {
          params: {
            Offset:
              this.withdrawPagination.current * 3 -
              this.withdrawPagination.pageSize,
            RowSize: this.withdrawPagination.pageSize,
          },
          headers: authHeader,
        }
      )
      this.withDrawTableloading = false
      const { Success, Message, ErrorCode } = data
      if (Success) {
        const { Cash_Transaction, Max } = data
        this.withDrawtableData = Cash_Transaction
        this.withdrawPagination.total = Max
      } else {
        if (ErrorCode === 98) {
          // show kyc popup
          this.showKycWarning = true
        }
      }
    },

    depositTableChange(pagination) {
      this.depositPagination = pagination
      this.loading = true
      this.getCashTransaction()
    },
    withDrawTableChange(pagination) {
      this.withdrawPagination = pagination
      this.withDrawTableloading = true
      this.getOutBoundCashTransaction()
    },
    async cancelWithDrawMoney(txtId) {
      const { $axios, $config, $cookies } = this
      const authHeader = {
        Authorization: 'Bearer ' + $cookies.get('Token'),
        'Content-Type': 'application/json; charset=utf-8',
      }
      const payload = {
        TxID: txtId,
      }
      const response = await $axios({
        method: 'delete',
        url: this.$config.FINANCE_API_URL + '/CancelCashTx',
        data: payload,
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
          'Content-Type': 'application/json',
        },
      })

      if (response.data.Success) {
        this.openNotificationWithIcon('success', this.$t(response.data.Message))
        this.getOutBoundCashTransaction()
        this.getUserBalance()
      } else {
        this.openNotificationWithIcon('error', response.data.Message)
      }
    },
    verify() {
      // TODO:
      this.visible = false
    },

    depositMoney() {
      if (this.deposit.amount > 0) {
        this.depositLoader = true
        const { $axios, $config, $cookies } = this
        const authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const payload = {
          Amount: this.deposit.amount,
        }

        $axios
          .post(
            $config.FINANCE_API_URL + '/CreateInBoundCashTransaction',
            payload,
            {
              headers: authHeader,
            }
          )
          .then((res) => {
            if (res.data.ErrorCode === '0') {
              this.loading = false
              this.depositLoader = false

              this.openNotificationWithIcon('success', res.data.Message)
              this.clearForm()
              this.getCashTransaction()
            } else {
              if (res.data.ErrorCode == 98) {
                // show kyc popup
                this.showKycWarning = true
              }
              this.loading = false
              this.depositLoader = false
              this.openNotificationWithIcon('error', res.data.Message)
            }
          })
      }
    },
    openNotificationWithIcon(type, msg) {
      this.$notification[type]({
        message: msg,
        description: this.errorMessage,
      })
    },

    withdrawMoney() {
      if (this.withdraw.amount > 0) {
        this.withdrawLoader = true
        const { $axios, $config, $cookies } = this
        const authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const payload = {
          Amount: this.withdraw.amount,
        }

        $axios
          .post(
            $config.FINANCE_API_URL + '/CreateOutBoundCashTransaction',
            payload,
            {
              headers: authHeader,
            }
          )
          .then((res) => {
            if (res.data.ErrorCode === '98') {
              // this.visible = true
              this.withdrawLoader = false
              this.showKycWarning = true
            } else if (res.data.ErrorCode === '0') {
              this.withdrawLoader = false
              this.clearForm()
              this.openNotificationWithIcon('success', res.data.Message)
              this.getOutBoundCashTransaction()
              this.getUserBalance()
            } else {
              this.withdrawLoader = false
              this.withDrawErrorMsg = res.data.Message
            }
          })
      }
    },
  },
}
</script>

<style lang="scss">
.btn-cancel {
  border: none;
  background: #50c5fd;
  border-radius: 3px;
  cursor: pointer;
}
.Cash {
  display: flex;

  .ant-table-thead {
    th {
      background: #fff;

      span {
        color: #292f35;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
      }
    }
  }

  &-item {
    &-table {
      &-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 14px;
        color: #292f35;
        text-align: left;
        margin-top: 34px;
      }
    }
  }

  &-item-desc {
    font-size: 12px;
    margin-top: 20px;
    width: 90%;
    text-align: left;
  }

  &-body {
    background-color: #f7f7f7;
    height: 100%;
    padding: 48px;

    &-item {
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      padding: 24px 30px;
      text-align: center;

      &-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #292f35;
      }

      &-desc {
        font-size: 14px;
        margin-bottom: 18px;
        color: #292f35;
      }
    }

    &-form {
      display: flex;
      flex-direction: column;
      &-label {
        color: #292f35;
        font-size: 14px;
        width: 50px;
        text-align: left;
      }

      .ant-btn-primary {
        height: 45px;
        width: auto;
        margin-right: 68px;

        span {
          color: #0b0e11;
        }
      }
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .ant-input-number {
          flex: 1;
          margin-right: 17px;
          height: 45px;
        }

        .ant-input-number-input {
          height: 45px !important;

          &::placeholder {
            font-size: 15px;
          }
        }
      }
    }
  }

  &-wrapper {
    flex: 1;
  }

  &-sidebar {
    background: linear-gradient(to bottom, #1c2640, #3a57a8);
    font-size: 34px;
    color: #fff;
    width: 280px;
    position: relative;

    &-body {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 30%;
      display: grid;
      place-items: center;
      font-weight: 400;

      img {
        height: 24px;
        margin-bottom: 5px;
      }
    }
  }
  &-header {
    background-color: #151a26;
    padding: 24px 54px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &-desc {
    font-size: 16px;
  }

  &-right {
    text-align: right;
  }
}

.alert-message {
  width: 100%;
  margin-right: 22px;
}

.alert-message > div {
  width: 100%;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  position: relative;
  padding: 0.3rem 1.2rem;
  margin: 10px 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: left;
}
.Cash-body-item {
  min-height: 887px;
}
.Cash-body-form .ant-btn-primary {
  white-space: break-spaces !important;
}
@media (max-width: 1291px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}

@media (max-width: 840px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  .Cash-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .Cash-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    div {
      text-align: left;
      width: 100%;
    }
  }

  .col-container {
    width: 100%;
    margin-bottom: 20px;
  }
  .Cash-wrapper {
    width: 100%;
  }
}
</style>
