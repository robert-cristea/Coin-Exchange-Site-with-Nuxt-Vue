<template>
  <span v-if="RequestInfo.Step === 1">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2P_OrderUsername }}
    </span>
    <span class="Roboto-Medium">
      kullanıcısına
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptığını onaylıyorum.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 2">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2PRequestUsername }}
    </span>
    <span class="Roboto-Medium">
      kullanıcısının
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yapması bekleniyor.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 3">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2P_OrderUsername }}
    </span>
    <span class="Roboto-Medium">
      kullanıcısının
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatPrice }}
      </span>
      ödeme aldığına dair onay vermesi bekleniyor.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 4">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2PRequestUsername }}
    </span>
    <span class="Roboto-Medium">
      kullanıcısından
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme aldığımı onaylıyorum.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 5">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
    </span>
    karşılığında
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptığınıza dair beyanınız
      <span class="primary-text">
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      kullanıcısı tarafından onaylanmadı. İşlem destek merkezi tarafından
      inceleniyor.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 6">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2PRequestUsername }}
    </span>
    kullanıcısının
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptığı beyanı, tarafınızdan onaylanmamıştır. İşlem destek merkezine
      aktarıldı.İnceleme sonlanıncaya kadar ilgili satış miktarı cüzdanınızda
      dondurulmuştur.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 7">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2P_OrderUsername }}
    </span>
    kullanıcısının
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yapması bekleniyor.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 8">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2PRequestUsername }}
    </span>
    kullanıcısına
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptığımı onaylıyorum.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 9">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2P_OrderUsername }}
    </span>
    kullanıcısından
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme aldığımı onaylıyorum.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 10">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2PRequestUsername }}
    </span>
    kullanıcısının
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatPrice }}
      </span>
      ödeme aldığına dair onay vermesi bekleniyor.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 11">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.P2P_OrderUsername }}
    </span>
    kullanıcısının
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptığı beyanı, tarafınızdan onaylanmamıştır. İşlem destek merkezine
      aktarıldı.İnceleme sonlanıncaya kadar ilgili satış miktarı cüzdanınızda
      dondurulmuştur.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 12">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
    </span>
    kullanıcısının
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptığınıza dair beyanınız
      <span class="primary-text">
        {{ P2PRequestUsername }}
      </span>
      kullanıcısı tarafından onaylanmadı. İşlem destek merkezi tarafından
      inceleniyor.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 13">
    <span>
      Emir iptal edildi. İşlem ile ilgili herhangi bir sorunuz var ise destek
      üzerinden bizimle iletişime geçebilirsiniz.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 14">
    <span>
      Emir iptal edildi. İşlem ile ilgili herhangi bir sorunuz var ise destek
      üzerinden bizimle iletişime geçebilirsiniz.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 15">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
    </span>
    kullanıcısının
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      P2P cüzdanınıza transfer edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 16">
    <span class="primary-text Roboto-Medium">
      {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}, {{ RequestInfo.Total }}
      {{ RequestInfo.FiatCurrency }}
    </span>
    karşılığında
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2PRequestUsername }}
      </span>
      kullanıcısına transfer edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 17">
    <span>
      Emir iptal edildi. İşlem ile ilgili herhangi bir sorunuz var ise destek
      üzerinden bizimle iletişime geçebilirsiniz.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 18">
    <span>
      Emir iptal edildi. İşlem ile ilgili herhangi bir sorunuz var ise destek
      üzerinden bizimle iletişime geçebilirsiniz.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 19">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }},
        {{ RequestInfo.Total }}
        {{ RequestInfo.FiatCurrency }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      kullanıcısına transfer edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 20">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }},
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      P2P cüzdanınıza transfer edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 21">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>

      ödeme yapmadığınız için işlem destek merkezi tarafından iptal edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 22">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2PRequestUsername }}
      </span>
      kullanıcısı tarafından
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme almadığınız için işlem destek merkezi tarafından iptal edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 23">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      kullanıcısı
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptınız destek merkezi tarafından onaylandı ve
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      P2P cüzdanınıza transfer edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 24">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2PRequestUsername }}
      </span>
      kullanıcısından
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme aldığınız destek merkezi tarafından onaylandı ve P2P cüzdanınızdan
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
        {{ RequestInfo.P2PRequestUsername }}
      </span>
      kullanıcısına transfer edildi
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 25">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      kullanıcısı tarafından
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme almadığınız için işlem destek merkezi tarafından iptal edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 26">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2PRequestUsername }}
      </span>
      kullanıcısı tarafından
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme almadığınız için işlem destek merkezi tarafından iptal edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 27">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      kullanıcısından
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme aldığınız destek merkezi tarafından onaylandı ve P2P cüzdanınızdan
      <span>
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
        {{ RequestInfo.P2P_OrderUsername }}
      </span>
      kullanıcısına transfer edildi.
    </span>
  </span>
  <span v-else-if="RequestInfo.Step === 28">
    <span class="Roboto-Medium">
      <span class="primary-text">
        {{ RequestInfo.P2PRequestUsername }}
      </span>
      kullanıcısına
      <span class="primary-text">
        {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
      </span>
      karşılığında
      <span class="primary-text">
        {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
      </span>
      ödeme yaptınız destek merkezi tarafından onaylandı ve
      <span> {{ RequestInfo.Amount }} {{ RequestInfo.Asset }} </span>
      P2P cüzdanınıza transfer edildi.
    </span>
  </span>
</template>

<script>
export default {
  name: 'P2PCheckBoxText',
  props: {
    RequestInfo: {
      required: true,
      type: Object,
    },
  },
}
</script>
