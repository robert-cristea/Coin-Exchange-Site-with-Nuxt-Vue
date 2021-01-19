export const state = () => ({
  USER_INFO: null
})

export const getters = {
  USER_INFO: state => state.USER_INFO
}

export const mutations = {
  SET_USER_INFO(state, payload) {
    state.USER_INFO = payload
  }
}

export const actions = {
  async GET_USER_INFO(context) {
    try {
      let authHeaders = { Authorization: 'Bearer ' + this.$cookies.get('Token') }
      const response = await this.$axios.get(this.$config.FINANCE_API_URL + `/GetUserInfo`, {
        headers: authHeaders
      })
      if (response.data) {
        context.commit('SET_USER_INFO', response.data['UserInfo'])
        return response.data['Success']
      } else {
        return false
      }
    } catch (e) {
      
      return false
    }
  },

  async CREATE_CUSTOMER_BANK_ACCOUNT(context, payload) {
    try {
      let authHeaders = { Authorization: 'Bearer ' + this.$cookies.get('Token') }
      const response = await this.$axios.post(this.$config.FINANCE_API_URL + `/CreateCustomerBankAccount`, payload, {
        headers: authHeaders
      })
      if (response.data) {
        return response.data
      } else {
        return false
      }
    } catch (e) {
      
      return false
    }
  },

  async DELETE_CUSTOMER_BANK_ACCOUNT(context, payload) {
    try {
      const response = await this.$axios({
        method: 'delete',
        url: this.$config.FINANCE_API_URL + '/DeleteCustomerBankAccount',
        data: payload,
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
          'Content-Type': 'application/json',
        },
      })
      if (response.data) {
        return response.data
      } else {
        return false
      }
    } catch (e) {
      
      return false
    }
  }
}
