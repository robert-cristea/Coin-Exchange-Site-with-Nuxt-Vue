<template>
  <div class="create-p2p-page">
    <a-row>
      <a-col :span="24">
        <a-breadcrumb class="breadcrumbs text-left Roboto-Regular">
          <a-breadcrumb-item>İşlemler</a-breadcrumb-item>
          <a-breadcrumb-item>P2P İşlemleri</a-breadcrumb-item>
          <a-breadcrumb-item>İlan Yayınla</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>

    <a-row type="flex" align="bottom">
      <a-col :span="24">
        <span>
          <h1 class="Roboto-Regular m-0 d-inline">İlan Yayınla</h1>
          <h4 class="Roboto-Regular d-inline">
            BTC, ETH, USDT ticaretine başlamak için USD, EURO ve TL ile ödeme
            yöntemini seçerek ilan oluşturabilirsiniz.
          </h4>
        </span>
      </a-col>
    </a-row>

    <a-row class="content-row" type="flex" align="middle">
      <a-col :span="12">
        <a-card
          class="create-p2p-card border-none"
          :active-tab-key="ActiveP2PTab"
          :tab-list="P2PTabList"
          @tabChange="(e) => (ActiveP2PTab = e)"
        >
          <span slot="titleSlot" slot-scope="item">
            {{ item.key === 'BUY' ? 'Alış İlanı' : 'Satış İlanı' }}</span
          >
          <div class="card-content">
            <P2PCreateCard
              :key="ActiveP2PTab"
              :P2PType="ActiveP2PTab"
              :FiatList="FiatList"
            />
          </div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <div class="what-is-cointral-content mx-auto" style="max-width: 300px">
          <div class="whatiscointralimg text-center">
            <img
              src="~/assets/images/p2p-request/whatiscointral.svg"
              alt="whatiscointral"
            />
          </div>
          <h2 class="Roboto-Regular text-center">Cointral P2P Nedir?</h2>
          <ul class="text-left Roboto-Regular">
            <li>
              <h4>
                Güvenlik Anahtarı eşleşmeniz yalnızca https://www.cointral.com
                için geçerlidir.
              </h4>
            </li>
            <li>
              <h4>
                Güvenlik Anahtarı doğrulaması etkinleştirildiğinde, çekim
                taleplerinizi yalnızca Güvenlik Anahtarı’ınız aracılığıyla
                doğrulayabilirsiniz
              </h4>
            </li>
          </ul>
          <a-button
            size="large"
            block
            type="secondary"
            class="text-center whatiscointralbtn Roboto-Medium"
          >
            Detaylı Öğren
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'İlan Oluştur | Cointral.com',
    }
  },
  async asyncData({ params, $axios, $cookies, $config }) {
    const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
    const { data } = await $axios.get(
      $config.FINANCE_API_URL + '/GetP2PDataList',
      {
        params: { RequestId: params.id },
        headers: authHeaders,
      }
    )
    const { Success, Message, FiatList, ErrorCode } = data
    if (Success) {
      return {
        FiatList,
      }
    }
  },
  beforeMount() {
    const allowedHosts = ['localhost']
    if (!allowedHosts.includes(window.location.hostname)) {
      this.$router.push(this.localeRoute('/soon'))
    }
  },

  data() {
    return {
      FiatList: [],
      ActiveP2PTab: 'BUY',
      P2PTabList: [
        { key: 'BUY', scopedSlots: { tab: 'titleSlot' } },
        { key: 'SELL', scopedSlots: { tab: 'titleSlot' } },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.create-p2p-page {
  background-color: #fafafa;
  min-height: 100vh;
  padding: 20px 50px;

  .breadcrumbs {
    margin-bottom: 30px;
  }
}
.content-row {
  background: #ffffff;
  border-radius: 6px;
  padding: 25px;
}
.create-p2p-card {
  box-shadow: 0px 0px 5px #0000000f;
  border-radius: 10px;
}
.whatiscointralimg {
  margin: 20px auto;
}
.whatiscointralbtn {
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 6px;
}
</style>
