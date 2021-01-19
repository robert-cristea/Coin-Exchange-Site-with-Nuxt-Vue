<template>
  <a-modal
    id="advert"
    :visible="visible"
    @cancel="$emit('close')"
    :body-style="{ padding: '0px' }"
    :header="null"
    :footer="null"
    :width="750"
    :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
    :closable="false"
    :centered="true"
    :destroyOnClose="true"
    :maskClosable="true"
  >
    <div class="content">
      <a
        href="https://twitter.com/Cointral/status/1337083246207791111"
        target="_blank"
      >
        <img width="100%" height="auto" alt="kyc_warning" :src="popUpImage" />
      </a>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'AdvertPopUp',
  props: {
    visible: {
      required: true,
      default: false,
    },
  },
  computed: {
    popUpImage() {
      const cke = this.$cookies.get('i18n_redirected')
      if (cke === 'tr') {
        return require('~/assets/images/homepage/popup_TR.jpg')
      } else {
        return require('~/assets/images/homepage/popup_EN.png')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>
