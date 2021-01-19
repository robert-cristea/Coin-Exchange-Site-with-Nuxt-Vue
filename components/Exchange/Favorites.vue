<template>
  <a-card class="mb-15 favorites" :class="`favorites-${getTheme}`">
    <div class="tabs">
      <div
        :class="isActive('F')"
        class="tab Roboto-Medium"
        @click="setTab('F')"
      >
        <StarIcon />
      </div>
      <div
        :class="isActive('BTC')"
        class="tab Roboto-Medium"
        @click="setTab('BTC')"
      >
        BTC
      </div>
      <div
        :class="isActive('ETH')"
        class="tab Roboto-Medium"
        @click="setTab('ETH')"
      >
        ETH
      </div>
      <div
        :class="isActive('USDT')"
        class="tab Roboto-Medium"
        @click="setTab('USDT')"
      >
        USDT
      </div>
      <div
        :class="isActive('ALL')"
        class="tab Roboto-Medium"
        @click="setTab('ALL')"
      >
        {{ $t('text_all') }}
      </div>
    </div>
    <div class="search-box">
      <a-input-search
        type="text"
        class="no-focus-shadow"
        v-model.lazy="searchValue"
        v-bind:placeholder="$t('placeholders_text_search')"
        @input="onSearch"
      />
    </div>
    <div class="exchange-table mt-15">
      <div class="exchange-table__head">
        <div
          @click="sortByChangePair"
          class="exchange-table__head-item Roboto-Regular clickable"
        >
          {{ $t('exchange_pair') }}
        </div>
        <div
          @click="sortByChangePrice"
          class="exchange-table__head-item Roboto-Regular clickable"
        >
          {{ $t('exchange_price') }}
        </div>
        <div
          class="exchange-table__head-item Roboto-Regular clickable"
          @click="sortByChangePercentage"
        >
          {{ $t('exchange_change') }}
        </div>
      </div>
      <div class="table-overlay">
        <table style="table-layout: fixed">
          <tbody class="Roboto-Medium">
            <tr
              v-for="(item, index) in tabFilteredSymbolList"
              :key="index"
              class="cursor-pointer"
              @click="selectSymbol(item)"
            >
              <td>
                <div>
                  <div
                    v-if="isLoggedIn"
                    class="c-pointer"
                    @click.stop="setFavSymbol(item, index, item.Favorite)"
                  >
                    <StarIcon v-if="item.Favorite" />
                    <StarOutlineIcon v-else />
                  </div>
                  {{ item.BaseAsset }}/{{ item.QuatoAsset }}
                </div>
              </td>
              <td>
                {{
                  new Intl.NumberFormat('en', {
                    minimumFractionDigits: item.SymbolPriceDecimalLenght,
                  }).format(item.LastPrice)
                }}
              </td>
              <td
                :class="`text-${
                  String(item.ChangePercent24H)[0] == '-' ? 'danger' : 'success'
                }`"
              >
                %{{ item.ChangePercent24H.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </a-card>
</template>

<script>
import Fuse from 'fuse.js'
import { mapGetters } from 'vuex'
import StarIcon from '~/assets/icons/star.svg?inline'
import StarOutlineIcon from '~/assets/icons/star-outline.svg?inline'
import formatter from '~/Mixins/formatter'
import _ from 'lodash'
const defaultSearchOptions = {
  keys: ['BaseAsset', 'QuatoAsset'],
}

export default {
  mixins: [formatter],
  components: {
    StarIcon,
    StarOutlineIcon,
  },
  data() {
    return {
      tabs: ['F', 'ETH', 'BTC', 'USDT', 'ALL'],
      activeTab: 'ALL',
      tabSymbolList: [],
      tabFilteredSymbolList: [],
      searchValue: '',
      sortBy: '',
      PriceSort: 'desc',
      PairSort: 'desc',
    }
  },
  computed: {
    ...mapGetters({
      getTheme: 'common/getTheme',
      getSymbols: 'symbol/getSymbols',
    }),
    isLoggedIn() {
      return !!this.$cookies.get('Token')
    },
  },
  mounted() {
    const symbolTab = localStorage.getItem('symbolTab')
    if (!!symbolTab) {
      this.activeTab = symbolTab
    }
    this.setFilteredList()
  },
  watch: {
    activeTab(val) {
      this.setFilteredList()
      this.search(this.searchValue, {
        threshold: 0,
      })

      localStorage.setItem('symbolTab', val)
    },
  },
  methods: {
    setTab(v) {
      this.activeTab = v
    },
    isActive(v) {
      return v === this.activeTab && 'active'
    },
    onSearch(e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.search(e.target.value, {
          threshold: 0,
        })
      }, 300)
    },
    selectSymbol(item) {
      this.$store.dispatch('symbol/updateData', [
        item.BaseAsset,
        item.QuatoAsset,
      ])
      this.$store.commit('transactions/updateActionPrice', item.LastPrice)
    },
    setFilteredList() {
      const { activeTab } = this
      if (activeTab === 'ALL') {
        this.tabFilteredSymbolList = this.getSymbols.filter(
          (sym) => sym.QuatoAsset !== 'TRY'
        )
        this.tabSymbolList = this.getSymbols.filter(
          (sym) => sym.QuatoAsset !== 'TRY'
        )
        return
      }

      if (activeTab === 'F') {
        const filtered = this.getSymbols.filter((s) => s.Favorite)
        this.tabFilteredSymbolList = filtered
        this.tabSymbolList = filtered
        return
      }

      // const fuse = new Fuse(this.getSymbols, {
      //   ...defaultSearchOptions,
      //   useExtendedSearch: true,
      //   threshold: 0,
      // })
      // const result = fuse.search(`=${activeTab}`)
      const result = this.getSymbols.filter(
        (sym) => sym.QuatoAsset === activeTab
      )
      // const newData = this.getWithoutWrapList(result)
      this.tabSymbolList = result
      this.tabFilteredSymbolList = result
    },
    search(value = '', extraOptions) {
      if (!value.length)
        return (this.tabFilteredSymbolList = this.tabSymbolList)
      const fuse = new Fuse(this.tabSymbolList, {
        ...defaultSearchOptions,
        ...extraOptions,
      })
      const result = fuse.search(`${value}`)
      const newData = this.getWithoutWrapList(result)
      this.tabFilteredSymbolList = newData
    },
    getWithoutWrapList(result) {
      return result.map((v) => v.item)
    },
    async setFavSymbol(item, index, favorite) {
      const {
        $axios,
        $store,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.post(
        FINANCE_API_URL + '/ToggleFavoriteSymbol',
        {
          Symbol: item.Symbol,
        },
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        item.Favorite = item.Favorite ? false : true
        this.$set(this.tabFilteredSymbolList, index, item)
        const symbolsResponse = await $axios.get(
          FINANCE_API_URL + '/GetSymbols',
          {
            headers: authHeaders,
          }
        )
        if (symbolsResponse.data.Success) {
          $store.commit('symbol/updateList', symbolsResponse.data.SymbolList)
          this.setFilteredList()
        }
      }
    },
    sortByChangePercentage() {
      let compareFn
      if (
        this.tabFilteredSymbolList[0].ChangePercent24H >
        this.tabFilteredSymbolList[1].ChangePercent24H
      ) {
        compareFn = (a, b) => a.ChangePercent24H - b.ChangePercent24H
      }

      if (
        this.tabFilteredSymbolList[0].ChangePercent24H <
        this.tabFilteredSymbolList[1].ChangePercent24H
      ) {
        compareFn = (a, b) => b.ChangePercent24H - a.ChangePercent24H
      }
      this.tabFilteredSymbolList = this.tabFilteredSymbolList
        .slice()
        .sort(compareFn)
    },
    sortByChangePair() {
      if (this.PairSort === 'desc') {
        this.PairSort = 'asc'
      } else {
        this.PairSort = 'desc'
      }

      this.tabFilteredSymbolList = _.orderBy(
        this.tabFilteredSymbolList,
        ['BaseAsset'],
        [this.PairSort]
      )
    },
    sortByChangePrice() {
      if (this.PriceSort === 'desc') {
        this.PriceSort = 'asc'
      } else {
        this.PriceSort = 'desc'
      }

      this.tabFilteredSymbolList = _.orderBy(
        this.tabFilteredSymbolList,
        ['LastPrice'],
        [this.PriceSort]
      )
    },
  },
}
</script>

<style lang="less">
@import '~/assets/ant/variables.less';

.favorites {
  .exchange-table table tbody tr td:first-child {
    width: 40%;
    vertical-align: middle;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      svg {
        cursor: pointer;
        width: 12px !important;
      }

      .asset-link {
        margin-left: 6px;
      }
    }
  }

  &-dark {
    input {
      color: #fff;
      background: #0c121e !important;
    }
  }
  .asset-link {
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tabs {
    display: flex;
    width: 100%;
    margin-bottom: 15px;
    border-bottom: 1px solid @primary-color;

    .tab {
      cursor: pointer;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
      font-size: 11px;

      svg {
        width: 16px;
      }

      &:first-child {
        padding-left: 0;
      }

      &.active {
        background: #1ba4e8;
        border-radius: 3px 3px 0 0;
        color: #fff;

        svg * {
          fill: #fff;
        }
      }
    }
  }

  .ant-card-body {
    padding: 16px;
  }

  .search-box {
    svg {
      font-size: 14px;
      fill: #b5b9bc !important;
    }

    input {
      background: #efefef;
      border: 0;

      &::placeholder {
        color: #b9b9b9;
      }
    }
  }
}
.clickable {
  cursor: pointer;
}
</style>
