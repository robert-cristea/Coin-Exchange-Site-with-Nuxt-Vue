<template>
  <div class="Kyc-settings">
    <a-col v-if="isMobile" offset="1" style="margin-top: 20px">
      <a-breadcrumb class="Roboto-Regular">
        <a-breadcrumb-item>Güvenlik</a-breadcrumb-item>
        <a-breadcrumb-item>Kimlik Doğrulama</a-breadcrumb-item>
      </a-breadcrumb>
    </a-col>

    <a-divider v-if="isMobile" type="horizontal" />
    <a-row class="Kyc-row">
      <a-col :offset="isMobile ? 1 : 0" :span="!isMobile ? 24 : 23">
        <h1 class="Roboto-Regular">{{ $t('text_identity_verification') }}</h1>
      </a-col>
    </a-row>
    <a-row class="Kyc-row">
      <a-col :span="24">
        <a-card class="Kyc-card border-none w-100">
          <a-steps labelPlacement="vertical" size="small" v-model="currentStep">
            <a-step :disabled="true">
              <template slot="title">
                <span class="Roboto-Medium">
                  {{
                    !isMobile
                      ? $t('text_personal_information')
                      : currentStep === 0
                      ? $t('text_personal_information')
                      : null
                  }}
                </span>
              </template>
            </a-step>
            <a-step :disabled="true">
              <template slot="title">
                <span class="Roboto-Medium">
                  {{
                    !isMobile
                      ? $t('text_id_information')
                      : currentStep === 1
                      ? $t('text_id_information')
                      : null
                  }}
                </span>
              </template>
            </a-step>
            <a-step :disabled="true">
              <template slot="title">
                <span class="Roboto-Medium">
                  {{
                    !isMobile
                      ? $t('text_face_verification')
                      : currentStep === 2
                      ? $t('text_face_verification')
                      : null
                  }}
                </span>
              </template>
            </a-step>
            <a-step :disabled="true">
              <template slot="title">
                <span class="Roboto-Medium">
                  {{
                    !isMobile
                      ? $t('text_completed')
                      : currentStep === 3
                      ? $t('text_completed')
                      : null
                  }}
                </span>
              </template>
            </a-step>
          </a-steps>
        </a-card>
      </a-col>
    </a-row>

    <a-row class="Kyc-row">
      <a-col :span="24">
        <a-card
          class="Kyc-card Kyc-content-card border-none w-100"
          :class="{ completion: currentStep === 3 }"
        >
          <keep-alive>
            <component
              :is="currentComponent"
              :KycData.sync="KycInfo"
              :Docs.sync="Docs"
              @changeStep="stepAction"
            ></component>
          </keep-alive>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PersonalInfo from '~/components/Account/SecurityComponents/PersonalInfo'
import IdentityInformation from '~/components/Account/SecurityComponents/IdentityInformation'
import FaceVerification from '~/components/Account/SecurityComponents/FaceVerification'
import Completion from '~/components/Account/SecurityComponents/Completion'

export default {
  components: {
    PersonalInfo,
    IdentityInformation,
    FaceVerification,
    Completion,
  },
  head() {
    return {
      title: 'Kimlik Doğrulama | Cointral.com',
    }
  },
  data() {
    return {
      KycInfo: {
        Name: '',
        Surname: '',
        AreaCode: '',
        Phone: '',
        Birthday: '',
        Address: '',
        PostalCode: null,
        CountryId: undefined,
        CityId: undefined,
        NationalityId: undefined,
        DocNumber: '',
        GenderLabel: undefined,
        DocumentTypeLabel: undefined,
        File: [],
      },
      Docs: {
        FacePhoto: null,
        Front: null,
        Back: null,
      },
      currentStep: 0,
      currentComponent: 'PersonalInfo',
      isMobile: null,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  async asyncData({
    app,
    redirect,
    $axios,
    $cookies,
    $config: { FINANCE_API_URL },
  }) {
    let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
    const response = await $axios.get(FINANCE_API_URL + '/GetUserInfo', {
      headers: authHeaders,
    })
    if (response.data.Success) {
      const {
        UserInfo: { KYCStatus },
      } = response.data

      if (
        KYCStatus !== 'NoKYC' &&
        KYCStatus !== 'Revision' &&
        KYCStatus !== 'Todo'
      ) {
        redirect(app.localeRoute('/account/dashboard'))
      }
    }
  },
  methods: {
    stepAction(step) {
      this.currentStep = step
    },
  },
  watch: {
    currentStep(val) {
      switch (val) {
        case 0:
          this.currentComponent = PersonalInfo
          break
        case 1:
          this.currentComponent = IdentityInformation
          break
        case 2:
          this.currentComponent = FaceVerification
          break
        case 3:
          this.currentComponent = Completion
          break
        default:
          this.currentComponent = PersonalInfo
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/ant/variables.less';

.Kyc-row {
  margin: 20px auto;
}

.Kyc-card {
  box-shadow: 0px 0px 3px #0000000f;
  border-radius: 3px;
}

.Kyc-content-card {
  padding: 50px;
}

.completion {
  background-image: url('~assets/images/security/completion.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.progressDotOuter3 {
  position: relative;
  top: -8px;
  left: -2px;
  border: 1px solid @primary-color;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  padding: 2px;
}

.progressDotOuter2 {
  border: 1px solid @primary-color;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  padding: 2px;
}

.progressDotOuter1 {
  border: 1px solid @primary-color;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  padding: 2px;
}

.progressDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: @primary-color;
}
</style>
