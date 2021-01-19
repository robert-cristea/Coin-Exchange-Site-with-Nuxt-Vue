<template>
  <div class="chart-container">
    <iframe
      title=""
      frameborder="0"
      width="100%"
      height="100%"
      :src="getUrl"
      style="min-height: 500px"
    ></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      theme: 'common/getTheme',
      getSymbolData: 'symbol/getSymbolData',
    }),
    getParam() {
      return 'BINANCE:' + this.getSymbolData.Symbol
    },
    getUrl() {
      return `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_5d94b&symbol=${this.getParam}&interval=60&hidelegend=1&symboledit=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=${this.theme}&style=1&timezone=auto&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=tr&utm_source=www.cointral.com&utm_medium=widget&utm_campaign=chart`
    },
  },
}
</script>

<style>
.chart-container {
  flex-grow: 0.999;
  -webkit-flex-grow: 0.999;
  margin-bottom: 16px;
}
</style>
