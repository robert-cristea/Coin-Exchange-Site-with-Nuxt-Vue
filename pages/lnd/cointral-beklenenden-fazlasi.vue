<template>
  <div class="new-account-6">
    <section class="header">
      <div class="container">
        <div class="logo">
          <img src="~/assets/images/logo.svg" alt="" />
        </div>
        <div class="title">
          <h1 class="text-white">
            Türkiye’nin En Kapsamlı Kripto Para Platformu
          </h1>
          <h3 class="text-white">
            Kripto Para İle Yapabileceğiniz Tüm İşlemler İçin
          </h3>
        </div>
        <div class="video">
          <banner class="video-container" />
        </div>
        <div class="button">
          <a-button
            size="large"
            type="ghost"
            shape="round"
            @click="$router.push(localeRoute('/signup'))"
          >
            Hemen Ücretsiz Hesap Oluştur
          </a-button>
        </div>
      </div>
    </section>
    <section class="guide">
      <div class="container">
        <div>
          <div class="steps">
            <a-steps direction="vertical" :current="3">
              <a-step title="Hesap Oluştur" status="current" />
              <a-step title="Para Yatır" status="current" />
              <a-step title="Bitcoin ve Altcoin Ticaretine Başla" status="current" />
            </a-steps>
          </div>
          <div class="button">
            <a-button
              size="large"
              shape="round"
              block
              ghost
              @click="$router.push(localeRoute('/signup'))"
            >
              30 Saniyede Kayıt Ol
            </a-button>
          </div>
        </div>
      </div>
    </section>
    <section class="borsa">
      <a-row type="flex" align="middle" justify="space-between">
        <a-col :span="24" :md="{ span: 10, offset: 2 }">
          <div class="title">
            <h1 class="text-white" style="padding: 10px 0">
              Bitcoin Almak İçin | <bold>Cointral</bold>

            </h1>
            <h3 class="text-white" style="padding: 10px 0">
              En Uygun İşlem Ücreti ve 200'den Fazla Kripto Para seçeneğiyle...
            </h3>
          </div>
          <div style="padding: 20px 0">
            <a-space :size="20">
              <a-button
                size="large"
                type="ghost"
                shape="round"
                style="width: 140px"
                @click="$router.push(localeRoute('/signup'))"
              >
                Kayıt Ol
              </a-button>
              <a-button
                size="large"
                type="ghost"
                shape="round"
                style="width: 140px"
                @click="$router.push(localeRoute('/login'))"
              >
                Giriş Yap
              </a-button>
            </a-space>
          </div>
        </a-col>
        <a-col :span="24" :md="10">
          <img
            width="100%"
            src="../../assets/images/newAccount6/borsa.png"
            alt=""
          />
        </a-col>
      </a-row>
    </section>
    <section class="cards">
      <div class="container">
        <a-row
          v-for="(card, i) in cards"
          :key="i"
          type="flex"
          align="middle"
          justify="center"
        >
          <template v-if="!(i % 2)">
            <a-col :span="24" :md="10">
              <div class="image">
                <img
                  width="100%"
                  :src="require(`~/assets/images/newAccount6/${i + 1}.png`)"
                  alt=""
                />
              </div>
            </a-col>
            <a-col :span="24" :md="10">
              <div class="content">
                <h1>{{ card.title }}</h1>
                <p>{{ card.content }}</p>
              </div>
            </a-col>
          </template>
          <template v-else>
            <a-col
              :sm="{ span: 24, order: 2 }"
              :xs="{ span: 24, order: 2 }"
              :md="{ span: 10, order: 1 }"
            >
              <div class="content">
                <h1>{{ card.title }}</h1>
                <p>{{ card.content }}</p>
              </div>
            </a-col>
            <a-col
              :sm="{ span: 24, order: 1 }"
              :xs="{ span: 24, order: 1 }"
              :md="10"
            >
              <div class="image">
                <img
                  width="100%"
                  :src="require(`~/assets/images/newAccount6/${i + 1}.png`)"
                  alt=""
                />
              </div>
            </a-col>
          </template>
        </a-row>
      </div>
    </section>
    <section class="footer">
      <div class="container">
        <a-row type="flex" align="middle" justify="space-between" :gutter="10">
          <a-col :span="24" :md="14">
            <div class="title">
              <h1 class="text-white" style="padding: 20px">
                Mobil Uygulamamızla Market Avuçlarında! 
              </h1>
              <h3 class="text-white" style="padding: 20px">
                İşlemlerinize dilediğiniz yerde devam edebilmek için Cointral
                <br />
                mobil uygulamasını hemen indirin.
              </h3>
              <div style="padding: 15px">
                <a-space :size="20">
                  <a
                    href="https://apps.apple.com/tt/app/cointral-bitcoin-al-sat/id1536116477"
                    target="_blank"
                    :span="4"
                    :offset="8"
                    ><img
                      width="90%"
                      src="~/assets/images/newAccount6/appstoreButton.png"
                  /></a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.cointral.exchange"
                    target="_blank"
                    :span="4"
                    ><img
                      width="90%"
                      src="~/assets/images/newAccount6/Google.png"
                  /></a>
                </a-space>
              </div>
            </div>
          </a-col>
          <a-col :span="0" :md="10">
            <div style="margin: auto">
              <img
                style="max-height: 500px"
                src="../../assets/images/newAccount6/phone.png"
                alt=""
              />
            </div>
          </a-col>
        </a-row>
      </div>
    </section>
    <section class="copyrights">
      <h2>© 2018 Cointral - Tüm hakları saklıdır.</h2>
    </section>
  </div>
