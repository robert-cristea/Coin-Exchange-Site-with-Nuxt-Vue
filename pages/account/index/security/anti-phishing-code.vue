<template>
  <div class="change-antiphishing-container">
    <a-row class="stick-margin">
      <a-col :span="24">
        <a-card class="border-none">
          <a-breadcrumb class="Roboto-Regular">
            <a-breadcrumb-item>
              <a @click="$router.push(localeRoute('/account/security'))">{{
                $t('header_text_security')
              }}</a>
            </a-breadcrumb-item>
            <a-breadcrumb-item>{{
              $t('text_anti_phishing_code')
            }}</a-breadcrumb-item>
          </a-breadcrumb>
        </a-card>
      </a-col>
    </a-row>
    <a-row
      type="flex"
      class="change-antip-card-row"
      align="middle"
      justify="center"
    >
      <a-col :span="24">
        <div
          :class="
            !isMobile
              ? 'change-antip-card-container'
              : 'change-antip-card-container-mobile'
          "
        >
          <!-- outer header start -->
          <div class="change-antip-card-outer-head-content text-center">
            <h2 class="Roboto-Medium">{{ $t('antiphishing_text_code') }}</h2>
            <a-alert type="info" class="border-none" show-icon>
              <span slot="description" class="Roboto-Regular">
                {{ $t('antiphishing_text_warning') }}
              </span>
            </a-alert>

            <a-alert
              v-if="showError"
              type="warning"
              :description="errorMsg"
              show-icon
              class="Roboto-Regular alert-box"
              @close="(e) => (showError = false)"
              closable
            >
            </a-alert>
          </div>
          <!-- outer header end -->
          <a-card class="change-antip-card border-none">
            <div class="text-left">
              <h3 class="Roboto-Medium change-antip-card-title">
                {{ $t('antiphishing_text_title') }}
              </h3>
              <p class="Roboto-Regular">
                {{ $t('antiphishing_text_description') }}
              </p>
            </div>
            <div class="text-left">
              <h3 class="Roboto-Medium change-antip-card-title">
                {{ $t('antiphishing_text_how_it_work_title') }}
              </h3>
              <p class="Roboto-Regular">
                {{ $t('antiphishing_text_how_it_work_description') }}
              </p>
            </div>

            <div
              class="change-antip-card-media-section"
              :style="isMobile ? 'height: 143px !important' : null"
            >
              <div class="change-antip-card-media-content">
                <div class="change-antip-card-input-group">
                  <a-row
                    type="flex"
                    align="middle"
                    class="change-antip-media-row"
                    :gutter="16"
                  >
                    <a-col :span="10">
                      <span class="Roboto-Regular" style="font-size: 12px">{{
                        $t('antiphishing_text_code')
                      }}</span>
                    </a-col>
                    <a-col :span="14">
                      <a-input-search
                        size="small"
                        v-model="NewAntiphishingCode"
                        class="anti-code-input"
                        v-bind:placeholder="$t('antiphishing_text')"
                      >
                        <a-button
                          :disabled="true"
                          slot="enterButton"
                          type="primary"
                          size="small"
                        >
                          xxxxxx
                        </a-button>
                      </a-input-search>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>

            <div
              class="change-antip-card-footer"
              :style="isMobile ? 'margin-top: 20px' : null"
            >
              <a-button
                @click="updateAntiP"
                :disabled="NewAntiphishingCode === ''"
                class="border-none Roboto-Medium"
                type="primary"
                size="large"
                :loading="isLoadingUpdateAntiP"
                block
              >
                {{ $t('antiphishing_text_confirm') }}</a-button
              >
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>
    <SecurityVerifyModal
      v-if="verifyData.showDialog"
      :verifyData="verifyData"
    />
  </div>
</template>

<script>
import SecurityVerifyModal from '~/components/Account/SecurityVerifyModal'

export default {
  data() {
    return {
      NewAntiphishingCode: '',
      verifyData: {
        Token: null,
        errorCode: null,
        showDialog: false,
      },
      showError: false,
      errorMsg: '',
      isLoadingUpdateAntiP: false,
      isMobile: null,
    }
  },
  head(){
    return{
      title: 'Oltalama Engelleme Kodu | Cointral.com'
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  methods: {
    async updateAntiP() {
      const { $axios, $config, $cookies } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      this.isLoadingUpdateAntiP = true
      try {
        const response = await $axios.post(
          $config.FINANCE_API_URL + '/UpdateAntiphishing',
          {
            NewAntiphishingCode: this.NewAntiphishingCode,
          },
          {
            headers: authHeaders,
          }
        )
        this.isLoadingUpdateAntiP = false
        if (response.data.Success) {
          const { SecurityVerificationToken, ErrorCode } = response.data
          this.verifyData.Token = SecurityVerificationToken
          this.verifyData.errorCode = ErrorCode
          this.verifyData.showDialog = true
        } else {
          const { ErrorCode } = response.data
          if (ErrorCode === 98) {
            this.verifyData.Token = ''
            this.verifyData.errorCode = ErrorCode
            this.verifyData.showDialog = true
          }
          this.showError = true
          this.errorMsg = response.data.Message
        }
      } catch (e) {
        this.isLoadingUpdateAntiP = false
        this.showError = true
        this.errorMsg = e.response.data.Message
      }
    },
  },
}
</script>

<style scoped>
.stick-margin {
  margin: -15px auto auto -15px;
}
.change-antip-card-row {
  min-height: 50vh;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-antip-card-container {
  width: 420px;
  margin: auto auto;
}
.change-antip-card-container-mobile {
  margin: auto auto;
}
.change-antip-card-outer-head-content {
  margin: 20px auto;
}
.change-antip-card-media-section {
  height: 123px;
  margin: 10px auto;
  background-image: url('../../../../assets/icons/antiphishing/media.svg');
  position: relative;
  overflow: hidden;
}
.change-antip-card {
  box-shadow: 0px 0px 5px #0000001a;
  border-radius: 3px;
}
.change-antip-card-input-group {
  background-color: #ffffff;
  border-radius: 3px;
  padding: 20px;
  width: 90%;
  margin: auto;
  position: relative;
  top: 70px;
}
.change-antip-media-row {
  padding-bottom: 5px;
  border-bottom: 1px solid #f3f2f3;
}

.alert-box {
  margin: 10px auto;
}
</style>
