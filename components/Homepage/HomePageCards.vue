<template>
  <a-row
    type="flex"
    :gutter="16"
    align="middle"
    justify="center"
    class="cards-row w-100"
  >
    <a-col :span="0" :md="24">
      <a-carousel class="h-100" arrows autoplay :dots="false">
        <div slot="prevArrow" class="custom-slick-arrow" style="z-index: 1">
          <a-icon style="font-size: 25px; color: white" type="caret-left" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="z-index: 1">
          <a-icon style="font-size: 25px; color: white" type="caret-right" />
        </div>
        <div v-for="(images, i) in isEn ? slides.en : slides.tr" :key="i">
          <a-row type="flex" justify="center">
            <a-col :span="8" v-for="(image, i) in images" :key="i">
              <div class="card-img-wrapper">
                <img
                  class="card-img"
                  :src="
                    require(`../../assets/images/homepage/card-slider/${
                      isEn ? 'EN' : 'TR'
                    }/${image}?v=1`)
                  "
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </a-carousel>
    </a-col>
    <a-col :span="24" :md="0">
      <a-carousel class="h-100" autoplay :dots="false">
        <div
          v-for="(image, i) in isEn ? slidesMobile.en : slidesMobile.tr"
          :key="i"
        >
          <div class="card-img-wrapper">
            <img
              class="card-img"
              :src="
                require(`../../assets/images/homepage/card-slider/${
                  isEn ? 'EN' : 'TR'
                }/${image}`)
              "
            />
          </div>
        </div>
      </a-carousel>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'HomePageCards',
  data: () => ({
    slides: {
      en: [
        ['19.svg', '20.svg', '21.svg'],
        ['22.svg', '23.svg', '24.svg'],
        ['25.svg', '26.svg'],
      ],
      tr: [
        ['11.svg', '12.svg', '13.svg'],
        ['14.svg', '15.svg', '16.svg'],
        ['17.svg', '18.svg'],
      ],
    },
    slidesMobile: {
      en: [
        '19.svg',
        '20.svg',
        '21.svg',
        '22.svg',
        '23.svg',
        '24.svg',
        '25.svg',
        '26.svg',
      ],
      tr: [
        '11.svg',
        '12.svg',
        '13.svg',
        '14.svg',
        '15.svg',
        '16.svg',
        '17.svg',
        '18.svg',
      ],
    },
  }),
  computed: {
    isEn() {
      return this.$i18n.locale === 'en' ? true : false
    },
  },
  methods: {
    flatArray(array) {
      return array.flat()
    },
  },
}
</script>

<style>
.cards-row {
  margin: 80px 0px !important;
  padding: 0 30px;
}
.card-img-wrapper {
  padding: 0 8px;
}
.card-img {
  width: 100%;
  margin: 15px auto;
  height: auto;
  border-radius: 10px;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: fit-content;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel >>> .custom-slick-arrow > .anticon {
  width: 50px;
  height: 50px;
  font-size: 50px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  /* opacity: 0.3; */
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
</style>
<style lang="less">
.ant-carousel .slick-prev,
.ant-carousel .slick-next {
  height: auto;
  width: auto;
}
</style>
