<template>
  <div>
    <Index :class="{ 'block-pointer': isSignUpLoading }">
      <template slot="auth-card-header">
        <SignUpFormHeader />
      </template>
      <template slot="auth-card-feedback">
        <a-alert
          class="my-10"
          v-if="showError"
          v-bind:message="$t('warning_title')"
          :description="errorMsg"
          type="warning"
          closable
        ></a-alert>
      </template>
      <template slot="auth-card-content">
        <SignUpFormContent
          :isSignUpLoading="isSignUpLoading"
          :error4Msg="error4Msg"
          @signUp="createAccount"
          @clear-error4="error4Msg = null"
        />
      </template>
      <template slot="auth-card-actions">
        <SignUpFormFooter />
      </template>
    </Index>
  </div>
</template>

<script>
import Index from '~/components/Login/Index'
import SignUpFormHeader from '~/components/Login/SignUpFormHeader'
import SignUpFormContent from '~/components/Login/SignUpFormContent'
import SignUpFormFooter from '~/components/Login/SignUpFormFooter'

export default {
  middleware: ['public'],
  layout: 'login',
  components: {
    Index,
    SignUpFormHeader,
    SignUpFormContent,
    SignUpFormFooter,
  },
  head() {
    return {
      title: 'Kayıt Ol | Cointral.com',
    }
  },
  data: () => ({
    showError: false,
    errorMsg: '',
    error4Msg: null,
    isSignUpLoading: false,
  }),
  methods: {
    async createAccount(payload) {
      try {
        const { $axios, $config, $store, $router } = this
        this.isSignUpLoading = true
        const { data, status } = await $axios.post(
          $config.AUTH_API_URL + '/SignUp',
          payload.user,
          {
            headers: {
              captcha: payload.token,
            },
          }
        )
        if (status === 200 && data.Success) {
          const { SecurityVerificationToken } = data
          $store.commit('auth/setVerficationData', {
            SecurityVerificationToken,
            status: true,
            redirectURI: '/',
          })
          this.isSignUpLoading = false
          $router.push(this.localeRoute('/security-verification'))
        } else {
          this.isSignUpLoading = false
        }

        if (data.ErrorCode === 4) {
          // $store.commit('auth/setError4', data.Message);
          this.error4Msg = data.Message
        }
      } catch (e) {
        this.showError = true
        this.errorMsg = e.response.Message
        this.isSignUpLoading = false
      }
    },
  },
}
</script>
