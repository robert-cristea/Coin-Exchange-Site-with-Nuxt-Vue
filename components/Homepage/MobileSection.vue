<template>
  <a-row
    class="mobile-section-row w-100"
    :gutter="16"
    type="flex"
    align="middle"
    justify="space-around"
  >
    <a-col :xs="24" :sm="24" :md="8">
      <img
        class="mobile-section-brand"
        src="../../assets/images/homepage/brand16.png"
        alt=""
      />
      <p class="text-white Roboto-Regular">
      {{$t('mobile_section_text1')}} 
      </p>
       <p class="text-white Roboto-Regular">
      {{$t('mobile_section_text2')}}
      </p>
    </a-col>
    <a-col :xs="24" :sm="24" :md="8">
      <div class="mobile-section-card border-none">
        <div class="header">
          <h2 class="m-0">{{$t('mobile_section_download_title')}}</h2>
          <a-icon type="mobile"></a-icon>
        </div>
        <div class="content">
          <p class="Roboto-Regular">
            {{$t('mobile_section_download_text')}}
          </p>
        </div>
        <div class="actions">
          <a href="https://play.google.com/store/apps/details?id=com.cointral.exchange" target="_blank">
            <img
              height="50"
              class="mobile-section-logos"
              src="../../assets/images/homepage/playstore.png"
              alt="playstore"
            />
          </a>
          <a href="https://apps.apple.com/tt/app/cointral-bitcoin-al-sat/id1536116477" target="_blank">
            <img
              height="50"
              class="mobile-section-logos"
              src="../../assets/images/homepage/appstore.png"
              alt="appstore"
            />
          </a>
        </div>
      </div>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: 'MobileSection',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.mobile-section-row {
  padding: 60px 20px;
  margin: auto 0px !important;
  background: rgba(0, 0, 0, 1);
  background-image: linear-gradient(11, #171b21, #64666a);
}
@media screen and (max-width: 768) {
  .mobile-section-row {
    text-align: center;
  }
}
.mobile-section-brand {
  margin: 10px auto;
}
.mobile-section-card {
  padding: 20px;
  height: 245px;
  width: 384px;
  max-width: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header,
  .content {
    flex-grow: 1;
  }
  .header,
  .content,
  .actions {
    display: flex;
    justify-content: space-between;
  }
}
.mobile-section-logos {
  height: 40px;
  width: auto;
}
</style>
