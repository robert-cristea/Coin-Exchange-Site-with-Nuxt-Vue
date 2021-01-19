<template>
  <div class="corporate-page">
    <h1>{{ $t('corporate_header') }}</h1>
    <div v-if="!formSucces">
      <a-card class="corp-form-card border-none">
        <a-row :gutter="16" type="flex" align="middle" justify="center">
          <a-col :span="10">
            <fieldset id="corp-form">
              <label for="corp-form" style="margin-bottom: 15px">
                <h3>{{ $t('corporate_text_title') }}</h3>
              </label>
              <a-form :form="form" @submit="handleSubmit" class="form">
                <div class="name-row">
                  <a-form-item class="form-item">
                    <a-input
                      class="w-100"
                      size="large"
                      v-bind:placeholder="$t('corporate_competents_name')"
                      v-decorator="[
                        'CompetentsName',
                        {
                          rules: [
                            {
                              required: true,
                              message: this.$t('text_required_field'),
                            },
                          ],
                        },
                      ]"
                    />
                  </a-form-item>
                  <a-form-item class="form-item">
                    <a-input
                      class="w-100"
                      size="large"
                      v-bind:placeholder="$t('corporate_competents_surname')"
                      v-decorator="[
                        'CompetentsSurname',
                        {
                          rules: [
                            {
                              required: true,
                              message: this.$t('text_required_field'),
                            },
                          ],
                        },
                      ]"
                    />
                  </a-form-item>
                </div>
                <div class="name-row">
                  <a-form-item class="form-item">
                    <a-input
                      class="w-100"
                      size="large"
                      v-bind:placeholder="$t('corporate_company_title')"
                      v-decorator="[
                        'CompanyTitle',
                        {
                          rules: [
                            {
                              required: true,
                              message: this.$t('text_required_field'),
                            },
                          ],
                        },
                      ]"
                    />
                  </a-form-item>
                  <a-form-item class="form-item">
                    <a-input
                      class="w-100"
                      size="large"
                      v-bind:placeholder="$t('corporate_email')"
                      v-decorator="[
                        'Email',
                        {
                          rules: [
                            {
                              required: true,
                              message: this.$t('text_required_field'),
                            },
                          ],
                        },
                      ]"
                      type="email"
                    />
                  </a-form-item>
                </div>
                <div class="name-row">
                  <a-form-item class="form-item">
                    <a-input
                      class="w-100"
                      size="large"
                      v-bind:placeholder="$t('corporate_phone')"
                      v-decorator="[
                        'Phone',
                        {
                          rules: [
                            {
                              required: true,
                              message: this.$t('text_required_field'),
                            },
                          ],
                        },
                      ]"
                      type="number"
                    />
                  </a-form-item>
                  <a-form-item class="form-item">
                    <a-input
                      class="w-100"
                      size="large"
                      v-bind:placeholder="$t('corporate_area_code')"
                      v-decorator="[
                        'AreaCode',
                        {
                          rules: [
                            {
                              required: true,
                              message: this.$t('text_required_field'),
                            },
                          ],
                        },
                      ]"
                      type="number"
                    />
                  </a-form-item>
                </div>

                <a-button
                  type="primary"
                  size="large"
                  html-type="submit"
                  class="button Roboto-Medium float-right"
                >
                  {{ $t('text_send') }}
                </a-button>
              </a-form>
            </fieldset>
          </a-col>
          <a-col :offset="2" :span="10">
            <img v-if="!isMobile" src="~/assets/images/Image42.png" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div v-else class="form-success">
      <img src="~/assets/images/success.svg" alt="" />
      <span class="succes-text">{{ $t('corporate_text_success') }}</span>
      <span>{{ $t('corporate_text_info') }}</span>
      <a-button>{{ $t('corporate_text_return_home_page') }}</a-button>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
export default {
  name: 'Corporate',
  head(){
    return{
      title: 'Kurumsal Başvuru | Cointral.com',
    }
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
        UserInfo: { KYCVerified },
        UserInfo: { CorporateStatus },
      } = response.data

      if (!KYCVerified) {
        redirect(app.localeRoute('/account/dashboard'))
      } else if (
        CorporateStatus !== 'CorporateRevision' &&
        CorporateStatus !== 'NoCorporate'
      ) {
        redirect(app.localeRoute('/account/dashboard'))
      }
    } else {
      redirect(app.localeRoute('/account/dashboard'))
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formSucces: false,
      isMobile,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.postData(values)
        }
      })
    },
    async postData(data) {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }
        let payload = {
          ...data,
        }

        const response = await this.$axios.post(
          this.$config.FINANCE_API_URL + `/CreateCorporate`,
          payload,
          {
            headers: authHeaders,
          }
        )

        if (response.data.Success) {
          this.formSucces = true
          setTimeout(() => (this.formSucces = false), 3000)
          this.$router.push(this.localeRoute('/account/dashboard'))
        }
      } catch (e) {
        
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.corporate-page {
  min-height: 90vh;
}
.corp-form-card {
  height: 507px;
  border-radius: 3px;
}
.form-grid {
  background-color: white;
  width: 85vw;
  height: 507px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 1000px) {
    justify-content: center;
    margin: 0px !important;
    height: 307px;
    .form {
      padding-left: 50px !important;
    }
  }
  .form {
    padding-top: 50px;
  }
}
.form-success {
  background-image: url('../../../assets/images/Image36.png');
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: 600px;
  width: 85vw;
  height: 507px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    margin-bottom: 20px;
  }
}

.form-item {
  margin-right: 10px;
  width: 100%;
}
.name-row {
  display: flex;
}
</style>
