<template>
  <a-col
    :class="networkType === 'deposit' ? 'main-deposit' : 'main-withdraw'"
    offset="1"
    :xs="22"
    :sm="22"
    :md="11"
    :lg="11"
    :xl="11"
  >
    <a-col style="margin-top: 30px">
      <div v-if="networkType === 'deposit'">
        <a-spin :spinning="IS_NETWORK_READY">
          <a-col offset="1" :span="22" style="color: #1c2640">{{
            networkTitle
          }}</a-col>
          <a-col offset="1" :span="22">
            <div
              v-if="
                DEPOSIT_NETWORK_ADRESSES && DEPOSIT_NETWORK_ADRESSES.length > 0
              "
            >
              <a-tabs
                default-active-key="0"
                @change="callback"
                style="color: #1c2640"
              >
                <a-tab-pane
                  v-bind:key="index.toString()"
                  v-bind:tab="network.name"
                  v-for="(network, index) in DEPOSIT_NETWORK_ADRESSES"
                >
                  <div v-if="network.deposit">
                    <NetworkTab
                      v-bind:name="network.name"
                      v-bind:address="network['Address']"
                      v-bind:memo="network['Memo']"
                      v-bind:enabled="network.deposit"
                    />
                  </div>
                  <div
                    v-else
                    style="
                      display: flex;
                      background: #fdf1f3;
                      padding: 8px;
                      border-radius: 5px;
                    "
                  >
                    <IconBulb />
                    <div style="flex-grow: 1">
                      {{ $t('network_text_deposit_not_supported') }}
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-col>
        </a-spin>
      </div>
      <div v-else-if="networkType === 'withdraw'" class="wallet-withdraw">
        <a-spin :spinning="IS_NETWORK_READY">
          <a-col offset="1" :span="22" style="color: #1c2640">{{
            networkTitle
          }}</a-col>
          <a-col offset="1" :span="22">
            <div v-if="NETWORKS && NETWORKS.length > 0">
              <a-tabs
                default-active-key="0"
                @change="callback"
                style="color: #1c2640"
              >
                <a-tab-pane
                  v-bind:key="index.toString()"
                  v-bind:tab="network['Network']"
                  v-for="(network, index) in NETWORKS"
                >
                  <div v-if="network.WithdrawEnabled">
                    <a-form class="Roboto-Regular" :label-col="{ span: 8 }">
                      <a-form-item
                        :label="
                          $t('network_text_withdraw_address', {
                            asset: SELECTED_ASSET,
                          })
                        "
                        :has-feedback="addressAlert"
                        :validate-status="addressAlert ? 'error' : null"
                        :help="addressErrorMessage"
                        @keyup="checkAddress"
                      >
                        <a-textarea
                          v-model="form.address"
                          :auto-size="true"
                          has-feedback
                          v-decorator="[
                            'address',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: $t('validation_text_address'),
                                },
                                {
                                  validator: validateAddress,
                                },
                              ],
                            },
                          ]"
                          style="resize: none"
                        />
                      </a-form-item>
                      <a-form-item
                        v-bind:label="$t('main_wallet_amount')"
                        :has-feedback="amountAlert"
                        :validate-status="amountAlert ? 'error' : null"
                        :help="amountErrorMessage"
                      >
                        <a-input v-model="form.amount" @keyup="checkAmount">
                          <a-tooltip slot="suffix" title="Extra information">
                            <img
                              height="20"
                              :src="getAssetIcon(SELECTED_ASSET)"
                            />
                            <span
                              v-text="SELECTED_ASSET"
                              style="margin-left: 8px"
                            ></span>
                          </a-tooltip>
                        </a-input>
                      </a-form-item>
                      <a-form-item
                        v-bind:label="$t('main_wallet_tag_address')"
                        v-if="network['MemoExist']"
                      >
                        <a-input
                          v-model="form.tag"
                          v-bind:placeholder="$t('placeholders_text_optional')"
                          :has-feedback="tagAlert"
                          :validate-status="tagAlert ? 'error' : null"
                          :help="tagErrorMessage"
                          @keyup="checkTag"
                        />
                      </a-form-item>
                      <div v-else style="margin-bottom: 85px"></div>
                    </a-form>
                    <hr class="modal-horizontal-line" />
                    <a-row style="margin-top: 20px">
                      <a-col :span="16" align="start">
                        <p class="Roboto-Regular cursor-pointer">
                          {{ $t('main_wallet_available_balance') }}:
                          <span
                            style="font-weight: bold"
                            @click="setAvailablePrice"
                            >{{ AVAILABLE_PRICE }} {{ SELECTED_ASSET }}</span
                          >
                        </p>
                      </a-col>
                      <a-col :span="8" align="end">
                        <p class="Roboto-Regular">
                          {{ $t('main_wallet_withdraw_fee') }}:
                          <span style="font-weight: bold">
                            {{ network['WithdrawFee'] }}
                            {{ SELECTED_ASSET }}</span
                          >
                        </p>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24" align="end">
                        <p class="Roboto-Regular">
                          {{ $t('main_wallet_will_get') }}
                          <span style="font-weight: bold">
                            {{
                              form.amount - network['WithdrawFee'] < 0 ||
                              form.amount > USER_BALANCE
                                ? 0
                                : (
                                    form.amount - network['WithdrawFee']
                                  ).toFixed(8)
                            }}
                            {{ SELECTED_ASSET }}
                          </span>
                        </p>
                      </a-col>
                    </a-row>
                    <a-col offset="1" :span="22" style="margin-top: 20px">
                      <a-button
                        type="primary"
                        class="network-button Roboto-Medium"
                        v-on:click="postWithdraw(network['Network'])"
                        :disabled="isButton"
                      >
                        {{ $t('main_wallet_send') }}
                      </a-button>
                    </a-col>
                  </div>
                  <div v-else>
                    <div
                      style="
                        display: flex;
                        background: #fdf1f3;
                        padding: 8px;
                        border-radius: 5px;
                      "
                    >
                      <IconBulb />
                      <div style="flex-grow: 1">
                        {{ $t('network_text_withdraw_not_supported') }}
                      </div>
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-col>
        </a-spin>
      </div>
    </a-col>
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
            <p class="Roboto-Medium">{{ $t('text_email') }}</p>
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
  </a-col>
