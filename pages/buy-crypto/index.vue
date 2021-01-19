<template>
  <div></div>
</template>

<script>
export default {
  middleware({ app, redirect }) {
    redirect(app.localeRoute('/buy-crypto/USD/BTC'))
  },
}
</script>
