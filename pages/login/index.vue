<template>
  <div>
    <Index :class="{ 'block-pointer': isLoginLoading }">
      <template slot="auth-card-header">
        <LoginFormHeader />
      </template>
      <template slot="auth-card-feedback">
        <a-alert
          v-if="showError"
          v-bind:message="$t('warning_title')"
          :description="errorMsg"
          @close="(e) => (showError = false)"
          type="warning"
          closable
        ></a-alert>
      </template>
      <template slot="auth-card-content">
        <LoginFormContent
          :isLoginLoading="isLoginLoading"
          @loginBtnClick="login"
          @mobileLoginClick="login"
        />
      </template>
      <template slot="auth-card-actions">
        <LoginFormFooter />
      </template>
    </Index>
    <recaptcha />
  </div>
</template>

<script>
import Index from '~/components/Login/Index'
import LoginFormHeader from '~/components/Login/LoginFormHeader'
import LoginFormContent from '~/components/Login/LoginFormContent'
import LoginFormFooter from '~/components/Login/LoginFormFooter'
import { mapMutations } from 'vuex'
export default {
  layout: 'login',
  components: {
    Index,
    LoginFormHeader,
    LoginFormContent,
    LoginFormFooter,
  },
  head() {
    return {
      title: 'Giriş Yap | Cointral.com',
    }
  },
  middleware: ['public'],
  asyncData({ store }) {
    store.commit('auth/flushVerificationData')
  },
  data: () => ({
    isLoginLoading: false,
    showError: false,
    errorMsg: '',
  }),

  methods: {
    async login(payload) {
      try {
        // recaptcha
        this.$recaptcha.language = this.$i18n.getLocaleCookie()
        const token1 = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()

        this.isLoginLoading = true
        const { $axios, $config, $cookies, $router, $store } = this
        const { data, status } = await $axios.post(
          $config.AUTH_API_URL + '/Login',
          payload.user,
          {
            headers: {
              captcha: token1,
            },
          }
        )
        if (data.Success) {
          if ('Token' in data && !!data.Token) {
            const { Token, RefreshToken } = data
            $cookies.set('Token', Token)
            $cookies.set('RefreshToken', RefreshToken)
            $router.push(this.localeRoute('/'))
          }
          if (
            'RequiredSecurityVerification' in data &&
            data.RequiredSecurityVerification
          ) {
            const {
              RequiredSecurityVerification,
              SecurityVerificationToken,
            } = data
            if (RequiredSecurityVerification === true) {
              $store.commit('auth/setVerficationData', {
                SecurityVerificationToken,
                status: true,
                redirectURI: '/',
              })
              $router.push(this.localeRoute('/security-verification'))
            }
          }
        } else {
          this.showError = true
          this.errorMsg = data.Message
          this.isLoginLoading = false
        }
      } catch (e) {
        console.error(e)
        if (e.response) {
          const { data } = e.response
          this.showError = true
          this.errorMsg = data.Message
        } else {
          console.error(e)
        }
      } finally {
        this.isLoginLoading = false
      }
    },
  },
}
</script>
