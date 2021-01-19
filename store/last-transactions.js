export const state = () => ({
  lastUpdate: null,
  data: [],
})

export const mutations = {
  add(state, payload) {
    if (state.data.length === 100) {
      state.data.pop()
    }
    state.data = [payload, ...state.data]
  },
}

export const getters = {
  getLastTransactions(state) {
    return state.data
  },
}
