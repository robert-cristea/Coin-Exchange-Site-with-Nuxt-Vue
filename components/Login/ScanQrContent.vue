<template>
  <div class="h-100 w-100 text-center scan-qr-container">
    <h3 class="scan-qr-text">
      {{ $t('login_text_qr') }}
    </h3>
    <div class="d-flex justify-center">
      <div>{{ $t('login_text_scan') }}</div>
      <div>{{ $t('login_text_qr') }}</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.scan-qr-container {
  background-color: #fafafa;
  padding: 20px;
  margin: 20px auto;
}
.scan-qr-text {
  color: var(--login-tab-title-inactive-color);
}
.justify-center {
  justify-content: center;
}
</style>
