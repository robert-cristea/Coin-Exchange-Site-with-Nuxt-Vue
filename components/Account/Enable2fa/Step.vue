<template>
  <div class="text-center Roboto-Medium">
    <h2 v-if="stepNo">{{ $t('text_step') }} {{ stepNo }}</h2>
    <p v-if="subtitle" class="card-2fa-subtitle">{{ subtitle }}</p>
    <slot name="store-icons"></slot>
    <slot name="content"> </slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    subtitle: {
      required: false,
      type: String,
    },
    stepNo: {
      required: false,
      type: Number,
    },
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.card-2fa-subtitle {
  color: #778090;
  width: 70%;
  margin: auto;
}
</style>
