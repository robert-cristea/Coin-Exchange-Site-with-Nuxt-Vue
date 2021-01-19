export const state = () => ({
    newAccount: false,
})

export const mutations = {
    update(state, payload) {
        state.data = payload
    },
}

export const getters = {
    getAccountRouteStatus(state) {
        return state.data
    },
}
  