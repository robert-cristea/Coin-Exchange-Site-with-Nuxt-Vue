<template>
  <a-modal
    id="p2p-warning"
    :visible="visible"
    @cancel="$emit('close')"
    :centered="true"
    :destroyOnClose="true"
    :header="null"
    :footer="null"
    :width="384"
    :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
    :maskClosable="false"
  >
    <div v-if="RequestInfo.Step === 4" class="content">
      <img
        src="~/assets/images/p2p-request/caution.svg"
        alt="caution_warning"
      />
      <h3 align="center" class="Roboto-Medium m-0">
        Dikkat bu işlem geri alınamaz! Ödeme almadığınızı onaylarsanız ilgili
        miktar hesabınızda dondurularak işlem destek merkezine yönlendirilecek.
      </h3>
      <div class="action-buttons">
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="secondary"
          style="margin-right: 5px"
          @click="$emit('close')"
          >Vazgeç</a-button
        >
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="primary"
          @click="SetP2PRequestConflict"
          >Ödeme Onayı</a-button
        >
      </div>
    </div>
    <div v-else-if="RequestInfo.Step === 8" class="content">
      <img
        src="~/assets/images/p2p-request/caution.svg"
        alt="caution_warning"
      />
      <h3 align="center" class="Roboto-Medium m-0">
        Dikkat bu işlem geri alınamaz! Ödeme almadığınızı onaylarsanız ilgili
        miktar hesabınızda dondurularak işlem destek merkezine yönlendirilecek.
      </h3>
      <div class="action-buttons">
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="secondary"
          style="margin-right: 5px"
          @click="$emit('close')"
          >Vazgeç</a-button
        >
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="primary"
          @click="SetP2PRequestConflict"
          >Ödeme Onayı</a-button
        >
      </div>
    </div>
    <div v-else-if="RequestInfo.Step === 9" class="content">
      <img
        src="~/assets/images/p2p-request/caution.svg"
        alt="caution_warning"
      />
      <h3 align="center" class="Roboto-Medium m-0">
        Dikkat bu işlem geri alınamaz! Ödeme almadığınızı onaylarsanız ilgili
        miktar hesabınızda dondurularak işlem destek merkezine yönlendirilecek.
      </h3>
      <div class="action-buttons">
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="secondary"
          style="margin-right: 5px"
          @click="$emit('close')"
          >Vazgeç</a-button
        >
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="primary"
          @click="SetP2PRequestConflict"
          >Ödeme Onayı</a-button
        >
      </div>
    </div>
    <div v-else class="content">
      <img
        src="~/assets/images/p2p-request/caution.svg"
        alt="caution_warning"
      />
      <h3 align="center" class="Roboto-Medium m-0">
        Dikkat bu işlem geri alınamaz!
      </h3>
      <p class="Roboto-Medium primary-text">
        <span>
          {{ RequestInfo.P2P_OrderUsername }}
        </span>
      </p>
      <p class="faded-text">
        Kullanıcısından
        <span>
          {{ RequestInfo.Amount }}
        </span>
        <span>
          {{ RequestInfo.Asset }}
        </span>
        karşılığında
        <span>
          {{ RequestInfo.Total }}
        </span>
        <span>
          {{ RequestInfo.FiatCurrency }}
        </span>
        ödeme aldığımı onaylıyorum.
      </p>
      <div class="action-buttons">
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="secondary"
          style="margin-right: 5px"
          @click="$emit('close')"
          >Vazgeç</a-button
        >
        <a-button
          class="Roboto-Medium"
          block
          size="large"
          type="primary"
          @click="SetP2PRequestConflict"
          >Ödeme Onayı</a-button
        >
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'ConfirmPopUpP2PDestek',
  props: {
    visible: {
      required: true,
      default: false,
    },
    file: {
      required: true,
      default: null,
    },
    RequestInfo: {
      required: true,
      type: Object,
    },
  },
  methods: {
    async SetP2PRequestPending() {
      const { $axios, $cookies, $config } = this
      try {
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        let file = this.file.file.slice(this.file.file.indexOf(',') + 1)
        const { data } = await $axios.post(
          $config.FINANCE_API_URL + '/SetP2PRequestPending',
          {
            RequestId: this.$route.params.id,
            FileName: this.file.name,
            FileContent: file,
          },
          {
            headers: authHeaders,
          }
        )
        const { Success, Message } = data
        if (Success) {
          this.$router.push(this.localeRoute('/P2PMarket'))
        }
      } catch (e) {
        if (e.response) {
        }
      }
    },
    async SetP2PRequestConflict() {
      const { $axios, $cookies, $config } = this
      try {
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.get(
          $config.FINANCE_API_URL + '/SetP2PRequestConflict',
          {
            params: { RequestId: this.$route.params.id },
            headers: authHeaders,
          }
        )
        const { Success, Message } = data
        if (Success) {
        }
      } catch (e) {
        if (e.response) {
        }
      }
    },
    async ConfirmP2PRequest() {
      const { $axios, $cookies, $config } = this
      try {
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.post(
          $config.FINANCE_API_URL + '/ConfirmP2PRequest',
          { RequestId: this.$route.params.id },
          {
            headers: authHeaders,
          }
        )
        const { Success, Message } = data
        if (Success) {
          this.$router.push(this.localeRoute('/P2PMarket'))
        }
      } catch (e) {
        if (e.response) {
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.spacer {
  flex-grow: 1;
}
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
