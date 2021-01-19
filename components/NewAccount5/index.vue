<template>
  <div style="overflow-x: hidden">
    <div type="flex" align="middle" class="main-container">
      <div class="container">
        <div class="brand-container">
          <img src="~/assets/images/logo.svg" alt="" />
        </div>
        <a-row type="flex" justify="space-between" class="center-container">
          <a-col :span="24" :md="15">
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
              <a-button
                size="large"
                @click="$router.push(localeRoute('/signup'))"
              >
                HEMEN AL SAT!
              </a-button>
              <!-- <a-button @click="$router.push(localeRoute('/signup'))"
              >HEMEN AL SAT!</a-button
            > -->
            </div>
          </a-col>

          {{/*Signup Form*/}}
          <a-col :span="24" :md="9" class="register-card">
            <a-card :bordered="false">
              <template slot="title">
                <div class="card-header">
                  <h2>COINTRAL’E HOŞGELDİNİZ</h2>
                </div>
                <div class="card-sub-header">
                  <h5>Hemen ücretsiz hesap oluşturun!</h5>
                </div>
              </template>
              <div class="card-btn">
                <a-button
                  size="large"
                  @click="$router.push(localeRoute('/signup'))"
                  >HESAP OLUŞTUR</a-button
                >
              </div>
            </a-card>
            <!-- <a-card :bordered="false">
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
            </a-card> -->
          </a-col>
          {{/*------------*/}}
        </a-row>
      </div>
    </div>

    <div class="section-heading">
      <h2>TL, USD, EUR Seçenekleri İle</h2>
      <h1>Cointral Beklenenden Fazlası</h1>
    </div>
    <div class="bottom-container">
      <div class="container">
        <div class="footer-video-container"><banner /></div>
      </div>
    </div>
    <div class="items-container">
      <div class="container">
        <a-row type="flex" :gutter="[20, 30]">
          <a-col
            v-for="(card, i) in cards"
            :key="i"
            :span="24"
            :sm="12"
            :md="6"
          >
            <div class="banner-card-container">
              <div class="header-icon">
                <img
                  :src="require(`~/assets/images/newAccount4/img${i + 1}.png`)"
                />
              </div>
              <div class="card-heading">
                <h2>{{ card.title }}</h2>
              </div>
              <div class="card-desc">
                <p>
                  Cointral ile en popüler kripto para çiftlerinde kolay ve
                  sorunsuz bir şekilde işlemlerinizi yapabilir, uluslararası
                  borsalarla entegre olarak yüksek likiditeli pazar yapısından
                  faydalanabilirsiniz.
                </p>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

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
        © 2018 Cointral - Tüm hakları saklıdır. Design by sampledigitallab.com.
      </h2>
    </div>
  </div>
</template>

<script>
import banner from './bannerVideo'
const content =
  'Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla entegre olarak yüksek likiditeli pazar yapısından faydalanabilirsiniz.'
const cards = [
  { title: 'AI | Sat', content },
  { title: 'Şube', content },
  { title: 'Altın', content },
  { title: 'Kredi Kartı', content },
  { title: 'P2P', content },
  { title: 'Hızlı Takas', content },
  { title: 'OTC', content },
  { title: 'Gayrimenkul', content },
]
export default {
  layout: 'login',
  components: {
    banner,
  },
  data: () => ({
    cards,
  }),
  mounted() {},
}
</script>
<style lang="less" scoped>
.ant-card-head-title {
  display: block;
}
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
  height: 500px;
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
  border-radius: 8px;
  text-align: center;
  padding: 25px;
}

.header-icon {
  width: 100px;
  border-radius: 50%;
  background: #eaf0fb;
  height: 100px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-heading {
  h2 {
    color: #333333;
    font-size: 24px;
  }
}

.card-desc {
  p {
    color: #9e9e9e;
    font-size: 14px;
  }
}

.section-heading {
  h2 {
    font-size: 39px;
    color: #2f2f33;
    font-weight: 200;
  }
  h1 {
    font-size: 46px;
    color: #2f2f33;
  }
}
.card-header > h2 {
  text-align: left;
  color: #003580;
  font-size: 23px;
}

.card-sub-header > h5 {
  text-align: left;
  color: #424242;
}

.card-btn > button {
  background: #0764e3;
  width: 100%;
  color: #fff;
}

.section-heading > h2 span,
.item-number > h2 {
  font-weight: bold;
}
.main-container {
  min-height: 850px;
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
  padding: 60px 0;
}

.center-container-heading > h2 {
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  font-family: 'Roboto-Regular';
}

.items-container {
  margin-bottom: 160px;
  background: url('~assets/images/newAccount4/shape.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 115%;
}

.items-container2 {
  margin: 2% auto;
  background: url('~assets/images/newAccount4/shape.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 115%;
}

.section-heading {
  text-align: center;
  margin: 0 0 2%;
}

.section-heading > h2 {
  color: #2f2f33;
}

.section-heading > span {
  font-weight: bold;
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
}

.main-heading {
  margin-bottom: 20px;
}

.main-heading > h2 {
  color: #fff;
  font-size: 42px;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.btn {
  margin: 50px 0;
  text-align: left;
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
  text-align: left;
}

.bottom-container {
  background: url('~assets/images/newAccount4/ellipse-2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: -25%;
}
.register-card {
  border-radius: 8px;
  div {
    border-radius: 8px;
  }
}

.brand-container {
  img {
    max-width: 348px;
    width: 100%;
  }
}
</style>
