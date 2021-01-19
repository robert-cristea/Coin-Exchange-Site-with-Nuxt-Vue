<template>
  <div class="Roboto-Regular main-background">
    <Modal
      v-if="isVisible"
      :in-asset="inAsset"
      :out-asset="outAsset"
      :final-amount="finalAmountSwap"
      :in-amount="inAmountSwap"
      :visible="isVisible"
      @closeModal="closeModal"
      @refresh="startSwap"
    />

    <a-col align="center" class="col-center">
      <div class="card-container">
        <div v-if="!isMobile" class="centered">{{ $t('swap_quick') }}</div>
        <div class="swap-container">
          <a-card
            :loading="loading"
            :class="!isMobile ? 'main-card' : 'main-card-mobile'"
          >
            <a-card-grid
              :class="!isMobile ? 'first-row' : 'first-row-mobile'"
              :hoverable="false"
            >
              {{/*Selling Feilds*/}}
              <a-row>
                <a-col :xs="16" :sm="14" :md="14" :lg="14" :xl="16">
                  <a-form class="Roboto-Regular">
                    <a-form-item
                      style="margin-bottom: 0"
                      :validate-status="isErrorInput ? 'error' : null"
                      :help="isErrorInputMessage"
                      :has-feedback="isErrorInput"
                    >
                      <div class="Selling-field">
                        <label>{{ $t('swap_sending_text') }}</label>
                        <input
                          type="text"
                          v-model="inAmount"
                          v-bind:placeholder="$t('placeholders_text_amount')"
                          style="width: 100%"
                          @keyup="checkInput"
                        />
                      </div>
                    </a-form-item>
                  </a-form>
                </a-col>

                <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <a-form class="Roboto-Regular">
                    <a-form-item
                      style="margin-bottom: 0; !important"
                      :validate-status="isError ? 'error' : null"
                      :help="message"
                    >
                      <a-select
                        id="first"
                        show-search
                        :size="size"
                        placeholder="Seçiniz"
                        @change="handleInAssetChange"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        default-value="BTC"
                        style="width: 100%"
                        :value="inAsset"
                      >
                        <a-select-option
                          v-for="item in ASSETS"
                          v-bind:key="item['Name']"
                          v-bind:value="item['Symbol']"
                        >
                          <img
                            height="20"
                            :src="getAssetIcon(item.Symbol)"
                            style="margin-bottom: 2px"
                            alt
                          />
                          <span class="select-text">
                            {{ item['Symbol'] }}
                          </span>
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </a-col>
              </a-row>
              {{/*-----------------*/}}

              {{/*Amount usable*/}}

              <a-col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24"
                style="
                  margin-bottom: 20px;
                  z-index: 5;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  width: 100%;
                "
              >
                <div
                  @click="writeInput"
                  style="cursor: pointer; z-index: 5; width: 100%"
                >
                  {{ $t('swap_available_balance') }}
                  <span style="color: #1ba4e8; z-index: 5">
                    {{
                      inAsset
                        ? parseFloat(availabelBalance).toFixed(8)
                          ? parseFloat(availabelBalance).toFixed(8)
                          : '0.0'
                        : ''
                    }}
                    {{ inAsset ? inAsset : 'Not availabel' }}
                  </span>
                </div>
                <a-col align="center">
                  <div class="rules-image" @click="changeAssets"></div>
                </a-col>
              </a-col>
              {{/*--------------*/}}

              {{/*Selling Feilds*/}}
              <a-row>
                <a-col :xs="16" :sm="14" :md="14" :lg="14" :xl="16">
                  <a-form class="Roboto-Regular">
                    <a-form-item
                      style="margin-bottom: 0"
                      :validate-status="isErrorInput2 ? 'error' : null"
                      :help="isErrorInputMessage2"
                      :has-feedback="isErrorInput2"
                    >
                      <div class="Selling-field">
                        <label
                          >{{ $t('swap_sending_text2') }}
                          <a-tooltip class="tooltip1">
                            <a-icon type="info-circle"></a-icon>
                            <span slot="title">{{
                              $t('swap_sending_info')
                            }}</span>
                          </a-tooltip>
                        </label>
                        <input
                          type="text"
                          v-model="price"
                          disabled
                          v-bind:placeholder="$t('placeholders_text_amount')"
                          style="width: 100%"
                        />
                      </div>
                    </a-form-item>
                  </a-form>
                </a-col>

                <a-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <a-form class="Roboto-Regular">
                    <a-form-item
                      style="margin-bottom: 0; !important"
                      :validate-status="isError ? 'error' : null"
                      :help="message"
                    >
                      <a-select
                        class="btc-dropdown"
                        show-search
                        v-bind:placeholder="$t('placeholders_text_select')"
                        style="width: 100%"
                        :size="size"
                        @change="handleOutAssetChange"
                        default-value="ETH"
                        :value="outAsset"
                      >
                        <a-select-option
                          v-for="item in ASSETS"
                          v-bind:key="item['Name']"
                          v-bind:value="item['Symbol']"
                        >
                          <img
                            height="20"
                            :src="getAssetIcon(item.Symbol)"
                            style="margin-bottom: 2px"
                            alt
                          />
                          <span class="select-text">
                            {{ item['Symbol'] }}
                          </span>
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </a-col>
              </a-row>
              {{/*-----------------*/}}

              <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-button
                  :loading="isSwapLoading"
                  class="swap-start-button primary-button border-none Roboto-Medium"
                  type="primary"
                  v-on:click="startSwap"
                  >{{ $t('swap_form_button_text') }}</a-button
                >
              </a-col>
            </a-card-grid>
          </a-card>

          <a-row style="margin-top: 60px" type="flex">
            <a-col v-if="!isMobile" class="rules-image-column" :flex="2">
              <img
                :src="require(`~/assets/images/swap/rules.svg`)"
                style="position: relative; top: 0"
                alt
              />
            </a-col>
            <a-col
              :flex="!isMobile ? 3 : 5"
              style="width: 50%"
              class="card-col-2"
            >
              <div class="second-row-title">{{ $t('swap_rules_heading') }}</div>

              <div class="second-row-text">{{ $t('swap_rule') }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-col>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '~/components/Swap/Modal'

export default {
  middleware: ['auth'],

  components: { Modal },
  head() {
    return {
      title: 'Hızlı Takas | Cointral.com',
    }
  },
  data: () => ({
    loading: false,
    size: 'large',
    inAsset: 'BTC',
    outAsset: 'ETH',
    inAmount: null,
    swapPrice: null,

    isVisible: false,
    inAmountSwap: null,
    finalAmountSwap: null,

    availabelBalance: null,
    title: '',

    isError: false,
    message: null,
    price: null,
    isErrorInput: false,
    isErrorInputMessage: null,

    isErrorInput2: false,
    isErrorInputMessage2: null,

    isMobile: null,
    notificationMessage: null,
    isSwapLoading: false,
  }),

  computed: {
    ...mapGetters({
      ASSETS: 'swap/ASSETS',
      USER_SPOT_BALANCE: 'swap/USER_SPOT_BALANCE',
    }),
  },
  // async asyncData({ app, params, redirect, $axios, $config, $cookies }) {
  //   if (!params.inout) {
  //     redirect(app.localeRoute('/my/swap/BTC-ETH'))
  //   } else {
  //     const assets = params.inout.split('-')
  //     const inAsset = assets[0]
  //     const outAsset = assets[1]

  //     let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
  //     const { data } = await $axios.get(
  //       $config.FINANCE_API_URL + '/GetSymbols',
  //       {
  //         headers: authHeaders,
  //       }
  //     )
  //     const { SymbolList, Success } = data
  //     if (Success) {
  //       let inIndex = SymbolList.findIndex((sym) => sym.BaseAsset === inAsset)
  //       let outIndex = SymbolList.findIndex((sym) => sym.BaseAsset === outAsset)
  //       if (inIndex === -1 || outIndex === -1) {
  //         redirect(app.localeRoute('/_'))
  //       }
  //     }
  //   }
  // },
  mounted() {
    // this.title = $t('swap_quick');
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

    if (this.$route.params.inout) {
      const assets = this.$route.params.inout.split('-')
      this.inAsset = assets[0]
      this.outAsset = assets[1]
    }
    this.findTheAvailabelBalance()
  },

  methods: {
    ...mapMutations({
      SET_ASSETS: 'swap/SET_ASSETS',
    }),
    getAssetIcon(BaseAsset) {
      try {
        return require(`~/assets/icons/${BaseAsset.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },

    checkInput() {
      if (this.isErrorInput) {
        this.isErrorInput = false
        this.isErrorInputMessage = null
      }
      /*Fetch swapPrice for 2nd Input field based on 1st input field value*/
      this.getSwapPrice()
      /*-----------------*/
    },

    writeInput() {
      this.inAmount = this.availabelBalance
      if (this.availabelBalance) {
        /*Fetch swapPrice for 2nd Input field based on 1st input field value*/
        this.getSwapPrice()
        /*-----------------*/
      }
    },

    async closeModal() {
      this.isVisible = false

      try {
        const {
          $axios,
          $config: { FINANCE_API_URL },
          $cookies,
          $store,
        } = this

        let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }

        const responseUserBalance = await $axios.get(
          FINANCE_API_URL + '/GetUserBalance',
          { headers: authHeaders }
        )

        if (responseUserBalance.data) {
          $store.commit(
            'swap/SET_USER_SPOT_BALANCE',
            responseUserBalance.data['UserSpotBalance']
          )

          if (
            responseUserBalance.data['UserSpotBalance'] &&
            responseUserBalance.data['UserSpotBalance'].length > 0
          ) {
            responseUserBalance.data['UserSpotBalance'].forEach((coin) => {
              if (coin.asset === this.inAsset) {
                this.availabelBalance = coin.free
              }
            })
          } else {
            this.availabelBalance = 0.0
          }
        }
      } catch (e) {}
    },

    changeAssets() {
      this.isErrorInput = false
      const tempAsset = this.inAsset
      this.inAsset = this.outAsset
      this.outAsset = tempAsset
      this.findTheAvailabelBalance()
      /*Fetch swapPrice for changed field value*/
      if (this.inAmount) {
        this.getSwapPrice()
      }
    },

    handleInAssetChange(val) {
      // Delete error message

      if (this.isError) {
        this.isError = false
        this.message = null
      }

      if (this.outAsset === val) {
        if (this.outAsset === 'BTC') {
          this.inAsset = 'BTC'
          this.outAsset = 'USDT'
        } else {
          this.inAsset = val
          this.outAsset = 'BTC'
        }
      }
      this.inAsset = val

      /*Fetch swapPrice for changed field value*/
      if (this.inAmount) {
        this.getSwapPrice()
      }
      /*-----------------*/
      this.findTheAvailabelBalance()
      this.changeBrowserRoute()
    },

    findTheAvailabelBalance() {
      if (this.USER_SPOT_BALANCE && this.USER_SPOT_BALANCE.length > 0) {
        this.USER_SPOT_BALANCE.forEach((coin) => {
          if (coin.asset === this.inAsset) {
            this.availabelBalance = coin.free
          }
        })
      } else {
        this.availabelBalance = 0.0
      }
    },

    handleOutAssetChange(val) {
      if (this.inAsset === val) {
        if (this.inAsset === 'BTC') {
          this.inAsset = 'USDT'
          this.outAsset = 'BTC'
        } else {
          this.inAsset = 'BTC'
          this.outAsset = val
        }
        this.findTheAvailabelBalance()
        this.changeBrowserRoute()
        return
      }
      this.outAsset = val
      /*Fetch swapPrice for changed field value*/
      if (this.inAmount) {
        this.getSwapPrice()
      }
      /*-----------------*/
      this.changeBrowserRoute()
    },

    changeBrowserRoute() {
      const path = this.$route.path
      const pathSplit = path.split('/')
      if (pathSplit[pathSplit.length - 1] !== '') {
        pathSplit[pathSplit.length - 1] = `${this.inAsset}-${this.outAsset}`
      } else {
        pathSplit[pathSplit.length - 2] = `${this.inAsset}-${this.outAsset}`
      }

      const newPath = pathSplit.join('/')
      history.pushState({}, null, newPath)
    },

    handleBlur() {},

    handleFocus() {},

    filterOption(input, option) {
      return (
        option.componentOptions.children[1].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    async getSwapPrice() {
      this.price = null
      const { $axios, $config, $cookies } = this

      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isSwapLoading = true
      try {
        const response = await $axios.get(
          $config.FINANCE_API_URL + '/GetSwapPrice',
          {
            params: {
              inAsset: this.inAsset,
              OutAsset: this.outAsset,
            },
            headers: authHeaders,
          }
        )

        if (response.data) {
          let bool = response.data['Success']

          if (
            response.data['ErrorCode'] === 1 ||
            response.data['ErrorCode'] === 99
          ) {
            this.isErrorInputMessage = response.data['Message']
            this.isErrorInput = true
          } else if (this.message && this.message !== '') {
            this.message = response.data['Message']
            this.isError = true
          } else {
            if (bool) {
              this.swapPrice = response.data['Price']
              if (this.inAmount) {
                this.price = this.inAmount * this.swapPrice
              }
            }
          }
        }
        this.isSwapLoading = false
      } catch (e) {
        this.isVisible = false
        this.isSwapLoading = false
      }
    },
    async startSwap() {
      if (this.inAsset !== this.outAsset && this.inAmount) {
        const { $axios, $config, $cookies } = this

        let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        this.isSwapLoading = true
        try {
          const response = await $axios.post(
            $config.FINANCE_API_URL + '/GetSwapFinalQuantity',
            {
              inAsset: this.inAsset,
              OutAsset: this.outAsset,
              InputAmount: this.inAmount,
              OutputAmount: '',
            },
            { headers: authHeaders }
          )

          if (response.data) {
            let bool = response.data['Success']

            if (response.data['ErrorCode'] === 1) {
              this.isErrorInputMessage = response.data['Message']
              this.isErrorInput = true
            } else if (this.message && this.message !== '') {
              this.message = response.data['Message']
              this.isError = true
            } else {
              if (bool) {
                this.inAmountSwap = response.data['InAmount']
                this.finalAmountSwap = response.data['FinalAmount']
                this.isVisible = true
              } else {
                this.isVisible = false
              }
            }
          }
          this.isSwapLoading = false
        } catch (e) {
          this.isVisible = false
          this.isSwapLoading = false
        }
      } else {
      }
    },
  },

  watch: {
    $route: {
      handler: function (val) {
        // const assets = this.$route.params.inout.split('-')
        // let prefix = this.$cookies.get('i18n_redirected')
        // let path =
        //   '/' +
        //   prefix +
        //   '/swap/' +
        //   assets[0].toString().toUpperCase() +
        //   '-' +
        //   assets[1].toString().toUpperCase()
        // window.history.pushState({}, null, path)
      },
      deep: true,
    },
  },
  async asyncData({
    app,
    $axios,
    store,
    redirect,
    $config: { FINANCE_API_URL },
    params,
    $cookies,
  }) {
    try {
      if (!params.inout) {
        redirect(app.localeRoute('/swap/BTC-ETH'))
      }
      if (!params.inout.includes('-')) {
        redirect(app.localeRoute('/swap/BTC-ETH'))
      }

      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.get(FINANCE_API_URL + '/GetSymbols', {
        headers: authHeaders,
      })
      const { SymbolList, Success } = data

      if (Success) {
        const inOut = params.inout.toUpperCase().split('-')
        let inAsset = inOut[0].toUpperCase()
        let outAsset = inOut[1].toUpperCase()
        let index = SymbolList.findIndex((sym) => sym.BaseAsset === inAsset)
        let index2 = SymbolList.findIndex((sym) => sym.BaseAsset === outAsset)
        if (index === -1 || index2 === -1) {
          redirect(app.localeRoute('/swap/BTC-ETH'))
        } else {
          // redirect(app.localeRoute(`/swap/${inAsset}-${outAsset}`))
        }
      }

      const response = await $axios.get(FINANCE_API_URL + '/GetSwapAssetList', {
        headers: authHeaders,
      })

      const responseUserBalance = await $axios.get(
        FINANCE_API_URL + '/GetUserBalance',
        { headers: authHeaders }
      )

      if (responseUserBalance.data) {
        store.commit(
          'swap/SET_USER_SPOT_BALANCE',
          responseUserBalance.data['UserSpotBalance']
        )
      }

      if (response.data) {
        const assets = response.data['Assets']
        store.commit('swap/SET_ASSETS', assets)
      }
    } catch (e) {}
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  background: transparent linear-gradient(180deg, #ffffff 0%, #1c2640 100%) 0%
    0% no-repeat padding-box;
}

.ant-card-head-title {
  text-align: left;
  margin: -5px;
  color: #000;
  font-size: 16px;
  font-weight: 600;
}

.background-image {
  height: 256px;
  width: 100%;
  background: linear-gradient(
      to bottom,
      rgb(18, 57, 102),
      rgba(28, 36, 62, 0.73)
    ),
    url('../../assets/images/swap/background.png');
}
.rules-image-column {
  img {
    width: 70px;
  }
}
.rules-image-column {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 177px;
}

.rules-image {
  cursor: pointer;
  position: relative;
  right: 0;
  width: 18px;
  float: right;
  padding: 15px;
  border: 1px solid #ffe0e0;
  border-radius: 50%;
  height: 24px;
  background-image: url('../../assets/images/swap/arrows.png');
  background-position: center;
  background-repeat: no-repeat;
}

.main-background {
  background-image: url('../../assets/images/swap/backgroundImg.png');
}

.main-card {
  text-align: start;
  z-index: 5;
  width: 500px;
  box-shadow: 0 0 30px #00000021;
  opacity: 1;
}

.main-card-mobile {
  text-align: start;
  z-index: 5;
  width: 100%;
  // margin-top: 10%;
  // margin-bottom: 10%;
  box-shadow: 0 0 30px #00000021;
  border-radius: 3px;
  opacity: 1;
}

.Selling-field > label {
  position: absolute;
  top: 0;
  width: 120px;
  line-height: 2;
  padding: 0px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #2d99ce;
}

.Selling-field > input {
  width: 100%;
  height: 47px;
  font-size: 18px;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 16px 10px 3px 10px;
  border: 1px solid #c8c8c8;
}

::v-deep .ant-form-item {
  margin-bottom: 0 !important;
}

.col-center {
  height: 570px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

::v-deep .ant-select-selection--single {
  height: 100% !important;
}

::v-deep .ant-select {
  height: 46px;
}

.swap-container {
  display: flex;
}

.card-container {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
}

::v-deep .ant-card {
  border-radius: 11px;
  border: 1px solid #e4e4e4;
  margin: 0px 20px;
}

::v-deep .ant-card-body {
}

.first-row {
  width: 100%;
  max-height: 356px;
  padding: 24px !important;
  text-align: left;
  border-radius: 11px;
  border: none;
  box-shadow: none !important;
}

.first-row-mobile {
  width: 100%;
  height: 356px;
  text-align: left;
}

.Selling-field {
}

.swap-start-button {
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  background: #90dafe 0 0 no-repeat padding-box;
  opacity: 1;
}

.second-row {
  width: 50%;
  height: 356px;
  text-align: center;
}

.second-row-mobile {
  margin-top: 20px;
  width: 100%;
  height: 356px;
  text-align: center;
}

.second-row-title {
  font-size: 26px;
  opacity: 1;
  color: #fff;
  text-align: left;
  font-weight: bold;
  letter-spacing: 0;
}

::v-deep .ant-select-lg {
  font-size: 19px !important;
  font-weight: bold;
}

.second-row-text {
  margin-top: 21px;
  text-align: left;
  color: #fff;
  font-size: 17px;
  max-width: 550px;
  opacity: 1;
}

.centered {
  color: #fff;
  font-size: 45px;
  /* transform: translate(-50%, -50%); */
  font-family: Roboto-Regular;
  text-align: left;
  margin-bottom: 30px;
}

.btc-dropdown .ant-select-selection__rendered {
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  display: block;
  background: #f2f2f2 !important;
  margin: 0 !important;
  padding: 0 10px !important;
  width: 100% !important;
}

.ant-select-lg .ant-select-selection--single {
  height: 42px;
}

.select-text {
  font-size: 19px;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .swap-container {
    display: flex;
    flex-direction: column;
  }

  .ant-card {
    width: auto;
    border-radius: 11px;
    border: 1px solid #e4e4e4;
    margin: 0px 20px;
  }
  .card-col-2 {
    margin: 0 20px;
  }

  .first-row-mobile {
    width: 100%;
    height: 264px;
    text-align: left;
  }
}
</style>

<style scoped>
.swap-start-button:hover {
  background: #90dafe 0 0 no-repeat padding-box !important;
  color: white !important;
}

.tooltip1 {
  margin-top: 5px;
}
</style>
