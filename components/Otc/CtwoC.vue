<template>
  <div class="c2c" id="c2c">
    <div class="order">
      <h1>{{ $t('otc_get_price') }}</h1>
      <a-tabs
        default-active-key="1"
        @change="handleTableChange"
        class="otc-tabs"
      >
        <a-tab-pane key="1" v-bind:tab="$t('otc_text_want_to_buy')">
          <div class="c2cForm">
            <a-form :form="buyForm" @submit="handleSubmit" class="form">
              <a-form-item
                style="width: 100%"
                :validate-status="firstAlert ? 'error' : null"
                :help="firstAlertErrorMessage"
              >
                <a-input-group compact size="large">
                  <a-input
                    v-decorator="[
                      'InAmount',
                      {
                        rules: [
                          {
                            required: true,
                            message: this.$t('text_required_field'),
                          },
                        ],
                      },
                    ]"
                    autocomplete="off"
                    style="width: 70%; margin-bottom: 20px"
                    v-bind:placeholder="$t('otc_text_want_to_buy')"
                    @change="checkFirst"
                  />
                  <a-select
                    v-decorator="['InAsset', { initialValue: 'BTC' }]"
                    @change="handleInchange"
                    style="width: 30%"
                  >
                    <a-select-option
                      v-for="item in assets.OTCAssetList"
                      :value="item.Name"
                      :key="item.Name"
                    >
                      <img
                        :src="
                          require(`~/assets/icons/${item.Name.toLowerCase()}.svg`)
                        "
                        width="20px"
                        class="asset-icon"
                      />
                      {{ item.Name }}
                    </a-select-option>
                  </a-select>
                </a-input-group>
              </a-form-item>
              <a-form-item
                style="width: 100%"
                :validate-status="secondAlert ? 'error' : null"
                :help="secondAlertErrorMessage"
              >
                <a-select
                  v-decorator="[
                    'OutAsset',
                    {
                      initialValue: 'USDT',
                      rules: [
                        {
                          required: true,
                          message: this.$t('text_required_field'),
                        },
                      ],
                    },
                  ]"
                  style="width: 100%"
                  size="large"
                  @change="handleOutchange"
                >
                  <a-select-option
                    v-for="item in assets.OTCAssetList"
                    :value="item.Name"
                    :key="item.Name"
                  >
                    <img
                      :src="
                        require(`~/assets/icons/${item.Name.toLowerCase()}.svg`)
                      "
                      width="20px"
                      class="asset-icon"
                    />
                    {{ item.Name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item style="width: 100%">
                <a-button
                  block
                  size="large"
                  type="primary"
                  html-type="submit"
                  >{{ $t('otc_text_offer') }}</a-button
                >
              </a-form-item>
            </a-form>
          </div>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          v-bind:tab="$t('otc_text_want_to_sell')"
          force-render
        >
          <div class="c2cForm">
            <a-form :form="buyForm" @submit="handleSubmit" class="form">
              <a-form-item
                style="width: 100%"
                :validate-status="firstAlert ? 'error' : null"
                :help="firstAlertErrorMessage"
              >
                <a-input-group compact size="large">
                  <a-input
                    v-decorator="[
                      'InAmount',
                      {
                        rules: [
                          {
                            required: true,
                            message: this.$t('text_required_field'),
                          },
                        ],
                      },
                    ]"
                    autocomplete="off"
                    style="width: 70%; margin-bottom: 20px"
                    v-bind:placeholder="$t('otc_text_want_to_spend')"
                    @change="checkFirst"
                  />
                  <a-select
                    v-decorator="['InAsset', { initialValue: 'BTC' }]"
                    @change="handleInchange"
                    style="width: 30%"
                  >
                    <a-select-option
                      v-for="item in assets.OTCAssetList"
                      :value="item.Name"
                      :key="item.Name"
                    >
                      <img
                        :src="
                          require(`~/assets/icons/${item.Name.toLowerCase()}.svg`)
                        "
                        width="20px"
                        class="asset-icon"
                      />
                      {{ item.Name }}
                    </a-select-option>
                  </a-select>
                </a-input-group>
              </a-form-item>
              <a-form-item
                style="width: 100%"
                :validate-status="secondAlert ? 'error' : null"
                :help="secondAlertErrorMessage"
              >
                <a-select
                  v-decorator="[
                    'OutAsset',
                    {
                      initialValue: 'USDT',
                      rules: [
                        {
                          required: true,
                          message: this.$t('text_required_field'),
                        },
                      ],
                    },
                  ]"
                  size="large"
                  @change="handleOutchange"
                >
                  <a-select-option
                    v-for="item in assets.OTCAssetList"
                    :value="item.Name"
                    :key="item.Name"
                  >
                    <img
                      :src="
                        require(`~/assets/icons/${item.Name.toLowerCase()}.svg`)
                      "
                      width="20px"
                      class="asset-icon"
                    />
                    {{ item.Name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item style="width: 100%">
                <a-button
                  block
                  size="large"
                  type="primary"
                  html-type="submit"
                  >{{ $t('otc_text_offer') }}</a-button
                >
              </a-form-item>
            </a-form>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="showoutput">
      <div v-if="!submitSuccess" class="noShow">
        <h1>{{ $t('otc_current_price') }}</h1>
        <div class="body">
          <!-- <div class="no-data">

          </div>-->
          <span>{{ $t('otc_empty_message') }}</span>
        </div>
      </div>
      <div v-else class="show">
        <div v-if="isOtcTransactionComplete">
          <span class="info">{{ $t('otc_info_message') }}</span>
          <div class="contact">
            <div class="number">
              <img src="~/assets/images/wp.png" alt />
              <a
                target="_blank"
                v-bind:href="
                  'https://wa.me/' + ContactInfo.Whatsapp.replace(/\s/g, '')
                "
              >
                <span class="phone" id="wpNumber">{{
                  ContactInfo.Whatsapp
                }}</span>
              </a>
              <a-tooltip>
                <template slot="title">{{ $t('otc_copied') }}</template>
                <img
                  src="~/assets/images/copy.svg"
                  @click="copyText('wpNumber')"
                />
              </a-tooltip>
            </div>
            <div class="number">
              <img src="~/assets/images/telegram.png" alt />
              <a
                target="_blank"
                v-bind:href="
                  'https://t.me/' + ContactInfo.Telegram.replace('@', '')
                "
              >
                <span class="phone" id="tgNumber">
                  {{ ContactInfo.Telegram }}
                </span>
              </a>
              <a-tooltip>
                <template slot="title">{{ $t('otc_copied') }}</template>
                <img
                  src="~/assets/images/copy.svg"
                  @click="copyText('tgNumber')"
                />
              </a-tooltip>
            </div>
          </div>

          <div class="numbers">
            <div class="columns">
              <span class="label">{{ $t('otc_order_number') }}</span>
              <span class="code">
                {{ OTC_Transaction.OTC_Transaction.OTCTransactionUniqueID }}
              </span>
            </div>
            <div class="columns">
              <span class="label">{{ $t('otc_security_code') }}</span>
              <span class="code blue">
                {{ OTC_Transaction.OTC_Transaction.SecurityCode }}
              </span>
            </div>
          </div>
          <!-- <a-button
            v-if="OTC_Transaction.ErrorCode === 0"
            type="primary"
            style="width: 100%"
            html-type="submit"
            @click="handleCreateTransaction"
          >
            İşlemi Başlat
          </a-button>-->

          <!-- <a-button v-else type="danger" style="width: 100%">
            {{ OTC_Transaction.Message }}
          </a-button>-->
        </div>

        <div v-else>
          <div class="order-header">
            <h1>{{ $t('otc_current_price') }}</h1>
          </div>
          <div class="buy">
            <span>{{ $t('otc_text_want_to_buy') }}</span>
            <div class="circle-data">
              <span class="number">
                {{ OTC_Transaction.OTC_Transaction.InAmount }}
              </span>
              <span class="asset">
                {{ OTC_Transaction.OTC_Transaction.InAsset }}
              </span>
            </div>
          </div>
          <div class="unit-amount">
            <div class="unit-column">
              <span class="label">{{ $t('otc_price_per_coin') }}</span>
              <span class="amount">
                {{ OTC_Transaction.OTC_Transaction.PricePerCoin }}
              </span>
            </div>

            <div class="unit-column">
              <span class="label end">{{ $t('otc_total') }}</span>
              <span class="amount blue">
                {{ OTC_Transaction.OTC_Transaction.OutAmount }}
                {{ OTC_Transaction.OTC_Transaction.OutAsset }}
              </span>
            </div>
          </div>
          <a-button
            v-if="OTC_Transaction.ErrorCode === 0"
            type="primary"
            style="width: 100%"
            html-type="submit"
            @click="handleCreateTransaction"
            >{{ $t('otc_start_transaction') }}</a-button
          >

          <a-button v-else type="danger" style="width: 100%">{{
            OTC_Transaction.Message
          }}</a-button>
        </div>
      </div>
    </div>

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
        {{ $t('froze_modal_title') }}
      </h3>
      <div class="modal-body">
        <p class="Roboto-Regular">
          {{ $t('text_security_modal') }}
        </p>

        <div class="invite-verify-box">
          <div
            v-if="isSmsExist"
            class="invite-verify-box-item"
            v-on:click="modalClicked"
          >
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/security_settings/ss-sms.svg"
              alt
            />
            <p class="Roboto-Medium">{{ $t('froze_modal_sms') }}</p>
          </div>
          <div class="invite-verify-box-item" v-on:click="modalClicked">
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/verify_modal/2faicon.svg"
              alt
            />
            <p class="Roboto-Medium">{{ $t('froze_modal_google') }}</p>
          </div>
          <div
            v-if="!isSmsExist"
            class="invite-verify-box-item"
            v-on:click="modalClicked"
          >
            <img
              slot="avatar"
              src="~/assets/icons/verify_modal/emailicon.svg"
              alt
            />
            <p class="Roboto-Medium">Email</p>
          </div>
        </div>
        <p
          align="right"
          class="Roboto-Medium remind-me-text"
          v-on:click="remindMeLater"
        >
          {{ $t('froze_remember_me') }}
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'CtwoC',
  data() {
    return {
      buyForm: this.$form.createForm(this, { name: 'buyForm' }),
      currentType: 'buy',
      error: {
        code: null,
        message: null,
      },
      limits: {},
      tempIn: 'BTC',
      tempOut: 'USDT',
      assets: {},
      submitSuccess: false,
      OTC_Transaction: {},
      createTransactionData: {},

      isSmsExist: false,
      isModalVisible: false,

      firstAlert: false,
      firstAlertErrorMessage: null,

      secondAlert: false,
      secondAlertErrorMessage: null,

      errorMessage: null,

      isOtcTransactionComplete: false,
      ContactInfo: {},
    }
  },
  mounted() {
    this.getDropdown()
    this.getLimits()
  },
  methods: {
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
    handleInchange(e) {
      let { InAsset, OutAsset } = this.buyForm.getFieldsValue()

      if (e === OutAsset) {
        this.buyForm.setFieldsValue({
          OutAsset: this.tempIn,
        })
        this.tempOut = this.tempIn
        this.tempIn = e
      } else {
        this.tempIn = e
      }

      if (this.firstAlert) {
        this.firstAlert = false
        this.firstAlertErrorMessage = null
      }
    },
    checkFirst() {
      if (this.firstAlert) {
        this.firstAlert = false
        this.firstAlertErrorMessage = null
      }
    },
    handleOutchange(e) {
      let { InAsset, OutAsset } = this.buyForm.getFieldsValue()
      if (e === InAsset) {
        this.buyForm.setFieldsValue({
          InAsset: this.tempOut,
        })
        this.tempIn = this.tempOut
        this.tempOut = e
      } else {
        this.tempOut = e
      }

      if (this.secondAlert) {
        this.secondAlert = false
        this.secondAlertErrorMessage = null
      }
    },
    handleTableChange(e) {
      switch (e) {
        case '1':
          this.currentType = 'buy'

          break
        case '2':
          this.currentType = 'sell'

          break
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.buyForm.validateFields((err, values) => {
        if (!err) {
          this.createTransactionData = values
          this.StartOtcTransaction({ Type: this.currentType, ...values })
        }
      })
    },
    handleCreateTransaction() {
      this.createTransaction({
        Type: this.currentType,
        ...this.createTransactionData,
      })
    },
    async createTransaction(payloadData) {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      let payload = {
        Type: ' ',
        InAsset: ' ',
        OutAsset: ' ',
        InAmount: 0,
        OutAmount: 0,
        FinalInAmount: 0,
        FinalOutAmount: 0,
        PricePerCoin: 0,
        Status: ' ',
        SecurityCode: ' ',
        OTCTransactionUniqueID: ' ',
        CreatedOn: '',
        UpdatedOn: '',
        OTCType: 'C2C',
        ...payloadData,
      }

      const {
        data: { Success, ErrorCode, ContactInfo, OTC_Transaction },
      } = await $axios.post(
        $config.FINANCE_API_URL + '/CreateOtcTransaction',
        payload,
        {
          headers: authHeader,
        }
      )
      if (Success && ErrorCode === 0) {
        this.isOtcTransactionComplete = true
        this.ContactInfo = ContactInfo
      }
    },
    async getDropdown() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetFilters',
        {
          headers: authHeader,
        }
      )
      if (response.data) {
        this.assets = response.data
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
    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: this.$t('text_error'),
        description: this.errorMessage,
      })
    },
    async StartOtcTransaction(payloadSubmit) {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      let payload = {
        Type: '',
        InAsset: '',
        OutAsset: '',
        InAmount: 0,
        OutAmount: 0,
        OTCType: 'C2C',
        ...payloadSubmit,
      }

      const response = await $axios.post(
        $config.FINANCE_API_URL + '/StartOtcTransaction',
        payload,
        {
          headers: authHeader,
        }
      )

      // if (response.data['ErrorCode'] === 98) {
      //   let messages = response.data['Message']
      //   let messageArray = messages.split(',')
      //   messageArray.forEach(mes => {
      //     if (mes === 'sms') {
      //       this.isSmsExist = true
      //     }
      //   })
      //   this.isModalVisible = true
      //   return

      // } else
      if (response.data['ErrorCode'] === 99) {
        this.errorMessage = response.data['Message']
        this.openNotificationWithIcon('error')
        return
      } else if (response.data['ErrorCode'] === 1) {
        this.firstAlertErrorMessage = response.data['Message']
        this.firstAlert = true
        return
      } else if (response.data['ErrorCode'] === 2) {
        this.secondAlertErrorMessage = response.data['Message']
        this.secondAlert = true
        return
      }

      if (response.data) {
        this.submitSuccess = true

        this.OTC_Transaction = response.data
        this.error = {
          code: response.data.ErrorCode,
          message: response.data.Message,
        }
        if (this.error.code === 99) {
          this.$message.error(this.error.message)
        }
      }
    },

    copyText(id) {
      let referenceCode = document.getElementById(id)
      let selection = window.getSelection()
      let range = document.createRange()

      range.selectNodeContents(referenceCode)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('Copy')
      selection.removeAllRanges()
    },
  },
}
</script>

