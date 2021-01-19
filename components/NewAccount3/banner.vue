<template>
  <div>
    <a-row type="flex" justify="center" direction="column" align="middle" class="banner">

      {{/*Brand logo*/}}
      <div class="brand">
       <NavbarBrand />
      </div>
      {{/*------------*/}}

      <div class="banner-content">
        <div class="banner-heading">
            <h2>{{ $t('banner_heading_text') }}</h2>
        </div>
        <div class="banner-desc Roboto-Regular">
            <p>{{ $t('banner_desc_text') }}</p>
        </div>
        <div class="banner-video">
            <bannerVideo />
        </div>
        <div class="banner-desc Roboto-Regular">
            <p>{{ $t('banner_desc_text2') }}</p>
        </div>
      </div>
    </a-row>
  </div>
</template>

<script>
import bannerVideo from './bannerVideo'

export default {
  layout: 'banner',
  components: {
    bannerVideo
  },
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
<style lang="less" scoped>
.brand {
    width: 100%;
    padding: 20px;
    margin: 20px 0 30px 10px;
}
.banner{
    position: relative;
    background: url(../../assets/images/newAccount/banner.png)
}
.banner {
    min-height: 100vh;
}

.banner-heading{
    h2{
        font: normal normal 900 40px/44px Gotham;
        letter-spacing: 0px;
        color: #fff;
        text-align:left;
    }
}

.banner-desc{
    font-size: 24px;
    margin-top: 40px;
    color: #fff;
}

.banner-content{
    width: 800px;
    padding: 10px 20px;
}


@media (max-width:768px){
.banner-heading{
    h2{
        font-size: 25px;
    }
}
    .banner-desc {
        font-size: 17px;
    }
}

</style>
