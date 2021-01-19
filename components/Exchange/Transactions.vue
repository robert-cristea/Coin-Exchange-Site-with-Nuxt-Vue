<template>
  <div class="open-transactions mb-15">
    <!-- <div class="open-transactions__head">
      <span class="Roboto-Medium">{{ title }}</span>
    </div> -->
    <div class="table-container">
      <a-spin :spinning="isLoading">
        <table class="Roboto-Medium">
          <thead>
            <tr class="sticky-head-row">
              <th scope="col">{{ $t('exchange_date') }}</th>
              <th scope="col">{{ $t('exchange_pair') }}</th>
              <th scope="col">{{ $t('exchange_type') }}</th>
              <th scope="col">{{ $t('exchange_side') }}</th>
              <th scope="col">{{ $t('exchange_price') }}</th>
              <th scope="col">{{ $t('exchange_amount') }}</th>
              <th scope="col">{{ $t('exchange_filled') }}</th>
              <th scope="col">{{ $t('exchange_total') }}</th>
              <th scope="col">{{ $t('exchange_status') }}</th>
              <th scope="col" v-if="showCancelButton && orders.length > 1">
                <a-button
                  ref="index"
                  @click="$emit('cancelAllOpenOrder', '')"
                  type="secondary"
                  class="Roboto-Regular btn-cancel-open-order"
                  >{{ $t('exchange_button_cancel_All') }}</a-button
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(o, index) in orders" :key="index">
              <td>{{ Number(o.Time) | dateFormat }}</td>
              <td>{{ o.Symbol }}</td>
              <td>{{ $t(o.Type) }}</td>
              <td>{{ o.Side }}</td>
              <td v-if="o.Type === 'MARKET'">{{ $t(o.Type) }}</td>
              <td v-else>{{ o.Price }}</td>
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
      </a-spin>
    </div>
    <div v-if="!orders.length" class="empty-data">
      <div class="empty-dot-box"></div>
      <span class="font-weight-600">{{ $t('exchange_text_norecords') }}</span>
    </div>
  </div>
</template>

<script>
import dateFormatMixin from '~/Mixins/dateFormatMixin'
export default {
  mixins: [dateFormatMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    OrderType: {
      type: String,
    },
    orders: {
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
  color: var(--cancel-button-color);
  background-color: transparent;
  border: 1px solid var(--cancel-button-border-color);
}
.sticky-head-row th {
  background-color: var(--body-background);
}
</style>

<style></style>
