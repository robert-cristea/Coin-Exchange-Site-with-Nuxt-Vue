<template>
    <div style="margin-bottom: 10px">
      <iframe frameborder="0" width="100%" height="400" :src="getUrl"></iframe>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        theme: 'common/getTheme',
      }),
      getParam() {
        return this.$route.params.symbol.split('_').join('')
      },
      getUrl() {
        return `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_5d94b&symbol=BINANCE:${this.getParam}&interval=30&hidelegend=1&symboledit=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=auto&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=tr&utm_source=www.cointral.com&utm_medium=widget&utm_campaign=chart`
      },
    },
  }
  </script>
  