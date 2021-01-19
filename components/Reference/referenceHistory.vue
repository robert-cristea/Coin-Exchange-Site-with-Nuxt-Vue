<template>
  <div class="referenceHistory">
    <div v-if="!isMobile" class="refernce-table-container">
      <div class="header">
        <h1 class="Roboto-Bold">
          {{ $t('reference_text_reference_history') }}
        </h1>
      </div>
      <a-table
        :row-key="(record, index) => index"
        :columns="columns"
        :data-source="referenceDetail"
        @change="handleTableChange"
      >
        <span slot="User" slot-scope="record" class="break-column-data">
          {{ record.User }}
        </span>

        <span slot="Value" slot-scope="record">
          {{ record.Value }}
        </span>

        <span slot="DateTime" slot-scope="record">
          {{ record.DateTime | dateFormat }}
        </span>
      </a-table>
    </div>

    <div v-if="isMobile" style="padding: 20px">
      <div style="margin: 0 auto">
        <h1 class="Roboto-Bold">
          {{ $t('reference_text_reference_history') }}
        </h1>
        <p class="m-0" align="left">Referans Description</p>
      </div>
      <a-list item-layout="horizontal" class="Roboto-Regular table-responsive">
        <a-list-item
          style="
            padding-left: 8px;
            padding-right: 8px;
            background-color: #f5f6f7;
          "
        >
          <a-list-item-meta>
            <div
              slot="title"
              style="display: flex; justify-content: space-between"
            >
              <p class="m-0" align="left">Referans E-postlari</p>
              <p class="m-0" align="right">Referans Geliri</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item
          v-for="(item, index) in referenceDetail"
          :key="index"
          style="padding-left: 8px; padding-right: 8px"
        >
          <a-list-item-meta>
            <div
              slot="title"
              style="display: flex; justify-content: space-between"
            >
              <p class="m-0" align="left">
                {{ item.User }}
              </p>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                "
              >
                <p class="m-0 Roboto-Bold" align="right">
                  {{ item.Value }}
                </p>
                <p class="m-0" align="right">
                  {{ item.DateTime | dateFormat }}
                </p>
              </div>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const columns = [
  {
    title: 'E-Posta',
    dataIndex: 'User',
    width: '40%',
  },
  {
    title: 'Referans Geliri',
    dataIndex: 'Value',
    width: '40%',
  },
  {
    title: 'Tarih',
    dataIndex: 'DateTime',
    width: '100%',
  },
]
const mobileColumns = [
  {
    title: 'E-Posta',
    dataIndex: 'User',
    width: '100%',
  },
  {
    title: 'Referans Geliri',
    dataIndex: 'Value',
    width: '100%',
  },
]
export default {
  name: 'ReferenceHistory',
  data() {
    return {
      columns,
      referenceDetail: [],
      isMobile: null,
    }
  },
  mounted() {
    this.getReferencePageDetail()

    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  filters: {
    dateFormat(val) {
      return moment(val).format('yyy-mm-DD hh:mm:ss')
    },
  },
  methods: {
    dateFormater(val) {
      return moment(val).format('yyy-mm-DD hh:mm:ss')
    },
    async getReferencePageDetail() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL +
            `/GetReferencePageDetail?Offset=0&RowSize=10`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          response.data.AwardList.map((res) => {
            res.DateTime = this.dateFormater(res.DateTime)
          })

          this.referenceDetail = response.data.AwardList
        }
      } catch (e) {}
    },
    handleTableChange() {},
  },
}
</script>

<style lang="scss" scoped>
.refernce-table-container {
  padding: 0 20px;
}

.table-responsive {
  overflow: auto;
  display: block;
}

.referenceHistory {
  background-color: white;
  padding: 30px 0;
  margin-top: 10px;

  .reference-grid {
    max-width: 1050px;
    .header {
      margin-bottom: 24px;
      h1 {
        margin: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .referenceHistory {
    .reference-grid {
      .header {
        padding: 0 5px;
        margin-bottom: 250px !important;
      }
    }
  }
}

@media (max-width: 600px) {
  .table-responsive > div {
    width: 600px;
  }
  .referenceHistory {
    margin-top: 130px !important;
  }
}
</style>
