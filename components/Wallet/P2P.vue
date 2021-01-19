<template>
  <div class="price">
    <h1>{{ $t('p2p_wallet_text') }}</h1>

    <div class="total">
      <div class="left-total">
        <p>{{ $t('p2p_wallet_text_approximate_balance') }}</p>

        <div class="left-total-bottom">
          <p class="amount">
            <span v-if="isSecret">{{ secret }}</span>
            <span v-else>{{ totalP2PBalanceInBtc.toFixed(8) }}</span>
          </p>
          <div class="d-flex w-100">
            <p class="type">BTC</p>
            <p class="equals">
              &#8776;₺
              <span v-if="isSecret">{{ secret }}</span>
              <span v-else>{{ btcInTurksihLira.toFixed(8) }}</span>
            </p>
            <div style="margin-left: auto">
              <a href="/my/wallet/history">{{ $t('price_wallet_history') }}</a>
            </div>
          </div>
          <a-button @click="changeSecret" class="hide-show-btn">
            <img
              src="~/assets/images/eye.svg"
              width="15"
              style="margin-right: 5px"
            />
            {{ $t('p2p_hide_balance') }}
          </a-button>
        </div>
      </div>
      <div class="right-total">
        <!--  Transfer Button
        <button class="deposit-button" @click="showModal">
          Transfer
          <img src="../../assets/images/transfer.svg" alt />
        </button> -->
        <a-modal
          v-model="visible"
          v-bind:title="$t('text_transfer')"
          :footer="null"
        >
          <TransferPopUp />
        </a-modal>
      </div>
    </div>

    <diV class="trust-price">
      <div class="trust-price-left">
        <span class="question-mark">
          <img width="50" src="../../assets/images/soru.svg" />
        </span>

        <div class="trust-price-info">
          <h3>{{ $t('p2p_security_balance_title') }}</h3>
          <span>{{ $t('p2p_security_balance_info') }}</span>
        </div>
      </div>
      <div class="trust-price-right">
        <div class="amount">
          {{ securityBalance }} USDT
          <img src="../../assets/images/guvenlik.svg" alt />
        </div>
        <button @click="showModalT">
          {{ $t('p2p_security_deposit_link') }}
        </button>
        <a-modal
          v-model="tVisible"
          v-bind:title="$t('p2p_security_transfer_btn')"
          :footer="null"
        >
          <TrustPricePopUp />
        </a-modal>
      </div>
    </diV>

    <div class="table-grid">
      <!-- <div class="search">
        <a-input class="search-input"
                 v-ant-ref="(c) => (searchInput = c ? c.stateValue : null)"
                 @pressEnter="searchCoin"
                 placeholder="Koin Ara" />
        <a-checkbox @change="(e) => onChange(e)">Düşük Bakiyeleri Gizle</a-checkbox>
      </div>-->

      <a-table
        v-if="!isMobile"
        :columns="columns"
        :row-key="(record, index) => index"
        :pagination="pagination"
        :data-source="data"
        :loading="loading"
        @change="handleTableChange"
        class="table p2p-table"
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
        <template slot="TotalUSD" slot-scope="TotalUSD">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ TotalUSD.toFixed(8) }}</span>
        </template>
        <template slot="BtcQty" slot-scope="BtcQty">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ BtcQty.toFixed(8) }}</span>
        </template>
        <template
          slot="actions"
          class="action-buttons"
          slot-scope="isDepositSuspended, isWithdrawSuspended"
        >
          <!-- <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >-->
          <a>Al</a>
          <a>Sat</a>

          <!-- </a-popconfirm> -->
        </template>
      </a-table>
      <a-table
        v-else
        :columns="mobileColumns"
        :row-key="(record, index) => index"
        :pagination="pagination"
        :data-source="data"
        :loading="loading"
        @change="handleTableChange"
        @expandedRowsChange="expandedRowsChange"
        :expandedRowKeys="expandedRowKeys"
        :expandIconColumnIndex="mobileColumns.length - 1"
        :expandIconAsCell="false"
        :expandIcon="expandIcon"
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
        <template slot="TotalQty" slot-scope="TotalQty">
          <span v-if="isSecret">{{ secret }}</span>
          <span v-else>{{ TotalQty.toFixed(8) }}</span>
        </template>
        <template v-slot:expandedRowRender="record">
          <div>
            <a-row type="flex">
              <a-col flex="auto">
                <span class="ant-descriptions-item-content">{{
                  innerColumns[0].title
                }}</span>
              </a-col>
              <a-col flex="150px" class="text-right">
                <span v-if="isSecret">{{ secret }}</span>
                <span v-else>{{ record.free.toFixed(8) }}</span>
              </a-col>
            </a-row>
            <a-row type="flex">
              <a-col flex="auto">
                <span class="ant-descriptions-item-content">{{
                  innerColumns[1].title
                }}</span>
              </a-col>
              <a-col flex="150px" class="text-right">
                <span v-if="isSecret">{{ secret }}</span>
                <span v-else>{{ record.locked.toFixed(8) }}</span>
              </a-col>
            </a-row>
            <a-row type="flex">
              <a-col flex="auto">
                <span class="ant-descriptions-item-content">{{
                  innerColumns[2].title
                }}</span>
              </a-col>
              <a-col flex="150px" class="text-right">
                <span v-if="isSecret">{{ secret }}</span>
                <span v-else>{{ record.BtcQty.toFixed(8) }}</span>
              </a-col>
            </a-row>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Birim',
    dataIndex: 'asset',
    key: 'asset',
    sorter: true,
    width: '20%',
    scopedSlots: {
      customRender: 'asset',
    },
  },
  {
    title: 'Kullanılabilir',
    dataIndex: 'free',
    key: 'free',
    width: '15%',
    sorter: true,
    scopedSlots: {
      customRender: 'free',
    },
  },
  {
    title: 'İşlemde',
    dataIndex: 'locked',
    key: 'locked',
    width: '15%',
    sorter: true,
    scopedSlots: {
      customRender: 'locked',
    },
  },

  {
    title: 'Toplam',
    dataIndex: 'TotalUSD',
    key: 'TotalUSD',
    width: '15%',
    sorter: true,
    scopedSlots: {
      customRender: 'TotalUSD',
    },
  },
  {
    title: 'BTC Karşılığı',
    dataIndex: 'BtcQty',
    key: 'BtcQty',
    width: '15%',
    sorter: true,
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
]

