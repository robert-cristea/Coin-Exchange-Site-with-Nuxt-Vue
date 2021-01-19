<template>
  <div>
    <a-row type="flex" align="middle">

      {{/*Banner Side*/}}
      <a-col :xs="!isMobile ? 20 : 24" :md="17" class="card-height">
        <banner />
      </a-col>
      {{/*------------*/}}


      {{/*Signup Form*/}}
      <a-col :xs="!isMobile ? 20 : 24" :md="7" class="card-height">
        <a-card :bordered="false" class="border-none" style="min-height: 100vh;">
          <div>        
            <slot name="auth-card-header"></slot>
            <div class="my-20">
              <slot name="auth-card-feedback"></slot>
            </div>
            <slot name="auth-card-content"></slot>
            <slot name="auth-card-actions"></slot>
          </div>
        </a-card>
      </a-col>
      {{/*------------*/}}

    </a-row>
  </div>
</template>

<script>
import banner from './newAccountBanner'

export default {
  layout: 'login',
    components: {
    banner,
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
.card-height {
    height: 100vh;
}

@media (max-width:768px){
    .card-height {
        height: auto;
    }
}

@media (max-width:768px){
  .banner-content {
    width: 100%;
  }
  .banner-heading{
      h2{
          font-size: 26px;
      }
  }
  .sub-banner-desc-item{
        margin: 10px;
  }
  .banner-video-text > h3 {
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
    margin: 20px auto;
    width: 100%;
  }
  .flex-cls{ 
      flex-direction: column;
  }

}

</style>