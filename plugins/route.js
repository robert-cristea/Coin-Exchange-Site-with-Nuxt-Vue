export default ({ app, route }) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach(async (to, from) => {
    app.$cookies && app.$cookies.set('theme', 'light')
    app.store && app.store.commit('common/updateTheme', 'light')
  })
}
