export const state = () => ({
  theme: 'dark',
})

export const mutations = {
  updateTheme(state, newTheme) {
    state.theme = newTheme
  },
}

export const getters = {
  getTheme(state) {
    return state.theme
  },
}
