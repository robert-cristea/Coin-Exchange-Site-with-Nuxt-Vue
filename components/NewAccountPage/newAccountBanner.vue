<template>
  <div>
    <a-row type="flex" justify="center" direction="column" align="middle" class="banner">

      {{/*Brand logo*/}}
      <div class="brand">
       <NavbarBrand />
      </div>
      {{/*------------*/}}

      <div class="banner-content Roboto-Medium color space">
        <div class="banner-heading">
            <h2>{{ $t('heading_text_1') }}</h2>
        </div>
        <div class="banner-heading flex-cls Roboto-Medium color space">
            <h2>{{ $t('heading_text_2') }} </h2>
            <div class="banner-brand">
              <a @click.prevent="$router.push(localeRoute('/'))">
                <img src="~/assets/images/logo.svg" alt="" />
              </a>  
            </div>
        </div>

        <div class="banner-desc f-36 Roboto-Medium  color space">
            <h2>{{ $t('heading_text_3') }} </h2>
        </div>

        <div class="banner-desc-items">
            <div class="banner-desc-item">
              <span>{{ $t('banner_item_1') }}</span>
            </div>
            <div class="banner-desc-item">
              <span>{{ $t('banner_item_2') }}</span>
            </div>
            <div class="banner-desc-item">
              <span>{{ $t('banner_item_3') }}</span>
            </div>
        </div>


        <div class="sub-banner-desc-items">
            <div class="sub-banner-desc-item">
              <h3>{{ $t('banner_sub_item_heading_1') }}</h3>
              <p>{{ $t('banner_sub_item_desc_1') }}</p>
            </div>
            <div class="sub-banner-desc-item">
              <h3>{{ $t('banner_sub_item_heading_2') }}</h3>
              <p>{{ $t('banner_sub_item_desc_2') }}</p>
            </div>
            <div class="sub-banner-desc-item">
              <h3>{{ $t('banner_sub_item_heading_3') }}</h3>
              <p>{{ $t('banner_sub_item_desc_3') }}</p>
            </div>
        </div>


        <div class="banner-video-wrapper">
            <div class="banner-video-text">
              <h3>{{ $t('banner_video_text') }}</h3>
            </div>
            <div class="banner-video-container">
              <bannerVideo />
            </div>
        </div>



        <div class="banner-logo-container">
            <div class="banner-logo-item">
              <img src="~/assets/images/newAccount2/denizBank.png" />
            </div>
            <div class="banner-logo-item">
              <img src="~/assets/images/newAccount2/VakifBank.png" />
            </div>
            <div class="banner-logo-item">
              <img src="~/assets/images/newAccount2/ZiraatBankasi.png" />
            </div>
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
    background: url(../../assets/images/newAccount2/background2.png)
}
.banner {
    min-height: 100vh;
}

.banner-heading{
    h2{
        font-size: 40px;
        letter-spacing: 0px;
        color: #fff;
        text-align:left;
    }
}

.flex-cls{
  display: flex;
}
.space {
  padding: 40px 0;
}
.color > h2{ 
  color: #fff;
}

.banner-logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10%;
}

// .banner-logo-item {
//   display: flex;
// }

.banner-desc-items {
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    color: #fff;
    font-size: 27px;
}

.f-36 > h2{
      color: #B2DFFF;
    font-size: 36px;

}

.sub-banner-desc-items{ 
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-top: 10%;
}

.banner-video-container {
    width:100%;
    margin: 0 auto;
    div {
      max-width: 733px;
      margin: 0 auto;
    }
}

.banner-video-wrapper {
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-top: 10%;
    margin-bottom: 10%;
    flex-direction: column;
}

.banner-logo-item:nth-child(1){
      margin-left: 0 !important;

}

.banner-logo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
}

.banner-video-text > h3{ 
    font-size: 36px;
    color: #fff;
    text-align: center;
    width: 800px;
    text-align: center;
    margin: 20px auto 5% auto;
}

.sub-banner-desc-item {
    margin: 0 10px;   
    border-radius: 20px;
    padding: 20px;
    border: 1px solid #3A4F60;
    background: #000;
    color: #fff;
  h3 {
    color: #fff;
    font-size: 25px;
  }
  p {
    font-size: 20px;
    color: #B2DFFF;
  }
}

.banner-brand{
    display: flex;
    align-items: center;
  a{
    img {
          width: 300px;
    }
  }

}

.banner-desc-item {
    border-radius: 10px;
    padding: 10px 20px;
    border: 1px solid #95D0F8;
    background: #000;
}


.banner-desc{
    color: #B2DFFF;
    font-size: 36px;
}

.banner-content{
    max-width: 1250px;
    padding: 10px 20px;
}



</style>

<style>

@media (max-width:1290px){
  
  .banner-video-text > h3 {
    width: 100% !important;
  }
  .banner-content {
    width: 100% !important;
  }

  .banner-desc-item{
    margin: 10px;
    width: 100%;
  }


  .sub-banner-desc-item {
    margin: 10px;
  }

  .banner-logo-container{ 
    flex-direction: column;
  }

  .banner-logo-item{
    margin: 10px 0;
    margin-left: 0 !important;
  }

}


@media (max-width:1100px){
   .flex-cls {
    display: flex;
    flex-direction: column;
  }
}


@media (max-width:950px){
  .sub-banner-desc-items {
      flex-direction: column;
  }
  .sub-banner-desc-item {
    margin: 10px 0 !important;
  }
}

@media (max-width:768px){
  .sub-banner-desc-item{
        margin: 10px;
  }
  
  .banner-video-text > h3{
      width: 100% !important;
  }

  .banner-content {
    max-width: none;
    width: 100% !important;
  }
  .banner-heading{
      h2{
          font-size: 26px;
      }
  }

  .banner-desc {
      font-size: 17px;
  }
  .banner-logo-item{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0 !important;
  }

  .sub-banner-desc-items{
      display: flex;
      justify-content: space-between;
      color: #fff;
      margin-top: 10%;
      flex-direction: column;
  }

  
  .banner-logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 10%;
      flex-direction: column;
  }

  .banner-logo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    margin-left: 0;
  }
  .banner-desc-items {
      display: flex;
      justify-content: space-between;
      max-width: 800px;
      margin: 0 auto;
      color: #fff;
      font-size: 27px;
      flex-direction: column;
  }

  .banner-desc-item {
    border-radius: 10px;
    padding: 10px 20px;
    border: 1px solid #95D0F8;
    background: #000;
    margin: 10px auto;
    width: 100%;
  }
  .flex-cls{ 
      flex-direction: column;
  }

}

</style>