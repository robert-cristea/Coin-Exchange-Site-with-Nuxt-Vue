<template>
  <div class="history">
    <h1>{{ $t('history_title') }}</h1>

    <div class="table-grid">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" v-bind:tab="$t('history_tab_withdraw')">
          <div class="with-drawal">
            <a-tabs default-active-key="1">
              <a-tab-pane key="1" v-bind:tab="$t('history_tab_mainwallet')">
                <div class="input-row">
                  <div class="inputs">
                    <div class="single-input">
                      <label for="akar">{{ $t('history_type') }}</label>
                      <a-select
                        v-bind:default-value="$t('history_text_deposit')"
                        style="width: 120px"
                        class="select"
                        id="akar"
                        @change="getReleventHistory"
                      >
                        <a-select-option value="depozito">{{
                          $t('history_text_deposit')
                        }}</a-select-option>
                        <a-select-option value="withdraw">{{
                          $t('history_text_withdraw')
                        }}</a-select-option>
                      </a-select>
                    </div>
                  </div>
                </div>
                <a-table
                  v-if="!isMobile"
                  :columns="columnsWithdrawal"
                  :row-key="(record, index) => index"
                  :loading="loading"
                  :data-source="dataRelevant"
                  :pagination="paginationRelevant"
                  :expandIconColumnIndex="5"
                  :expandIconAsCell="false"
                >
                  <span
                    style="display: flex"
                    slot="Asset"
                    slot-scope="Asset, record"
                  >
                    <img
                      height="20"
                      :src="
                        require(`~/assets/icons/${Asset.toLowerCase()}.svg`)
                      "
                      style="margin-bottom: 2px; margin-right: 2px"
                      alt
                    />
                    {{ Asset }}
                    <u style="margin-left: 5px">{{ record['AssetName'] }}</u>
                  </span>
                  <template
                    slot="Address"
                    slot-scope="Address, TxId, AddressTag"
                  >
                    <span>{{ Address }}</span>
                    <!-- <a-popover title="Not">
                      <template slot="content">
                        {{ TxId.TxId }}
                        {{ AddressTag }}
                      </template>
                      <a-button type="primary">
                        Dahili
                      </a-button>
                    </a-popover>-->
                  </template>
                  <p
                    slot="expandedRowRender"
                    class="history-expanded-row"
                    slot-scope="Address"
                  >
                    <span class="history-item-title">TxID:</span>
                    {{ Address.TxId }} {{ Address.AddressTag }}
                  </p>
                </a-table>
                <div v-if="isMobile">
                  <div
                    v-for="(item, idx) in dataRelevant"
                    :key="idx"
                    class="mobile-dataDisplay"
                  >
                    <div class="data-grid">
                      <span class="label">{{ $t('main_wallet_asset') }}</span>
                      <span class="data">
                        <img
                          height="20"
                          :src="
                            require(`~/assets/icons/${item.Asset.toLowerCase()}.svg`)
                          "
                          style="margin-bottom: 2px"
                          alt
                        />
                        {{ item.Asset }}
                        <u>{{ item['AssetName'] }}</u>
                      </span>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('history_status') }}</span>
                      <a-tag color="green">{{ item.Status }}</a-tag>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('history_amount') }}</span>
                      <span class="data">{{ item.Amount }}</span>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('history_address') }}</span>
                      <span class="data data_overflow" :title="item.Address">
                        {{ item.Address }}
                      </span>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('history_date') }}</span>
                      <span class="data">{{ item.CreatedOn }}</span>
                    </div>
                    <div class="data-grid">
                      <span class="label">TxID</span>
                      <span class="data" :title="item.TxId">
                        {{
                          item['TxId']
                            ? item['TxId']
                            : item['TxHash']
                            ? item['TxHash']
                            : 'Not available'
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="pagination">
                    <a-pagination
                      v-show="showPagination"
                      v-model="paginationRelevant.current"
                      :total="paginationRelevant.total"
                      :page-size="paginationRelevant.pageSize"
                      @change="
                        getWithdrawHistory(
                          paginationRelevant.current - 1,
                          paginationRelevant.pageSize
                        )
                      "
                    />
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane
                key="2"
                v-bind:tab="$t('history_tab_trywallet')"
                force-render
              >
                <div class="input-row">
                  <div class="inputs">
                    <div class="single-input">
                      <label for="akar">{{ $t('history_type') }}</label>
                      <a-select
                        v-bind:default-value="$t('history_text_deposit')"
                        style="width: 120px"
                        class="select"
                        id="akar"
                        @change="getReleventFiatHistory"
                      >
                        <a-select-option value="fiatdeposit">{{
                          $t('history_text_deposit')
                        }}</a-select-option>
                        <a-select-option value="fiatwithdraw">{{
                          $t('history_text_withdraw')
                        }}</a-select-option>
                      </a-select>
                    </div>
                  </div>
                </div>
                <a-table
                  v-if="!isMobile"
                  :columns="columnsFiatWithdrawal"
                  :row-key="(record, index) => index"
                  :data-source="dataFiatRelevant"
                  :loading="loading"
                  :pagination="paginationRelevant"
                >
                  <template
                    slot="Address"
                    slot-scope="Address, TxId, AddressTag"
                  >
                    <span>{{ $t('main_wallet_address') }}: {{ Address }}</span>
                    <!-- <a-popover title="Not">
                      <template slot="content">
                        {{ TxId.TxId }}
                        {{ AddressTag }}
                      </template>
                      <a-button type="primary">
                        Dahili
                      </a-button>
                    </a-popover>-->
                  </template>
                </a-table>
                <template v-if="isMobile">
                  <div
                    v-for="(item, idx) in dataFiatRelevant"
                    :key="idx"
                    class="mobile-dataDisplay"
                  >
                    <div class="data-grid">
                      <span class="label">{{ $t('main_wallet_asset') }}</span>
                      <span class="data">
                        <img
                          height="20"
                          :src="
                            require(`~/assets/icons/${item.Asset.toLowerCase()}.svg`)
                          "
                          style="margin-bottom: 2px"
                          alt
                        />
                        {{ item.Asset }}
                        <u>{{ item['AssetName'] }}</u>
                      </span>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('main_wallet_amount') }}</span>
                      <span class="data">{{ item.Amount }}</span>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('main_wallet_date') }}</span>
                      <span class="data">{{ item.DateTime }}</span>
                    </div>
                    <div class="data-grid">
                      <span class="label">{{ $t('history_text_info') }}</span>
                      <span class="data" :title="item.Type">
                        {{ item.Type }}
                      </span>
                    </div>
                    <div class="data-grid">
                      <span class="label">IBAN</span>
                      <span class="data" :title="item.To">{{ item.To }}</span>
                    </div>
                  </div>
                </template>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Transfer" force-render>
          <div class="with-drawal">
            <div class="input-row">
              <div class="inputs">
                <div class="single-input">
                  <label for="akar">{{ $t('history_text_from') }}</label>
                  <a-select
                    v-bind:default-value="$t('history_text_from')"
                    style="width: 120px"
                    :value="
                      transferListSearch.fromValue === 'ALL'
                        ? $t('history_transfer_list_all')
                        : transferListSearch.fromValue
                    "
                    @change="handleChangeFrom"
                    class="select"
                    id="akar"
                  >
                    <a-select-option
                      v-for="val in fromToDropdownContent"
                      :value="val"
                      :key="val"
                      >{{ val }}</a-select-option
                    >
                  </a-select>
                </div>
                <img
                  @click="handleSwitch"
                  src="~/assets/images/switch.svg"
                  class="switch-icon"
                  height="32"
                />
                <div class="single-input">
                  <label for="Unit">{{ $t('history_text_to') }}</label>
                  <a-select
                    v-bind:default-value="$t('history_text_to')"
                    style="width: 120px"
                    class="select"
                    :value="
                      transferListSearch.toValue === 'ALL'
                        ? $t('history_transfer_list_all')
                        : transferListSearch.toValue
                    "
                    @change="handleChangeTo"
                    id="unit"
                  >
                    <a-select-option
                      v-for="val in fromToDropdownContent"
                      :value="val"
                      :key="val"
                      >{{ val }}</a-select-option
                    >
                  </a-select>
                </div>
                <div class="single-input">
                  <label for="status">{{ $t('main_wallet_asset') }}</label>
                  <a-select
                    v-bind:default-value="$t('history_text_to')"
                    style="width: 120px"
                    :value="transferListSearch.unitValue"
                    @change="handleChangeUnit"
                    class="select"
                    id="unit"
                  >
                    <a-select-option
                      v-for="val in unitDromDownContent"
                      :value="val"
                      :key="val"
                      >{{ val }}</a-select-option
                    >
                  </a-select>
                </div>
              </div>
              <div class="buttons">
                <button class="button reset" @click="searchTransfer(false)">
                  {{ $t('history_text_reset') }}
                </button>
                <button class="button search" @click="searchTransfer(true)">
                  {{ $t('history_text_search') }}
                </button>
              </div>
            </div>
            <a-table
              v-if="!isMobile"
              :columns="columnsTranfer"
              :row-key="(record, index) => index"
              :data-source="dataTransfer"
              :pagination="pagination"
              @change="handleTableChange"
            ></a-table>
            <template v-if="isMobile">
              <div
                v-for="(item, idx) in dataTransfer"
                :key="idx"
                class="mobile-dataDisplay"
              >
                <div class="data-grid">
                  <span class="label">{{ $t('main_wallet_asset') }}</span>
                  <span class="data">
                    <img
                      height="20"
                      :src="
                        require(`~/assets/icons/${item.Asset.toLowerCase()}.svg`)
                      "
                      style="margin-bottom: 2px"
                      alt
                    />
                    {{ item.Asset }}
                    <u>{{ item['AssetName'] }}</u>
                  </span>
                </div>
                <div class="data-grid">
                  <span class="label">{{ $t('main_wallet_date') }}</span>
                  <span class="data">{{ item.CreatedOn }}</span>
                </div>

                <div class="data-grid">
                  <span class="label">{{ $t('history_amount') }}</span>
                  <span class="data">{{ item.Amount }}</span>
                </div>
                <div class="data-grid">
                  <span class="label">{{ $t('history_text_from') }}</span>
                  <span class="data">{{ item.From }}</span>
                </div>
                <div class="data-grid">
                  <span class="label">{{ $t('history_text_to') }}</span>
                  <span class="data">{{ item.To }}</span>
                </div>
              </div>
              <div class="pagination">
                <a-pagination
                  v-model="pagination.current"
                  showLessItems
                  :total="pagination.total"
                  :page-size="pagination.pageSize"
                  @change="handleTableChange_mobile"
                />
              </div>
            </template>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
