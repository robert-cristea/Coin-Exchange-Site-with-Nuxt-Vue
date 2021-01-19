<template>
  <div class="face-info-container">
    <a-row
      type="flex"
      justify="space-between"
      class="face-info-row"
      :gutter="150"
    >
      <a-col class="face-info-left" :span="!isMobile ? 12 : 24">
        <h3>{{ $t('text_face_verification') }}</h3>
        <p>{{ $t('text_face_standards') }}</p>

        <hr />
        <a-alert
          class="border-none bg-transparent"
          :description="$t('text_file_types')"
          type="info"
          show-icon
        ></a-alert>
        <a-alert
          class="border-none bg-transparent"
          :description="$t('text_high_res')"
          type="info"
          show-icon
        ></a-alert>
      </a-col>
      <a-col class="face-info-right" :span="!isMobile ? 10 : 24">
        <a-row>
          <a-col :span="24">
            <div class="face-info-box">
              <div class="face-info-box-inner">
                <img
                  v-if="!Docs.FacePhoto"
                  src="~/assets/icons/security/selfie.svg"
                  alt="selfie.svg"
                />
                <img
                  v-else
                  height="100%"
                  width="100%"
                  :src="Docs.FacePhoto"
                  alt="selfie.svg"
                />
                <div v-if="Docs.FacePhoto !== null" class="face-photo-info-box">
                  {{ fileInfo.type }}
                </div>
                <div v-if="Docs.FacePhoto !== null" class="face-photo-close">
                  <a-icon
                    @click="Docs.FacePhoto = null"
                    type="close-circle"
                  ></a-icon>
                </div>
              </div>
              <p v-if="showFaceError" class="text-danger">
                {{ $t('text_document_is_required') }}
              </p>
            </div>
          </a-col>
        </a-row>
        <a-row class="face-info-row" :gutter="16">
          <a-col :span="12">
            <input
              @change="readFile"
              id="FaceInput"
              accept="image/JPG, image/PNG, image/JPEG"
              type="file"
              style="display: none"
            />
            <a-button
              @click="openWindowsDialog"
              block
              type="secondary"
              size="large"
              >{{ $t('text_select_photo') }}</a-button
            >
          </a-col>
          <a-col :span="12">
            <a-button
              block
              type="secondary"
              size="large"
              @click="showWebCam = true"
              >{{ $t('text_take_photo') }}</a-button
            >
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="face-info-row-info-row actions-row">
      <a-col :span="12">
        <a-button
          @click="$emit('changeStep', 1)"
          class="action-button float-left Roboto-Medium"
          type="secondary"
          size="large"
          style="width: 95%"
          >{{ $t('text_previous') }}</a-button
        >
      </a-col>
      <a-col :span="12">
        <a-button
          @click="createKyc"
          class="action-button float-right Roboto-Medium"
          type="primary"
          size="large"
          :loading="KycLoading"
          style="width: 95%"
          >{{ $t('text_continue') }}</a-button
        >
      </a-col>
    </a-row>
    <WebCamModal
      v-if="showWebCam"
      :showWebCam="showWebCam"
      @result="getResults"
      @close="showWebCam = false"
    />
    <!-- MODAL -->
    <a-modal
      id="face-info-modal"
      :visible="isFaceModalVisible"
      :width="500"
      :closable="false"
      :bodyStyle="{ padding: '0px' }"
      :maskStyle="{ 'background-color': '#242631', opacity: '0.7' }"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <img
        width="100%"
        src="~/assets/gifs/KYC/kyc-selfie-guide.gif"
        alt="kyc-selfie-guide"
      />
      <div slot="footer">
        <a-button
          :disabled="!showCloseBtn"
          class="Roboto-Regular"
          block
          size="large"
          type="primary"
          @click="isFaceModalVisible = false"
        >
          Close
        </a-button>
      </div>
    </a-modal>
    <!-- MODAL -->
  </div>
</template>

