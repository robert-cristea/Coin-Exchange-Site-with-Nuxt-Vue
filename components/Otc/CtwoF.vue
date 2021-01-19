<template>
  <div class="c2c" id="c2f">
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
                    v-bind:placeholder="$t('otc_text_want_to_buy')"
                    @change="checkFirst"
                    style="width: 70%; margin-bottom: 20px"
                  />
                  <a-select
                    v-decorator="['InAsset', { initialValue: 'USDT' }]"
                    @change="handleChange"
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
                      initialValue: 'USD',
                      rules: [
                        {
                          required: true,
                          message: this.$t('text_required_field'),
                        },
                      ],
                    },
                  ]"
                  size="large"
                  @change="checkSecond"
                >
                  <a-select-option
                    v-for="item in assets.OTCFiatList"
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
                <a-button block size="large" type="primary" html-type="submit">
                  {{ $t('otc_text_offer') }}
                </a-button>
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
                    v-bind:placeholder="$t('otc_text_want_to_spend')"
                    @change="checkFirst"
                    style="width: 70%; margin-bottom: 20px"
                  />
                  <a-select
                    v-decorator="['InAsset']"
                    @change="handleChange"
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
                      initialValue: 'USD',
                      rules: [
                        {
                          required: true,
                          message: this.$t('text_required_field'),
                        },
                      ],
                    },
                  ]"
                  size="large"
                  @change="checkSecond"
                >
                  <a-select-option
                    v-for="item in assets.OTCFiatList"
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
                <a-button block size="large" type="primary" html-type="submit">
                  {{ $t('otc_text_offer') }}
                </a-button>
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

          </div> -->
          <span>{{ $t('otc_empty_message') }}</span>
        </div>
      </div>
      <div v-else class="show">
        <span class="info">
          {{ $t('otc_info_message') }}
        </span>
        <div class="contact">
          <div class="number">
            <img src="~/assets/images/wp.png" alt="" />
            <a
              target="_blank"
              v-bind:href="
                'https://wa.me/' + ContactInfo.Whatsapp.replace(/\s/g, '')
              "
            >
              <span class="phone" id="wpNumber">
                {{ ContactInfo.Whatsapp }}</span
              >
            </a>
            <a-tooltip>
              <template slot="title">{{ $t('otc_copied') }} </template>
              <img
                src="~/assets/images/copy.svg"
                @click="copyText('wpNumber')"
              />
            </a-tooltip>
          </div>
          <div class="number">
            <img src="~/assets/images/telegram.png" alt="" />
            <a
              target="_blank"
              v-bind:href="
                'https://t.me/' + ContactInfo.Telegram.replace('@', '')
              "
            >
              <span class="phone" id="tgNumber">{{
                ContactInfo.Telegram
              }}</span>
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
            <span class="code">{{
              OTC_Transaction.OTC_Transaction.OTCTransactionUniqueID
            }}</span>
          </div>
          <div class="columns">
            <span class="label">{{ $t('otc_security_code') }}</span>
            <span class="code blue">{{
              OTC_Transaction.OTC_Transaction.SecurityCode
            }}</span>
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
        </a-button> -->

        <!-- <a-button v-else type="danger" style="width: 100%">
          {{ OTC_Transaction.Message }}
        </a-button> -->
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
              alt=""
            />
            <p class="Roboto-Medium">{{ $t('froze_modal_sms') }}</p>
          </div>
          <div class="invite-verify-box-item" v-on:click="modalClicked">
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/verify_modal/2faicon.svg"
              alt=""
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
              alt=""
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
  name: 'CtwoF',
  data() {
    return {
      buyForm: this.$form.createForm(this, { name: 'buyForm' }),
      currentType: 'buy',
      assets: {},
      submitSuccess: false,
      OTC_Transaction: {},
      createTransactionData: {},
      ContactInfo: [],
      limits: [],
      currentAsset: 'USDT',

      isSmsExist: false,
      isModalVisible: false,

      firstAlert: false,
      firstAlertErrorMessage: null,

      secondAlert: false,
      secondAlertErrorMessage: null,

      errorMessage: null,
    }
  },
  mounted() {
    this.getDropdown()
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
    handleChange(e) {
      this.currentAsset = e

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
    checkSecond() {
      if (this.secondAlert) {
        this.secondAlert = false
        this.secondAlertErrorMessage = null
      }
    },
    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: this.$t('text_error'),
        description: this.errorMessage,
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.buyForm.validateFields((err, values) => {
        if (!err) {
          this.createTransactionData = values
          this.StartOtcTransaction({ Type: this.currentType, ...values })
        } else {
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
        OTCType: 'C2F',
        ...payloadData,
        ...this.OTC_Transaction.OTC_Transaction,
      }

      const response = await $axios.post(
        $config.FINANCE_API_URL + '/CreateOtcTransaction',
        payload,
        {
          headers: authHeader,
        }
      )
      if (response.data) {
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
    async StartOtcTransaction(payloadSubmit) {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      let payload = {
        Type: '',
        InAsset: '',
        OutAsset: '',
        InAmount: 0,
        OutAmount: 0,
        OTCType: 'C2F',
        ...payloadSubmit,
      }

      const response = await $axios.post(
        $config.FINANCE_API_URL + '/StartOtcTransaction',
        payload,
        {
          headers: authHeader,
        }
      )

      if (response.data['ErrorCode'] === 98) {
        let messages = response.data['Message']
        let messageArray = messages.split(',')
        messageArray.forEach((mes) => {
          if (mes === 'sms') {
            this.isSmsExist = true
          }
        })
        this.isModalVisible = true
        return
      } else if (response.data['ErrorCode'] === 99) {
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
        const { ContactInfo } = response.data
        this.ContactInfo = ContactInfo
        this.OTC_Transaction = response.data
      }
    },
  },
}
</script>

<style lang="less">
#c2f .ant-select-selection {
  border: 1px solid #d9d9d9 !important;
  display: flex;
  align-items: center;
}
#c2f .ant-select-selection .ant-select-selection-selected-value {
  display: flex;
  align-items: center;
}
#c2f .asset-icon {
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
  align-items: center;
  @media (max-width: 1000px) {
    width: 100%;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
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
