<template>
  <a-modal
    id="p2p-warning"
    :visible="visible"
    @cancel="$emit('close')"
    :centered="true"
    :destroyOnClose="true"
    :header="null"
    :footer="null"
    :width="384"
    :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
    :maskClosable="false"
  >
    <div slot="title">
      <h4 class="m-0 Roboto-Medium">
        P2P İşlemlerine başlayabilmek için kullanıcı adı oluşturmanız
        gerekmektedir.
      </h4>
    </div>
    <a-form-model
      :model="UsernameForm"
      ref="UsernameFormRef"
      :rules="UsernameFormRules"
    >
      <a-form-model-item prop="Username" has-feedback>
        <a-input
          v-model="UsernameForm.Username"
          size="large"
          placeholder="Kullanıcı Adı"
          @keyup.enter="validateP2PUser"
        ></a-input>
        <p v-if="UserNameError">{{ UserNameError }}</p>
      </a-form-model-item>
    </a-form-model>

    <a-form-model-item>
      <a-row :gutter="12">
        <a-col :span="12">
          <a-button type="secondary" size="large" block @click="$emit('close')"
            >Iptal et</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            type="primary"
            :loading="isLoadingUserNameForm"
            size="large"
            block
            @click="validateP2PUser"
            >Onayla</a-button
          >
        </a-col>
      </a-row>
    </a-form-model-item>
  </a-modal>
</template>

<script>
export default {
  name: 'P2PUserNamePopUp',
  props: {
    visible: {
      required: true,
      default: false,
    },
  },
  data() {
    return {
      UsernameForm: {
        Username: '',
      },
      UsernameFormRules: {
        Username: [{ validator: this.required, trigger: 'change' }],
      },
      isLoadingUserNameForm: false,
      UserNameError: '',
    }
  },
  methods: {
    required(rule, value, callback) {
      if (value === '' || value === null || !value) {
        callback(new Error(this.$t('validation_text_required')))
      } else {
        callback()
      }
    },
    validateP2PUser() {
      this.$refs.UsernameFormRef.validate((valid) => {
        if (valid) {
          this.activateP2PUser()
        }
      })
    },
    async activateP2PUser() {
      try {
        this.isLoadingUserNameForm = true
        const { $axios, $config, $cookies } = this
        let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.post(
          $config.FINANCE_API_URL + '/ActivateP2PUser',
          this.UsernameForm,
          {
            headers: authHeader,
          }
        )
        const { Success, Message, ErrorCode } = data
        if (Success) {
          this.$notification['info']({
            message: Message,
          })
          this.UsernameForm.Username = ""
          this.$emit('close')
        } else {
          if (ErrorCode === 99) {
            this.$notification['error']({
              message: Message,
            })
          } else {
            this.UserNameError = Message
          }
        }
      } catch (error) {
        
      } finally {
        this.isLoadingUserNameForm = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
