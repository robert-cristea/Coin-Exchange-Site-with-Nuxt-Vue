<template>
  <div>
    <a-row type="flex" align="middle" class="main-container">
      <div class="brand-container">
        <img src="~/assets/images/logo.svg" alt="" />
      </div>
      <a-row class="center-container">
        <a-col :xs="!isMobile ? 20 : 24" :md="8" class="detail-card">
          <div class="main-heading">
            <h2>Türkiye’nin En Kapsamlı</h2>
            <h2>Kripto Para Platformu</h2>
          </div>
          <div class="sub-heading">
            <h3>Kripto Para İle Yapabileceğiniz Tüm İşlemler Cointral’de…</h3>
          </div>
          <div class="btn">
            <a-button>HEMEN AL SAT!</a-button>
          </div>
        </a-col>

        {{/*Signup Form*/}}
        <a-col :md="8" class="register-card">
          <a-card :bordered="false">
            <div class="card-header">
              <h2>COINTRAL’E HOŞGELDİNİZ</h2>
            </div>
            <div class="card-sub-header">
              <h4>Hemen ücretsiz hesap oluşturun!</h4>
            </div>
            <div class="card-btn">
              <a-button>HESAP OLUŞTUR</a-button>
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
      <div class="item-col">
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
              bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla
              entegre olarak yüksek likiditeli pazar yapısından
              faydalanabilirsiniz.
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
              Cointral şubelerinden profesyonel ekibimizin desteği ile
              alım-satım işlemlerinizi en kolay ve güvenilir şekilde
              gerçekleştirebilirsiniz!
            </p>
          </div>
        </div>
      </div>

      <div class="item-col">
        <div class="banner-card-container">
          <div class="header-icon">
            <img src="~/assets/images/newAccount4/img3.png" />
          </div>
          <div class="card-heading">
            <h2>Altın</h2>
          </div>
          <div class="card-desc">
            <p>
              Bitcoin, Ethereum ve BNB Coin ile güvenli bir şekilde gram altın
              satın alabilmenizi sağlar.
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
              Cointral, kredi kartı ile Simplex, Paxful, Moonpay ve Koinal gibi
              ödeme sağlayıcılarıyla kolay bir şekilde kripto para almanızı
              sağlar.
            </p>
          </div>
        </div>
      </div>
    </a-row>

    <a-row class="items-container2">
      <div class="items-container">
        <div class="item-col">
          <div class="banner-card-container">
            <div class="header-icon">
              <img src="~/assets/images/newAccount4/img5.png" />
            </div>
            <div class="card-heading">
              <h2>P2P</h2>
            </div>
            <div class="card-desc">
              <p>
                Cointral P2P, alıcı ve satıcıların tekliflerini yayınlamalarını
                sağlayan bir ilan hizmeti sunmaktadır. Kullanıcılar, belirlenen
                fiyat, miktar ve ödeme yöntemi konusunda anlaşarak işlemlerini
                gerçekleştirebilir.
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
                Cointral Hızlı Takas, 200’den fazla kripto para çiftini hızlıca
                takas etmenizi sağlar. Piyasadaki en uygun fiyatlarla kripto
                paralarınızı saniyeler içinde ve anonim olarak takas edebilme
                deneyimini yaşayın!
              </p>
            </div>
          </div>
        </div>

        <div class="item-col">
          <div class="banner-card-container">
            <div class="header-icon">
              <img src="~/assets/images/newAccount4/img7.png" />
            </div>
            <div class="card-heading">
              <h2>OTC</h2>
            </div>
            <div class="card-desc">
              <p>
                Cointral OTC, kullanıcılarına yüksek miktarlı kripto para
                işlemleri için kişiselleştirilmiş, hızlı ve güvenli yöntemler
                sunar.
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
                Cointral, kripto paralarla gayrimenkul satın almanıza yardımcı
                olur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </a-row>

    <div class="footer-container-heading">
      <h1>Mobil Uygulamamızla her an yanınızdayız!</h1>
      <h2>İşlemlerinize dilediğiniz yerde devam edebilmek için Cointral</h2>
      <h2>mobil uygulamasını hemen indirin.</h2>
    </div>

    <div class="footer-copyrights">
      <div class="copyrights">
        <span> © 2018 Cointral - Tüm hakları saklıdır. </span>
        <span
          >Designed by
          <a href="http://sampledigitallab.com" target="_blank"
            >sampledigitallab.com.</a
          ></span
        >
      </div>
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

