<template>
  <div v-if="RequestInfo.Step === 4">
    <h3 class="Roboto-Medium">Ödeme Yapınız</h3>
    <h5 class="m-0 Roboto-Medium">
      Lütfen
      <span class="primary-text"
        >{{ RequestInfo.RequestValidityMinutes }}
      </span>
      dakika içinde ödeme aldığınızı onaylayınız veya destek talebi oluşturun.
      Belirtilen süre içinde ödemeyi onaylamazsanız ilgili tutar dondurularak
      destek merkezine yönlendirileceksiniz.
    </h5>
  </div>
  <div v-else-if="RequestInfo.Step === 6">
    <h3 class="Roboto-Medium">Ödeme Yapınız</h3>
    <h5 class="m-0 Roboto-Medium">
      Lütfen
      <span class="primary-text">{{ RequestInfo.P2PRequestUsername }} </span>
      kullanıcısının {{ RequestInfo.Amount }}
      {{ RequestInfo.Asset }} karşılığında {{ RequestInfo.Total }}
      {{ RequestInfo.FiatCurrency }} ödeme yaptığı beyanı, tarafınızdan
      onaylanmamıştır. İşlem destek merkezine aktarıldı.İnceleme sonlanıncaya
      kadar ilgili satış miktarı cüzdanınızda dondurulmuştur.
    </h5>
  </div>
  <div v-else-if="RequestInfo.Step === 8">
    <h3 class="Roboto-Medium">Ödeme Yapınız</h3>
    <h5 class="m-0 Roboto-Medium">
      Lütfen
      <span class="primary-text"
        >{{ RequestInfo.RequestValidityMinutes }}
      </span>
      dakika içinde ödeme yapınız. Belirtilen süre içinde ödeme yaptığını
      onaylamazsanız işlem iptal edilir. Ödeme yaptığınıza dair döküman
      ekleyiniz.
    </h5>
  </div>
  <div v-else-if="RequestInfo.Step === 9">
    <h3 class="Roboto-Medium">Ödeme Yapınız</h3>
    <h5 class="m-0 Roboto-Medium">
      Lütfen
      <span class="primary-text"
        >{{ RequestInfo.RequestValidityMinutes }}
      </span>
      dakika içinde ödeme aldığınızı onaylayınız veya destek talebi oluşturun.
      Belirtilen süre içinde ödemeyi onaylamazsanız ilgili tutar dondurularak
      destek merkezine yönlendirileceksiniz.
    </h5>
  </div>
  <div v-else>
    <h3 class="Roboto-Medium">Ödeme Yapınız</h3>
    <h5 class="m-0 Roboto-Medium">
      Lütfen
      <span class="primary-text"
        >{{ RequestInfo.RequestValidityMinutes }}
      </span>
      dakika içinde ödeme yapınız. Belirtilen süre içinde ödeme yaptığınızı
      onaylamazsanız işlem iptal edilir.
    </h5>
  </div>
</template>

<script>
export default {
  name: 'P2PDynamicText',
  props: {
    RequestInfo: {
      required: true,
      type: Object,
    },
  },
}
</script>