const columnsWithdrawal = [
  {
    title: 'Birim',
    dataIndex: 'Asset',
    key: 'Asset',
    width: '10%',
    scopedSlots: {
      customRender: 'Asset',
    },
  },
  {
    title: 'Durum',
    dataIndex: 'Status',
    key: 'Status',
    width: '15%',
    scopedSlots: {
      customRender: 'Status',
    },
  },
  {
    title: 'Miktar',
    dataIndex: 'Amount',
    key: 'Amount',
    width: '10%',
    scopedSlots: {
      customRender: 'Amount',
    },
  },
  {
    title: 'Adres',
    dataIndex: 'Address',
    key: 'Address',
    class: 'date',

    scopedSlots: {
      customRender: 'Address',
    },
  },
  {
    title: 'Tarih',
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',

    width: '20%',
    scopedSlots: {
      customRender: 'CreatedOn',
    },
  },
  {
    title: '',
    dataIndex: '',
    key: '',
    class: '',

    scopedSlots: {
      customRender: '',
    },
  },
]
const columnsFiatWithdrawal = [
  {
    title: 'Tarih',
    dataIndex: 'DateTime',
    key: 'DateTime',

    width: '15%',
    scopedSlots: {
      customRender: 'DateTime',
    },
  },
  {
    title: 'Birim',
    dataIndex: 'Asset',
    key: 'Asset',
    width: '18%',

    scopedSlots: {
      customRender: 'Asset',
    },
  },
  {
    title: 'Miktar',
    dataIndex: 'Amount',
    key: 'Amount',
    width: '18%',

    scopedSlots: {
      customRender: 'Amount',
    },
  },
  {
    title: 'Hesap Numarası',
    dataIndex: 'To',
    key: 'To',
    width: '10%',

    scopedSlots: {
      customRender: 'To',
    },
  },
  {
    title: 'Durum',
    dataIndex: 'Status',
    key: 'Status',
    width: '10%',

    scopedSlots: {
      customRender: 'Status',
    },
  },
]
const columnsTranfer = [
  {
    title: 'Nereden',
    dataIndex: 'From',
    key: 'From',

    scopedSlots: {
      customRender: 'From',
    },
  },
  {
    title: 'Nereye',
    dataIndex: 'To',
    key: 'To',

    scopedSlots: {
      customRender: 'To',
    },
  },
  {
    title: 'Miktar',
    dataIndex: 'Amount',
    key: 'Amount',

    scopedSlots: {
      customRender: 'Amount',
    },
  },
  {
    title: 'Birim',
    dataIndex: 'Asset',
    key: 'Asset',

    scopedSlots: {
      customRender: 'Asset',
    },
  },
  {
    title: 'Tarih',
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    class: 'date',
    scopedSlots: {
      customRender: 'CreatedOn',
    },
  },
]
export default {
  name: 'Price',
  data() {
    return {
      dataRelevant: [],
      dataFiatRelevant: [],
      dataTransfer: [],
      originalData: [],
      pagination: {
        pageSize: 15,
        total: 200,
        current: 1,
      },
      paginationRelevant: {
        pageSize: 10,
        total: 10,
        current: 1,
      },
      deneme: {},

      fromToDropdownContent: [],
      unitDromDownContent: [],
      transferListSearch: {
        fromValue: 'ALL',
        toValue: 'ALL',
        unitValue: '',
      },

      alert: false,
      searchInput: null,
      loading: false,
      totalSpotBalanceInBtc: 0,
      columnsTranfer,
      columnsWithdrawal,
      isMobile: false,
      activeKey: ['1'],
      columnsFiatWithdrawal,
      showPagination: false,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

    this.getDepositHistory()
    this.getDropdownContent()
    this.getTransferHistory()
    this.getFiatDepositHistory()
  },

  methods: {
    handleTableChange(pagination) {
      this.getTransferHistory(
        this.transferListSearch.unitValue,
        this.transferListSearch.fromValue,
        this.transferListSearch.toValue,
        pagination.current - 1,
        pagination.pageSize
      )
    },
    handleTableChange_mobile(current, size) {
      this.getTransferHistory(
        this.transferListSearch.unitValue,
        this.transferListSearch.fromValue,
        this.transferListSearch.toValue,
        current - 1,
        size
      )
    },
    customExpandIcon(props) {
      if (props.expanded) {
        return (
          <a
            style={{ color: 'black' }}
            onClick={(e) => {
              props.onExpand(props.record, e)
            }}
          >
            <Icon type="minus" />
          </a>
        )
      } else {
        return (
          <a
            style={{ color: 'black' }}
            onClick={(e) => {
              props.onExpand(props.record, e)
            }}
          >
            <Icon type="plus" />
          </a>
        )
      }
    },
    searchTransfer(isSearch) {
      // if (this.transferListSearch.toValue) {
      //   this.alert = true
      //   setTimeout(() => {
      //     this.alert = false
      //   }, 3000)
      // } else {

      // }
      if (isSearch) {
        this.getTransferHistory(
          this.transferListSearch.unitValue,
          this.transferListSearch.fromValue,
          this.transferListSearch.toValue,
          this.pagination.current - 1,
          this.pagination.pageSize
        )
      } else {
        this.transferListSearch = {
          fromValue: 'ALL',
          toValue: 'ALL',
          unitValue: '',
        }
        this.getTransferHistory()
      }
    },

    searchCoin() {
      let filteredData = this.data.filter((element) =>
        element.asset.toLowerCase().includes(this.searchInput.toLowerCase())
      )
      this.data = this.searchInput === '' ? this.originalData : filteredData
    },
    handleChangeFrom(e) {
      this.transferListSearch.fromValue = e
    },

    handleChangeTo(e) {
      this.transferListSearch.toValue = e
    },
    handleChangeUnit(e) {
      this.transferListSearch.unitValue = e
    },
    handleSwitch() {
      ;[this.transferListSearch.fromValue, this.transferListSearch.toValue] = [
        this.transferListSearch.toValue,
        this.transferListSearch.fromValue,
      ]
    },
    getReleventHistory(e) {
      switch (e) {
        case 'depozito':
          this.showPagination = false
          this.getDepositHistory()
          break
        case 'withdraw':
          this.showPagination = true
          this.getWithdrawHistory(
            this.paginationRelevant.current - 1,
            this.paginationRelevant.pageSize
          )
          break

        default:
          break
      }
    },
    getReleventFiatHistory(e) {
      switch (e) {
        case 'fiatwithdraw':
          this.getFiatWithdrawHistory()

          break
        case 'fiatdeposit':
          this.getFiatDepositHistory(
            this.paginationRelevant.current - 1,
            this.paginationRelevant.pageSize
          )
          break
        default:
          break
      }
    },
    async getDepositHistory() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL + '/GetDepositHistory',
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          this.loading = false
          this.dataRelevant = response.data.DepositHistory

          // this.originalData = response.data.UserSpotBalance
          // this.totalSpotBalanceInBtc = response.data.TotalSpotBalanceInBtc
        }
      } catch (e) {}
    },
    async getWithdrawHistory(offset = 0, RowSize = 10) {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL +
            `/GetWithdrawHistory?Offset=${offset}&RowSize=${RowSize}`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          this.paginationRelevant.total = response.data.Max
          this.paginationRelevant.current = offset + 1

          this.dataRelevant = response.data.WithdrawRecordList
        }
      } catch (e) {}
    },
    async getFiatWithdrawHistory() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL + `/GetFiatWalletWithdrawHistory`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          this.dataFiatRelevant = response.data.FiatWalletWithdraw
        }
      } catch (e) {}
    },
    async getFiatDepositHistory(offset = 0, RowSize = 10) {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL +
            `/GetUserFiatWalletDepositPage?Offset=${offset}&RowSize=${RowSize}`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          this.paginationRelevant.total = response.data.Max
          this.paginationRelevant.current = offset + 1

          this.dataFiatRelevant = response.data.FiatDepositList
        }
      } catch (e) {}
    },
    async getTransferHistory(
      asset = '',
      from = 'ALL',
      to = 'ALL',
      offset = 0,
      RowSize = 15
    ) {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL +
            `/GetTransferHistory?Asset=${asset}&From=${from}&To=${to}&Offset=${offset}&RowSize=${RowSize}`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          // TODO: response.data['Message']
          this.dataTransfer = response.data.TransferHistory
          this.pagination.total = response.data.Max
          this.pagination.current = offset + 1
        }
      } catch (e) {}
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
          this.unitDromDownContent = response.data.AssetList.map(
            ({ Name }) => Name
          )

          // this.originalData = response.data.UserSpotBalance
          // this.totalSpotBalanceInBtc = response.data.TotalSpotBalanceInBtc
        }
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/main.scss';
.select {
  @media (max-width: 1000px) {
    width: 250px !important;
  }
}
.history {
  padding: 25px 0 0 24px;
}
.breadcrumb {
  padding-bottom: 58px;
  font-size: 12px;
}

