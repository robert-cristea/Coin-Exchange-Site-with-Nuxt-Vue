<template>
  <a-row
    class="carousal-row w-100"
    :gutter="16"
    type="flex"
    align="middle"
    justify="center"
  >
    <a-col :span="24" :lg="20">
      <a-carousel class="h-100">
        <div class="h-100">
          <a-row
            class="m-0"
            :gutter="16"
            type="flex"
            align="middle"
            justify="space-around"
          >
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <img
                src="../../assets/images/homepage/carousel1.svg"
                alt="slider-svg"
              />
            </a-col>
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <h1 align="left" class="Roboto-Bold">
                {{$t('homepage_carousel_title1')}}
              </h1>
              <h3 align="left" class="Roboto-Regular">
                {{$t('homepage_carousel_text1')}}
              </h3>
            </a-col>
          </a-row>
        </div>
        <div class="h-100">
          <a-row
            class="m-0"
            :gutter="16"
            type="flex"
            align="middle"
            justify="space-around"
          >
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <img
                src="../../assets/images/homepage/slider/NasiKriptoalinir.svg"
                alt="slider-svg"
              />
            </a-col>
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <h1 align="left" class="Roboto-Bold">
                {{$t('homepage_carousel_title2')}}
              </h1>
              <h3 align="left" class="Roboto-Regular">
                {{$t('homepage_carousel_text2')}}
              </h3>
            </a-col>
          </a-row>
        </div>
        <div class="h-100">
          <a-row
            class="m-0"
            :gutter="16"
            type="flex"
            align="middle"
            justify="space-around"
          >
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <img
                src="../../assets/images/homepage/slider/illustration.svg"
                alt="slider-svg"
              />
            </a-col>
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <h1 align="left" class="Roboto-Bold">
                {{$t('homepage_carousel_title3')}}
              </h1>
              <h3 align="left" class="Roboto-Regular">
                {{$t('homepage_carousel_text3')}}
              </h3>
            </a-col>
          </a-row>
        </div>
        <div class="h-100">
          <a-row
            class="m-0"
            :gutter="16"
            type="flex"
            align="middle"
            justify="space-around"
          >
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <img
                src="../../assets/images/homepage/slider/illustration 02.svg"
                alt="slider-svg"
              />
            </a-col>
            <a-col :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
              <h1 align="left" class="Roboto-Bold">{{$t('homepage_carousel_title4')}}</h1>
              <h3 align="left" class="Roboto-Regular">
                 {{$t('homepage_carousel_text4')}}
              </h3>
            </a-col>
          </a-row>
        </div>
      </a-carousel>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Carousel',
}
</script>

<style scoped>
.carousal-row {
  margin: 20px 0px !important;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 640px;
  background: url('../../assets/images/homepage/slider/Background-Slider.png')
    no-repeat center center;
  background-size: cover;
  border-radius: 12px;
  padding: 20px;
  overflow: hidden;
}
.ant-carousel >>> .slick-slide > div {
  height: 100%;
}
.ant-carousel >>> .slick-dots {
  bottom: 42px;
  text-align: right;
  padding-right: 20px;
}
.ant-carousel >>> .slick-dots li button {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 1px solid #707070;
  background-color: transparent;
}
.ant-carousel >>> .slick-dots li.slick-active button {
  background: #707070;
}
.ant-carousel >>> .ant-row-flex {
  height: 100%;
}
</style>
