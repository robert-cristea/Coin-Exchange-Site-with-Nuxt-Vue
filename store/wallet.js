export const state = () => ({
  CURRENT_TAB: 'MainWallet',
})

export const mutations = {
  SET_CURRENT_TAB(state, payload) {
    state.CURRENT_TAB = payload
  },
}

export const getters = {
  CURRENT_TAB: state => state.CURRENT_TAB,
}