const mobileColumns = [
  {
    title: 'Birim',
    dataIndex: 'asset',
    key: 'asset',
    sorter: true,
    width: '20%',
    scopedSlots: {
      customRender: 'asset',
    },
  },

  {
    title: 'Toplam',
    dataIndex: 'TotalQty',
    key: 'TotalQty',
    width: '15%',
    sorter: true,
    scopedSlots: {
      customRender: 'TotalQty',
    },
  },
  {
    width: '20px',
    align: 'right',
  },
]
export default {
  name: 'Price',
  components: {
    TransferPopUp: () => import('@/components/Wallet/TransferPopUp'),
    TrustPricePopUp: () => import('@/components/Wallet/TrustPricePopUp'),
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
      totalP2PBalanceInBtc: 0,
      securityBalance: 0,
      btcInTurksihLira: 0,
      expandedRowKeys: [],
      columns,
      mobileColumns,
      innerColumns: [
        {
          title: 'free',
          dataIndex: 'free',
          key: 'free',
          width: '15%',

          scopedSlots: {
            customRender: 'free',
          },
        },
        {
          title: 'locked',
          dataIndex: 'locked',
          key: 'locked',
          width: '15%',

          scopedSlots: {
            customRender: 'locked',
          },
        },
        {
          title: 'BtcQty',
          dataIndex: 'BtcQty',
          key: 'BtcQty',
          width: '15%',
          scopedSlots: {
            customRender: 'BtcQty',
          },
        },
      ],
      isMobile: false,
      visible: false,
      tVisible: false,
      isSecret: false,
      secret: '*******',
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

    this.asyncData()
  },
  methods: {
    changeSecret() {
      this.isSecret = !this.isSecret
    },
    showModal() {
      this.visible = true
    },
    showModalT() {
      this.tVisible = true
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loading = false
    },
    onChange(e) {
      let isChecked = e.target.checked
      if (isChecked) {
        let filteredData = this.data.filter((element) => element.free !== 0)
        this.data = filteredData
      } else {
        this.data = this.originalData
      }
    },
    searchCoin() {
      let filteredData = this.data.filter((element) =>
        element.asset.toLowerCase().includes(this.searchInput.toLowerCase())
      )
      this.data = this.searchInput === '' ? this.originalData : filteredData
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
          this.data = response.data.UserP2PBalance
          this.originalData = response.data.UserP2PBalance
          this.totalP2PBalanceInBtc = response.data.TotalP2PBalanceInBtc
          this.securityBalance = response.data.SecurityBalance
          this.btcInTurksihLira = response.data.TotalP2PBalanceInTRY
        }
      } catch (e) {
        // if ('response' in e) {
        //   const { status } = e.response
        //   if (status == 400) {
        //     return true
        //   }
        // } else {
        //   redirect('/404')
        // }
      }
    },
    expandedRowsChange(indexes) {
      if (indexes.length) this.expandedRowKeys = [indexes.pop()]
      else this.expandedRowKeys = indexes
    },
    expandIcon(props) {
      const open = 'caret-up'
      const close = 'caret-down'
      const icon = props.expanded ? open : close

      return (
        <a-icon
          type={icon}
          class="expand-row-icon"
          onClick={(e) => props.onExpand(props.record, e)}
          style={{ cursor: 'pointer' }}
        />
      )
    },
  },
}
</script>

