export default function ({ app, $cookies, $config, $axios, store, redirect }) {
  $axios.interceptors.request.use(async (config) => {
    // set lang header
    config.headers.lang = $cookies.get('i18n_redirected')
    config.headers.lang = config.headers.lang = '' ? 'tr' : config.headers.lang
    // only check request with Auth Header
    if ('Authorization' in config.headers) {
      const token = $cookies.get('Token')
      if (!token) {
        store.commit('auth/setLoggedIn', false)
        redirect(app.localeRoute('/login'))
      } else if (hasTokenExpired(token)) {
        const refToken = $cookies.get('RefreshToken')
        if (hasTokenExpired(refToken)) {
          $cookies.removeAll()
          store.commit('auth/setLoggedIn', false)
          redirect(app.localeRoute('/login'))
        } else {
          // get new token
          const { data } = await $axios.post(
            $config.AUTH_API_URL + '/RefreshToken',
            {
              RefreshToken: refToken,
            }
          )
          if (data.Success) {
            $cookies.set('Token', data.Token)
            $cookies.set('RefreshToken', data.RefreshToken)
            // setting new token on the intercepted request
            config.headers.Authorization = 'Bearer ' + $cookies.get('Token')
            return config
          } else {
            $cookies.removeAll()
            store.commit('auth/setLoggedIn', false)
            redirect(app.localeRoute('/login'))
          }
        }
      } else {
        return config
      }
    }
    // simply allow the request for public apis
    return config
  })
}
// check if a token has expired by comparing timestamps
function hasTokenExpired(token) {
  const data = token.split('.')[1]
  let decoded = null
  if (process.client) {
    decoded = JSON.parse(atob(data))
  }
  if (process.server) {
    const buf = Buffer.from(data, 'base64').toString('binary')
    decoded = JSON.parse(buf)
  }
  const { exp } = decoded
  const date = Math.floor(new Date().getTime() / 1000)
  if (exp < date) {
    return true
  } else {
    return false
  }
}
