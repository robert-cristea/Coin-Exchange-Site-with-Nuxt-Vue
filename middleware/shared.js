export default function ({ app, $cookies, store, route, params, redirect }) {
  const token = $cookies.get('Token')
  if (!!token) {
    store.commit('auth/setLoggedIn', true)
  } else {
    store.commit('auth/setLoggedIn', false)
  }
}