.item-col {
  display: flex;
  width: 100%;
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

.footer-copyrights > .copyrights > span {
  font-size: 22px;

  width: 100%;
  color: #fff;
}

.footer-copyrights {
  position: relative;
  text-align: center;
  margin: 0 auto;
  background: url('~assets/images/newAccount4/iphone-group2.png');
  height: 1000px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-container-heading {
  text-align: center;
  margin: 0 auto 15% auto;
}

.banner-card-container {
  background: #f8f9fb;
  // max-width: 300px;
  width: 100%;
  padding: 25px;
  border-radius: 15px;

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
    margin: 20px 0;
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
  height: 56px;
  margin: 10px 0 0 0;
  border-radius: 10px;
}

.bottom-container-heading > h2 span,
.item-number > h2 {
  font-weight: bold;
}
.main-container {
  flex-direction: column;
  background: url('~assets/images/newAccount4/bottom-shape2.png');
  height: 1900px;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.copyrights {
  span {
    color: #fff;
  }
}

.footer-video-container {
  border: 1px solid #0000;
  width: 100%;
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
  max-width: 1280px;

  display: flex;
  justify-content: space-between;
  margin: 2% auto;
}

.items-container2 {
  margin: 2% auto;
  background: url('~assets/images/newAccount4/shape.png');
  height: 1000px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 120%;
}

.bottom-container-heading {
  text-align: center;
  margin: 5% 0 2% 0;
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
  // background: #0095cb;
}

.main-heading {
  margin-bottom: 20px;
}

.main-heading > h2 {
  color: #fff;
  font-size: 58px;
  text-align: center;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.btn {
  margin: 50px 0;
}

.btn > button {
  width: 300px;
  height: 70px;
  border-radius: 50px;
  font-size: 25px;
  color: #003580;
  font-weight: 700;
}

.sub-heading > h3 {
  color: #fff;
  font-size: 34px;
}

.detail-card {
  height: 100%;
  padding: 20px;
  margin: 0 20px;
}

.bottom-container {
  background: url('~assets/images/newAccount4/ellipse-2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: -40%;
  display: flex;
  justify-content: space-between;
}
.register-card {
  width: 500px;
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

// Media Queries(1366- 922- 900- 768 - 676 - 600)
@media (max-width: 1366px) {
  .bottom-container {
    height: auto;
    margin: 0 10px;
  }
  .bottom-container-heading h1 {
    font-size: 38px;
    color: #2f2f33;
  }
  .bottom-container-heading h2 {
    font-size: 30px;
    color: #2f2f33;
  }
  .main-container {
    flex-direction: column;
    background: url(/_nuxt/assets/images/newAccount4/bottom-shape2.png);
    height: 1000px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .main-heading > h2 {
    color: #fff;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin: 0;
    text-align: left;
  }

  .sub-heading > h3 {
    color: #fff;
    font-size: 26px;
  }

  .brand-container img {
    width: 300px;
  }

  .btn > button {
    width: 250px;
    height: 50px;
    border-radius: 50px;
    font-size: 20px;
    color: #003580;
    font-weight: 700;
  }

  .card-btn > button {
    background: #0764e3;
    width: 100%;
    color: #fff;
    height: 40px;
    margin: 10px 0 0 0;
    border-radius: 10px;
  }

  .footer-copyrights {
    position: relative;
    text-align: center;
    margin: 0 auto;
    background: url(/_nuxt/assets/images/newAccount4/iphone-group2.png);
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .copyrights {
    margin-top: 10%;
  }

  .footer-container-heading h1 {
    font-size: 30px;
  }

  .footer-container-heading h2 {
    font-size: 24px;
  }

  .footer-container-heading {
    text-align: center;
    margin: 0 auto 10% auto;
  }

  .footer-copyrights > .copyrights > span {
    font-size: 17px;
    width: 100%;
    color: #fff;
  }
}

@media (max-width: 992px) {
  .main-heading > h2 {
    color: #fff;
  }
  .banner-card-container {
    width: auto;
    max-width: 300px;
  }
  .footer-copyrights {
    margin: 0 auto;
    height: 400px;
    display: flex;
    flex-direction: column;
    /* margin-top: 14%; */
    align-items: center;
    justify-content: center;
  }

  .footer-copyrights > span:nth-child(1) {
    margin-top: 14%;
  }
  .item-col {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .items-container {
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    margin: 2% auto;
    flex-direction: column;
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

  .banner-card-container {
    width: auto;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .copyrights {
    margin-top: 15%;
    span {
      display: block;
    }
  }

  .footer-copyrights {
    margin: 0 auto;
    height: 300px !important;
    display: flex;
    flex-direction: column;
    /* margin-top: 14%; */
    align-items: center;
    justify-content: center;
  }

  .brand-container img {
    width: 300px;
  }

  .bottom-container-heading h2 {
    font-size: 30px;
    color: #2f2f33;
  }

  .bottom-container-heading h1 {
    font-size: 35px;
    color: #2f2f33;
  }

  .footer-container-heading h1 {
    font-size: 35px;
  }

  .footer-container-heading h2 {
    font-size: 22px;
  }

  .footer-container-heading {
    text-align: center;
    margin: 0 3% 15% 3%;
  }

  .banner {
    margin: 4% 2%;
  }

  .banner-card-container {
    background: #f8f9fb;
    padding: 25px;
    border-radius: 15px;
    margin: 10px;
    max-width: 300px;
  }

  .main-heading > h2 {
    color: #fff;
    font-weight: bold;
    margin: 0;
    text-align: left;
  }

  .main-heading > h2 {
    text-align: center;
  }

  .btn > button {
    width: 250px;
    height: 50px;
    font-weight: 700;
    font-size: 20px;
  }

  .sub-heading > h3 {
    color: #fff;
    font-size: 28px;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
    padding: 20px;
    margin: 0 auto;
    height: auto;

    width: 100%;
  }

  .register-card {
    width: auto;
  }

  .center-container-heading > h2 {
    text-align: center;
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
    margin: 0 10px;
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

    text-align: center;
  }

  .center-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .main-container {
    height: 1200px;
  }
}

@media (max-width: 676px) {
  .footer-copyrights > .copyrights > span {
    font-size: 15px;
  }

  .banner-card-container {
    width: 100%;
    min-height: 400px;
  }

  .footer-container-heading {
    text-align: center;
    margin: 10% auto 15% auto;
    padding: 0 20px;
  }

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
  .footer-copyrights {
    margin: 0 auto;
    height: 400px;
  }
}

@media (max-width: 600px) {
  .item-col {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
