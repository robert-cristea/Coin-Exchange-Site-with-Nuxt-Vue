export const state = () => ({
  FIAT_WALLET_WITHDRAW: null,
  USER_FIAT_WALLET_DEPOSIT: null,
})

export const getters = {
  FIAT_WALLET_WITHDRAW: (state) => state.FIAT_WALLET_WITHDRAW,
  USER_FIAT_WALLET_DEPOSIT: (state) => state.USER_FIAT_WALLET_DEPOSIT,
}

export const mutations = {
  SET_FIAT_WALLET_WITHDRAW(state, payload) {
    state.FIAT_WALLET_WITHDRAW = payload
  },
  SET_USER_FIAT_WALLET_DEPOSIT(state, payload) {
    state.USER_FIAT_WALLET_DEPOSIT = payload
  },
}

export const actions = {
  async GET_USER_FIAT_WALLET_DEPOSIT(context) {
    try {
      let authHeaders = {
        Authorization: 'Bearer ' + this.$cookies.get('Token'),
      }
      const response = await this.$axios.get(
        this.$config.FINANCE_API_URL +
        `/GetUserFiatWalletDepositPage?Offset=0&RowSize=5`,
        {
          headers: authHeaders,
        }
      )
      if (response.data) {
        context.commit('SET_USER_FIAT_WALLET_DEPOSIT', response.data)
        return response.data['Success']
      } else {
        return false
      }
    } catch (e) {
      
      return false
    }
  },

  async GET_FIAT_WALLET_WITHDRAW_HISTORY(context) {
    try {
      let authHeaders = {
        Authorization: 'Bearer ' + this.$cookies.get('Token'),
      }
      const response = await this.$axios.get(
        this.$config.FINANCE_API_URL +
        `/GetFiatWalletWithdrawHistory?Offset=0&RowSize=5`,
        {
          headers: authHeaders,
        }
      )
      if (response.data) {
        context.commit('SET_FIAT_WALLET_WITHDRAW', response.data)
        return response.data['Success']
      } else {
        return false
      }
    } catch (e) {

      return false
    }
  },

  async POST_FIAT_WALLET_WITHDRAW(context, payload) {
    try {
      let authHeaders = {
        Authorization: 'Bearer ' + this.$cookies.get('Token'),
      }
      const response = await this.$axios.post(
        this.$config.FINANCE_API_URL + `/FiatWalletWithdraw`,
        payload,
        {
          headers: authHeaders,
        }
      )
      if (response.data) {
        return response.data
      } else {
        return false
      }
    } catch (e) {
      
      return false
    }
  },
}
