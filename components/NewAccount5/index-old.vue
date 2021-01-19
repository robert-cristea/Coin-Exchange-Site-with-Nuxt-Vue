<template>
  <div style="overflow-x: hidden">
    <a-row type="flex" align="middle" class="main-container">
      <div class="brand-container">
        <img src="~/assets/images/logo.svg" alt="" />
      </div>
      <a-row class="center-container">
        <a-col :span="10" class="detail-card">
          <div class="main-heading">
            <h2>
              Türkiye’nin En Kapsamlı <br />
              Kripto Para Platformu
            </h2>
          </div>
          <div class="sub-heading">
            <h3>
              Kripto Para İle Yapabileceğiniz Tüm <br />
              İşlemler Cointral’de…
            </h3>
          </div>
          <div class="btn">
            <a-button size="larg" @click="$router.push(localeRoute('/signup'))">
              HEMEN AL SAT!
            </a-button>
            <!-- <a-button @click="$router.push(localeRoute('/signup'))"
              >HEMEN AL SAT!</a-button
            > -->
          </div>
        </a-col>

        {{/*Signup Form*/}}
        <a-col :span="6" class="register-card">
          <a-card :bordered="false">
            <div class="card-header">
              <h2>COINTRAL’E HOŞGELDİNİZ</h2>
            </div>
            <div class="card-sub-header">
              <h4>Hemen ücretsiz hesap oluşturun!</h4>
            </div>
            <div class="card-btn">
              <a-button @click="$router.push(localeRoute('/signup'))"
                >HESAP OLUŞTUR</a-button
              >
            </div>
          </a-card>
        </a-col>
        {{/*------------*/}}
      </a-row>
    </a-row>

    <div class="bottom-container-heading">
      <h2>TL, USD, EUR Seçenekleri İle</h2>
      <h1>Cointral Beklenenden Fazlası</h1>
    </div>
    <a-row class="bottom-container">
      <div class="footer-video-container"><banner /></div>
    </a-row>

    <a-row class="items-container">
      <div class="banner-card-container">
        <div class="header-icon">
          <img src="~/assets/images/newAccount4/img1.png" />
        </div>
        <div class="card-heading">
          <h2>AI | Sat</h2>
        </div>
        <div class="card-desc">
          <p>
            Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
            bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla entegre
            olarak yüksek likiditeli pazar yapısından faydalanabilirsiniz.
          </p>
        </div>
      </div>

      <div class="banner-card-container">
        <div class="header-icon">
          <img src="~/assets/images/newAccount4/img2.png" />
        </div>
        <div class="card-heading">
          <h2>Şube</h2>
        </div>
        <div class="card-desc">
          <p>
          Şubelerimizden profesyonel ekibimizin desteğiyle nakit olarak 
          işlem gerçekleştirebilirsiniz.
          </p>
        </div>
      </div>

      <div class="banner-card-container">
        <div class="header-icon">
          <img src="~/assets/images/newAccount4/img3.png" />
        </div>
        <div class="card-heading">
          <h2>Altın</h2>
        </div>
        <div class="card-desc">
          <p>
            Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
            bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla entegre
            olarak yüksek likiditeli pazar yapısından faydalanabilirsiniz.
          </p>
        </div>
      </div>

      <div class="banner-card-container">
        <div class="header-icon">
          <img src="~/assets/images/newAccount4/img4.png" />
        </div>
        <div class="card-heading">
          <h2>Kredi Kartı</h2>
        </div>
        <div class="card-desc">
          <p>
            Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
            bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla entegre
            olarak yüksek likiditeli pazar yapısından faydalanabilirsiniz.
          </p>
        </div>
      </div>
    </a-row>

    <a-row class="items-container2">
      <div class="items-container">
        <div class="banner-card-container">
          <div class="header-icon">
            <img src="~/assets/images/newAccount4/img5.png" />
          </div>
          <div class="card-heading">
            <h2>P2P</h2>
          </div>
          <div class="card-desc">
            <p>
              Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
              bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla
              entegre olarak yüksek likiditeli pazar yapısından
              faydalanabilirsiniz.
            </p>
          </div>
        </div>

        <div class="banner-card-container">
          <div class="header-icon">
            <img src="~/assets/images/newAccount4/img6.png" />
          </div>
          <div class="card-heading">
            <h2>Hızlı Takas</h2>
          </div>
          <div class="card-desc">
            <p>
              Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
              bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla
              entegre olarak yüksek likiditeli pazar yapısından
              faydalanabilirsiniz.
            </p>
          </div>
        </div>

        <div class="banner-card-container">
          <div class="header-icon">
            <img src="~/assets/images/newAccount4/img7.png" />
          </div>
          <div class="card-heading">
            <h2>OTC</h2>
          </div>
          <div class="card-desc">
            <p>
              Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
              bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla
              entegre olarak yüksek likiditeli pazar yapısından
              faydalanabilirsiniz.
            </p>
          </div>
        </div>

        <div class="banner-card-container">
          <div class="header-icon">
            <img src="~/assets/images/newAccount4/img8.png" />
          </div>
          <div class="card-heading">
            <h2>Gayrimenkul</h2>
          </div>
          <div class="card-desc">
            <p>
              Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz
              bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla
              entegre olarak yüksek likiditeli pazar yapısından
              faydalanabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </a-row>

    <div class="footer-container-heading">
      <h1>Mobil Uygulamamızla her an yanınızdayız!</h1>
      <h2>İşlemlerinize dilediğiniz yerde devam edebilmek için Cointral</h2>
      <h2>mobil uygulamasını hemen indirin.</h2>
    </div>
    <div class="store-buttons">
      <a-row :gutter="[48, 0]">
        <a
          href="https://apps.apple.com/tt/app/cointral-bitcoin-al-sat/id1536116477"
          target="_blank"
          :span="4"
          :offset="8"
          ><img src="~/assets/images/newAccount4/app-store.svg"
        /></a>
        <a
          href="https://play.google.com/store/apps/details?id=com.cointral.exchange"
          target="_blank"
          :span="4"
          ><img src="~/assets/images/newAccount4/play-store.svg"
        /></a>
      </a-row>
    </div>

    <div class="footer-copyrights">
      <h2>
        © 2018 Cointral - Tüm hakları saklıdır. 
      </h2>
    </div>
  </div>
