<template>
  <Index>
    <template slot="auth-card-header">
      <h2 class="text-center">{{ $t('reset_password') }}</h2>
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
      <ResetPasswordContent
        @resetPassword="resetPassword"
        :isResetPasswordLoading="isResetPasswordLoading"
      />
    </template>
  </Index>
</template>

<script>
import Index from '~/components/Login/Index'
import ResetPasswordContent from '~/components/Login/ResetPasswordContent'

export default {
  middleware: ['public'],
  layout: 'login',
  components: {
    Index,
    ResetPasswordContent,
  },
  head() {
    return {
      title: 'Parola Sıfırla | Cointral.com',
    }
  },
  data() {
    return {
      isResetPasswordLoading: false,
      showError: false,
      errorMsg: '',
    }
  },
  methods: {
    async resetPassword(payload) {
      try {
        this.isResetPasswordLoading = true
        this.$recaptcha.language = this.$i18n.getLocaleCookie()
        let captcha = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()

        const {
          $axios,
          $cookies,
          $config: { FINANCE_API_URL },
          $store,
          $router,
        } = this
        const {
          data: {
            Success,
            Message,
            RequiredSecurityVerification,
            ResetVerificationToken,
          },
        } = await $axios.post(
          FINANCE_API_URL + '/ResetPassword',
          payload.data,
          {
            headers: {
              captcha,
            },
          }
        )

        if (Success) {
          if (RequiredSecurityVerification) {
            $store.commit('auth/setVerficationData', {
              status: true,
              redirectURI: '/login',
              SecurityVerificationToken: ResetVerificationToken,
            })
            $router.push(this.localeRoute('/security-verification'))
          }
        } else {
          this.showError = true
          this.errorMsg = Message
        }
      } catch (e) {
        if (e.response) {
          const { Message } = response.data
          this.showError = true
          this.errorMsg = Message
        }
        console.error(e)
      } finally {
        this.isResetPasswordLoading = false
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
