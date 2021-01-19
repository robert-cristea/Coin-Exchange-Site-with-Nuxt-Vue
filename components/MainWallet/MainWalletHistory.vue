<template>
  <a-col
    offset="1"
    :span="22"
    style="
      margin-left: 40px;
      background-color: #ffffff;
      padding: 20px 20px 20px 20px;
    "
  >
    <a-col :span="24" style="text-align: start">
      <div style="font-size: 32px; color: #1c2640">{{ title }}</div>
    </a-col>
    <a-table
      class="Roboto-Medium history-table"
      :columns="columns"
      :row-key="(record, index) => index"
      :data-source="historyData"
      :loading="loading"
      @change="handleTableChange"
      @expand="onExpandRow"
      :expandIcon="expandIcon"
      :pagination="false"
      :expandIconColumnIndex="5"
      :expandIconAsCell="false"
      @expandedRowsChange="onExpandedRowsChange"
      :expandedRowKeys="expandedRows"
    >
      <span slot="Asset" slot-scope="Asset, record">
        <img
          height="20"
          :src="require(`~/assets/icons/${Asset.toLowerCase()}.svg`)"
          style="margin-bottom: 2px"
          alt
        />
        {{ Asset }}
        <u>{{ record['AssetName'] }}</u>
      </span>
      <span slot="Status" slot-scope="Status"> {{ Status }} </span>
      <span slot="Address" slot-scope="Address" class="break-column-data">
        {{ Address }}
      </span>

      <span slot="Time" slot-scope="record">
        <span v-if="historyType === 'DEPOSIT'">
          {{ record.CreatedOn }}
        </span>
        <span v-if="historyType === 'WITHDRAW'">
          {{ record.UpdatedOn }}
        </span>
      </span>
      <span class="exp-row" slot="expandedRowRender" slot-scope="record">
        <div v-if="historyType === 'DEPOSIT'">
          TxId: {{ record.TxId ? record.TxId : 'Not Available' }}
        </div>
        <div v-if="historyType === 'WITHDRAW'">
          TxHash: {{ record.TxHash ? record.TxHash : 'Not Available' }}
        </div>
        <div v-if="record.AddressTag">
          {{ $t('main_wallet_tag_address') }}: {{ record.AddressTag }}
        </div>
      </span>
    </a-table>
  </a-col>
</template>

<script>
export default {
  name: 'History',

  props: {
    historyData: {
      type: Array,
      required: true,
    },
    historyType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    columns: null,
    withdrawColumns: null,
    loading: false,
    expandedRows: [],
  }),

  beforeMount() {
    this.columns = [
      {
        title: this.$t('main_wallet_asset'),
        dataIndex: 'Asset',
        align: 'left',
        width: '15%',
        scopedSlots: { customRender: 'Asset' },
      },
      {
        title: this.$t('main_wallet_status'),
        dataIndex: 'Status',
        width: '10%',
        align: 'left',
        scopedSlots: { customRender: 'Status' },
      },
      {
        title: this.$t('main_wallet_amount'),
        dataIndex: 'Amount',
        width: '10%',
        align: 'left',
      },
      {
        title: this.$t('main_wallet_address'),
        dataIndex: 'Address',
        width: '35%',
        align: 'left',
        scopedSlots: { customRender: 'Address' },
      },
      {
        title: this.$t('main_wallet_date'),
        width: '25%',
        align: 'left',
        scopedSlots: { customRender: 'Time' },
      },
      {
        title: '',
        dataIndex: '',
        width: '5%',
        align: 'left',
      },
    ]
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
    },

    getTime(val) {
      return new Date(val).toUTCString()
    },
    onExpandedRowsChange(expandeds) {
      this.expandedRows = expandeds
    },
    onExpandRow(expanded, record) {
      this.expandedRows = []
      if (expanded) this.expandedRows.push(this.historyData.indexOf(record))
    },
    expandIcon(props) {
      const text = (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="6"
            viewBox="0 0 11 6"
          >
            <g
              id="Group_5807"
              data-name="Group 5807"
              transform="translate(-1839 -531)"
            >
              <path
                id="Polygon_17"
                data-name="Polygon 17"
                d="M5.5,0,11,6H0Z"
                transform="translate(1850 537) rotate(180)"
                fill="#858e9d"
              />
            </g>
          </svg>
        </span>
      )

      return (
        <a
          class="expand-row-icon"
          onClick={(e) => props.onExpand(props.record, e)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {text}
        </a>
      )
    },
  },
}
</script>

<style scoped>
.exp-row {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
}
</style>
<style>
.history-table table tbody td {
  text-align: center;
  font-size: 14px;
  letter-spacing: 0px;
  color: #3b3b3b !important;
  opacity: 1;
}
.break-column-data {
  word-break: break-all;
}
</style>
