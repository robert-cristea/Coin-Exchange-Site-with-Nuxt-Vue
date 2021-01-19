export const actions = {
  nuxtServerInit({ commit }, { app }) {
    if (
      app.$cookies.get('theme') === 'dark' ||
      app.$cookies.get('theme') === 'light'
    ) {
      commit('common/updateTheme', app.$cookies.get('theme'))
    }

    if (app.$cookies.get('Token')) {
      commit('auth/setLoggedIn', true)
    }
  },
}