</template>

<script>
import banner from './bannerVideo'

export default {
  layout: 'login',
  components: {
    banner,
  },
  data: () => ({}),
  mounted() {},
}
</script>
<style lang="less" scoped>
.register-card div,
::v-deep .ant-card {
  background: #f6f8f7 !important;
}
.store-buttons {
  margin-bottom: 100px;
  text-align: center;
}
.footer-container-heading {
  h1 {
    color: #2f2f33;
  }
  h2 {
    color: #696969;
  }

  h1 {
    font-size: 47px;
  }

  h2 {
    font-size: 25px;
  }
}

.footer-copyrights > h2 {
  font-size: 22px;
  position: absolute;
  bottom: 23%;
  left: 0;
  width: 100%;
  color: #fff;
}

.footer-copyrights {
  position: relative;
  text-align: center;
  margin: 0 auto;
  background: url('~assets/images/newAccount4/iphone-group2.png');
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-container-heading {
  text-align: center;
  margin: 40px;
}

.banner-card-container {
  background: #f8f9fb;
  width: 300px;
  padding: 25px;
  margin: 10px;
}

.header-icon {
  width: 90px;
  border-radius: 50%;
  background: #eaf0fb;
  padding: 10px 20px;
  height: 80px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-heading {
  text-align: center;
  h2 {
    color: #333333;
    font-size: 24px;
  }
}

.card-desc {
  text-align: center;
  p {
    color: #696969;
    font-size: 16px;
  }
}

.bottom-container-heading {
  h2 {
    font-size: 39px;
    color: #2f2f33;
  }
  h1 {
    font-size: 46px;
    color: #2f2f33;
  }
}
.card-header > h2 {
  color: #003580;
  font-size: 23px;
}

.card-sub-header > h2 {
  color: #424242;
}

.card-btn > button {
  background: #0764e3;
  width: 100%;
  color: #fff;
}

.bottom-container-heading > h2 span,
.item-number > h2 {
  font-weight: bold;
}
.main-container {
  height: 850px;
  flex-direction: column;
  background: url('~assets/images/newAccount4/slide.png');
  background-size: 170% 160%;
  background-repeat: no-repeat;
  background-position: bottom;
  background-position-y: -240px;
  padding-bottom: 100px;
  margin-bottom: 80px;
}

.footer-video-container {
  border: 1px solid #0000;
  width: 60%;
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
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5%;
}

.center-container-heading > h2 {
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  font-family: 'Roboto-Regular';
}

.items-container {
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  margin: 2% auto;
}

.items-container2 {
  margin: 2% auto;
  background: url('~assets/images/newAccount4/shape.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 115%;
}

.bottom-container-heading {
  text-align: center;
  margin: 0 0 2%;
}

.bottom-container-heading > h2 {
  color: #2f2f33;
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
  width: 170px !important;
}

.bottom-container-item {
  .item-content {
    border: 1px solid rgba(255, 255, 255, 0.21176);
    width: 254px;
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
  width: 334px;
  margin: 20px 0;
}

.brand-container {
  width: 100%;
  padding: 9% 9% 2% 9%;
  text-align: center;
}

.main-heading {
  margin-bottom: 20px;
}

.main-heading > h2 {
  color: #fff;
  font-size: 42px;
  text-align: center;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.btn {
  margin: 50px 0;
}

.btn > button {
  width: 190px;
  height: 50px;
  border-radius: 50px;
  color: #003580;
  font-weight: 700;
}

.sub-heading > h3 {
  color: #fff;
  font-size: 25px;
  font-weight: 200;
}

.detail-card {
  height: 100%;
  margin: 0 20px;
}

.bottom-container {
  background: url('~assets/images/newAccount4/ellipse-2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: -25%;
  display: flex;
  justify-content: space-between;
}
.register-card {
  border-radius: 8px;
  div {
    border-radius: 8px;
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
    width: 436px;
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
  .main-heading {
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .center-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 5%;
    flex-direction: column;
    align-items: center;
  }
  .detail-card {
    height: 100%;
    padding: 20px;
    margin: 0 20px;
    width: 100%;
  }

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
    max-width: 250px;
  }

  .bottom-container {
    height: auto;
  }
  .register-card {
    border-radius: 8px;
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
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}

@media (max-width: 676px) {
  .card-height {
    height: auto;
  }
  .bottom-container {
    height: auto;
  }

  .items-container {
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    margin: 0;
    flex-direction: column;
    align-items: center;
  }

  .items-container2 {
    height: auto;
  }

  .footer-copyrights[data-v-5d221d42] {
    margin: 0 auto;
    height: 400px;
  }
}
</style>
