<template>
  <a-modal
    class="ant-modal-title Roboto-Regular"
    v-model="visible"
    :maskClosable="false"
    :closable="false"
    centered
    v-bind:title="$t('fiat_wallet_text_deposit_form')"
    @cancel="closeModal"
  >
    <template slot="footer">
      <a-button
        class="ant-modal-button"
        :loading="loading"
        :disabled="isDisabled"
        v-on:click="agree"
      >
        {{ $t('fiat_wallet_text_confirm_button') }}
      </a-button>
    </template>

    <a-checkbox-group @change="onChange">
      <a-row>
        <a-col class="mt-1" offset1="1" :span="22" align="left">
          <a-checkbox value="A">
            {{ $t('fiat_wallet_text_condition1') }}
          </a-checkbox>
        </a-col>
        <a-col class="mt-1" offset1="1" :span="22" align="left">
          <a-checkbox value="B">
            {{ $t('fiat_wallet_text_condition2') }}
          </a-checkbox>
        </a-col>
        <a-col class="mt-1" offset1="1" :span="22" align="left">
          <a-checkbox value="C">
            {{ $t('fiat_wallet_text_condition3') }}
          </a-checkbox>
        </a-col>
        <a-col class="mt-1" offset1="1" :span="22" align="left">
          <a-checkbox value="D">
            {{ $t('fiat_wallet_text_condition4') }}
          </a-checkbox>
        </a-col>
        <a-col class="mt-1" offset1="1" :span="22" align="left">
          <a-checkbox value="E">
            {{ $t('fiat_wallet_text_condition5') }}
          </a-checkbox>
        </a-col>
        <a-col class="mt-1" offset1="1" :span="22" align="left">
          <a-checkbox value="F">
            {{ $t('fiat_wallet_text_condition6') }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </a-modal>
</template>

<script>
export default {
  name: 'DepositTermsModal',

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    loading: false,
    isDisabled: true,
  }),

  methods: {
    onChange(checkedValues) {
      if (checkedValues.length === 6) {
        this.isDisabled = false
        this.$emit('accepted', true)
      } else {
        this.isDisabled = true
        this.$emit('accepted', false)
      }
    },

    closeModal() {
      // this.$emit('closeDepositTermsModal')
    },

    agree() {
      if (!this.isDisabled) {
        this.$emit('approved')
      }
    },
  },
}
</script>

<style>
.mt-1 {
  margin-top: 13px;
}

.ant-modal-button {
  opacity: 1;
  width: 100%;
  color: black;
  background: #90dafe 0 0 no-repeat padding-box;
}
</style>
