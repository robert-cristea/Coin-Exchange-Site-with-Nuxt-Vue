<template>
  <div>
    <a-row type="flex" align="middle" class="main-container">
      <div class="brand-container">
        <img src="~/assets/images/logo.svg" alt="" />
      </div>
      <div class="main-heading">
        <h2>Cointral.com’da Türk Lirası İşlemleri Başladı!</h2>
      </div>
      <div class="sub-heading">
        <h3>Bitcoin ve altcoin işlemlerinde masrafsız işlem avantajıyla Türk Lirası yatırma ve çekme imkanı!</h3>
      </div>
    </a-row>
    <a-row class="center-container">
      <a-col :xs="!isMobile ? 20 : 24" :md="8" class="detail-card">
        <div class="center-container-sub-heading">
          <h3>Cointral.com ile en popüler kripto para çiftlerinde kolay ve hızlı bir şekilde işlemlerinizi yapabilirsiniz. <br> 
          Uluslararası borsalarla entegre olan sistemimizle Bitcoin ve altcoin işlemleri yapabildiğiniz gibi Türk Lirası ile de kripto para satın alabilirsiniz!</h3>
        </div>
        
        <div class="center-container-heading">
          <h2>Bitcoin, Ethereum ve XRP gibi popüler kripto paraları Türk Lirası ile satın almak çok basit</h2>
        </div>

        <div class="center-container-sub-heading">
      
          <h3>1) Saniyeler içinde üye ol</h3>
          <h3>2) Kimlik doğrulamanı yap ve TL yatır</h3>
          <h3>3) Kripto paran hemen hesabına gelsin</h3>
        </div>
      </a-col>

      {{/*Signup Form*/}}
      <a-col :md="8" class="register-card">
        <a-card :bordered="false">
          <div>
            <slot name="auth-card-content"></slot>
            <slot name="auth-card-actions"></slot>
          </div>
        </a-card>
      </a-col>
      {{/*------------*/}}
    </a-row>

    <a-row class="bottom-container">
      <div class="bottom-container-heading">
        <h2>Cointral’de TL çekmek çok basit!</h2>
      </div>

      <div class="bottom-container-items">
        <div class="bottom-container-item">
          <div class="item-number">
            <h2>1</h2>
          </div>

          <div class="item-content" id="first-item">
            <h2>Çekim miktarını belirle</h2>
          </div>
        </div>

        <div class="bottom-container-item">
          <div class="item-number">
            <h2>2</h2>
          </div>
          <div class="item-content">
            <h2>IBAN adresini </br>yaz</h2>
          </div>
        </div>

        <div class="bottom-container-item" id="last-item-container">
          <div class="item-number">
            <h2>3</h2>
          </div>
          <div class="item-content" id="last-item">
            <h2>Dakikalar içinde paran hesabında!</h2>
          </div>
        </div>
      </div>
    </a-row>
    <div class="footer-video-container"><banner /></div>
  </div>
</template>

<script>
import banner from './bannerVideo'

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
.register-card div,
::v-deep .ant-card {
  background: #f6f8f7 !important;
}

.bottom-container-heading > h2 span,
.item-number > h2 {
  font-weight: bold;
}
.main-container {
  flex-direction: column;
  background: url('~assets/images/newAccount3/background-top.png');
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
}

.footer-video-container {
  border: 1px solid #0000;
  background: #064185;
}

#last-item {
  display: flex;
  justify-content: center;
}

#last-item-container {
  width: 170px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-container {
  background: #064185;
  display: flex;
  justify-content: center;
}

.center-container-heading > h2 {
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  font-family: 'Roboto-Regular';
}

.bottom-container-heading {
  text-align: center;
  margin: 6% 0 2%;
}

.bottom-container-heading > h2 {
  color: #fff;
}

.bottom-container-heading > span {
  font-weight: bold;
}

.bottom-container-items {
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
}

#first-item {
  width: 200px !important;
}

.bottom-container-item {
  .item-content {
    border: 1px solid rgba(255, 255, 255, 0.21176);
    width: 200px;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
  }
}

.item-number > h2,
.item-content > h2 {
  color: #fff;
  text-align: center;
}

.center-container-sub-heading > h3 {
  color: #fff;
  font-size: 18px;
  margin: 20px 0;
}

.brand-container {
  width: 100%;
  padding: 20px;
}

.main-heading {
  margin-bottom: 20px;
}

.main-heading > h2 {
  color: #fff;
  font-size: 26px;
  text-align: center;
  font-weight: bold;
}

.sub-heading > h3 {
  color: #fff;
  font-size: 17px;
}

.detail-card {
  height: 100%;
  padding: 20px;
  margin: 0 20px;
}

.bottom-container {
  background: url('~assets/images/newAccount3/background-bottom.png');
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
}
.register-card {
  margin-top: -4%;
  border-radius: 20px;
  div {
    border-radius: 20px;
  }
}

.sub-heading {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}

.brand-container {
  img {
    width: 147px;
  }
}

@media (max-width: 676px) {
  .card-height {
    height: auto;
  }
  .bottom-container {
    height: auto;
  }
}

@media (max-width: 900px) {
  .detail-card {
    height: 100%;
    padding: 20px;
    margin: 0 20px;
    width: 330px;
  }

  .register-card {
    width: 370px;
  }
}

@media (max-width: 768px) {
  .register-card {
    width: auto;
  }
  .center-container-heading > h2 {
    text-align: center;
  }
  .detail-card {
    margin: 0 auto;
  }
  .sub-heading > h3 {
    max-width: 350px;
  }
  .center-container-sub-heading > h3 {
    color: #fff;
    font-size: 18px;
    width: 350px;
    text-align: center;
    margin: 20px auto;
    max-width:250px;
  }

  .bottom-container {
    height: auto;
  }
  .register-card {
    border-radius: 20px;
    margin: 20px;
  }

  #last-item {
    width: 100%;
  }

  #last-item-container {
    width: 300px;
  }

  .card-height {
    height: auto;
  }
  .bottom-container-item {
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 10px auto;
    flex-direction: column;
    width: 100%;
  }

  .bottom-container-items {
    flex-direction: column;
    margin: 4% auto;
    align-items: center;
  }

  .sub-heading {
    display: flex;
    flex-direction: column;
  }

  .center-container {
    background: #064185;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
