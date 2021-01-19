// state
// mutations
// actions
// getters

export const state = () => ({
  list: [],
  actionPrice: 0,
  BuyTotal: 0,
  SellQuantity: 0,
})

export const mutations = {
  updateActionPrice(state, value) {
    state.actionPrice = value
  },
  updateActionBuyTotal(state, value) {
    state.BuyTotal = value
  },
  updateActionSellQuantity(state, value) {
    state.SellQuantity = value
  },
}

export const getters = {
  getActionPrice(state) {
    return state.actionPrice
  },
  getActionBuyTotal(state) {
    return state.BuyTotal
  },
  getActionSellQuantity(state) {
    return state.SellQuantity
  },
}
