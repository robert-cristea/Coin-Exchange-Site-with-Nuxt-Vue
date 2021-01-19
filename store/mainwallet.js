import _ from 'lodash'
export const state = () => ({
  SELECTED_ASSET: 'BTC',
  DEPOSIT_HISTORY: [],
  DEPOSIT_NETWORK_ADRESSES: null,
  IS_NETWORK_READY: true,
  NETWORKS: null,

  WITHDRAW_HISTORY: [],
  WITHDRAW_VERIFICATION: null,
  USER_BALANCE: null,

  AVAILABLE_PRICE: null,
  Symbols: [],
  filteredSymbols: [],
})

export const getters = {
  SELECTED_ASSET: (state) => state.SELECTED_ASSET,
  DEPOSIT_HISTORY: (state) => state.DEPOSIT_HISTORY,
  DEPOSIT_NETWORK_ADRESSES: (state) => state.DEPOSIT_NETWORK_ADRESSES,
  IS_NETWORK_READY: (state) => state.IS_NETWORK_READY,
  NETWORKS: (state) => state.NETWORKS,

  USER_BALANCE: (state) => state.USER_BALANCE,
  WITHDRAW_VERIFICATION: (state) => state.WITHDRAW_VERIFICATION,
  WITHDRAW_HISTORY: (state) => state.WITHDRAW_HISTORY,

  AVAILABLE_PRICE: (state) => state.AVAILABLE_PRICE,
  GET_FILTERED_SYMBOLS: (state) => state.filteredSymbols,
}

export const mutations = {
  SET_SELECTED_ASSET(state, payload) {
    state.SELECTED_ASSET = payload
  },
  SET_DEPOSIT_HISTORY(state, payload) {
    state.DEPOSIT_HISTORY = payload
  },
  SET_DEPOSIT_NETWORK_ADRESSES(state, payload) {
    state.DEPOSIT_NETWORK_ADRESSES = payload
  },
  SET_IS_NETWORK_READY(state, payload) {
    state.IS_NETWORK_READY = payload
  },
  SET_NETWORKS(state, payload) {
    state.NETWORKS = payload
  },

  SET_USER_BALANCE(state, payload) {
    state.USER_BALANCE = payload
  },
  SET_WITHDRAW_VERIFICATION(state, payload) {
    state.WITHDRAW_VERIFICATION = payload
  },
  SET_WITHDRAW_HISTORY(state, payload) {
    state.WITHDRAW_HISTORY = payload
  },

  SET_AVAILABLE_PRICE(state, payload) {
    state.AVAILABLE_PRICE = payload
  },
  SET_SYMBOLS(state, payload) {
    state.Symbols = payload
  },
  SET_FILTERED_SYMBOLS(state, payload) {
    if (payload === 'USDT') {
      const res = _.filter(state.Symbols, function (o) {
        return o.QuatoAsset === payload
      })
      state.filteredSymbols = res
      
    } else {
      const res = _.filter(state.Symbols, function (o) {
        return o.BaseAsset === payload
      })
      state.filteredSymbols = res
    }
  },
}

export const actions = {
  async FECTCH_SYMBOLS(context) {
    const authHeaders = {
      Authorization: 'Bearer ' + this.$cookies.get('Token'),
    }
    const response = await this.$axios.get(
      this.$config.FINANCE_API_URL + `/GetSymbols`,
      { headers: authHeaders }
    )
    const { SymbolList } = response.data
    context.commit('SET_SYMBOLS', SymbolList)
  },
  async SET_SELECTED_ASSET(context, payload) {
    context.commit('SET_IS_NETWORK_READY', true)

    context.commit('SET_SELECTED_ASSET', payload)

    let networks
    context.rootGetters['swap/ASSETS'].forEach((item) => {
      if (item['Symbol'] === context.getters.SELECTED_ASSET) {
        networks = item['Networks']
      }
    })

    if (networks && networks.length > 0) {
      context.commit('SET_NETWORKS', networks)

      let depositNetworkAdresses = []
      let authHeaders = {
        Authorization: 'Bearer ' + this.$cookies.get('Token'),
      }
      for (const item of networks) {
        if (item.DepositEnabled) {
          const responseUserDepositAddress = await this.$axios.get(
            this.$config.FINANCE_API_URL +
              `/GetUserDepositAddress?Asset=${context.getters.SELECTED_ASSET}&Network=${item['Network']}`,
            {
              headers: authHeaders,
            }
          )

          if (responseUserDepositAddress.data) {
            responseUserDepositAddress.data.name = item['Network']
            responseUserDepositAddress.data.deposit = item['DepositEnabled']
            depositNetworkAdresses.push(responseUserDepositAddress.data)
          }
        } else {
          depositNetworkAdresses.push({
            name: item['Network'],
            deposit: item['DepositEnabled'],
          })
        }
      }
      context.commit('SET_DEPOSIT_NETWORK_ADRESSES', depositNetworkAdresses)
    }
    context.commit('SET_IS_NETWORK_READY', false)
    return true
  },

  async POST_WITHDRAW(context, payload) {
    try {
      let authHeaders = {
        Authorization: 'Bearer ' + this.$cookies.get('Token'),
      }
      const response = await this.$axios.post(
        this.$config.FINANCE_API_URL + `/CreateWithdraw`,
        payload,
        {
          headers: authHeaders,
        }
      )
      if (response.data) {
        context.commit('SET_WITHDRAW_VERIFICATION', response.data)
        return response
      } else {
        return false
      }
    } catch (e) {
      
      return false
    }
  },
}
