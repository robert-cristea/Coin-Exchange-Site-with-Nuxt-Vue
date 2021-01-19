<template>
  <div class="exchange-mobile">
    <a-tabs default-active-key="2" :animated="false" class="tabs">
      <a-tab-pane key="1" tab="Charts">Charts</a-tab-pane>
      <a-tab-pane key="2" tab="Trade">
        <FavoritesMobile />
        <TradeTab />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Open Orders">
        <OpenOrders />
      </a-tab-pane>
    </a-tabs>
    <div>
      <a-tabs default-active-key="1" :animated="false" class="tabs">
        <a-tab-pane key="1" tab="Trade History">
          <div class="exchange-table mb-15 px-3 mt-15">
            <div class="exchange-table__head">
              <div class="exchange-table__head-item">Çift2</div>
              <div class="exchange-table__head-item">Fiyat</div>
              <div class="exchange-table__head-item">Değişim</div>
            </div>
            <div class="table-overlay">
              <table>
                <tbody>
                  <tr v-for="x in 9" :key="x">
                    <td>ADA/BTC</td>
                    <td>0.0003644</td>
                    <td class="text-success">%-3.84</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Trade Tracking">
          <div class="exchange-table mb-15 px-3">
            <div class="exchange-table__head">
              <div class="exchange-table__head-item">Price</div>
              <div class="exchange-table__head-item">Amount</div>
              <div class="exchange-table__head-item">Time</div>
            </div>
            <div class="table-overlay">
              <table>
                <tbody>
                  <tr v-for="x in 9" :key="x">
                    <td>ADA/BTC</td>
                    <td>0.0003644</td>
                    <td class="text-success">%-3.84</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import TradeTab from './TradeTab'
import FavoritesMobile from './FavoritesMobile'
import OpenOrders from './OpenOrders'

export default {
  components: {
    TradeTab,
    FavoritesMobile,
    OpenOrders,
  },
}
</script>

<style lang="scss">
.exchange-mobile {
  .tabs .ant-tabs-bar {
    margin: 0;
  }
}
</style>
