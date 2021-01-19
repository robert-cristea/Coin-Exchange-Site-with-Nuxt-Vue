<template>
  <a-spin :spinning="isUploading">
    <div class="box" @click="openWindowsDialog">
      <a-icon
        v-if="file"
        class="file-delete"
        type="close-circle"
        @click.stop="deleteFile"
      ></a-icon>

      <div v-if="file === null">
        <img src="~/assets/images/p2p-request/file.svg" alt="file-icon" />
        <p class="m-0 Roboto-Medium">Dosyanizi Surukleyin</p>
      </div>
      <div v-else>
        <img width="100%" height="100%" :src="file" alt="base4_image" />
      </div>

      <!-- hidden input -->
      <input
        id="File"
        @change="readFile"
        accept="image/JPG, image/PNG, image/JPEG"
        type="file"
        style="display: none"
      />
    </div>
  </a-spin>
</template>

<script>
export default {
  name: 'ClickBox',
  data() {
    return {
      name: '',
      file: null,
      isUploading: false,
    }
  },
  methods: {
    openWindowsDialog() {
      let fileInput = document.getElementById('File')
      fileInput.click()
    },
    async readFile(e) {
      
      if (e.target.files[0]) {
        const { name } = e.target.files[0]
        this.name = name
        this.file = await this.createBase64Image(e.target.files[0])
        this.$emit('uploaded', { file: this.file, name: this.name })
      }
    },
    deleteFile() {
      this.file = null
      this.$emit('delete')
    },
    async createBase64Image(file) {
      try {
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
      } catch (error) {
        
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  cursor: pointer;
  height: 140px;
  width: 140px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #a5a4a5;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  position: relative;
}
.box:active {
  border-color: skyblue;
}
.file-delete {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
