export const state = () => ({
  data: '',
})

export const mutations = {
  update(state, payload) {
    state.data = payload
  },
}

export const getters = {
  getBids(state) {
    return state.data
  },
}
