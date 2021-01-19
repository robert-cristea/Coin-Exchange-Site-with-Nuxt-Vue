<template>
  <client-only>
    <div class="home-page">
      <div class="header-container" v-if="!isLoggedIn">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="24">
            <div class="header-content w-100">
              <HomePageHeader />
              <HomePageCards />
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="content-container w-100">
        <HomePageCards v-if="isLoggedIn" />
        <Stats />
        <Carousel />
        <Features />
        <Methods />
        <MobileSection />
        <OurProducts />
        <SellFooter />
      </div>
      <!-- AdvertPopUp -->
      <AdvertPopUp
        :visible="showAdvertPopUp"
        @close="showAdvertPopUp = false"
      />
      <!-- AdvertPopUp -->
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['shared'],
  data() {
    return {
      showAdvertPopUp: true,
    }
  },
  computed: {
    isLoggedIn: {
      get() {
        let token = this.$cookies.get('Token')
        return !!token ? true : false
      },
      cache: false,
    },
  },
  head() {
    return {
      title: 'Cointral.com | Bitcoin ve Altcoin Alım Satım Platformu',
      meta: [
        {
          hid: 'trade_screen',
          name: 'description',
          content:
            'Bitcoin ve altcoin işlemlerini düşük işlem ücretleri ile hızlı ve güvenli bir şekilde gerçekleştir. Bitcoin almak için hemen üye ol ve avantajlardan yararlan.',
        },
      ],
    }
  },
}
</script>

<style>
.home-page {
  min-height: 100vh;
}
.header-container {
  background: url('~assets/images/homepage/header-back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  /* height: 960px; */
}
.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
