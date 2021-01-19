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
      class="Roboto-Medium"
      :columns="columns"
      :row-key="(record, index) => index"
      :data-source="historyData"
      :loading="loading"
      @change="handleTableChange"
      :pagination="false"
      :expandIconColumnIndex="5"
      :expandIconAsCell="false"
    >
      <span slot="asset" slot-scope="Asset, record">
        <img
          height="20"
          :src="require(`~/assets/icons/${Asset.toLowerCase()}.svg`)"
          style="margin-bottom: 2px"
          alt
        />
        {{ Asset }}
        <u>{{ record['Asset'] }}</u>
      </span>

      <span slot="status" slot-scope="Status"> {{ Status }} </span>

      <span slot="time" slot-scope="DateTime">
        {{ getTime(DateTime) }}
      </span>

      <span class="exp-row" slot="expandedRowRender" slot-scope="record">
        <div>
          {{ $t('fiat_wallete_withdraw_order_id') }} {{ record.Identifier }}
        </div>
        <div v-if="record.AddressTag">Tag Adresi: {{ record.AddressTag }}</div>
      </span>
    </a-table>
  </a-col>
</template>

<script>
export default {
  name: 'FiatWalletHistory',

  props: {
    historyData: {
      type: Array,
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
  }),

  beforeMount() {
    this.columns = [
      {
        title: this.$t('main_wallet_asset'),
        dataIndex: 'Asset',
        width: '15%',
        scopedSlots: { customRender: 'asset' },
      },
      {
        title: this.$t('main_wallet_status'),
        dataIndex: 'status',
        width: '10%',
        scopedSlots: { customRender: 'status' },
      },
      {
        title: this.$t('main_wallet_amount'),
        dataIndex: 'Amount',
        width: '10%',
      },
      {
        title: this.$t('main_wallet_address'),
        dataIndex: 'From',
        width: '35%',
      },
      {
        title: this.$t('main_wallet_date'),
        dataIndex: 'DateTime',
        width: '25%',
        scopedSlots: { customRender: 'time' },
      },
      {
        title: '',
        dataIndex: '',
        width: '5%',
      },
    ]
  },

  methods: {
    handleTableChange(pagination, filters, sorter) {},

    getTime(val) {
      return new Date(val).toUTCString()
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
