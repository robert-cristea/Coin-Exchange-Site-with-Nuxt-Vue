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
    <div v-if="RequestInfo.Step === 8">
      <h3 slot="title" class="Roboto-Medium">İşlemin İptalini Onaylayın!</h3>
      <p class="Roboto-Regular">
        İşlemin İptalini Onaylayın! Eğer satıcıya ödeme yaptıysanız, lütfen emri
        iptal etmeyin.Bir günde 3 kere emir iptal etmek, günün geri kalanında
        alım satım yapamamanıza neden olur.
      </p>
      <a-checkbox class="confirm-modal-check-box Roboto-Medium"
        >Satıcıya ödeme yapmadığımı onaylıyorum
      </a-checkbox>
      <a-button
        @click="cancelP2PRequest"
        class="confirm-modal-button Roboto-Medium"
        type="primary"
        size="large"
        block
        >Onayla
      </a-button>
    </div>
    <div v-else>
      <h3 slot="title" class="Roboto-Medium">İşlemin İptalini Onaylayın!</h3>
      <p class="Roboto-Regular">
        Eğer satıcıya ödeme yaptıysanız, lütfen emri iptal etmeyin.Bir günde 3
        kere emir iptal etmek, günün geri kalanında alım satım yapamamanıza
        neden olur.
      </p>
      <a-checkbox class="confirm-modal-check-box Roboto-Medium"
        >Satıcıya ödeme yapmadığımı onaylıyorum
      </a-checkbox>
      <a-button
        @click="cancelP2PRequest"
        class="confirm-modal-button Roboto-Medium"
        type="primary"
        size="large"
        block
        >Onayla
      </a-button>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'CancelPopUpP2P',
  props: {
    visible: {
      required: true,
      default: false,
    },
    RequestInfo: {
      required: true,
      type: Object,
    },
  },
  methods: {
    async cancelP2PRequest() {
      const { $axios, $cookies, $config } = this
      try {
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.delete(
          $config.FINANCE_API_URL + '/CancelP2PRequest',
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
