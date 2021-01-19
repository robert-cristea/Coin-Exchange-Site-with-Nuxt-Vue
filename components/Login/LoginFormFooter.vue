<template>
  <div class="login-form-footer d-flex w-100 flex-wrap justify-content-between">
    <Nuxt-Link
      v-if="showForgotPassword"
      class="flex-grow link"
      :to="localePath('/login/reset-password')"
    >
      <p class="login-bottom-links Roboto-Regular">
        {{ $t('login_text_forgot_password') }}
      </p>
    </Nuxt-Link>
    <span v-if="!showForgotPassword" class="flex-grow"></span>
    <Nuxt-Link :to="localePath('/signup')">
      <p class="pr-2 login-bottom-links Roboto-Regular">
        {{ $t('login_text_register') }}
      </p>
    </Nuxt-Link>
  </div>
</template>
<script>
export default {
  props: {
    showForgotPassword: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="less" scoped>
.login-form-footer {
  padding: 0px 24px;
}
.login-bottom-links {
  color: var(--login-bottom-links-color);
}
.link {
  text-decoration: underline;
}
</style>
