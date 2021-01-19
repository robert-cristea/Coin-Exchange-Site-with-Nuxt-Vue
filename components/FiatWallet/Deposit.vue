<template>
  <div class="Roboto-Regular" style="background-color: #fafafa">
    <DepositTermsModal
      :visible="visible"
      @accepted="isTermsAccepted"
      @approved="approve"
    />

    <a-breadcrumb
      class="Roboto-Regular"
      style="margin-top: 20px; margin-left: 20px; margin-bottom: 30px"
    >
      <a-breadcrumb-item
        ><a @click="SET_CURRENT_TAB('Price')">{{
          $t('fiat_wallet_label')
        }}</a></a-breadcrumb-item
      >
      <a-breadcrumb-item>{{ $t('fiat_wallet_deposit') }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row style="margin-bottom: 20px">
      <a-col :offset="1" :span="23" style="text-align: start">
        <div class="Roboto-Regular" style="font-size: 32px; color: #1c2640">
          {{ $t('fiat_wallet_deposit_label') }}
        </div>
      </a-col>
    </a-row>

    <a-row :class="!isMobile ? 'main-row' : 'main-row-mobile'">
      <a-col
        :style="isMobile ? 'display: none' : null"
        offset="1"
        :xs="16"
        :sm="16"
        :md="16"
        :lg="10"
        :xl="10"
        align="center"
      >
        <a-row :span="24">
          <img
            height="326"
            :src="require(`~/assets/icons/fiat-deposit-background.png`)"
            style="margin-right: 10%; margin-left: 10%; margin-top: 50px"
            alt
          />
        </a-row>
      </a-col>

      <a-col
        :offset="!isMobile ? 1 : 0"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="11"
        :xl="11"
      >
        <DepositTermsComplete
          v-if="!accepted || !approved"
          @checkKycRequired="checkKycRequired"
          style="z-index: 5; margin-bottom: 100px; margin-top: 10px"
        />

        <a-col v-else>
          <div v-blur="isBlur">
            <BranchInfo
              :title="$t('fiat_wallet_text_bank')"
              :explanation="
                USER_FIAT_WALLET_DEPOSIT['BankAccounts'][0]['BankName']
              "
              style="margin-bottom: 20px"
            />

            <BranchInfo
              :title="$t('fiat_wallet_text_receiver')"
              :explanation="
                USER_FIAT_WALLET_DEPOSIT['BankAccounts'][0]['AccountName']
              "
              style="margin-bottom: 20px"
            />

            <BranchInfo
              :title="'IBAN'"
              :explanation="USER_FIAT_WALLET_DEPOSIT['BankAccounts'][0]['IBAN']"
              style="margin-bottom: 20px"
            />

            <BranchInfo
              :title="$t('fiat_wallet_text_deposit_code')"
              :explanation="USER_FIAT_WALLET_DEPOSIT['DepositCode']"
              style="margin-bottom: 20px"
            />
          </div>
        </a-col>

        <a-col class="tip" :span="24">
          <a-col :span="2">
            <img
              :style="
                !isMobile
                  ? 'position: relative; top: 70px'
                  : 'position: relative; top: 5'
              "
              src="@/assets/icons/Bulb.png"
              alt="Bulb"
            />
          </a-col>
          <a-col :span="22">
            <a-col style="margin-top: 10px" :span="24">
              <li>
                {{ $t('fiat_wallet_text_condition1') }}
              </li>
            </a-col>
            <a-col style="margin-top: 5px" :span="24">
              <li>{{ $t('fiat_wallet_text_condition2') }}</li>
            </a-col>
            <a-col style="margin-top: 5px" :span="24">
              <li>{{ $t('fiat_wallet_text_condition3') }}</li>
            </a-col>
            <a-col style="margin-top: 5px" :span="24">
              <li>
                {{ $t('fiat_wallet_text_condition4') }}
              </li>
            </a-col>
            <a-col style="margin-top: 5px" :span="24">
              <li>
                {{ $t('fiat_wallet_text_condition5') }}
              </li>
            </a-col>
            <a-col style="margin-top: 5px" :span="24">
              <li>
                {{ $t('fiat_wallet_text_condition6') }}
              </li>
            </a-col>
          </a-col>
        </a-col>
      </a-col>
    </a-row>

    <a-row :style="!isMobile ? 'margin-top: 20px; margin-bottom: 20px' : null">
      <FiatWalletHistory
        v-if="!isMobile"
        :historyData="USER_FIAT_WALLET_DEPOSIT['FiatDepositList']"
        :title="$t('fiat_wallet_deposit_history')"
      />
      <FiatWalletHistoryMobile
        v-if="isMobile"
        :historyData="USER_FIAT_WALLET_DEPOSIT['FiatDepositList']"
        :title="$t('fiat_wallet_deposit_history')"
      />
    </a-row>
  </div>
</template>

<script>
import DepositTermsModal from '@/components/FiatWallet/DepositTermsModal'
import DepositTermsComplete from '@/components/FiatWallet/DepositTermsComplete'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Deposit',

  data: () => ({
    visible: true,
    accepted: false,
    approved: false,
    isMobile: null,

    isBlur: true,
  }),

  computed: {
    ...mapGetters({
      USER_FIAT_WALLET_DEPOSIT: 'fiatwallet/USER_FIAT_WALLET_DEPOSIT',
    }),
  },

  mounted() {
    this.checkKycRequired()

    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  components: { DepositTermsComplete, DepositTermsModal },

  methods: {
    ...mapMutations({
      SET_CURRENT_TAB: 'wallet/SET_CURRENT_TAB',
    }),

    isTermsAccepted(val) {
      // this.accepted = val
    },

    approve() {
      this.visible = false
      this.checkKycRequired()

      this.isBlur = false
    },

    checkKycRequired() {
      if (this.USER_FIAT_WALLET_DEPOSIT['KycRequired'] === true) {
        // TODO: Route kyc page
      } else if (this.USER_FIAT_WALLET_DEPOSIT['KycRequired'] === false) {
        this.approved = true
        this.accepted = true
      }
    },
  },
}
</script>

<style scoped>
.main-row {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000000a;
  opacity: 1;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-left: 40px;
  margin-right: 80px;
  height: 550px;
}

.tip {
  padding: 22px 30px 22px 30px;
  margin-bottom: 20px;
  background: #f5fcff 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  text-align: left;
}

.main-row-mobile {
  background: #ffffff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #0000000a;
  opacity: 1;
  padding-top: 50px;
  height: 660px;
}
</style>
