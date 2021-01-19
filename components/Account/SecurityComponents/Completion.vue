<template>
  <div class="completion-container">
    <a-icon
      type="check-circle"
      class="text-success"
      style="font-size: 50px"
    ></a-icon>
    <h2 class="Roboto-Medium text-success">{{ $t('text_kyc_complete') }}</h2>
    <p class="Roboto-Regular">
      {{ $t('text_kyc_complete_status') }}
    </p>
    <nuxt-link :to="localePath('/account/dashboard')">
      <a-button type="primary" class="Roboto-Medium">{{
        $t('text_return_to_homepage')
      }}</a-button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push(this.localeRoute('/account/dashboard'))
    }, 3000)
  },
}
</script>

<style scoped>
.completion-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
