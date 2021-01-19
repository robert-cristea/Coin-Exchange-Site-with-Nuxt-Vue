<template>
  <div class="identity-info-container">
    <a-row class="identity-info-row" type="flex" :gutter="150">
      <a-col class="identity-info-left" :span="!isMobile ? 10 : 24">
        <h3>{{ $t('text_document_standard') }}</h3>
        <p>{{ $t('text_document_accuracy_text') }}</p>
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
      <a-col class="identity-info-right" :span="!isMobile ? 14 : 24">
        <a-form-model
          :model="KycData"
          :rules="IdentityFormRules"
          ref="IdentityinfoFormRight"
          layout="vertical"
        >
          <a-row>
            <a-col :span="24">
              <a-form-model-item prop="DocumentTypeLabel" has-feedback>
                <a-select
                  v-model="KycData.DocumentTypeLabel"
                  class="w-100"
                  v-bind:placeholder="
                    $t('placeholders_text_select_document_type')
                  "
                  :allow-clear="true"
                  size="large"
                >
                  <a-select-option value="PASSPORT">
                    {{ $t('security_components_passport') }}
                  </a-select-option>
                  <a-select-option value="IDENTITY CARD">
                    {{ $t('security_components_identity_card') }}
                  </a-select-option>
                  <a-select-option value="DRIVING LICENCE">
                    {{ $t('security_components_driver_license') }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row v-if="!isMobile" class="identity-info-row" :gutter="16">
            <a-col :span="12">
              <div class="identity-info-box">
                <div class="identity-info-box-inner">
                  <div v-if="!Docs.Front">
                    <img src="~/assets/icons/security/front.svg" alt="" />
                    <p class="Roboto-Medium doc-upload-text">
                      {{ $t('text_front_doc') }}
                    </p>
                  </div>
                  <div v-else class="h-100 w-100">
                    <img
                      :src="Docs.Front"
                      height="100%"
                      width="100%"
                      alt="Front"
                    />
                    <div v-if="Docs.Front !== null" class="face-photo-info-box">
                      {{ fileInfo.Front.type }}
                    </div>
                    <div v-if="Docs.Front !== null" class="face-photo-close">
                      <a-icon @click="Docs.Front = null" type="close-circle">
                      </a-icon>
                    </div>
                  </div>
                </div>
                <p v-if="showFrontError" class="text-danger">
                  {{ $t('text_document_is_required') }}
                </p>
              </div>
            </a-col>
            <a-col :span="12">
              <div
                class="identity-info-box"
                :class="{
                  'no-interact': KycData.DocumentTypeLabel === 'PASSPORT',
                }"
              >
                <div class="identity-info-box-inner">
                  <div v-if="!Docs.Back">
                    <img src="~/assets/icons/security/back.svg" alt="" />
                    <p class="Roboto-Medium doc-upload-text">
                      {{ $t('text_back_doc') }}
                    </p>
                  </div>
                  <div v-else class="h-100 w-100">
                    <img
                      :src="Docs.Back"
                      height="100%"
                      width="100%"
                      alt="Back"
                    />
                    <div v-if="Docs.Back !== null" class="face-photo-info-box">
                      {{ fileInfo.Back.type }}
                    </div>
                    <div v-if="Docs.Back !== null" class="face-photo-close">
                      <a-icon @click="Docs.Back = null" type="close-circle">
                      </a-icon>
                    </div>
                  </div>
                </div>
                <p v-if="showBackError" class="text-danger">
                  {{ $t('text_document_is_required') }}
                </p>
              </div>
            </a-col>
          </a-row>
          <a-row
            v-if="!isMobile"
            class="identity-info-row photograph-btns-row"
            :gutter="24"
          >
            <a-col class="d-flex" :span="12">
              <input
                @change="readFile"
                id="Front"
                accept="image/JPG, image/PNG, image/JPEG"
                type="file"
                style="display: none"
              />
              <input
                @change="readFile"
                id="Back"
                accept="image/JPG, image/PNG, image/JPEG"
                type="file"
                style="display: none"
              />
              <a-button
                type="secondary"
                size="large"
                class="w-50 mr-1"
                @click="openWindowsDialog('Front')"
                >{{ $t('text_select_photo') }}</a-button
              >
              <a-button
                @click="showWebCamFront = true"
                type="secondary"
                size="large"
                class="w-50"
                >{{ $t('text_take_photo') }}</a-button
              >
            </a-col>
            <a-col class="d-flex" :span="12">
              <a-button
                type="secondary"
                size="large"
                class="w-50 mr-1"
                @click="openWindowsDialog('Back')"
                >{{ $t('text_select_photo') }}</a-button
              >
              <a-button
                @click="showWebCamBack = true"
                type="secondary"
                size="large"
                class="w-50"
                >{{ $t('text_take_photo') }}</a-button
              >
            </a-col>
          </a-row>

          <a-row v-if="isMobile" class="identity-info-row" :gutter="16">
            <a-col :span="24">
              <div class="identity-info-box">
                <div class="identity-info-box-inner">
                  <div v-if="!Docs.Front">
                    <img src="~/assets/icons/security/front.svg" alt="" />
                    <p class="Roboto-Medium doc-upload-text">
                      {{ $t('text_front_doc') }}
                    </p>
                  </div>
                  <div v-else>
                    <img
                      :src="Docs.Front"
                      height="100%"
                      width="100%"
                      alt="Front"
                    />
                    <div v-if="Docs.Front !== null" class="face-photo-info-box">
                      {{ fileInfo.Front.type }}
                    </div>
                    <div v-if="Docs.Front !== null" class="face-photo-close">
                      <a-icon @click="Docs.Front = null" type="close-circle">
                      </a-icon>
                    </div>
                  </div>
                </div>
                <p v-if="showFrontError" class="text-danger">
                  {{ $t('text_document_is_required') }}
                </p>
              </div>
            </a-col>

            <input
              @change="readFile"
              id="Front"
              accept="image/JPG, image/GIF, image/PNG, .pdf"
              type="file"
              style="display: none"
            />
            <input
              @change="readFile"
              id="Back"
              accept="image/JPG, image/GIF, image/PNG, .pdf"
              type="file"
              style="display: none"
            />

            <a-col :span="12" align="left">
              <a-button
                type="secondary"
                size="large"
                class="mr-1"
                style="width: 90%"
                @click="openWindowsDialog('Front')"
                >{{ $t('text_select_photo') }}</a-button
              >
            </a-col>
            <a-col :span="12" align="right">
              <a-button
                @click="showWebCamFront = true"
                type="secondary"
                size="large"
                style="width: 90%"
                >{{ $t('text_take_photo') }}</a-button
              >
            </a-col>

            <a-col :span="24">
              <div class="identity-info-box">
                <div class="identity-info-box-inner">
                  <div v-if="!Docs.Back">
                    <img src="~/assets/icons/security/back.svg" alt="" />
                    <p class="Roboto-Medium doc-upload-text">
                      {{ $t('text_back_doc') }}
                    </p>
                  </div>
                  <div v-else>
                    <img
                      :src="Docs.Back"
                      height="100%"
                      width="100%"
                      alt="Back"
                    />
                    <div v-if="Docs.Back !== null" class="face-photo-info-box">
                      {{ fileInfo.Back.type }}
                    </div>
                    <div v-if="Docs.Back !== null" class="face-photo-close">
                      <a-icon @click="Docs.Back = null" type="close-circle">
                      </a-icon>
                    </div>
                  </div>
                </div>
                <p v-if="showBackError" class="text-danger">
                  {{ $t('text_document_is_required') }}
                </p>
              </div>
            </a-col>

            <a-col :span="12" align="left">
              <a-button
                type="secondary"
                size="large"
                class="mr-1"
                style="width: 90%"
                @click="openWindowsDialog('Back')"
                >{{ $t('text_select_photo') }}</a-button
              >
            </a-col>
            <a-col :span="12" align="right">
              <a-button
                @click="showWebCamBack = true"
                type="secondary"
                size="large"
                style="width: 90%"
                >{{ $t('text_take_photo') }}</a-button
              >
            </a-col>
          </a-row>
        </a-form-model>
      </a-col>
    </a-row>

    <a-row class="identity-info-row actions-row">
      <a-col :span="12">
        <a-button
          @click="$emit('changeStep', 0)"
          class="action-button float-left Roboto-Medium"
          type="secondary"
          size="large"
          :style="isMobile ? 'width: 95%' : null"
        >
          {{ $t('text_previous') }}
        </a-button>
      </a-col>
      <a-col :span="12">
        <a-button
          @click="onContinue"
          class="action-button float-right Roboto-Medium"
          type="primary"
          size="large"
          :style="isMobile ? 'width: 95%' : null"
        >
          {{ $t('text_continue') }}
        </a-button>
      </a-col>
    </a-row>

    <WebCamModal
      v-if="showWebCamFront"
      :showWebCam="showWebCamFront"
      @result="getResultsFront"
      @close="showWebCamFront = false"
    />

    <WebCamModal
      v-if="showWebCamBack"
      :showWebCam="showWebCamBack"
      @result="getResultsBack"
      @close="showWebCamBack = false"
    />
  </div>
