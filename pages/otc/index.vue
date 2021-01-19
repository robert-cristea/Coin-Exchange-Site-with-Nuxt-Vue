<template>
  <div class="otc">
    <div class="header">
      <h1 class="show-desktop">{{ $t('otc_text_header') }}</h1>
    </div>
    <div class="container forms">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" v-bind:tab="$t('otc_tab_c2c_text')" class="tabs">
          <c2c />
        </a-tab-pane>
        <a-tab-pane key="2" v-bind:tab="$t('otc_tab_c2f_text')" class="tabs" force-render>
          <c2f />
        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="table container">
      <h1>{{ $t('otc_order_history') }}</h1>
      <a-table
        :columns="isMobile ? mobileColumns : columns"
        :data-source="data"
      >
        <template slot="FinalInAmount" slot-scope="FinalInAmount, InAsset">{{
          FinalInAmount + ' ' + InAsset.InAsset
        }}</template>
        <template slot="FinalOutAmount" slot-scope="FinalOutAmount, OutAsset">{{
          FinalOutAmount + ' ' + OutAsset.OutAsset
        }}</template>
      </a-table>
    </div>
  </div>
</template>

<script>

const mobileColumns = [
  {
    title: 'Sipariş Numarası',
    dataIndex: 'OTCTransactionUniqueID',
    key: 'OTCTransactionUniqueID',
  },
  {
    title: 'Tip',
    dataIndex: 'Type',
    key: 'Type',
  },

  {
    title: 'Out Amount',
    dataIndex: 'FinalOutAmount',
    key: 'FinalOutAmount',
    scopedSlots: {
      customRender: 'FinalOutAmount',
    },
  },
]
import { isMobile } from 'mobile-device-detect'

export default {
  middleware: ['auth'],
  head(){
    return{
      title: 'OTC | Cointral.com',
    }
  },
  name: 'OTC',
  components: {
    c2c: () => import('@/components/Otc/CtwoC'),
    c2f: () => import('@/components/Otc/CtwoF'),
  },
  data() {
    return {
      data: [],
      columns: [
  {
    title: this.$t('otc_orderid'),
    dataIndex: 'OTCTransactionUniqueID',
    key: 'OTCTransactionUniqueID',
  },
  {
    title: this.$t('otc_type'),
    dataIndex: 'Type',
    key: 'Type',
  },
  {
    title: this.$t('otc_in_amount'),
    dataIndex: 'FinalInAmount',
    key: 'FinalInAmount',
    scopedSlots: {
      customRender: 'FinalInAmount',
    },
  },
  {
    title: this.$t('otc_out_amount'),
    dataIndex: 'FinalOutAmount',
    key: 'FinalOutAmount',
    scopedSlots: {
      customRender: 'FinalOutAmount',
    },
  },
  {
    title: this.$t('otc_status'),
    dataIndex: 'Status',
    key: 'Status',
    scopedSlots: {
      customRender: 'Status',
    },
  },
  {
    title: this.$t('otc_date'),
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    scopedSlots: {
      customRender: 'CreatedOn',
    },
  },
],
      mobileColumns,
      isMobile,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetOtcTransactionHistory',
        {
          headers: authHeader,
        }
      )
      if (response.data.Success) {
        const { OTCTransactions } = response.data
        this.data = OTCTransactions
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/Otc.scss';
.otc {
  background-color: #f5f6f7;
}
.header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('./../../assets/images/Image22.png');
  background-repeat: no-repeat;
  background-position: 20% 28%;
  background-size: cover;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
  }
  @media screen and (max-width: 700px) {
    height: 150px;
  }
  @media (max-width: 400px) {
    height: 0px;
  }
}
.forms {
  margin-bottom: 10px;
  background-color: white;
}
.tabs {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: none;
  @media (max-width: 1000px) {
    height: 1000px;
    align-items: flex-start;
  }
}
.table {
  height: 100%;
  padding: 30px;
  background-color: white;
}
.show-mobile {
  display: none;
}
@media screen and (max-width: 767px) {
  .show-desktop {
    display: none;
  }
  .show-mobile {
    display: block;
  }
}
</style>