<style scoped>
.text-right {
  text-align: right !important;
}
</style>

<style lang="scss" scoped>
@import '~@/assets/scss/main.scss';

.price {
  padding: 25px 0 0 24px;
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
}
.breadcrumb {
  font-size: 12px;
  padding-bottom: 58px;
}
.table {
  width: 100%;
  align-self: center;
}

.deactivated {
  pointer-events: none;
  color: #bbc0c7;
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
    position: relative;
    padding: 0 22px 20px 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 14px;
      letter-spacing: 0px;
      color: #788191;
      margin: 0;
    }
    @media screen and (max-width: 767px) {
      width: 100%;
      .hide-show-btn {
        position: absolute;
        top: 0;
        right: 18px;
      }
    }
  }
  @media (max-width: 1000px) {
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
        flex-basis: auto;
        order: 4;
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

.action-header {
  height: 124px;
}
.trust-price {
  height: 103px;
  background: #fafdff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 3px #0000000f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
  padding: 0 31px;
  @media (max-width: 1000px) {
    height: 200px;
    flex-direction: column;
    justify-content: space-around;
  }
  .trust-price-left {
    display: flex;
    align-items: center;
    .question-mark {
      padding-right: 10px;
    }
    .trust-price-info {
      display: flex;
      flex-direction: column;
      h3 {
        font: normal normal medium 14px/19px;
        letter-spacing: 0px;
        color: #212833;
      }
      span {
        font: normal normal normal 12px/16px;
        letter-spacing: 0px;
        color: #212833;
      }
    }
  }
  .trust-price-right {
    display: flex;
    align-items: center;
    button {
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #9dd0e5;
      border-radius: 3px;
      width: 184px;
      height: 36px;
      margin-left: 10px;
    }
  }
}

.table-grid {
  min-width: 85vw;
  height: 1150px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .search {
    padding: 20px 0;
  }
  @media (max-width: 1000px) {
    height: 100%;
    padding-left: 24px;
  }
}
.search {
  width: 320px;
  margin-left: 35px;
  .search-input {
    width: 180px;
    border: none;
    border-bottom: 1px solid #e6e8ea;
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
</style>
