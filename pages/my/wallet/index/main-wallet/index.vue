<template>
  <div class="price">
    <h1>{{ $t('main_wallet_label') }}</h1>

    <div class="total">
      <div class="left-total">
        <p>{{ $t('main_wallet_approximate_balance') }}</p>

        <div class="left-total-bottom">
          <p class="amount">
            <span v-if="isSecret">{{ secret }}</span>
            <span v-else>{{ totalSpotBalanceInBtc.toFixed(8) }}</span>
          </p>
          <p class="type">BTC</p>
          <p class="equals">
            &#8776;₺
            <span v-if="isSecret">{{ secret }}</span>
            <span v-else>{{ totalSpotBalanceInTL.toFixed(8) }}</span>
          </p>
          <a-button @click="changeSecret">
            <img
              src="~/assets/images/eye.svg"
              width="15"
              style="margin-right: 5px"
            />
            <span v-if="isSecret">{{ $t('text_show_balance') }}</span>
            <span v-else>{{ $t('text_hide_balance') }}</span>
          </a-button>
        </div>
      </div>
      <div class="right-total">
        <nuxt-link :to="localePath('/my/wallet/main-wallet/deposit/BTC')">
          <button
            class="deposit-button bg-blue pointer"
            v-on:click="SET_CURRENT_TAB('MainWalletDeposit')"
          >
            {{ $t('main_text_deposit') }}
          </button>
        </nuxt-link>

        <nuxt-link :to="localePath('/my/wallet/main-wallet/withdraw/BTC')">
          <button
            class="deposit-button pointer"
            v-on:click="SET_CURRENT_TAB('MainWalletWithdraw')"
          >
            {{ $t('main_text_withdraw') }}
          </button>
        </nuxt-link>
        <button class="deposit-button pointer" @click="showModal">
          {{ $t('main_wallet_transfer') }}
          <img src="../../../../../assets/images/transfer.svg" alt />
        </button>

        <div>
          <a href="/my/wallet/history">{{ $t('main_wallet_history') }}</a>
        </div>

        <a-modal
          style="position: relative"
          v-model="visible"
          size="small"
          :width="464"
          @ok="handleOk"
          :mask-style="{ background: '#242631', opacity: '0.9' }"
          :body-style="{
            padding: '32px',
            borderBottomRightRadius: '20px',
            borderBottomLeftRadius: '20px',
          }"
          :footer="null"
        >
          <div slot="title">
            <h4 class="m-0 Roboto-Medium">{{ $t('text_transfer') }}</h4>
          </div>

          <div slot="closeIcon" class="close-icon-transfer">
            <a-icon type="close"></a-icon>
          </div>
          <TransferPopUp />
        </a-modal>
      </div>
    </div>

    <div class="table-grid">
      <div class="search">
        <a-input
          class="search-input"
          v-ant-ref="(c) => (searchInput = c ? c.stateValue : null)"
          @change="onInputChange"
          @pressEnter="searchCoin"
          v-bind:placeholder="$t('price_search')"
        />
        <a-checkbox @change="hideZeroBalance = !hideZeroBalance">
          <span v-if="this.hideZeroBalance">{{
            $t('text_show_low_balances')
          }}</span>
          <span v-else>{{ $t('text_hide_low_balances') }}</span>
        </a-checkbox>
        <!-- <a-button
          @click="searchCoin"
          style="padding: 0 10px"
          type="primary"
          class="search-ara"
          >Ara</a-button
        >
        <a class="search-reset-coin" @click="resetCoin"> Sıfırla </a>-->
      </div>

      <a-table
        :columns="isMobile ? mobileColumns : columns"
        :row-key="(record, index) => index"
        :pagination="pagination"
        :data-source="mainWalletData"
        :loading="loading"
        @change="handleTableChange"
        class="table"
      >
        <template slot="asset" slot-scope="asset, Name">
          <div class="name-slot">
            <img
              width="20"
              height="20"
              :src="require(`~/assets/icons/${Name.asset.toLowerCase()}.svg`)"
              :alt="Name.asset.toLowerCase()"
            />
            <span>{{ asset }}</span>
            <a>{{ Name.Name }}</a>
          </div>
        </template>
        <template slot="locked" slot-scope="locked">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ locked.toFixed(8) }}</span>
        </template>
        <template slot="free" slot-scope="free">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ free.toFixed(8) }}</span>
        </template>
        <template slot="TotalQty" slot-scope="TotalQty">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ TotalQty.toFixed(8) }}</span>
        </template>
        <template slot="BtcQty" slot-scope="BtcQty">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ BtcQty.toFixed(8) }}</span>
        </template>
        <template
          slot="actions"
          class="action-buttons"
          slot-scope="asset, Name"
        >
          <nuxt-link
            :to="localePath('/my/wallet/main-wallet/deposit/' + Name.asset)"
            >{{ $t('main_wallet_deposit') }}</nuxt-link
          >
          <nuxt-link
            :to="localePath('/my/wallet/main-wallet/withdraw/' + Name.asset)"
            >{{ $t('main_wallet_withdraw') }}</nuxt-link
          >
          <nuxt-link
            v-if="Name.asset === 'BTC' || Name.asset === 'USDT'"
            :to="localePath('/trade/BTC_USDT')"
            >{{ $t('main_wallet_trade') }}</nuxt-link
          >
          <nuxt-link v-else :to="localePath('/trade/' + Name.asset + '_BTC')">{{
            $t('main_wallet_trade')
          }}</nuxt-link>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'Price',
  head() {
    return {
      title: this.$t('title_text_main_wallet'),
    }
  },
  components: {
    TransferPopUp: () => import('@/components/Wallet/TransferPopUp'),
  },
  data() {
    return {
      data: [],
      originalData: [],
      pagination: {
        pageSize: 17,
      },
      searchInput: null,
      loading: false,
      totalSpotBalanceInBtc: 0,
      totalSpotBalanceInTL: 0,
      isMobile,
      visible: false,
      isSecret: false,
      secret: '*******',
      hideZeroBalance: false,
      columns: [
        {
          title: this.$t('main_wallet_asset'),
          dataIndex: 'asset',
          key: 'asset',

          width: '20%',
          scopedSlots: {
            customRender: 'asset',
          },
        },
        {
          title: this.$t('main_wallet_text_available'),
          dataIndex: 'free',
          key: 'free',
          width: '15%',

          scopedSlots: {
            customRender: 'free',
          },
        },
        {
          title: this.$t('main_wallet_text_used'),
          dataIndex: 'locked',
          key: 'locked',
          width: '15%',

          scopedSlots: {
            customRender: 'locked',
          },
        },
        {
          title: this.$t('main_wallet_text_total'),
          dataIndex: 'TotalQty',
          key: 'TotalQty',
          width: '15%',

          scopedSlots: {
            customRender: 'TotalQty',
          },
        },
        {
          title: this.$t('main_wallet_text_btc_amount'),
          dataIndex: 'BtcQty',
          key: 'BtcQty',
          width: '15%',

          scopedSlots: {
            customRender: 'BtcQty',
          },
        },
        {
          title: '',
          dataIndex: 'actions',
          key: 'actions',
          class: 'action-header',
          className: 'action-buttons',
          scopedSlots: { customRender: 'actions' },
        },
      ],
      mobileColumns: [
        {
          title: this.$t('main_wallet_asset'),
          dataIndex: 'asset',
          key: 'asset',

          width: '20%',
          scopedSlots: {
            customRender: 'asset',
          },
        },

        {
          title: this.$t('main_wallet_text_total'),
          dataIndex: 'TotalQty',
          key: 'TotalQty',
          width: '15%',

          scopedSlots: {
            customRender: 'TotalQty',
          },
        },
      ],
    }
  },
  mounted() {
    this.asyncData()
  },
  methods: {
    changeSecret() {
      this.isSecret = !this.isSecret
    },
    ...mapMutations({
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
    }),
    showModal() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
    },

    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loading = false
    },
    onInputChange(e) {
      const searchWord = e.target.value.toLowerCase()
      this.data = this.originalData.filter((item) =>
        item.asset.toLowerCase().includes(searchWord.toLowerCase())
      )
    },
    onChange() {
      if (this.hideZeroBalance) {
        let filteredData = this.data.filter((element) => element.free !== 0)
        this.data = filteredData
        this.hideZeroBalance = false
      } else {
        this.data = this.originalData
        this.hideZeroBalance = true
      }
    },
    searchCoin() {
      let filteredData = this.data.filter((element) =>
        element.asset.toLowerCase().includes(this.searchInput.toLowerCase())
      )
      this.data = this.searchInput === '' ? this.originalData : filteredData
    },
    resetCoin() {
      this.data = this.originalData
    },

    async asyncData() {
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
          // TODO: response.data['Message']
          this.loading = false
          this.data = response.data.UserSpotBalance.sort(
            (a, b) => b.BtcQty - a.BtcQty
          )
          this.originalData = [...response.data.UserSpotBalance]
          this.totalSpotBalanceInBtc = response.data.TotalSpotBalanceInBtc
          this.totalSpotBalanceInTL = response.data.TotalSpotBalanceInTRY
        }
      } catch (e) {}
    },
  },
  computed: {
    mainWalletData() {
      if (this.hideZeroBalance) {
        return this.data.filter((element) => element.free !== 0)
      } else {
        return this.data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/main.scss';

.price {
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
}
.breadcrumb {
  font-size: 12px;
  padding-bottom: 58px;
}
.table {
  width: 80vw;

  align-self: center;
}

.deactivated {
  pointer-events: none;
  color: #bbc0c7;
}

.pointer {
  cursor: pointer;
}

.total {
  padding-top: 24px;
  padding-bottom: 24px;
  min-width: 80vw;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 3px #0000000f;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
  .left-total {
    padding: 0 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 14px;
      letter-spacing: 0px;
      color: #788191;
      margin: 0;
    }
  }
  @media (max-width: 1000px) {
    max-width: 350px;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
  }
  .left-total-bottom {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: flex-start;
    }
    button {
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #eaecef;
      border-radius: 3px;
      width: 122px;
      height: 20px;
      font-size: 12px;
      color: #212833;
      margin-bottom: 6px;
    }
    .amount {
      font-size: 32px;
      letter-spacing: -0.61px;
      color: #1e2026;
    }
    .type {
      font-size: 14px;
      letter-spacing: -0.27px;
      color: #0d0d0d;
      padding-bottom: 6px;
    }
    .equals {
      padding-bottom: 6px;
      padding-right: 16px;
    }
  }

  .right-total {
    display: flex;
    align-items: center;
    padding-right: 23px;
    flex-wrap: wrap;
    &__link {
      flex-basis: 100%;
      text-align: right;
      margin-bottom: 15px;
      padding-right: 15px;
      @media (min-width: 1000px) {
        /* flex-basis: auto; */
        /* order: 4; */
        margin-bottom: 0;
      }
    }
    .deposit-button {
      background-color: white;
      width: 96px;
      height: 32px;
      border: 1px solid #eaecef;
      border-radius: 3px;
      opacity: 1;
      font-size: 14px;
      color: #1e2026;
      margin-right: 14px;
      img {
        display: inline-block;
      }
      @media (max-width: 1000px) {
        margin-right: 5px;
      }
    }
    @media (max-width: 1000px) {
      padding-right: 0;
      padding-left: 23px;
    }
    .bg-blue {
      background: #90dafe 0% 0% no-repeat padding-box;
    }
    a {
      text-decoration: underline;
    }
  }
}

.table-grid {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 1000px) {
    max-width: 350px;
    height: 100%;
  }
  .search {
    padding: 20px 0;
  }
}
.search {
  display: flex;
  // justify-content: space-around;
  align-items: center;
  margin-left: 35px;
  .search-input {
    width: 180px;
    border: none;
    border-bottom: 1px solid #e6e8ea;
  }
  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;

    .search-ara,
    .search-reset-coin {
      display: none;
    }
  }
}

.name-slot {
  width: 100%;
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
  }
  span {
    padding-right: 5px;
  }
  a {
    text-decoration: underline;
    font-size: 14px;
    color: #788191;
  }
}
.close-icon-transfer {
  position: absolute;
  top: -40px;
  right: -30px;
  color: #c1c6cd;
}
@media screen and (max-width: 1000px) {
  .close-icon-transfer {
    top: -40px;
    right: 0;
  }
}
</style>