<script>
import moment from 'moment'
import WebCamModal from '~/components/Account/WebCamModal'
export default {
  components: {
    WebCamModal,
  },
  props: {
    KycData: {
      type: Object,
      required: true,
    },
    Docs: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFaceModalVisible: true,
      showCloseBtn: false,
      KycLoading: false,
      isMobile: null,
      showFaceError: false,
      showWebCam: false,
      fileInfo: {
        type: '',
      },
      modalInterval: null,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

    this.modalInterval = setTimeout(() => {
      this.showCloseBtn = true
    }, 6000)
  },
  destroyed() {
    clearTimeout(this.modalInterval)
    this.modalInterval = null
    this.showCloseBtn = false
  },
  methods: {
    getResults(payload) {
      this.Docs.FacePhoto = payload
      this.fileInfo.type = this.getType(this.Docs.FacePhoto)
      this.showWebCam = false
    },
    openWindowsDialog() {
      let fileInput = document.getElementById('FaceInput')
      fileInput.click()
    },
    async readFile(e) {
      this.Docs.FacePhoto = await this.createBase64Image(e.target.files[0])
      this.fileInfo.type = this.getType(this.Docs.FacePhoto)
    },
    getType(f) {
      return f.slice(f.indexOf(':') + 1, f.indexOf(';'))
    },
    async createKyc() {
      try {
        this.showFaceError = false
        if (this.Docs.FacePhoto) {
          let front = this.Docs.Front.slice(this.Docs.Front.indexOf(',') + 1)
          let back = this.Docs.Back.slice(this.Docs.Back.indexOf(',') + 1)
          let selfie = this.Docs.FacePhoto.slice(
            this.Docs.FacePhoto.indexOf(',') + 1
          )

          this.KycData.Birthday = moment(this.KycData.Birthday).format(
            'YYYY-MM-DD'
          )
          this.KycData.File = [
            {
              DocType: 'id-front',
              ImageBase64: front,
              FileType: this.getType(this.Docs.Front).split('/')[1],
            },
            {
              DocType: 'id-back',
              ImageBase64: back,
              FileType: this.getType(this.Docs.Back).split('/')[1],
            },
            {
              DocType: 'selfie',
              ImageBase64: selfie,
              FileType: this.getType(this.Docs.FacePhoto).split('/')[1],
            },
          ]
          const {
            $axios,
            $cookies,
            $store,
            $config: { FINANCE_API_URL },
          } = this
          const authHeaders = {
            Authorization: 'Bearer ' + $cookies.get('Token'),
          }
          this.KycLoading = true
          const response = await $axios.post(
            FINANCE_API_URL + '/CreateKYC',
            this.KycData,
            {
              headers: authHeaders,
            }
          )
          this.KycLoading = false
          if (response.data.Success) {
            this.$notification.open({
              message: this.$t('text_success'),
              description: response.data.Message,
            })
            this.$emit('changeStep', 3)
          } else {
            this.$notification.open({
              message: this.$t('text_failed'),
              description: response.data.Message,
            })
            this.$router.push(this.localeRoute('/account/dashboard'))
          }
        } else {
          this.showFaceError = true
        }
      } catch (error) {
        if (error.response) {
          const { Message } = error.response.data
          this.$notification.open({
            message: this.$t('text_failed'),
            description: Message,
          })
        }
      }
    },
    async createBase64Image(file) {
      // slice(reader.result.indexOf(',') + 1
      let reader = new FileReader()
      reader.readAsDataURL(file)
      return new Promise((resolve, reject) => {
        reader.addEventListener('load', (e) => {
          let res = reader.result
          resolve(res)
        })
        reader.addEventListener('error', (e) => {
          reject(reader.error)
        })
      })
    },
  },
}
</script>

<style scoped>
.actions-row {
  margin-top: 50px;
}
.action-button {
  width: 140px;
}
.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.face-info-row {
  margin: 10px auto;
}
.photograph-btns-row {
  margin-top: 20px;
}
.face-info-box {
  width: 100%;
  height: 200px;
  border: 1px solid #f3f3f8;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
}
.face-info-box-inner {
  width: 100%;
  height: 100%;
  border: 1px dashed #94bffd;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.face-photo-info-box {
  position: absolute;
  color: skyblue;
  border-radius: 3px;
  padding: 5px;
  bottom: 0;
  right: 0;
}
.face-photo-close {
  font-size: 20px;
  position: absolute;
  color: skyblue;
  border-radius: 3px;
  padding: 5px;
  top: 0;
  right: 0;
}
.face-photo-close:hover {
  color: red;
}
</style>
