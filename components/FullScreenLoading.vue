<template>
  <div v-if="loading" class="full-screen-loading">
    <div>
      <a-icon type="loading" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/ant/variables.less';

.full-screen-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;

  i {
    font-size: 64px;
    color: @primary-color;
  }
}
</style>
