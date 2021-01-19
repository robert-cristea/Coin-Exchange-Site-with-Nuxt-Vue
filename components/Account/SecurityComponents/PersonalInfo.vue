<template>
  <div class="personal-info-container">
    <a-row class="personal-info-row" type="flex" :gutter="150">
      <a-col class="personal-info-left" :span="!isMobile ? 12 : 24">
        <a-form-model
          ref="PersonaInfoFormLeft"
          layout="vertical"
          :model="KycData"
          :rules="rules"
        >
          <fieldset>
            <legend class="border-none Roboto-Medium">
              <h3>
                {{ $t('text_personal_information') }}
              </h3>
            </legend>
            <a-row :gutter="16">
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="Name" prop="Name">
                  <a-input
                    v-model.lazy="KycData.Name"
                    :placeholder="$t('text_name')"
                    class="Roboto-Regular"
                    size="large"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="SurName" prop="SurName">
                  <a-input
                    v-model.lazy="KycData.SurName"
                    :placeholder="$t('text_surname')"
                    class="Roboto-Regular"
                    size="large"
                  ></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="GenderLabel" prop="GenderLabel">
                  <a-select
                    v-model.lazy="KycData.GenderLabel"
                    :placeholder="$t('text_gender')"
                    class="w-100 Roboto-Regular"
                    size="large"
                  >
                    <a-select-option value="Male">
                      {{ $t('security_components_male') }}
                    </a-select-option>
                    <a-select-option value="Female">
                      {{ $t('security_components_female') }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="Birthday" prop="Birthday">
                  <input
                    v-model.lazy="KycData.Birthday"
                    type="date"
                    class="w-100 birthday-input Roboto-Regular"
                    :placeholder="$t('text_birthday')"
                  />
                  <!-- <a-date-picker
                    v-model.lazy="KycData.Birthday"
                    format="YYYY-MM-DD"
                    class="w-100 Roboto-Regular"
                    :placeholder="$t('text_birthday')"
                    size="large"
                  /> -->
                  <p class="text-danger" v-if="errorsFields[4]">
                    {{ errorsFields[4] }}
                  </p>
                </a-form-model-item>
              </a-col>
            </a-row>
          </fieldset>
        </a-form-model>
      </a-col>
      <a-col class="personal-info-right" :span="!isMobile ? 12 : 24">
        <a-form-model
          ref="PersonaInfoFormRight"
          layout="vertical"
          :model="KycData"
          :rules="rules"
        >
          <fieldset>
            <legend class="border-none Roboto-Medium">
              <h3>
                {{ $t('text_contact_info') }}
              </h3>
            </legend>
            <a-row>
              <a-col :span="24">
                <a-form-model-item ref="Address" prop="Address">
                  <a-input
                    v-model.lazy="KycData.Address"
                    :placeholder="$t('text_address')"
                    class="Roboto-Regular"
                    size="large"
                  ></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="PostalCode" prop="PostalCode">
                  <a-input
                    v-model.lazy="KycData.PostalCode"
                    :placeholder="$t('text_postalcode')"
                    class="Roboto-Regular"
                    size="large"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="CountryId" prop="CountryId">
                  <a-select
                    v-model.lazy="KycData.CountryId"
                    :placeholder="$t('text_select_country')"
                    class="w-100 Roboto-Regular"
                    size="large"
                  >
                    <div slot="placeholder"></div>
                    <a-select-option
                      v-for="c in CountryList"
                      :key="c.Key"
                      :value="c.Key"
                    >
                      {{ c.Name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="CityId" prop="CityId">
                  <a-select
                    v-model.lazy="KycData.CityId"
                    :placeholder="$t('text_select_city')"
                    class="w-100 Roboto-Regular"
                    size="large"
                  >
                    <a-select-option
                      v-for="c in filteredCities"
                      :key="c.Key"
                      :value="c.Key"
                    >
                      {{ c.Name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="NationalityId" prop="NationalityId">
                  <a-select
                    v-model.lazy="KycData.NationalityId"
                    :placeholder="$t('text_select_nationality')"
                    class="w-100 Roboto-Regular"
                    size="large"
                  >
                    <a-select-option
                      v-for="c in CountryList"
                      :key="c.Key"
                      :value="c.Key"
                    >
                      {{ c.Name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="!isMobile ? 12 : 24">
                <a-form-model-item ref="DocNumber" prop="DocNumber">
                  <a-input
                    v-model.lazy="KycData.DocNumber"
                    v-bind:placeholder="$t('placeholders_text_docnumber')"
                    class="w-100 Roboto-Regular"
                    size="large"
                  >
                  </a-input>
                  <p class="text-danger" v-if="errorsFields[10]">
                    {{ errorsFields[10] }}
                  </p>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-alert
                  class="border-none bg-transparent Roboto-Regular"
                  type="info"
                  show-icon
                  :description="$t('text_vrf_foriegn_national')"
                >
                </a-alert>
              </a-col>
            </a-row>
          </fieldset>
        </a-form-model>
      </a-col>
    </a-row>
    <a-row class="personal-info-row actions-row">
      <a-col :span="24">
        <a-button
          @click="onContinue"
          class="action-button float-right Roboto-Medium"
          type="primary"
          size="large"
        >
          {{ $t('text_continue') }}
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { TURKEY_CODE } from '@/store/constant'
import moment from 'moment'
export default {
  props: {
    KycData: {
      required: true,
      type: Object,
    },
  },
  data() {
    const DocNumberValidator = (rule, value, callback) => {
      if (
        (this.KycData.CountryId === TURKEY_CODE ||
          this.KycData.NationalityId === TURKEY_CODE) &&
        value === ''
      ) {
        callback(new Error())
      } else {
        callback()
      }
    }
    return {
      CountryList: [],
      CityList: [],
      isMobile: null,
      err: {
        msg: '',
        show: false,
      },
      errorsFields: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
      },
      tempNaem: null,
      rules: {
        Name: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        SurName: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        GenderLabel: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        Birthday: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        Address: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        PostalCode: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        CountryId: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        CityId: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        NationalityId: [
          {
            required: true,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
        DocNumber: [
          {
            validator: DocNumberValidator,
            message: this.$t('text_required_field'),
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  mounted() {
    this.getFilters()

    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  methods: {
    async getFilters() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetFilters', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { CountryList, CityList } = response.data
        this.CountryList = CountryList
        this.CityList = CityList
      }
    },
    onContinue() {
      this.$refs.PersonaInfoFormLeft.validate((validLeft) => {
        this.$refs.PersonaInfoFormRight.validate((validRight) => {
          if (validLeft && validRight) {
            this.validatePersonalInfo()
          }
        })
      })
    },
    async validatePersonalInfo() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let {
        Name,
        SurName,
        GenderLabel,
        Address,
        Birthday,
        CountryId,
        CityId,
        NationalityId,
        PostalCode,
        DocNumber,
      } = this.KycData
      Birthday = moment(Birthday).format('YYYY-MM-DD')
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.post(
        FINANCE_API_URL + '/CheckKYCStep',
        {
          Name,
          SurName,
          GenderLabel,
          Address,
          PostalCode,
          Birthday,
          CountryId,
          CityId,
          NationalityId,
          DocNumber,
          Step: 1,
        },
        {
          headers: authHeaders,
        }
      )
      if (data.Success) {
        this.$emit('changeStep', 1)
      } else {
        const { ErrorCode, Message } = data
        if (ErrorCode === 4) {
          this.errorsFields[4] = Message
        } else if (ErrorCode === 10) {
          this.errorsFields[10] = Message
        } else {
          this.$notification['error']({
            message: Message,
          })
        }
      }
    },
  },
  computed: {
    filteredCities() {
      this.KycData.CityId = ''
      if (
        this.KycData.CountryId === undefined ||
        this.KycData.CountryId === ''
      ) {
        return []
      } else {
        return this.CityList.filter(
          (c) => c.CountryKey === this.KycData.CountryId
        )
      }
    },
  },
}
</script>

<style scoped>
.personal-info-left::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: #ebebeb;
  display: block;
  content: '';
}
.actions-row {
  margin-top: 50px;
}
.action-button {
  width: 140px;
}
.birthday-input {
  height: 40px;
  font-size: 16px;
  padding: 0px 5px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
}
</style>
