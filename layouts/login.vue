<template>
  <div id="wrapper" :class="theme">
    <Header :loginlayout="true" />
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header'

export default {
  components: {
    Header,
  },
  data: () => ({
    createAccount: true,
  }),
  computed: {
    ...mapGetters({
      theme: 'common/getTheme',
    }),
  },
}
</script>
