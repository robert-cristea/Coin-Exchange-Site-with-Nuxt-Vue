export const state = () => ({
  ASSETS: null,
  USER_SPOT_BALANCE: [],
})

export const getters = {
  ASSETS: state => state.ASSETS,
  USER_SPOT_BALANCE: state => state.USER_SPOT_BALANCE,
}

export const mutations = {
  SET_ASSETS(state, payload) {
    state.ASSETS = payload
  },
  SET_USER_SPOT_BALANCE(state, payload) {
    state.USER_SPOT_BALANCE = payload
  },
}

export const actions = {
}
