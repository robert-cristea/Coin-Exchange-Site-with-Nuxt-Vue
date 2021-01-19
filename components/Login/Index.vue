<template>
  <div style="margin: 50px 0">
    <a-row type="flex" justify="center" align="middle">
      <a-col :xs="!isMobile ? 20 : 24" :md="8">
        <a-card :bordered="false" class="card-box-shadow border-none">
          <slot name="auth-card-header"></slot>
          <div class="my-20">
            <slot name="auth-card-feedback"></slot>
          </div>
          <slot name="auth-card-content"></slot>
          <slot name="auth-card-actions"></slot>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    isMobile: null,
  }),
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
}
</script>
