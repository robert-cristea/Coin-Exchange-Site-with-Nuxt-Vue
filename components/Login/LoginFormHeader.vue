<template>
  <div class="text-center">
    <h2 class="Roboto-Medium">{{ $t('login_text') }}</h2>
    <p class="login-card-subtitle Roboto-Regular">{{ $t('login_text_info') }}</p>
    <h4 class="cointral-url Roboto-Regular">
      <span class="cointral-url-protocol">https://</span>www.cointral.com
    </h4>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.login-card-subtitle {
  color: #9aa0ac;
}

.cointral-url {
  margin: auto;
  width: 70%;
  padding: 10px 8px;
  font-weight: 600;
  border: 1px solid #f5f5f5;
  border-radius: 18px;
}

.cointral-url .cointral-url-protocol {
  color: #1dc077;
}
</style>
