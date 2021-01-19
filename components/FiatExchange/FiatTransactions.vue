<template>
  <div class="open-transactions mb-15">
    <div class="table-container">
      <a-spin :spinning="isLoading">
        <div v-if="!isMobile">
          <table class="Roboto-Medium">
            <thead>
              <tr class="sticky-head-row Roboto-Medium">
                <th scope="col">{{ $t('exchange_date') }}</th>
                <th scope="col">{{ $t('exchange_pair') }}</th>
                <th scope="col">{{ $t('exchange_type') }}</th>
                <th scope="col">{{ $t('exchange_side') }}</th>
                <th scope="col">{{ $t('exchange_price') }}</th>
                <th scope="col">{{ $t('exchange_amount') }}</th>
                <th scope="col">{{ $t('exchange_filled') }}</th>
                <th scope="col">{{ $t('exchange_total') }}</th>
                <th scope="col">{{ $t('exchange_status') }}</th>
                <th scope="col" v-if="showCancelButton && Orders.length">
                  <a-button
                    ref="index"
                    @click="$emit('cancelAllOpenOrder')"
                    type="secondary"
                    class="Roboto-Regular btn-cancel-open-order"
                    >{{ $t('exchange_button_cancel_All') }}</a-button
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(o, index) in Orders"
                :key="index"
                class="text-white Roboto-Medium"
              >
                <td>
                  <span v-if="OrderType === 'OPEN_ORDERS'">
                    {{ o.Time | dateFormat }}
                  </span>
                  <span v-else>
                    {{ Number(o.Time) | dateFormat }}
                  </span>
                </td>
                <td>{{ o.Symbol }}</td>
                <td>{{ $t(o.Type) }}</td>
                <td>{{ o.Side }}</td>
                <td>
                  <span v-if="o.Type === 'MARKET'">
                    {{ $t(o.Type) }}
                  </span>
                  <span v-else>
                    {{ o.Price }}
                  </span>
                </td>
                <td>{{ o.BaseQuantity }}</td>
                <td>{{ o.ExecutedBaseQuantity }}</td>
                <td>
                  {{ o.ExecutedQuatoQuantity }}
                </td>
                <td>{{ $t(o.Status) }}</td>
                <td v-if="showCancelButton">
                  <a-button
                    style="position: static"
                    ref="index"
                    @click="$emit('cancelOpenOrder', o)"
                    type="secondary"
                    class="Roboto-Regular btn-cancel-open-order"
                    >{{ $t('exchange_button_cancel') }}</a-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="transaction-container w-100"
          v-for="(o, index) in Orders"
          :key="index"
        >
          <a-row
            class="header-row"
            type="flex"
            align="middle"
            justify="space-between"
          >
            <a-col :span="6">
              <span>{{ $t('exchange_date') }}</span>
            </a-col>
            <a-col :span="4">
              <span>{{ $t('exchange_pair') }}</span>
            </a-col>
            <a-col :span="4">
              <span>{{ $t('exchange_type') }}</span>
            </a-col>
            <a-col :span="4">
              <span>{{ $t('exchange_side') }}</span>
            </a-col>
            <a-col :span="6">
              <span>{{ $t('exchange_price') }}</span>
            </a-col>
          </a-row>
          <a-row
            class="values-row"
            type="flex"
            align="middle"
            justify="space-between"
          >
            <a-col :span="6">
              <span v-if="OrderType === 'OPEN_ORDERS'">
                {{ o.Time | dateFormat }}
              </span>
              <span v-else>
                {{ Number(o.Time) | dateFormat }}
              </span>
            </a-col>
            <a-col :span="4">
              <span>
                {{ o.Symbol }}
              </span>
            </a-col>
            <a-col :span="4">
              <span>{{ $t(o.Type) }}</span>
            </a-col>
            <a-col :span="4">
              <span>{{ o.Side }}</span>
            </a-col>
            <a-col :span="6">
              <!-- <span v-if="o.Type === 'MARKET'">{{ $t(o.Type) }}</span> -->
              <div style="word-break: break-all">{{ o.Price }}</div>
            </a-col>
          </a-row>

          <a-row
            class="header-row"
            type="flex"
            align="middle"
            justify="space-between"
          >
            <a-col :span="6">
              <span>{{ $t('exchange_amount') }}</span>
            </a-col>
            <a-col :span="6">
              <span>{{ $t('exchange_filled') }}</span>
            </a-col>
            <a-col :span="6">
              <span>{{ $t('exchange_total') }}</span>
            </a-col>
            <a-col :span="6">
              <span>{{ $t('exchange_status') }}</span>
            </a-col>
          </a-row>

          <a-row
            class="values-row"
            type="flex"
            align="middle"
            justify="space-between"
          >
            <a-col :span="6">
              <span>
                {{ o.BaseQuantity }}
              </span>
            </a-col>
            <a-col :span="6">
              <span>
                {{ o.ExecutedBaseQuantity }}
              </span>
            </a-col>
            <a-col :span="6">
              <span>{{ $t(o.Status) }}</span>
            </a-col>
            <a-col :span="6">
              <span>{{ o.Side }}</span>
            </a-col>
          </a-row>

          <a-row
            v-if="showCancelButton"
            class="header-row"
            type="flex"
            align="middle"
            justify="space-between"
          >
            <a-col :span="24">
              <a-button
                ref="index"
                @click="$emit('cancelOpenOrder', o)"
                type="secondary"
                class="Roboto-Regular btn-cancel-open-order"
                block
                >{{ $t('exchange_button_cancel') }}</a-button
              >
            </a-col>
          </a-row>
        </div>
      </a-spin>
    </div>
    <div v-if="!Orders.length" class="empty-data">
      <div class="empty-dot-box"></div>
      <span class="font-weight-600">{{ $t('exchange_text_norecords') }}</span>
    </div>
  </div>