</template>

<script>
import authMixin from '~/Mixins/authMixin'

export default {
  mixins: [authMixin],
  data() {
    return {
      isMobile: null,
      showFrontError: false,
      fileInfo: {
        Front: {
          type: '',
        },
        Back: {
          type: '',
        },
      },
      showBackError: false,

      showWebCamFront: false,
      showWebCamBack: false,
      IdentityFormRules: {
        DocumentTypeLabel: [
          {
            validator: this.DocumentTypeValidator,
            trigger: 'change',
          },
        ],
      },
    }
  },
  props: {
    KycData: {
      required: true,
      type: Object,
    },
    Docs: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 1000
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
  methods: {
    openWindowsDialog(side) {
      let fileInput = document.getElementById(side)
      fileInput.click()
    },
    async readFile(e) {
      this.Docs[e.target.id] = await this.createBase64Image(e.target.files[0])
      this.fileInfo[e.target.id].type = this.getType(this.Docs[e.target.id])
    },
    getType(f) {
      return f.slice(f.indexOf(':') + 1, f.indexOf(';'))
    },
    getResultsFront(payload) {
      this.Docs.Front = payload
      this.fileInfo.Front.type = this.getType(this.Docs.Front)
      this.showWebCamFront = false
    },
    getResultsBack(payload) {
      this.Docs.Back = payload
      this.fileInfo.Back.type = this.getType(this.Docs.Back)
      this.showWebCamBack = false
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
    onContinue() {
      this.showFrontError = false
      this.showBackError = false
      if (this.Docs.Front === null) {
        this.showFrontError = true
      }
      if (
        this.Docs.Back === null &&
        this.KycData.DocumentTypeLabel != 'PASSPORT'
      ) {
        this.showBackError = true
      }
      if (!this.showFrontError && !this.showBackError) {
        this.$refs.IdentityinfoFormRight.validate((valid) => {
          if (valid) {
            this.$emit('changeStep', 2)
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/ant/variables.less';

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
.identity-info-row {
  margin: 10px auto;
}
.photograph-btns-row {
  margin-top: 20px;
}
.identity-info-box {
  width: 100%;
  height: 200px;
  border: 1px solid #f3f3f8;
  border-radius: 6px;
  padding: 10px;
}
.identity-info-box-inner {
  width: 100%;
  height: 100%;
  border: 1px dashed #94bffd;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.doc-upload-text {
  margin-top: 5px;
  color: @primary-color;
}
.mr-1 {
  margin-right: 1px;
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
.no-interact {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
  user-select: none;
}
</style>
