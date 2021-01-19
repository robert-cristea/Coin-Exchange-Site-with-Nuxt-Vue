<template>
  <a-row
    class="stats-row w-100"
    :gutter="16"
    type="flex"
    align="middle"
    justify="center"
  >
    <a-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="4"
      :xl="4"
      v-for="(stat, index) in stats"
      :key="index"
    >
      <a-card class="stats-card border-none">
        <div slot="title" class="Roboto-Medium">
          <img
            class="stat-card-icon"
            :src="getAssetIcon(stat.baseAsset)"
            alt=""
          />
          <span>
            {{ stat.baseAsset + '/' + stat.quatoAsset }}
          </span>
        </div>
        <span slot="extra" class="Roboto-Medium">24h</span>
        <div class="content">
          <h2 class="Roboto-Medium m-0">
            {{ stat.chartData[6] }}
          </h2>
          <span class="Roboto-Medium"> {{ stat.change }} </span>

          <div :class="'ct-' + stat.baseAsset" class="stat-chart"></div>
        </div>
        <div class="actions">
          <a-button
            block
            type="primary"
            @click="
              $router.push(
                localeRoute(`/trade/${stat.baseAsset + '_' + stat.quatoAsset}`)
              )
            "
            class="Roboto-Medium"
          >
            {{ $t('text_buy_sell') }}
          </a-button>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import Chartist from 'chartist'
export default {
  name: 'Stats',
  data() {
    return {
      stats: [],
    }
  },
  mounted() {
    this.getStats()
  },
  methods: {
    async getStats() {
      const {
        $axios,
        $config: { FINANCE_API_URL },
      } = this
      const { data } = await $axios.get(FINANCE_API_URL + '/Get7dData')
      const {
        data: { SymbolList },
      } = await $axios.get(FINANCE_API_URL + '/GetSymbols')

      SymbolList.forEach((symbol) => {
        if (
          Object.keys(data).includes(symbol.BaseAsset) &&
          symbol.QuatoAsset === 'USDT'
        ) {
          this.stats.push({
            baseAsset: symbol.BaseAsset,
            quatoAsset: symbol.QuatoAsset,
            chartData: data[symbol.BaseAsset],
            change: symbol.Change24H,
          })
          this.$nextTick(() => {
            new Chartist.Line(
              '.ct-' + symbol.BaseAsset,
              {
                series: [data[symbol.BaseAsset]],
              },
              {
                height: 100,
                showArea: true,
                showLine: false,
                axisY: {
                  showLabel: false,
                  showGrid: false,
                },
              }
            )
          })
        }
      })
    },

    getAssetIcon(symbol) {
      try {
        return require(`~/assets/icons/${symbol.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },
  },
}
</script>

<style scoped>
.stats-row {
  padding: 20px;
  margin: 50px 0px !important;
}
.stats-card {
  margin: 15px auto;
  box-shadow: 0px 3px 6px #00000010;
  border-radius: 9px;
}
.stat-card-icon {
  width: 20px;
  height: 20px;
}
.stat-chart {
  fill: #65b8e2;
}
</style>
