<template>
  <div class="store-button cursor-pointer" @click="visitStore">
    <slot name="icon"> </slot>
    <div>
      <p class="download-text">Download from</p>
      <p class="store-name">{{ title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },
  methods: {
    visitStore() {
      if (this.type === 'apple') {
        window.open(
          'https://apps.apple.com/tr/app/google-authenticator/id388497605?'
        )
      } else {
        window.open(
          'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
        )
      }
    },
  },
}
</script>

<style scoped>
.store-button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #eceaef;
  border-radius: 3px;
  padding: 20px;
  width: 192px;
  height: 64px;
}
.download-text,
.store-name {
  margin: 0;
  text-align: justify;
}
.store-name {
  font-size: 20px;
}
.store-icon {
  font-size: 30px;
}
</style>
