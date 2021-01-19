<template>
  <div>
    <a-row type="flex" align="middle" class="banner">
      <div class="banner-video">
        <iframe style="border: none" :src="videoLink"></iframe>
      </div>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: 'bannerVideo',
  data: () => ({
    videoLink: 'https://www.youtube.com/embed/x0XCSkZit3M?autoplay=1',
  }),
}
</script>
<style lang="less" scoped>
.banner {
  justify-content: end;
  max-width: 1900px;
  border-radius: 60px;
  margin: 4% auto;
}

.banner-video {
  width: 100%;
}
iframe {
  width: 100%;
  height: 400px;
  border-radius: 29px;
}

@media (max-width: 768px) {
  iframe {
    width: 100%;
    height: 300px;
  }
}
</style>
