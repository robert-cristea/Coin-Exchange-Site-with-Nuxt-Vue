<template>
  <div class="fiat-ticker">
    <a-row
      v-if="!isMobile"
      type="flex"
      align="middle"
      justify="center"
      :gutter="0"
    >
      <a-col :xs="12" :sm="12" :md="4">
        <a-dropdown v-model="tickerDropDown" @click="tickerDropDown = true">
          <div class="ticker-dropdown-content">
            <span class="asset-icon">
              <img
                :src="getAssetIcon()"
                style="vertical-align: bottom"
                alt="alt-asset-icon"
              />
            </span>
            <span class="asset-name text-white Roboto-Regular">
              {{ getSymbolData.BaseAssetName }}
            </span>
            <span class="base-asset-symbol text-white Roboto-Regular">
              {{ getSymbolData.BaseAsset }}
            </span>
            <a-icon
              class="ticker-dropdown-icon"
              :type="tickerDropDown ? 'down' : 'up'"
            />
          </div>
          <FiatSymbolList slot="overlay" :style="{ width: '290px' }" />
        </a-dropdown>
      </a-col>
      <a-col :xs="12" :sm="12" :md="4">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{ formatAll(statistics.last, 'PRICE') }} TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_last_price') }}
          </span>
        </div>
      </a-col>
      <a-col :xs="12" :sm="12" :md="4">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{ statistics.low }} TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_24h_low') }}
          </span>
        </div>
      </a-col>
      <a-col :xs="12" :sm="12" :md="4">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{ statistics.high }} TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_24h_high') }}
          </span>
        </div>
      </a-col>
      <a-col :xs="12" :sm="12" :md="4">
        <div class="flex-column-box">
          <span
            class="stat-value Roboto-Regular"
            :class="{
              'text-danger': statistics.P <= 0,
              'text-success': statistics.P > 0,
            }"
          >
            {{ formatAll(statistics.period, 'PRICE') }} TL

            <span style="font-size: 0.8rem">
              {{ statistics.P ? format(statistics.P) : '' }} &#37;
            </span>
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_24h_change') }}
          </span>
        </div>
      </a-col>
      <a-col :xs="12" :sm="12" :md="4">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{
              statistics.volume && `${formatAll(statistics.volume, 'TOTAL')}`
            }}
            TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_24h_volume') }}
          </span>
        </div>
      </a-col>
    </a-row>
    <a-row
      v-if="isMobile"
      class="mobile-fiat-ticker"
      type="flex"
      align="bottom"
      justify="space-between"
    >
      <a-col :span="12">
        <span class="asset-icon">
          <img
            :src="getAssetIcon()"
            style="vertical-align: bottom"
            alt="alt-asset-icon"
          />
        </span>
        <span class="asset-name text-white Roboto-Regular">
          {{ getSymbolData.BaseAssetName }}
        </span>
        <span class="base-asset-symbol text-white Roboto-Regular">
          {{ getSymbolData.BaseAsset }}
        </span>
        <span>
          <a-icon
            class="text-white"
            @click="$emit('openSymbolDrawer')"
            type="caret-down"
          ></a-icon>
        </span>
      </a-col>
    </a-row>
    <a-row
      v-if="isMobile"
      class="mobile-fiat-ticker"
      type="flex"
      align="middle"
      justify="center"
      style="background-color: rgb(22, 28, 41)"
    >
      <a-col :span="8">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{ statistics.low }} TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_24h_low') }}
          </span>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{ formatAll(statistics.last, 'PRICE') }} TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_last_price') }}
          </span>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="flex-column-box">
          <span class="stat-value text-white Roboto-Regular">
            {{ statistics.high }} TL
          </span>
          <span class="stat-label text-white Roboto-Regular">
            {{ $t('exchange_24h_high') }}
          </span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatter from '~/Mixins/formatter'

export default {
  name: 'FiatTicker',
  mixins: [formatter],
  props: {
    statistics: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tickerDropDown: false,
      isMobile: false,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  methods: {
    format(v) {
      if (!v) return ''
      return new Intl.NumberFormat().format(Number(v).toFixed(2))
    },
    getAssetIcon() {
      const { BaseAsset } = this.getSymbolData
      try {
        return require(`~/assets/icons/${BaseAsset.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
      getTheme: 'common/getTheme',
    }),
  },
}
</script>

<style scoped>
.fiat-ticker {
  background-color: #0b1427;
  padding: 20px 39px 20px 52px;
  max-width: 1800px;
  margin: auto;
}
.asset-name {
  font-size: 23px;
}
.base-asset-symbol {
  opacity: 0.5;
  font-size: 15px;
}
.stat-label {
  font-size: 14px;
  text-transform: capitalize;
}
.stat-value {
  font-size: 18px;
  text-transform: capitalize;
}

/* common */

.flex-column-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
@media screen and (max-width: 1000px) {
  flex-column-box:last-child {
    align-items: center;
  }
  .fiat-ticker {
    background-color: rgb(28, 38, 64);
    padding: 0px;
  }
  .mobile-fiat-ticker {
    padding: 12px;
  }
  .stat-label,
  .stat-value {
    font-size: 12px;
  }
  .stat-value {
    font-family: 'Roboto-Bold';
  }
}

.ticker-dropdown-content {
  cursor: pointer;
  padding: 8px 20.6px 10px 10px;
  border-radius: 4px;
  background-color: #182541;
}
.ticker-dropdown-icon {
  width: 18.7px;
  height: 10.4px;
  color: #869dcc;
}
</style>