<style lang="less">
#c2c .ant-select-selection {
  border: 1px solid #d9d9d9 !important;
  display: flex;
  align-items: center;
}
#c2c .ant-select-selection .ant-select-selection-selected-value {
  display: flex;
  align-items: center;
}
#c2c .asset-icon {
  margin: 0 5px;
}
</style>

<style lang="scss" scoped>
.c2c {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 0 10px;
  }
  @media screen and (max-width: 500px) {
    padding: 0 5px;
  }
}
.order {
  width: 521px;
  height: 435px;
  box-shadow: 0px 0px 20px #0000001a;
  padding: 30px;
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    padding: 10px;
  }
}
.c2cForm {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 1000px) {
    width: 100%;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
.showoutput {
  width: 521px;
  height: 435px;
  box-shadow: 0px 0px 20px #0000001a;
  padding: 30px;
  @media (max-width: 1000px) {
    width: 100%;
    margin-top: 10px;
  }

  .noShow {
    h1 {
      height: 50px;
      width: 100%;
      border-bottom: 2px solid #f0f1f4;
    }
    .body {
      padding-top: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .no-data {
      width: 56px;
      height: 83px;
      border: 2px dashed #9d9d9d;
      border-radius: 4px;
      margin-bottom: 20px;
    }
  }
  .show {
    box-shadow: none;
    display: flex;
    flex-direction: column;
    .order-header {
      height: 50px;
      border-bottom: 2px solid #f0f1f4;
    }
    .info {
      font-size: 14px;
      color: #a0a0a0;
    }
    .contact {
      .number {
        width: 436px;
        height: 72px;
        border: 1px solid #e9e9e9;
        border-radius: 36px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .phone {
          color: #646a74;
          font-size: 24px;
        }
        @media (max-width: 1000px) {
          width: 236px;
          .phone {
            font-size: 14px;
          }
        }
      }
    }
    .numbers {
      display: flex;
      justify-content: space-between;
      .columns {
        display: flex;
        flex-direction: column;
        .label {
          font-size: 14px;
          color: #a7aaaf;
        }
        .code {
          font-size: 14px;
          color: black;
          font-weight: 500;
          &.blue {
            color: #1ba4e8;
          }
        }
      }
    }
    .buy {
      height: 150px;
      border-bottom: 2px solid #f0f1f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 23px;
        color: #bdbdbd;
      }
      .circle-data {
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .number {
          font-size: 22px;
          color: black;
        }
        .asset {
          font-size: 22px;
          color: #bdbdbd;
        }
      }
    }
    .unit-amount {
      height: 100px;
      border-bottom: 2px solid #f0f1f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .unit-column {
        display: flex;
        flex-direction: column;
        .label {
          font-size: 16px;
          color: #bdbdbd;
        }
        .amount {
          font-size: 20px;
          &.blue {
            color: #1ba4e8;
          }
        }
        .end {
          align-self: flex-end;
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  .ant-table table {
    display: unset;
  }
}
</style>

<style lang="scss">
.otc-tabs .ant-tabs-nav .ant-tabs-tab {
  @media screen and (max-width: 500px) {
    padding: 8px;
  }
  @media screen and (max-width: 350px) {
    font-size: 12px;
  }
}
</style>
