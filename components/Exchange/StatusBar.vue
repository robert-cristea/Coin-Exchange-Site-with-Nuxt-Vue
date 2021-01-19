<template>
  <div class="status-bar" :class="`status-bar-${getTheme}`">
    <div class="container status-bar-container">
      <a-row class="h-100">
        <a-col :span="5" class="status-col h-100">
          <a-row type="flex" align="middle">
            <h2 class="currency-title Roboto-Medium">
              {{ getSymbolData.BaseAsset }}
            </h2>
            <span class="currency-subtitle Roboto-Medium"
              >/ {{ getSymbolData.QuatoAsset }}</span
            >
          </a-row>
          <div>
            <span class="currency-text Roboto-Regular">{{
              getSymbolData.BaseAssetName
            }}</span>
          </div>
        </a-col>
        <a-col :span="14" class="statistics h-100">
          <a-row :gutter="20" class="h-100">
            <a-col :span="4" class="statistics-col">
              <span class="statistics-label Roboto-Medium">{{
                $t('exchange_last_price')
              }}</span>
              <span class="statistics-value Roboto-Medium">{{
                formatAll(statistics.last, 'PRICE')
              }}</span>
            </a-col>
            <a-col :span="4" class="statistics-col">
              <span class="statistics-label Roboto-Medium">{{
                $t('exchange_24h_change')
              }}</span>
              <div
                class="statistics-value text-right"
                :class="`statistics-value-${
                  statistics.P < 0 ? 'danger' : 'success'
                }`"
              >
                <span>{{ formatAll(statistics.period, 'PRICE') }}</span>
                <span v-if="statistics.P" class="statistics-small Roboto-Medium"
                  >{{ statistics.P ? format(statistics.P) : '' }} &#37;</span
                >
              </div>
            </a-col>
            <a-col :span="4" class="statistics-col">
              <span class="statistics-label Roboto-Medium">{{
                $t('exchange_24h_high')
              }}</span>
              <span class="statistics-value Roboto-Medium">{{
                formatAll(statistics.high, 'PRICE')
              }}</span>
            </a-col>
            <a-col :span="4" class="statistics-col">
              <span class="statistics-label Roboto-Medium">{{
                $t('exchange_24h_low')
              }}</span>
              <span class="statistics-value Roboto-Medium">{{
                formatAll(statistics.low, 'PRICE')
              }}</span>
            </a-col>
            <a-col :span="7" class="statistics-col">
              <span class="statistics-label Roboto-Medium"
                >{{ $t('exchange_24h_volume') }}
                <a-tooltip v-if="getSymbolData.QuatoAsset !== 'TRY'">
                  <a-icon type="info-circle"></a-icon>
                  <span slot="title">{{
                    $t('exchange_text_status_volume_info')
                  }}</span>
                </a-tooltip>
                <a-tooltip v-if="getSymbolData.QuatoAsset == 'TRY'">
                  <a-icon type="info-circle"></a-icon>
                  <span slot="title">{{
                    $t('exchange_text_try_status_volume_info')
                  }}</span>
                </a-tooltip>
              </span>
              <span class="statistics-value Roboto-Medium"
                >{{
                  statistics.volume &&
                  `${formatAll(statistics.volume, 'TOTAL')}`
                }}
                <span style="font-size: 14px">
                  {{ getSymbolData.QuatoAsset }}
                </span>
              </span>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5" class="h-100">
          <a-row
            class="h-100"
            type="flex"
            justify="end"
            align="middle"
            :gutter="10"
          >
            <a-col class="d-flex">
              <SunIcon style="width: 17px" class="status-bar-theme-icon" />
            </a-col>
            <a-col class="d-flex">
              <a-switch v-model="theme" size="small" />
            </a-col>
            <a-col class="d-flex">
              <NightIcon style="width: 14px" class="status-bar-theme-icon" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SunIcon from '~/assets/icons/sun-icon.svg?inline'
import NightIcon from '~/assets/icons/night-icon.svg?inline'
import formatter from '~/Mixins/formatter'

export default {
  mixins: [formatter],
  components: {
    SunIcon,
    NightIcon,
  },
  props: {
    statistics: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      theme: true,
    }
  },
  beforeMount() {
    this.$store.commit('common/updateTheme', 'dark')
    this.$cookies.set('theme', 'dark')
  },
  computed: {
    get24HourChangeState() {
      return (this.statistics.length && this.statistics.P[0] !== '-') || ''
    },
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
      getTheme: 'common/getTheme',
    }),
  },
  watch: {
    theme(v) {
      if (v) {
        this.$store.commit('common/updateTheme', 'dark')
        this.$cookies.set('theme', 'dark')
      } else {
        this.$store.commit('common/updateTheme', 'light')
        this.$cookies.set('theme', 'light')
      }
    },
  },
  created() {
    this.theme = true
  },
  methods: {
    format(v) {
      if (!v) return ''
      return new Intl.NumberFormat().format(Number(v).toFixed(2))
    },
  },
}
</script>

<style lang="less">
@import '~/assets/ant/variables.less';

.status-bar {
  width: 100%;
  background: var(--status-bar-bg);
  height: 80px;
  padding: 12px 0;

  &-dark {
    .status-bar-theme-icon * {
      color: #fff;
    }
  }

  .status-bar-theme-icon * {
    fill: var(--text-color);
  }

  &-container {
    height: 100%;

    .status-col {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .currency-title {
        color: var(--status-bar-currency-title-color);
        font-size: 1.65rem;
        font-weight: 400;
        margin: 0;
        padding-right: 5px;
        line-height: 1;
      }

      .currency-subtitle {
        color: var(--status-bar-currency-subtitle-color);
        margin-bottom: -4px;
        display: block;
        font-size: 16px;
        font-weight: 500;
      }

      .currency-text {
        font-size: 16px;
        color: var(--status-bar-currency-title-color);
      }
    }

    .statistics {
      font-size: 14px;

      &-small {
        font-size: 11px;
      }

      &-col {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        height: 100%;
      }

      &-value {
        font-weight: 500;
        height: 20px;
        font-size: 15px;
        text-align: right;
        color: var(--status-bar-statistics-value-color);
        line-height: 1.1;

        &-success {
          color: #5cb56a;
        }

        &-danger {
          color: var(--danger-color);
        }
      }
      &-label {
        // color: #a3a3a4;
        color: var(--status-bar-statistics-label-color);
      }
    }
  }
}
</style>
