<template>
  <a-card class="mb-15 mobile-symbols border-none">
    <a-row type="flex">
      <a-col :span="12">
        <div class="tabs-mobile">
          <div
            :class="isActive('BTC')"
            class="tab-mobile Roboto-Regular"
            @click="setTab('BTC')"
          >
            BTC
          </div>
          <div
            :class="isActive('ETH')"
            class="tab-mobile Roboto-Regular"
            @click="setTab('ETH')"
          >
            ETH
          </div>
          <div
            :class="isActive('USDT')"
            class="tab-mobile Roboto-Regular"
            @click="setTab('USDT')"
          >
            USDT
          </div>
          <div
            :class="isActive('ALL')"
            class="tab-mobile Roboto-Regular"
            @click="setTab('ALL')"
          >
            Tümü
          </div>
          <div
            :class="isActive('F')"
            class="Roboto-Regular"
            style="font-size: 11px"
            @click="setTab('F')"
          >
            <StarIcon />
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" align="middle" :gutter="8">
      <a-col :span="14">
        <a-input
          class="symbol-search"
          v-model.lazy="searchValue"
          v-bind:placeholder="$t('placeholders_text_search')"
          @input="onSearch"
        />
      </a-col>
      <a-col :span="10">
        <a-radio v-model="changeValue" @click="changeValue = !changeValue">
          <span style="color: #9199a3" class="Roboto-Regular">
            {{ $t('symbol_list_mobile_text_change') }}
          </span>
        </a-radio>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div class="exchange-table mt-15">
          <div class="exchange-table__head">
            <div class="exchange-table__head-item Roboto-Regular">
              {{ $t('symbol_list_mobile_text_pair') }}
            </div>
            <div class="exchange-table__head-item Roboto-Regular">
              {{ $t('symbol_list_mobile_text_last_price') }}
            </div>
            <div
              class="exchange-table__head-item Roboto-Regular clickable"
              @click="sortByChangePercentage()"
            >
              {{ $t('symbol_list_mobile_text_changing') }}
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
                        @click.stop="setFavSymbol(item)"
                      >
                        <StarIcon v-if="item.Favorite" />
                        <StarOutlineIcon v-else />
                      </div>
                      <n-link
                        :to="`/trade/${item.BaseAsset}_${item.QuatoAsset}`"
                        class="asset-link"
                      >
                        <span class="Roboto-Regular" style="color: #ffffff">
                          {{ item.BaseAsset }}
                        </span>
                        <span class="Roboto-Regular" style="color: #929aa6">
                          /{{ item.QuatoAsset }}
                        </span>
                      </n-link>
                    </div>
                  </td>
                  <td>
                    <span style="color: #ffffff">
                      {{ formatAll(item.LastPrice, 'PRICE') }}
                    </span>
                  </td>
                  <td
                    :class="`text-${
                      String(item.ChangePercent24H)[0] == '-'
                        ? 'danger'
                        : 'success'
                    }`"
                  >
                    %{{ item.ChangePercent24H.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import Fuse from 'fuse.js'
import { mapGetters } from 'vuex'
import StarIcon from '~/assets/icons/star.svg?inline'
import StarOutlineIcon from '~/assets/icons/star-outline.svg?inline'
import formatter from '~/Mixins/formatter'

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
      changeValue: false,
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
    changeValue() {
      this.sortByChangePercentage()
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

      const fuse = new Fuse(this.getSymbols, {
        ...defaultSearchOptions,
        useExtendedSearch: true,
        threshold: 0,
      })
      const result = fuse.search(`=${activeTab}`)
      const newData = this.getWithoutWrapList(result)
      this.tabSymbolList = newData
      this.tabFilteredSymbolList = newData
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
    async setFavSymbol(item) {
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
  },
}
</script>

<style lang="less">
@import '~/assets/ant/variables.less';

.mobile-symbols {
  background: #0c121e;
  .exchange-table__head-item {
    color: #929aa6;
  }
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
      background: #242931 !important;
    }
  }
  .asset-link {
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tabs-mobile {
    display: flex;
    width: 100%;
    margin-bottom: 15px;

    .tab-mobile {
      cursor: pointer;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 1px;
      font-size: 11px;
      color: #9199a3;
      svg {
        width: 16px;
      }

      &:first-child {
        padding-left: 0;
      }

      &.active {
        font-family: 'Roboto-Regular';
        background: #2b3037;
        border-radius: 2px;
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

.symbol-search {
  box-shadow: none;
  outline: none;
  background: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #474e56;
  color: #9399a4;
  font-family: 'Roboto-Regular';
}
.symbol-search:focus,
.symbol-search:active {
  outline: none;
  border-bottom: 1px solid #474e56;
}
</style>
