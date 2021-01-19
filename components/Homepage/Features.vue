<template>
  <a-row
    class="features-row w-100"
    :gutter="16"
    type="flex"
    align="middle"
    justify="center"
  >
    <a-col :span="24" :sm="22" :lg="16">
      <h1 align="center" class="Roboto-Bold">{{$t('homepage_why_cointral_title')}}</h1>
      <p align="center" class="Roboto-Regular">
        {{$t('homepage_why_cointral_text')}} 
      </p>

      <a-row :gutter="32" class="feature-boxes-row">
        <a-col :xs="24" :sm="10" :md="8" :lg="8">
          <div class="feature-box">
            <img
              class="feature-box-img"
              src="../../assets/images/homepage/feature1.png"
              alt="featureimage"
            />
            <h4 class="Roboto-Medium">{{$t('features_2fa_title')}}</h4>
            <p class="Roboto-Regular">
              {{$t('features_2fa_text')}} 
            </p>
          </div>
        </a-col>
        <a-col :xs="24" :sm="10" :md="8" :lg="8">
          <div class="feature-box">
            <img
              class="feature-box-img"
              src="../../assets/images/homepage/feature2.png"
              alt="featureimage"
            />
            <h4 class="Roboto-Medium">{{$t('features_buy_creditcard_title')}}</h4>
            <p class="Roboto-Regular">
             {{$t('features_buy_creditcard_text')}}
            </p>
          </div>
        </a-col>
        <a-col :xs="24" :sm="10" :md="8" :lg="8">
          <div class="feature-box">
            <img
              class="feature-box-img"
              src="../../assets/images/homepage/feature3.png"
              alt="featureimage"
            />
            <h4 class="Roboto-Medium">{{$t('features_support_title')}}</h4>
            <p class="Roboto-Regular">
             {{$t('features_support_text')}} 
            </p>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="32" class="feature-boxes-row">
        <a-col :xs="24" :sm="10" :md="8" :lg="8">
          <div class="feature-box">
            <img
              class="feature-box-img"
              src="../../assets/images/homepage/feature4.png"
              alt="featureimage"
            />
            <h4 class="Roboto-Medium">{{$t('features_commission_title')}}</h4>
            <p class="Roboto-Regular">
             {{$t('features_commission_text')}}
            </p>
          </div>
        </a-col>
        <a-col :xs="24" :sm="10" :md="8" :lg="8">
          <div class="feature-box">
            <img
              class="feature-box-img"
              src="../../assets/images/homepage/feature5.png"
              alt="featureimage"
            />
            <h4 class="Roboto-Medium">{{$t('features_cold_wallet_title')}}</h4>
            <p class="Roboto-Regular">
              {{$t('features_cold_wallet_text')}}
            </p>
          </div>
        </a-col>
        <a-col :xs="24" :sm="10" :md="8" :lg="8">
          <div class="feature-box">
            <img
              class="feature-box-img"
              src="../../assets/images/homepage/feature6.png"
              alt="featureimage"
            />
            <h4 class="Roboto-Medium">{{$t('features_buy_sell_title')}}</h4>
            <p class="Roboto-Regular">
              {{$t('features_buy_sell_text')}}
            </p>
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Features',
  data() {
    return {}
  },
}
</script>

<style>
.features-row {
  padding: 20px;
  margin: auto 0px !important;
}
.feature-boxes-row {
  margin: 50px 0px;
}
.feature-box-img {
  margin-bottom: 15px;
}
.feature-box {
  text-align: center;
}
</style>