</template>
<script>
import { log } from '@chenfengyuan/vue-qrcode'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Network',
  data: () => ({
    formLayout: 'horizontal',
    form: {
      address: '',
      amount: null,
      tag: null,
    },
    isButton: false,
    addressErrorMessage: null,
    addressAlert: false,
    amountErrorMessage: null,
    amountAlert: false,
    tagErrorMessage: null,
    tagAlert: false,
    isModalVisible: false,
    isSmsExist: false,
  }),
  props: {
    networkTitle: {
      type: String,
      required: true,
    },
    networkType: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      USER_BALANCE: 'mainwallet/USER_BALANCE',
      ASSETS: 'swap/ASSETS',
      SELECTED_ASSET: 'mainwallet/SELECTED_ASSET',
      DEPOSIT_NETWORK_ADRESSES: 'mainwallet/DEPOSIT_NETWORK_ADRESSES',
      IS_NETWORK_READY: 'mainwallet/IS_NETWORK_READY',
      NETWORKS: 'mainwallet/NETWORKS',
      AVAILABLE_PRICE: 'mainwallet/AVAILABLE_PRICE',
    }),
  },
  methods: {
    setAvailablePrice() {
      if (Number(this.AVAILABLE_PRICE) > 0) {
        this.form.amount = this.AVAILABLE_PRICE
      }
    },
    ...mapActions({
      POST_WITHDRAW: 'mainwallet/POST_WITHDRAW',
    }),
    ...mapMutations({
      SET_IS_NETWORK_READY: 'mainwallet/SET_IS_NETWORK_READY',
      setVerficationData: 'auth/setVerficationData',
    }),
    validateAddress(rule, value, callback) {
      const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39}$/
      if (value === '') {
        callback(new Error(this.$t('validation_text_address')))
      } else if (!regex.test(value.toString().toLowerCase())) {
        callback(new Error(this.$t('validation_text_address')))
      }
      callback()
      // TODO:
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
    checkAddress() {
      if (this.addressAlert) {
        this.addressAlert = false
        this.addressErrorMessage = null
      }
      this.isButton = false
    },
    checkAmount() {
      if (this.amountAlert) {
        this.amountAlert = false
        this.amountErrorMessage = null
      }
      this.isButton = false
    },
    checkTag() {
      if (this.tagAlert) {
        this.tagAlert = false
        this.tagErrorMessage = null
      }
      this.isButton = false
    },
    modalClicked() {
      this.$router.push(this.localeRoute('/account'))
    },
    callback(key) {
    },
    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: this.$t('text_error'),
        description: this.errorMessage,
      })
    },
    async postWithdraw(network) {
      if (this.form.amount - parseFloat(network['WithdrawFee']) <= 0) {
        this.amountErrorMessage = 'ttt'
        this.amountAlert = true
        this.isButton = true
        return ''
      }
      if (this.form.address !== null && this.form.amount !== null) {
        let payload = {
          Amount: this.form.amount,
          Asset_: this.SELECTED_ASSET,
          Network: network,
          Address: this.form.address,
          AddressTag: this.form.tag !== null ? this.form.tag : '',
        }
        this.SET_IS_NETWORK_READY(true)
        try {
          let response = await this.POST_WITHDRAW(payload)
          if (response.data['ErrorCode'] === '98') {
            let messages = response.data['Message']
            let messageArray = messages.split(',')
            messageArray.forEach((mes) => {
              if (mes === 'sms') {
                this.isSmsExist = true
              }
            })

            this.isModalVisible = true
          } else if (response.data['ErrorCode'] === '99') {
            this.errorMessage = response.data['Message']
            this.openNotificationWithIcon('error')
          } else if (response.data['ErrorCode'] === '99') {
            this.errorMessage = response.data['Message']
            this.openNotificationWithIcon('error')
          }
          if (response) {
            if (response === false) {
              throw new Error(this.$t('validation_text_unavailable'))
            }
            this.SET_IS_NETWORK_READY(false)
            if (response.data.Success) {
              const { SecurityVerificationToken } = response.data
              this.setVerficationData({
                SecurityVerificationToken,
                status: true,
                redirectURI: '/my/wallet/main-wallet/withdraw/'+this.SELECTED_ASSET,
              })
              this.$router.push(this.localeRoute('/security-verification'))
            }
            if (response.data['ErrorCode'] === '1') {
              this.addressErrorMessage = response.data['Message']
              this.addressAlert = true
              this.isButton = true
            } else if (response.data['ErrorCode'] === '2') {
              this.tagErrorMessage = response.data['Message']
              this.tagAlert = true
              this.isButton = true
            } else if (response.data['ErrorCode'] === '3') {
              this.amountErrorMessage = response.data['Message']
              this.amountAlert = true
              this.isButton = true
            }
          } else {
            this.SET_IS_NETWORK_READY(false)
          }
        } catch (e) {
          this.SET_IS_NETWORK_READY(false)
        }
      }
    },
    getAssetIcon(symbol) {
      try {
        return require(`~/assets/icons/${symbol.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },
  },
}
</script>
<style scoped>
.network-button {
  width: 100%;
  height: 35px;
  background: #90dafe 0 0 no-repeat padding-box;
  opacity: 1;
}
.network-button :hover {
  color: #f4f4f4;
}
.modal-horizontal-line {
  height: 1px;
  color: gray;
  border-width: 0;
  background-color: #f4f4f4;
}
.main-withdraw {
  text-align: start;
  padding-bottom: 30px;
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 10px #0000001f;
  border-radius: 10px;
  opacity: 1;
}
.main-deposit {
  text-align: start;
  padding-bottom: 30px;
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 10px #0000001f;
  border-radius: 10px;
  opacity: 1;
}
.security-modal-title {
  margin-bottom: 10px;
  text-align: center;
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
  border: 1px solid #e6e8ea;
  border-radius: 3px;
  text-align: center;
  width: 150px;
  height: 120px;
  cursor: pointer;
}
.remind-me-text {
  margin-top: 20px;
  color: #1ca4e8;
  cursor: pointer;
}
</style>
