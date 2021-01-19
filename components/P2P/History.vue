<template>
  <div class="Roboto-Regular">
    <a-row>
      <a-col offset="2">
        <div class="p2p-history-title">Tüm P2P İşlem Geçm</div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="Roboto-Bold" offset="2" style="margin-top: 20px">
        <a-table
          :columns="columns"
          :data-source="data"
          class="components-table-demo-nested"
          :pagination="false"
          :rowClassName="setRowClassName"
          :rowKey="(record) => record.OTC_OrderUniqueID"
          @expand="setExpandedRowKeys"
          :expandIconColumnIndex="columns.length - 1"
          :expandedRowKeys="historyExpandedRowKeys"
          :expandIconAsCell="false"
          :expandIcon="expandIcon"
        >
          <span
            slot="Type"
            slot-scope="Type, record"
            :style="Type === 'BUY' ? 'color: #5CB56A' : 'color: #FD0D1B'"
            >{{ Type === 'BUY' ? 'Alıcı' : 'Satıcı' }}</span
          >

          <span slot="Asset" slot-scope="Asset, record"
            >{{ record.FiatPrice }} {{ record.FiatCurrency }}</span
          >

          <span slot="OTC_OrderUniqueID" slot-scope="OTC_OrderUniqueID, record">
            {{ record.OTC_OrderUniqueID }}
            <template v-if="$nuxt.$route.path.includes('P2PMarket')">
              <a-button
                type="primary"
                class="cancel-btn btn-primary-outline"
                @click="cancelButton(record.OTC_OrderUniqueID)"
                >{{ $t('p2p_cancel_btn') }}</a-button
              >
            </template>

            <template v-if="!$nuxt.$route.path.includes('P2PMarket')">
              <div v-if="record.Status === 'open'">
                <a-button
                  type="primary"
                  class="cancel-btn btn-primary-outline"
                  @click="cancelButton(record.OTC_OrderUniqueID)"
                  >{{ $t('p2p_cancel_btn') }}</a-button
                >
              </div>
            </template>
          </span>

          <template v-slot:expandedRowRender="record">
            <a-table
              class="Roboto-Medium inner-table"
              :class="{ 'table-scroll': record.OTC_RequestList.length > 3 }"
              :data-source="record.OTC_RequestList"
              :columns="innerColumns"
              :pagination="false"
            >
              <span slot="P2PRequestUsername" slot-scope="record">
                {{ record.P2PRequestUsername }}
              </span>
              <span slot="Amount" slot-scope="record">
                {{ record.Amount }}
              </span>
              <span slot="Total" slot-scope="record">
                {{ record.Total }}
              </span>
              <span slot="UpdatedOn" slot-scope="record">
                {{ record.UpdatedOn | dateFormat }}
              </span>

              <span slot="StatusLabel" slot-scope="record">
                {{ record.StatusLabel }}
              </span>

              <span
                slot="OTC_RequestUniqueID"
                slot-scope="OTC_RequestUniqueID, record"
              >
                {{ record.OTC_RequestUniqueID }}
              </span>
              <span
                slot="OTC_RequestUniqueIDLink"
                slot-scope="OTC_RequestUniqueID, record"
                class="cursor-pointer"
              >
                <nuxt-link
                  :to="
                    localeRoute(
                      `/P2PMarket/request/${record.OTC_RequestUniqueID}`
                    )
                  "
                >
                  {{ record.OTC_RequestUniqueID }}
                </nuxt-link>
              </span>
            </a-table>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import dateFormatMixin from '~/Mixins/dateFormatMixin'

import { string } from 'vue-clipboards'
const columns = [
  {
    title: 'Satıcı/Alıcı',
    dataIndex: 'Type',
    scopedSlots: { customRender: 'Type' },
    width: '10%',
    class: 'type',
  },
  { title: 'Miktar', dataIndex: 'AssetAmount', key: 'AssetAmount' },
  {
    title: 'Fiyat',
    dataIndex: 'Asset',
    key: 'Asset',
    scopedSlots: { customRender: 'Asset' },
  },
  { title: 'Kullanılabilir', dataIndex: 'Available', key: 'Available' },
  { title: 'Durum', dataIndex: 'Status' },
  {
    title: 'Talem Sayısı',
    dataIndex: 'TotalRequestNumber',
  },
  {
    title: 'İlan Numarası',
    dataIndex: 'OTC_OrderUniqueID',
    scopedSlots: { customRender: 'OTC_OrderUniqueID' },
  },
  {
    title: '',
    dataIndex: 'Action',
    width: '10%',
    align: 'center',
  },
]
const innerColumns = [
  {
    title: 'Alıcı / Satıcı',
    key: 'P2PRequestUsername',
    width: '10%',
    scopedSlots: { customRender: 'P2PRequestUsername' },
  },
  {
    title: 'Miktar',
    key: 'Amount',
    width: '10%',
    scopedSlots: { customRender: 'Amount' },
  },
  {
    title: 'Toplam',
    key: 'Total',
    width: '10%',
    scopedSlots: { customRender: 'Total' },
  },
  {
    title: 'Tarih',
    key: 'UpdatedOn',
    width: '15%',
    scopedSlots: { customRender: 'UpdatedOn' },
  },
  {
    title: 'Durum',
    key: 'StatusLabel',
    width: '15%',
    scopedSlots: { customRender: 'StatusLabel' },
  },
  {
    title: 'Talep numarasa',
    key: 'OTC_RequestUniqueID',
    scopedSlots: { customRender: 'OTC_RequestUniqueID' },
  },
  {
    title: 'Detay',
    key: 'OTC_RequestUniqueIDLink',
    scopedSlots: { customRender: 'OTC_RequestUniqueIDLink' },
  },
]