.mobile-dataDisplay {
  display: flex;
  flex-direction: column;
  min-height: 120px;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
  .data {
    max-width: 75%;
    &_overflow {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .ant-tag {
    margin-right: 0;
  }
  .data-grid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3px;

    .label {
      font-family: Roboto-Bold;
    }
  }
}

.table-grid {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 80vw;
  height: 1150px;
  padding: 20px;
  background: white;
  @media (max-width: 1000px) {
    width: 100%;
    max-width: none;
    height: 100%;
  }
}

.switch-icon {
  align-self: flex-end;
  margin: 0 10px;
  cursor: pointer;
  @media (max-width: 1000px) {
    align-self: center;
    margin-top: 15px;
  }
}
.type-row {
  display: flex;
  flex-direction: row;
  justify-content: se-between;
  align-items: center;
  margin-bottom: 26px;

  .export {
    color: #292b31;
    text-decoration: none;
    cursor: pointer;

    justify-self: flex-end;
    &:hover {
      text-decoration: underline;
    }
  }
}

.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
  .inputs {
    display: flex;
    @media (max-width: 1000px) {
      flex-direction: column;
      justify-content: center;
    }
    .single-input {
      display: flex;
      flex-direction: column;
      margin-right: 15px;
      @media (max-width: 1000px) {
        margin-top: 15px;
      }
    }
  }
  .buttons {
    align-self: flex-end;
    @media (max-width: 1000px) {
      align-self: center;
      margin-top: 30px;
    }
    .button {
      width: 88px;
      height: 32px;
      background: #fff 0 0 no-repeat padding-box;
      &.reset {
        border: 1px solid #eaecef;
        border-radius: 3px;
      }
      &.search {
        color: #1ba4e8;
        border: 1px solid #1ba4e8;
        border-radius: 3px;
      }
    }
  }
}
.with-drawal {
  display: flex;
  flex-direction: column;
}
.date {
  span {
    font-weight: 500;
  }
}
.history-expanded-row {
  margin-right: 214px;
  margin-bottom: 0;
  font-weight: 500;
  text-align: right;
}
.history-item-title {
  display: inline-block;
  width: 90px;
  text-align: left;
}
</style>

<style scoped>
.pagination {
  text-align: center;
  padding: 12px;
}
</style>
