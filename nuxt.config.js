import webpack from 'webpack'
import { sortRoutes } from '@nuxt/utils'
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  // server: {
  //   port: 80, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  head: {
    title: 'Cointral.com | Bitcoin ve Altcoin Alım Satım Platformu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Bitcoin ve altcoin işlemlerini düşük işlem ücretleri ile hızlı ve güvenli bir şekilde gerçekleştir. Bitcoin almak için hemen üye ol ve avantajlardan yararlan.',
      },
      { name: 'google-play-app', content: 'app-id=com.cointral.exchange' },
      { name: 'apple-itunes-app', content: 'app-id=1536116477' },
      { name: 'yandex-verification', content: '940129b9927fcfa8' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss', '~/assets/ant/main.less'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    '@/plugins/clipboard',
    '@/plugins/vBlur',
    '@/plugins/vueTheMax',
    '@/plugins/route',
    { src: '@/plugins/fingerprint', ssr: false },
    { src: '@/plugins/ga.js', mode: 'client' },
    { src: '@/plugins/hotjar.js', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    '@dansmaculotte/nuxt-zendesk',
    'cookie-universal-nuxt',
    'nuxt-i18n',
    '@nuxtjs/recaptcha',
  ],
  // recaptcha configuration
  recaptcha: {
    hideBadge: true,
    siteKey: process.env.SITE_KEY || '6Le6vOQZAAAAAM7XTgisdgaSPnqJpsJE6lEW2tYC',
    version: 2,
    size: 'invisible',
    language: 'tr',
  },
  i18n: {
    locales: [
      {
        code: 'tr',
        name: 'Türkçe',
        file: 'tr-TR.js',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en-US.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'tr',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
    },
  },
  /*
   ** Zendesk
   ***
   */
  zendesk: {
    key: '70590cdd-18b2-4d8b-81a4-3606a76d2aef',
    disabled: false,
    settings: {
      webWidget: {},
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  router: {
    linkActiveClass: false,
    linkExactActiveClass: false,
    scrollBehavior() {
      return { x: 0, y: 0 }
    },
  },

  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash',
      }),
    ],
  },

  // it's avilable on server and client side - $config
  publicRuntimeConfig: {
    GRECAPTCHA_SITE_KEY:
      process.env.GRECAPTCHA_SITE_KEY ||
      '6LdGaQ4aAAAAAJNnUnikS8qGbIAa48TAS6GaTR2u',
    HOTJARENABLED: process.env.HOTJARENABLED || true,
    AUTH_API_URL:
      process.env.AUTH_API_URL ||
      'https://ctyvahls-dev.outsystemsenterprise.com/API/rest/WebLogin',
    FINANCE_API_URL:
      process.env.FINANCE_API_URL ||
      'https://ctyvahls-dev.outsystemsenterprise.com/API/rest/MicroService',
    FIAT_WALLET_SOCKET_URL:
      process.env.FIAT_WALLET_SOCKET_URL || 'wss://stream.i-bcl.net:2096',
    SOCKET_CONNECTION_URL: 'wss://stream.binance.com:9443/ws',
  },

  loading: '~/components/FullScreenLoading.vue',
}
