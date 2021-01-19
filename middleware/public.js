export default function ({ app, $cookies, store, redirect }) {
  const token = $cookies.get('Token')
  if (!!token) {
    store.commit('auth/setLoggedIn', true)
    redirect(app.localeRoute('/trade/BTC_USDT'))
  }
}