</template>

<script>
import dateFormatMixin from '~/Mixins/dateFormatMixin'
export default {
  name: 'FiatTransactions',
  mixins: [dateFormatMixin],
  props: {
    OrderType: {
      type: String,
    },
    Orders: {
      type: Array,
      default: () => [],
    },
    showCancelButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isMobile: false,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  computed: {
    mobileRowsStyle() {
      return { width: window.innerWidth - 12 + 'px' }
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/ant/variables.less';

.open-transactions {
  min-height: 300px;
  &__head {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    color: #1ba4e8;
  }

  table {
    width: 100%;
    position: relative;
    thead {
      padding: 8px 0px;
      th {
        background-color: #161c29;
        position: sticky;
        top: 0;
        color: #1ba4e8;
        font-weight: normal;
        font-size: 14px;
      }
    }
    tbody {
      td {
        padding: 8px 0px;
        font-size: 14px;
      }
    }
  }

  .empty-data {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #9daeca;

    .empty-dot-box {
      border: 2px dashed #9caecd;
      width: 80px;
      height: 120px;
      border-radius: 6px;
      margin-bottom: 30px;
    }
  }
}
.table-container {
  max-height: 400px;
  overflow-y: scroll;
}
.table-container::-webkit-scrollbar {
  display: none;
}
.btn-cancel-open-order {
  color: white;
  background-color: transparent;
  border: 1px solid var(--cancel-button-border-color);
}
.transaction-container {
  padding: 10px;
  background-color: rgb(33, 42, 64);
  margin: 12px auto;
}
.header-row {
  display: flex;
  justify-content: space-between;
  text-align: left;
  color: #1ba4e8;
  font-size: 12px;
  margin: 5px auto;
}
.header-row:first-child {
  border-bottom: 1px solid rgb(71, 88, 126);
}
.header-row:last-child {
  margin-top: 10px auto;
}
.values-row {
  display: flex;
  justify-content: space-between;
  text-align: left;
  color: #ffffff;
  font-size: 12px;
  margin: 5px auto;
}
@media screen and (max-width: 1000px) {
  .open-transactions table tbody td,
  .open-transactions table thead th {
    text-align: left;
    font-size: 12px;
  }
  .empty-data {
    font-size: 12px;
  }
}
</style>
