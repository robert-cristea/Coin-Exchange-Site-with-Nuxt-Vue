<template>
  <div class="text-center" v-if="!$nuxt.$route.path.includes('new-account3')">
    <p>
      {{ $t('login_text_already_register') }}
      <Nuxt-Link class="login-bottom-links" :to="localePath('/login')">
        <span>{{ $t('login_text') }}</span>
      </Nuxt-Link>
    </p>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.login-bottom-links {
  color: var(--login-bottom-links-color);
}
</style>
