<template>
  <div class="request-details-page">
    <a-row :gutter="16">
      <a-col :offset="1" :span="12">
        <h1>{{ RequestInfo.Asset }} Al</h1>
      </a-col>
    </a-row>
    <a-row
      class="row-margin"
      type="flex"
      align="stretch"
      justify="center"
      :gutter="16"
    >
      <a-col :span="16">
        <CardOne :RequestInfo="RequestInfo" :RefreshTime="RefreshTime" />
      </a-col>
      <a-col :span="6">
        <CardTwo
          :style="{
            pointerEvents: noTimer.includes(RequestInfo.Step) ? 'none' : 'auto',
          }"
          :RequestInfo="RequestInfo"
          :RefreshTime="RefreshTime"
        />
      </a-col>
    </a-row>
    <a-row
      class="row-margin"
      type="flex"
      align="middle"
      justify="start"
      :gutter="16"
    >
      <a-col :offset="1" :span="16">
        <CardThree
          @GetRequestInfo="getRequestInfo"
          :RequestInfo="RequestInfo"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'P2PRequestDetail',
  middleware: ['auth'],
  head() {
    return {
      title: 'P2P İstek | Cointral.com',
    }
  },
  async asyncData({ params, $axios, $cookies, $config }) {
    const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
    const { data } = await $axios.get(
      $config.FINANCE_API_URL + '/GetP2PRequestInfo',
      {
        params: { RequestId: params.id },
        headers: authHeaders,
      }
    )
    const { Success, Message, Step, RequestInfo, ErrorCode } = data
    if (Success) {
      return {
        RequestInfo: { ...RequestInfo, Step },
      }
    }
  },
  data() {
    return {
      RequestInfo: {},
      RefreshTime: 10,
      RefreshInterval: null,
      noTimer: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    }
  },
  beforeMount() {
    const allowedHosts = ['localhost']
    if (!allowedHosts.includes(window.location.hostname)) {
      this.$router.push(this.localeRoute('/soon'))
    }
  },
  mounted() {
    if (!this.noTimer.includes(this.RequestInfo.Step)) {
      this.RefreshInterval = setInterval(() => {
        if (this.RefreshTime === 0) {
          this.getRequestInfo()
          this.RefreshTime = 10
        }
        this.RefreshTime -= 1
      }, 1000)
    }
  },
  destroyed() {
    clearInterval(this.RefreshInterval)
  },
  methods: {
    async getRequestInfo() {
      const { $cookies, $axios, $config } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.get(
        $config.FINANCE_API_URL + '/GetP2PRequestInfo',
        {
          params: { RequestId: this.$route.params.id },
          headers: authHeaders,
        }
      )
      const { Success, Message, Step, RequestInfo, ErrorCode } = data
      if (Success) {
        this.RequestInfo = { ...RequestInfo, Step }
      }
    },
  },

  watch: {
    RequestInfo: {
      handler: function (v) {
        if (this.noTimer.includes(v.Step)) {
          this.RefreshTime = 0
          clearInterval(this.RefreshInterval)
        } else {
          // this.RefreshInterval = setInterval(() => {
          //   if (this.RefreshTime === 0) {
          //     this.getRequestInfo()
          //     this.RefreshTime = 10
          //   }
          //   this.RefreshTime -= 1
          // }, 1000)
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.request-details-page {
  min-height: 90vh;
  padding: 100px 5px;
}
.row-margin {
  margin: 15px auto;
}
</style>
