<template>
  <div id="wrapper" :class="theme">
    <div v-if="$route.path.includes('/trade')">
      <client-only>
        <CointralHeader />
        <Nuxt />
        <CointralFooter v-if="!$route.path.includes('/trade')" />
      </client-only>
    </div>
    <div v-else>
      <CointralHeader />
      <Nuxt />
      <CointralFooter v-if="!$route.path.includes('/trade')" />
    </div>
  </div>
</template>
<script>
import CointralHeader from '~/components/Header'
import CointralFooter from '~/components/Footer'
import { mapGetters } from 'vuex'

export default {
  components: {
    CointralHeader,
    CointralFooter,
    AboutHeader: () => import('~/components/AboutHeader.vue'),
  },
  data() {
    return {
      isMobile: null,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  computed: {
    ...mapGetters({
      theme: 'common/getTheme',
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
}
</script>
