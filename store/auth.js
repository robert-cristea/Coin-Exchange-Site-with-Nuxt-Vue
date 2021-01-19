export const state = () => ({
  isLoggedIn: false,
  verficationData: {
    status: false,
    redirectURI: '',
    SecurityVerificationToken: null,
  },
})

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
}

export const mutations = {
  setLoggedIn(state, value) {
    state.isLoggedIn = value
  },
  setVerficationData(state, payload) {
    state.verficationData = payload
  },
  flushVerificationData(state, payload) {
    state.verficationData = {}
  },
}
