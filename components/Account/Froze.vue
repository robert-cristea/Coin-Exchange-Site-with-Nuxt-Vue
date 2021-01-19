<template>
  <a-col style="margin-bottom: 80vh">
    <a-breadcrumb
      class="Roboto-Regular"
      style="margin-top: 20px; margin-left: 20px; margin-bottom: 30px"
    >
      <a-breadcrumb-item>{{ $t('froze_security') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('froze_transactions') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('froze_disable_account') }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-col
      :offset="!isMobile ? 9 : 3"
      :span="!isMobile ? 6 : 18"
      class="Roboto-Regular"
      style="background-color: white; margin-top: 8%; z-index: 5"
    >
      <a-col :span="24" align="center">
        <img src="~/assets/icons/frozen/frozen.svg" alt="" />
      </a-col>

      <a-col :span="24" style="margin-top: 20px" align="center">
        <h2>{{ $t('froze_disable_account') }}</h2>
      </a-col>

      <a-col offset="1" :span="22" class="Roboto-Bold">
        {{ $t('froze_warning') }}
      </a-col>

      <a-col :span="24">
        <ul>
          <li>{{ $t('froze_item_one') }}</li>
          <li>{{ $t('froze_item_two') }}</li>
          <li>{{ $t('froze_item_three') }}</li>
          <li>{{ $t('froze_item_four') }}</li>
          <li>{{ $t('froze_item_five') }}</li>
        </ul>
      </a-col>

      <a-col offset="1" :span="22">
        <a-divider type="horizontal" />
      </a-col>

      <a-col offset="1" :span="22">
        {{ $t('froze_second_warning') }}
      </a-col>

      <a-col offset="1" :span="22" style="margin-top: 20px">
        <a-button
          class="w-100 ant-btn-primary"
          v-on:click="frozeAccount"
          :disabled="isDisabled"
        >
          {{ $t('froze_approve') }}
        </a-button>

        <a-alert
          v-if="isError"
          type="error"
          :message="errorMessage"
          banner
          style="margin-top: 20px"
        />
      </a-col>
    </a-col>

    <!-- MODAL -->
    <a-modal
      id="verify-modal"
      :visible="isModalVisible"
      @ok="verify"
      @cancel="cancelVerify"
      :centered="true"
      :destroyOnClose="true"
      :footer="null"
      :width="384"
      :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
      :maskClosable="false"
    >
      <h3 slot="title" class="security-modal-title">
        {{ $t('froze_modal_title') }}
      </h3>
      <div class="modal-body">
        <p class="Roboto-Regular">
          {{ $t('froze_modal_text') }}
        </p>

        <div class="invite-verify-box">
          <div class="invite-verify-box-item">
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/security_settings/ss-sms.svg"
              alt=""
            />
            <p class="Roboto-Medium">{{ $t('froze_modal_sms') }}</p>
          </div>
          <div class="invite-verify-box-item">
            <img
              class="icon-2fa"
              slot="avatar"
              src="~/assets/icons/security_settings/ss-2fa.svg"
              alt=""
            />
            <p class="Roboto-Medium">{{ $t('froze_modal_google') }}</p>
          </div>
        </div>
        <p
          align="right"
          class="Roboto-Medium remind-me-text"
          v-on:click="remindMeLater"
        >
          {{ $t('froze_remember_me') }}
        </p>
      </div>
    </a-modal>
  </a-col>
</template>

<script>
export default {
  name: 'Frozen',

  data: () => ({
    isMobile: null,
    isModalVisible: false,
    isDisabled: false,
    errorMessage: null,
    isError: false,
  }),

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  methods: {
    verify() {
      this.isModalVisible = false
    },

    cancelVerify() {
      this.isModalVisible = false
    },

    remindMeLater() {
      this.isModalVisible = false
    },

    async frozeAccount() {
      const {
        $axios,
        $store,
        $router,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      try {
        const response = await $axios.post(
          FINANCE_API_URL + '/FrozeAccount',
          null,
          {
            headers: authHeaders,
          }
        )
        if (response.data.Success) {
          $store.commit('auth/setLoggedIn', false)
          $cookies.removeAll()
          $router.push(this.localeRoute('/login'))
          // TODO:
          this.isDisabled = true
        } else {
          this.isModalVisible = true
          let messages = response.data.Message.split(',')
          if (messages.length === 1) {
            this.errorMessage = `Lütfen ${messages[0].toString()} tamamlayınız.`
            this.isError = true
          } else {
            this.errorMessage = `Lütfen ${messages[0].toString()} ve ${messages[1].toString()} tamamlayınız.`
            this.isError = true
          }
          setTimeout(() => (this.isError = false), 5000)
        }
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.security-modal-title {
  margin-bottom: 10px;
  text-align: center;
}

.invite-verify-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
}

.invite-verify-box-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e8ea;
  border-radius: 3px;
  text-align: center;
  width: 150px;
  height: 120px;
  cursor: pointer;
}

.remind-me-text {
  margin-top: 20px;
  color: #1ca4e8;
  cursor: pointer;
}
</style>
