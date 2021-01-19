<template>
  <a-modal
    :visible="showWebCam"
    @ok="getBlobFromMediaStream"
    :confirmLoading="isCaptureLoading"
    okText="Take Photo"
    @cancel="closeStream"
    title="Web Cam"
    :centered="true"
    :destroyOnClose="true"
    :width="384"
    :bodyStyle="{ padding: 0 }"
    :maskStyle="{ 'background-color': '#242631', opacity: 0.9 }"
    :maskClosable="false"
  >
    <video ref="video" width="100%" height="100%"></video>
    <canvas
      ref="canvas"
      width="100%"
      height="100%"
      style="display: none"
    ></canvas>
  </a-modal>
</template>

<script>
export default {
  props: {
    showWebCam: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      isCaptureLoading: false,
      image: null,
      stream: null,
    }
  },
  created() {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.stream = stream
          this.$refs.video.srcObject = stream
          this.$refs.video.onloadedmetadata = () => {
            this.$refs.video.play()
          }
        })
    } catch (error) {}
  },
  methods: {
    capture(blob) {
      try {
        this.isCaptureLoading = true
        let fr = new FileReader()
        fr.readAsDataURL(blob)
        fr.onload = () => {
          this.closeStream()
          this.$emit('result', fr.result)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.isCaptureLoading = false
      }
    },
    getBlobFromMediaStream() {
      try {
        const { stream } = this
        const { video, canvas } = this.$refs
        if ('ImageCapture' in window && !!ImageCapture) {
          const videoTrack = stream.getVideoTracks()[0]
          const imageCapture = new ImageCapture(videoTrack)
          imageCapture.takePhoto().then((blob) => {
            this.capture(blob)
          })
        } else {
          const context = canvas.getContext('2d')
          context.drawImage(video, 0, 0, 100, 100)
          canvas.toBlob(this.capture, 'image/png')
        }
      } catch (e) {
        console.error(e)
      }
    },
    closeStream() {
      try {
        const { stream } = this
        stream.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop()
          }
        })
        this.$emit('close')
      } catch (e) {
        this.$emit('close')
        console.error(e)
      }
    },
  },
}
</script>