</template>

<script>
import banner from '~/components/NewAccount5/bannerVideo'

const content =  'Cointral ile en popüler kripto para çiftlerinde kolay ve sorunsuz bir şekilde işlemlerinizi yapabilir, uluslararası borsalarla entegre olarak yüksek likiditeli pazar yapısından faydalanabilirsiniz.'
const cards = [
  { title: 'Al | Sat', content: '200+ kripto parayı kolay ve sorunsuz bir şekilde alıp satabilir, uluslararası piyasalarla entegre olarak yüksek likiditeli pazar yapısından faydalanabilirsiniz. İşlemlerinizi Türk Lirası ile de gerçekleştirebilirsiniz. Üstelik en uygun oranlarla... ' },
  { title: 'Şube', content:'Profesyonel ekibimizin desteği ile alım-satım işlemlerinizi kolay ve güvenilir şekilde yüz yüze gerçekleştirebilirsiniz. Üstelik nakit işlem imkanı ve size özel hizmet ayrıcalığıyla...' },
  { title: 'Altın', content: 'Bitcoin, Ethereum ve BNB ile güvenli bir şekilde sertifikalı 24 Ayar Gram Altın satın alabilir, sigortalı kargo ile adresinizden veya şubelerden teslim alabilirsiniz...' },
  { title: 'Kredi Kartı', content:'Kredi kartınız veya banka kartınız ile Simplex, Paxful, Moonpay ve Koinal ödeme sağlayıcılarıyla kolay bir şekilde en uygun oranlarla onlarca kripto parayı anında satın alabilirsiniz... ' },
  { title: 'P2P', content:'Ülkemizde ilk defa, alıcı ve satıcıları bir araya getiren açık bir pazar yerinde, diğer tüccarlar ile, belirlenen fiyat, miktar ve ödeme yönteminde anlaşarak işlemlerini gerçekleştirebilirsiniz...' },
  { title: 'Hızlı Takas', content:'Hızlı Takas, 200’den fazla kripto para çiftini hızlıca takas etmenizi sağlar. Piyasadaki en uygun fiyatlarla kripto paralarınızı saniyeler içinde birbirleriyle takas edebilir, emir tahtası ile uğraşmadan ticaret yapabilirsiniz...' },
  { title: 'OTC', content:'Yüksek miktarlı kripto para işlemleri için kişiselleştirilmiş, hızlı ve güvenli bir ticaret gerçekleştirebilirsiniz. Üstelik size özel hizmet ayrıcalığıyla...' },
  { title: 'Gayrimenkul', content:'Kripto paralarınızla gayrimenkul yatırımı yapmak isterseniz, size özel çözümümüzle dilediğiniz gayrimenkulu satın alabilirsiniz...' }, ]

  export default {
  components: { banner },
  layout: 'account',
  data: () => ({
    cards,
  }),
}
</script>

<style scoped>
.header > * {
  text-align: center;
}
.header {
  background: url('../../assets/images/newAccount6/headerBackground.png');
  padding: 50px 0;
}
.header .title h1 {
  font-size: 48px;
}
.header .title h3 {
  font-weight: 200;
  font-size: 20px;
}
.header .logo {
  padding: 25px 0;
}
.header .logo img {
  max-width: 248px;
  width: 100%;
}
.header .title {
  padding: 15px 0;
}
.header .video {
  max-width: 720px;
  padding: 15px 0;
  margin: auto;
}
.header .button {
  padding: 15px 0;
}

.guide {
  padding: 50px 0;
}
.guide .container {
  display: flex;
  justify-content: center;
}
.guide .steps {
  padding: 15px 0;
  margin: auto;
}

.borsa {
  background: #202944;
  padding: 25px 0;
}
.borsa .title h1 {
  font-weight: 200;
  font-size: 48px;
}
.borsa .title h3 {
  font-weight: 200;
  font-size: 20px;
}

.cards {
  padding: 50px 0;
}
.cards .content {
  padding: 10px;
}
.cards .content h1 {
  font-size: 48px;
}
.cards .content p {
  font-size: 18px;
}

.footer {
  background: #202944;
  padding: 80px 0;
}
.footer .title h1 {
  font-size: 36px;
}
.footer .title h3 {
  font-weight: 200;
  font-size: 20px;
}

.copyrights {
  text-align: center;
  font-weight: 200;
  padding: 20px;
}
/* helper classer */
</style>

<style>
.header .video iframe {
  border: 1px solid #29aae1 !important;
  height: 406px;
}

.borsa .ant-col-24 {
  text-align: center;
}
.borsa .ant-col-md-10 {
  text-align: left;
}
</style>

<style lang="less">
.guide .steps .ant-steps-item-content {
  padding-bottom: 50px;
}
.guide
  .steps
  .ant-steps-vertical
  > .ant-steps-item
  > .ant-steps-item-container
  > .ant-steps-item-tail::after {
  background-color: #29aae1;
}
.guide .steps .ant-steps-vertical .ant-steps-item-icon {
  border-color: #29aae1;
}
.guide .button .ant-btn {
  color: #50c5fd !important;
  border: 1px solid #50c5fd !important;
}
</style>
