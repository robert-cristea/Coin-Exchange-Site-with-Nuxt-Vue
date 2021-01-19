<template>
  <a-col :span="24">
    <a-col offset="4" :span="16">
      <a-col :span="24" style="margin-bottom: 20px">
        <a-col offset="4" :span="16" align="center">
          <img
            style="position: relative"
            src="@/assets/icons/lock.svg"
            alt="Bulb"
          />
        </a-col>
      </a-col>

      <a-col :span="24">
        <a-col offset="4" :span="16" style="text-align: center">
          {{ $t('fiat_wallet_text_kyc_warning') }}
        </a-col>
      </a-col>

      <a-col :span="24">
        <a-col offset="4" :span="16" align="center" style="margin-top: 20px">
          <a-button class="ant-btn-primary" @click="checkKyc">
            <nuxt-link :to="localePath('/account/kyc')">
              <span>{{ $t('fiat_wallet_text_kyc_warning_btn') }}</span>
            </nuxt-link>
          </a-button>
          <!-- <a-button class="ant-btn-primary"
            @click="checkKyc">
            KYC Bilgilerini Tamamla
          </a-button>-->
        </a-col>
      </a-col>
    </a-col>
  </a-col>
</template>

<script>
export default {
  name: 'DepositTermsComplete',

  methods: {
    checkKyc() {
      this.$emit('checkKycRequired')
    },
  },
}
</script>

<style scoped>
</style>
