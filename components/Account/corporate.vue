<template>
  <div>
    <h1>{{ $t('corporate_header') }}</h1>
    <div v-if="!formSucces" class="form-grid">
      <a-form :form="form" @submit="handleSubmit" class="form">
        <div class="name-row">
          <a-form-item class="form-item">
            <a-input
              v-bind:placeholder="$t('corporate_competents_name')"
              v-decorator="[
                'CompetentsName',
                {
                  rules: [
                    { required: true, message: this.$t('text_required_field') },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item class="form-item">
            <a-input
              v-bind:placeholder="$t('corporate_competents_surname')"
              v-decorator="[
                'CompetentsSurname',
                {
                  rules: [
                    { required: true, message: this.$t('text_required_field') },
                  ],
                },
              ]"
            />
          </a-form-item>
        </div>
        <div class="name-row">
          <a-form-item class="form-item">
            <a-input
              v-bind:placeholder="$t('corporate_company_title')"
              v-decorator="[
                'CompanyTitle',
                {
                  rules: [
                    { required: true, message: this.$t('text_required_field') },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-bind:placeholder="$t('corporate_email')"
              v-decorator="[
                'Email',
                {
                  rules: [
                    { required: true, message: this.$t('text_required_field') },
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
              v-bind:placeholder="$t('corporate_phone')"
              v-decorator="[
                'Phone',
                {
                  rules: [
                    { required: true, message: this.$t('text_required_field') },
                  ],
                },
              ]"
              type="number"
            />
          </a-form-item>
          <a-form-item class="form-item">
            <a-input
              v-bind:placeholder="$t('corporate_area_code')"
              v-decorator="[
                'AreaCode',
                {
                  rules: [
                    { required: true, message: 'Please input your note!' },
                  ],
                },
              ]"
              type="number"
            />
          </a-form-item>
        </div>

        <a-button type="primary" html-type="submit" class="button">
          {{ $t('corporate_send_btn') }}
        </a-button>
      </a-form>

      <img v-if="!isMobile" src="~/assets/images/Image42.png" />
    </div>
    <div v-else class="form-success">
      <img src="~/assets/images/success.svg" alt="" />
      <span class="succes-text">{{ $t('corporate_appeal_title') }}</span>
      <span>{{ $t('corporate_appeal_text') }}</span>
      <a-button>{{ $t('corporate_homepage_btn') }}</a-button>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
export default {
  name: 'Corporate',
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
        }
      } catch (e) {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
  background-image: url('../../assets/images/Image36.png');
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
}
.name-row {
  display: flex;
}
</style>
