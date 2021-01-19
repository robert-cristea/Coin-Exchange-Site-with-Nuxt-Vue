<template>
  <a-modal
    v-model="visible"
    on-ok="handleOk"
    @cancel="closeModal"
    :footer="null"
    centered
  >
    <a-col :span="24" align="center" style="margin-top: 60px">
      <img
        style="position: relative"
        src="@/assets/icons/identity-check.svg"
        alt="Bulb"
      />
    </a-col>

    <a-col
      :span="24"
      align="center"
      style="margin-top: 20px; margin-bottom: 40px"
    >
      {{ $t('payment_text_kyc') }}
    </a-col>

    <a-col align="center">
      <a-button key="back" @click="handleCancel">
        {{ $t('payment_text_cancel_btn') }}</a-button
      >
      <a-button
        style="background-color: var(--text-primary)"
        key="submit"
        type="primary"
        :loading="loading"
        @click="$router.push(localeRoute('/account/kyc'))"
      >
        {{ $t('text_authentication') }}
      </a-button>
    </a-col>
  </a-modal>
</template>

<script>
export default {
  name: 'PaymentModal',

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    showModal() {
      this.visible = true
    },

    handleOk(e) {
      this.$emit('verify')
    },

    handleCancel(e) {
      this.$emit('closeModal')
    },

    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped></style>