export default {
  name: 'History',
  mixins: [dateFormatMixin],
  props: {
    feild: {
      type: String,
      default: 'OpenOrderList',
    },
  },
  data: () => ({
    data: null,
    columns,
    innerColumns,
    innerData: null,
    expandedRows: [],
    historyExpandedRowKeys: [],
  }),

  async mounted() {
    await this.getP2POpenOrders()
  },
  methods: {
    async getP2POpenOrders() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetP2PMyAllOrderAndRequestList',
        { headers: authHeader }
      )
      if (response.data.Success) {
        this.data = this.restrictData(response.data[this.feild])
      }
    },

    async editP2POrder(orderUniqueId) {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.post(
        $config.FINANCE_API_URL + '/EditP2POrder',
        {
          Activate: true,
          OrderUniqueId: orderUniqueId,
        },
        { headers: authHeader }
      )
      if (response.data.Success) {
      }
    },

    async cancelButton(orderUniqueId) {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios({
        method: 'delete',
        url: this.$config.FINANCE_API_URL + '/CancelP2POrder',
        data: { OrderId: orderUniqueId },
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
          'Content-Type': 'application/json',
        },
      })
      if (response.data.Success) {
        this.openNotificationWithIcon('success', 'Success')
        this.getP2POpenOrders()
      } else {
        this.openNotificationWithIcon('error', 'Error')
      }
    },
    openNotificationWithIcon(type, msg) {
      this.$notification[type]({
        message: msg,
        description: this.errorMessage,
      })
    },

    restrictData(data) {
      let restrictedData = data.map((record) => {
        return {
          Type: record.Type_,
          AssetAmount: record.AssetAmount + ' ' + record.Asset_,
          FiatPrice: record.FiatPrice + ' ' + record.FiatCurrency,
          Available: record.Available + ' ' + record.Asset_,
          StatusLabel: record.StatusLabel,
          Status: record.Status,
          TotalRequestNumber: record.TotalRequestNumber,
          OTC_OrderUniqueID: record.OTC_OrderUniqueID,
          OTC_RequestList: record.OTC_RequestList.map((record) => {
            return {
              P2PRequestUsername: record.P2PRequestUsername,
              Amount: record.Amount + ' ' + record.Asset,
              Total: record.Total + ' ' + record.FiatCurrency,
              UpdatedOn: record.UpdatedOn,
              StatusLabel: record.StatusLabel,
              OTC_RequestUniqueID: record.OTC_RequestUniqueID,
            }
          }),
        }
      })
      return restrictedData
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
    setRowClassName(r, i) {
      let classes = this.expandedRows.includes(i)
        ? 'Roboto-Medium top'
        : 'Roboto-Medium'

      classes = classes.concat(r.Type === 'BUY' ? ' buy' : ' sell')
      return classes
    },
    setExpandedRowKeys(expanded, record) {
      if (expanded) {
        this.historyExpandedRowKeys = [record.OTC_OrderUniqueID]
      } else {
        this.historyExpandedRowKeys = []
      }
    },
  },
}
</script>

<style scoped>
.table-scroll {
  display: block;
  overflow-y: auto;
  height: 200px;
}

.cancel-btn {
  margin-left: 5px;
}

tr {
  background: #fff;
}

.ant-table-expanded-row thead tr th {
  background-color: #fff !important;
}
.inner-table {
  margin: -17px -12px !important;
  box-shadow: 0 20px 30px -5px #00000027;
}
.ant-table table {
  font-size: 12px;
}
.top {
  box-shadow: 0 0px 30px -5px #00000027;
}
.sell .type {
  color: red;
}
.buy .type {
  color: green;
}

.p2p-history-title {
  text-align: left;
  font: normal normal normal 32px Roboto;
  letter-spacing: 0;
  color: #1c2640;
  opacity: 1;
  margin-top: 20px;
}
.table-container {
  padding: 20px;
  background-color: #fff;
}
.expended-row {
  box-shadow: 0px 0px 40px #00000027;
}
</style>
