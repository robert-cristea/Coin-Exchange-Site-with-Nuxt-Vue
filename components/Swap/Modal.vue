<template>
  <a-modal
    class="ant-modal-title"
    v-model="visible"
    centered
    title="Takas İşlemi"
    @cancel="closeModal"
  >
    <template slot="footer">
      <a-button
        class="ant-modal-button swap-start-button primary-button border-none Roboto-Medium ant-btn ant-btn-primary"
        :loading="loading"
        @click="decideConfirmOrRefresh"
      >
        {{
          countDown === 0 || countDown === -1
            ? buttonName
            : buttonName + ' (' + countDown + ')'
        }}
      </a-button>
    </template>

    <a-row>
      <a-col :span="12" align="start">
        <p class="modal-text">{{ $t('swap_change') }}</p>
      </a-col>
      <a-col :span="12" align="end">
        <p class="modal-values">
          {{ inAmount ? inAmount : 0.0 }} {{ inAsset }}
        </p>
      </a-col>
    </a-row>

    <a-row class="mt-2">
      <a-col :span="6" align="start">
        <p class="modal-text">{{ $t('swap_how_much') }}</p>
      </a-col>
      <a-col :span="18" align="end">
        <p class="modal-values">
          {{
            finalAmount / inAmount ? (finalAmount / inAmount).toFixed(8) : 0.0
          }}
          {{ outAsset }}
        </p>
      </a-col>
    </a-row>

    <hr class="modal-horizontal-line" />

    <a-row>
      <a-col :span="12" align="start">
        <p class="modal-text">{{ $t('swap_how_much_take') }}</p>
      </a-col>
      <a-col :span="12" align="end">
        <p class="modal-values">{{ finalAmount }} {{ outAsset }}</p>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    inAsset: {
      type: String,
      required: true,
    },
    outAsset: {
      type: String,
      required: true,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    inAmount: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    loading: false,
    buttonName: null,
    interval: null,
    countDown: 30,
    notificationMessage: null,
  }),

  mounted() {
    clearInterval(this.interval)
    this.buttonName = 'Confirm'
    this.countDownTimer()

    this.interval = setInterval(() => {
      this.buttonName = 'Refresh'
    }, 30000)
  },

  methods: {
    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: this.$t('text_success'),
        description: this.notificationMessage,
      })
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },

    decideConfirmOrRefresh() {
      if (this.buttonName === 'Confirm') {
        this.confirmOrSwap()
      } else if (this.buttonName === 'Refresh') {
        this.refresh()
      }
    },

    async confirmOrSwap() {
      this.loading = true
      this.countDown = 0

      const { $axios, $config, $cookies } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }

      try {
        const response = await $axios.post(
          $config.FINANCE_API_URL + '/Swap',
          {
            inAsset: this.inAsset,
            OutAsset: this.outAsset,
            inAmount: this.inAmount,
          },
          { headers: authHeaders }
        )

        if (response.data['ErrorCode'] === 0) {
          this.notificationMessage = response.data['Message']
          this.openNotificationWithIcon('success')
        }

        if (response.data) {
          let bool = response.data['Success']
          if (bool) {
            
            this.loading = false
            this.$emit('closeModal')
          } else {
            
            this.loading = false
            this.$emit('closeModal')
          }
        }
      } catch (e) {
        
        this.loading = false
        this.$emit('closeModal')
      }
    },

    async refresh() {
      this.buttonName = 'Confirm'
      this.countDown = 30
      this.countDownTimer()

      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.buttonName = 'Refresh'
      }, 30000)

      this.$emit('refresh')
    },

    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style>
.ant-modal-title {
  text-align: center;
}

.ant-modal-button {
    font-size: 16px;
    margin-top: 20px;
    width: 100%;
    height: 40px;
    background: #90dafe 0 0 no-repeat padding-box;
    opacity: 1;
}

.modal-horizontal-line {
  height: 1px;
  color: gray;
  border-width: 0;
  background-color: #f4f4f4;
}

.modal-text {
  color: #2e4153;
  font-size: 16px;
  font-weight: bold;
}

.modal-values {
  color: #858e9d;
  font-size: 16px;
}
</style>
