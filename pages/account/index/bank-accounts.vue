<template>
  <a-col class="Roboto-Regular" style="background-color: #fafafa" :span="24">
    <PaymentModal
      :visible="visible"
      @closeModal="visible = false"
      @verify="verify"
    />

    <a-row>
      <a-col :span="24" style="text-align: start">
        <div class="Roboto-Regular" style="font-size: 32px; color: #1c2640">
          {{$t('bank_accounts_text_title')}}
        </div>
      </a-col>
    </a-row>

    <a-col
      :offset="!isMobile ? 0 : 0"
      :xs="24"
      :sm="24"
      :md="24"
      :lg="24"
      :xl="24"
      :style="
        !isMobile
          ? 'background-color: white; margin-top: 20px; padding-right: 20px; border-radius: 10px'
          : null
      "
    >
      <a-col
        :offset="!isMobile ? 1 : 0"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="10"
        :xl="10"
        style="margin-bottom: 50px"
      >
        <a-col
          style="
            margin-top: 50px;
            text-align: start;
            padding: 40px 20px 20px 20px;
            height: 280px;
            background: #ffffff 0 0 no-repeat padding-box;
            box-shadow: 0 0 10px #0000001f;
            border-radius: 10px;
            opacity: 1;
          "
        >
          <a-col offset="1" :span="24">
            <a-col :span="4" align="left">{{$t('bank_accounts_text_friendly_name')}}</a-col>

            <a-col :span="20">
              <a-form class="Roboto-Regular">
                <a-form-item
                  :has-feedback="accountNameAlert"
                  :validate-status="accountNameAlert ? 'error' : null"
                  :help="accountNameErrorMessage"
                >
                  <a-input
                    style="width: 90%; z-index: 1"
                    v-model="accountName"
                    v-on:keyup="checkAccountName"
                  ></a-input>
                </a-form-item>
              </a-form>
            </a-col>
          </a-col>

          <a-col offset="1" :span="24">
            <a-col :span="4" align="left">IBAN</a-col>

            <a-col :span="20">
              <a-form class="Roboto-Regular">
                <a-form-item
                  :has-feedback="ibanAlert"
                  :validate-status="ibanAlert ? 'error' : null"
                  :help="ibanErrorMessage"
                >
                  <a-input
                    prefix="TR"
                    style="width: 90%; z-index: 1"
                    v-model="iban"
                    v-on:keypress="checkIban"
                    v-mask="'## #### #### #### #### #### ##'"
                  ></a-input>
                </a-form-item>
              </a-form>
            </a-col>
          </a-col>

          <a-col
            offset="1"
            :span="22"
            :style="!isError ? 'margin-top: 30px' : 'margin-top: 20px'"
          >
            <a-button
              class="Roboto-Bold"
              style="
                width: 100%;
                background-color: var(--login-button-bg-color);
                z-index: 1;
                height: 50px;
              "
              v-on:click="checkKYCStatus"
              type="primary"
              :disabled="isButton"
              >{{$t('bank_accounts_text_button')}}</a-button
            >
          </a-col>

          <a-col offset="1" :span="22" v-if="isError">
            <a-alert :type="typeAlert" :message="message" banner />
          </a-col>
        </a-col>

        <a-row>
          <a-col
            :offset="!isMobile ? 0 : 0"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
            class="tip"
          >
            <a-col>
              <img
                style="position: relative"
                src="@/assets/icons/Bulb.png"
                alt="Bulb"
              />
              {{ $t('bank_accounts_tips') }}:
            </a-col>
            <a-col style="margin-top: 10px" :span="24">
              <li>{{ $t('bank_accounts_tips_item_1') }}</li>
            </a-col>
            <a-col :span="24">
              <li>{{ $t('bank_accounts_tips_item_2') }}</li>
            </a-col>
          </a-col>
        </a-row>
      </a-col>

      <a-col
        :offset="!isMobile ? 1 : 0"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        style="margin-top: 50px; margin-bottom: 50px"
      >
        <a-table
          class="Roboto-Regular"
          :columns="columns"
          :data-source="data"
          :pagination="false"
        >
          <template
            v-for="col in ['FriendlyName', 'IBAN']"
            :slot="col"
            slot-scope="text, record"
          >
            <div :key="col">
              <a-input
                v-mask="'## #### #### #### #### #### ##'"
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="(e) => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{ text }}</template>
            </div>
          </template>

          <!-- <template slot="update" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => save(record.key)">Güncelle</a>
                <a-popconfirm
                  title="Emin misiniz?"
                  @confirm="() => cancel(record.key)"
                  okText="Evet"
                  cancelText="İptal"
                >
                  <a>İptal Et</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Güncelle</a>
              </span>
            </div>
          </template> -->

          <template slot="delete" slot-scope="text, record">
            <a-popconfirm
              title="Emin misiniz?"
              okText="Evet"
              cancelText="İptal"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;">{{$t('bank_accounts_text_delete')}}</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-col>
    </a-col>
  </a-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Payment',
  head(){
    return{
      title: 'Banka Hesapları | Cointral.com',
    }
  },
  data() {
    return {
      data: [],
      cacheData: [],
      columns: null,
      editingKey: '',
      accountName: null,
      iban: '',
      bankAccounts: [],
      visible: false,
      isMobile: null,
      message: null,
      isError: false,
      typeAlert: null,

      accountNameAlert: false,
      accountNameErrorMessage: null,
      ibanAlert: false,
      ibanErrorMessage: null,
      isButton: false,
    }
  },

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  computed: {
    ...mapGetters({
      USER_INFO: 'payment/USER_INFO',
    }),
  },

  async beforeMount() {
    this.columns = [
      {
        title: this.$t('bank_accounts_text_friendly_name'),
        dataIndex: 'FriendlyName',
        width: '25%',
        scopedSlots: { customRender: 'FriendlyName' },
      },
      {
        title: 'IBAN',
        dataIndex: 'IBAN',
        width: '60%',
        scopedSlots: { customRender: 'IBAN' },
      },
      {
        dataIndex: 'update',
        scopedSlots: { customRender: 'update' },
      },
      {
        dataIndex: 'delete',
        scopedSlots: { customRender: 'delete' },
      },
    ]

    await this.GET_USER_INFO()
    await this.getCustomerBankAccountList()
  },

  methods: {
    ...mapActions({
      GET_USER_INFO: 'payment/GET_USER_INFO',
      CREATE_CUSTOMER_BANK_ACCOUNT: 'payment/CREATE_CUSTOMER_BANK_ACCOUNT',
      DELETE_CUSTOMER_BANK_ACCOUNT: 'payment/DELETE_CUSTOMER_BANK_ACCOUNT',
    }),

    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: this.$t('text_error'),
        description: this.errorMessage,
      })
    },

    checkAccountName() {
      if (this.accountNameAlert) {
        this.accountNameAlert = false
        this.accountNameErrorMessage = null
      }
      this.isButton = false
    },

    checkIban(event) {
      if (this.ibanAlert) {
        this.ibanAlert = false
        this.ibanErrorMessage = null
      }
      this.isButton = false
    },

    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },

    edit(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },

    async save(key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => key === item.key)[0]

      let isSucceed = await this.CREATE_CUSTOMER_BANK_ACCOUNT({
        IBAN: target['IBAN'],
        FriendlyName: target['FriendlyName'],
        Swift: target['SWIFT'],
        BankAccountUniqueId: target['BankAccountId'],
      })

      const targetCache = newCacheData.filter((item) => key === item.key)[0]
      if (target && targetCache && isSucceed['Success']) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      } else {
        this.errorMessage = isSucceed['Message']
        this.openNotificationWithIcon('error')
      }
      this.editingKey = ''
    },

    async onDelete(key) {
      const dataSource = [...this.data]

      let deletedItem = dataSource.filter((item) => item.key === key)

      let res = await this.DELETE_CUSTOMER_BANK_ACCOUNT({
        BankAccountId: deletedItem[0]['BankAccountId'],
      })
      if (res.Success) this.data = dataSource.filter((item) => item.key !== key)
      else {
        this.errorMessage = res['Message']
        this.openNotificationWithIcon('error')
      }
    },

    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        )
        delete target.editable
        this.data = newData
      }
    },

    checkKYCStatus() {
      if (!this.USER_INFO['KYCVerified']) {
        this.visible = true
      } else if (this.USER_INFO['KYCVerified']) {
        this.createCustomerBankAccount()
      }
    },

    verify() {
      
      // TODO:
      this.visible = false
    },

    async createCustomerBankAccount() {
      try {
        if (this.data.length === 3) {
          this.typeAlert = 'error'
          this.message = this.$t('bank_accounts_text_error_message')
          this.isError = true
          setTimeout(() => (this.isError = false), 2000)
        } else {
          let payload = {
            IBAN: 'TR' + this.iban.replace(/\s/g, ''),
            FriendlyName: this.accountName,
            Swift: '',
          }
          let response = await this.CREATE_CUSTOMER_BANK_ACCOUNT(payload)

          if (response.Success === false) {
            if (response.ErrorCode === '1') {
              this.ibanAlert = true
              this.ibanErrorMessage = response.Message
            } else if (response.ErrorCode === '2') {
              this.accountNameAlert = true
              this.accountNameErrorMessage = response.Message
            }
          }

          await this.getCustomerBankAccountList()
        }
      } catch (e) {
        this.typeAlert = 'error'
        this.message = 'Session Geçersizdir'
        this.isError = true
        setTimeout(() => (this.isError = false), 2000)
      }
    },

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
          let key = 0
          let bankAccounts = []
          for (let i = 0; i < response.data['BankAccounts'].length; i++) {
            response.data['BankAccounts'][i].key = key
            bankAccounts.push(response.data['BankAccounts'][i])
            key++
          }
          this.data = bankAccounts
          this.cacheData = this.data.map((item) => ({ ...item }))
          return response.data['Success']
        } else {
          return false
        }
      } catch (e) {
        

        return false
      }
    },
  },
}
</script>

<style scoped>
.tip {
  padding: 22px 30px 22px 30px;
  margin-top: 50px;
  background: #f5fcff 0 0 no-repeat padding-box;
  border-radius: 3px;
  text-align: left;
}

.add-bank-account {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 10px #0000001f;
  border-radius: 10px;
}
</style>
