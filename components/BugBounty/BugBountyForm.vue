<template>
  <div id="bounty-form">
    <a-form-model
      :model="BountyForm"
      ref="BountyFormRef"
      :rules="BountyFormRules"
    >
      <a-row type="flex" align="middle" justify="start" :gutter="[12, 12]">
        <a-col :span="24">
          <div class="bounty-form-title">{{ $t('text_report') }}</div>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="Name">
            <a-input
              v-model="BountyForm.Name"
              placeholder="İsim"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="Surname">
            <a-input
              v-model="BountyForm.Surname"
              placeholder="Soyisim"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="Email">
            <a-input
              v-model="BountyForm.Email"
              placeholder="E-posta"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="CointralUser">
            <a-input
              v-model="BountyForm.CointralUser"
              placeholder="Cointral hesabı e-posta/telefon"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="MobileNumber">
            <a-input
              v-model="BountyForm.MobileNumber"
              placeholder="Cep Telefonu"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle" justify="start" :gutter="[12, 12]">
        <a-col :span="12">
          <a-form-model-item has-feedback prop="Diagnosis">
            <a-input
              v-model="BountyForm.Diagnosis"
              placeholder="Bulgu"
              size="large"
            >
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="Server">
            <a-input
              v-model="BountyForm.Server"
              placeholder="Sunucu"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item has-feedback prop="Path">
            <a-input
              v-model="BountyForm.Path"
              placeholder="Yol"
              size="large"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item has-feedback prop="Description">
            <a-textarea
              v-model="BountyForm.Description"
              placeholder="Açıklama"
              size="large"
              :rows="6"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-button
            :loading="isBountyFormLoading"
            @click="reportBug"
            size="large"
            type="primary"
            block
            >Bildir</a-button
          >
        </a-col>
      </a-row>
    </a-form-model>
    <!-- recaptcha start -->
    <recaptcha />
    <!-- recaptcha end -->
  </div>
</template>

<script>
import authMixin from '~/Mixins/authMixin'
export default {
  mixins: [authMixin],

  data() {
    return {
      BountyForm: {
        Name: '',
        Surname: '',
        Email: '',
        CointralUser: '',
        MobileNumber: '',
        Diagnosis: '',
        Server: '',
        Path: '',
        Description: '',
      },
      isBountyFormLoading: false,
      BountyFormRules: {
        Name: [{ validator: this.required, trigger: 'change' }],
        Surname: [{ validator: this.required, trigger: 'change' }],
        Email: [
          {
            validator: this.EmailValidator,
            trigger: 'change',
          },
        ],
        Diagnosis: [{ validator: this.required, trigger: 'change' }],
        Description: [{ validator: this.required, trigger: 'change' }],
      },
    }
  },
  methods: {
    async reportBug() {
      await this.$refs.BountyFormRef.validate(async (isValid) => {
        if (isValid) {
          try {
            const {
              $axios,
              $cookies,
              $config: { FINANCE_API_URL },
            } = this
            this.$recaptcha.language = this.$cookies.get('i18n_redirected')
            let captcha = await this.$recaptcha.getResponse()
            await this.$recaptcha.reset()
            this.isBountyFormLoading = true
            const response = await $axios.post(
              FINANCE_API_URL + '/ReportBug',
              this.BountyForm,
              {
                headers: {
                  captcha,
                },
              }
            )
            const { Message, Success } = response.data
            if (Success) {
              this.$notification['success']({
                message: 'Success !',
                description: Message,
              })
            } else {
              this.$notification['error']({
                message: 'Failed !',
                description: Message,
              })
            }
          } catch (e) {
            console.error(e)
            this.$notification['error']({
              message: 'Failed !',
              description: 'Some Error Occured :(',
            })
          } finally {
            this.$refs.BountyFormRef.resetFields()
            this.isBountyFormLoading = false
          }
        }
      })
    },
    required(rule, value, callback) {
      if (value === '' || value === null || !value) {
        callback(new Error(this.$t('validation_text_required')))
      } else {
        callback()
      }
    },
  },
}
</script>

<style scoped>
#bounty-form {
  padding: 138px 412px 159px 357px;
}
.bounty-form-title {
  font-size: 54px;
  color: #788298;
}
</style>

Cep Telefonu Bulgu Sunucu Yol Açıklama
