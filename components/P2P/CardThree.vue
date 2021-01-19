<template>
  <a-card class="request-card border-none h-100 w-100">
    <div class="wrapper">
      <div v-if="hasText.includes(RequestInfo.Step)" class="title" slot="title">
        <P2PDynamicText :RequestInfo="RequestInfo" />
      </div>
      <div v-else class="title" slot="title">
        Emir Iptal Edidi islem ile ilgili herhangi bir sorunuz var ise destek
        uzerinden bizimle iletisme gecebiliriniz
      </div>
      <a-row
        v-if="hasInteractions.includes(RequestInfo.Step)"
        class="click-box-row"
      >
        <a-col :span="24">
          <ClickBox
            @delete="requestDetailFile = null"
            @uploaded="(e) => (requestDetailFile = e)"
          />
        </a-col>
      </a-row>
      <div class="line"></div>
      <a-row v-if="hasInteractions.includes(RequestInfo.Step)">
        <a-col :span="24">
          <a-checkbox v-model="isChecked">
            <P2PCheckBoxText :RequestInfo="RequestInfo" />
          </a-checkbox>

          <div v-if="RequestInfo.Step === 4 || RequestInfo.Step === 9">
            <a-button
              :disabled="!isChecked || requestDetailFile === null"
              @click="showConfirmPopUpP2PDestek = true"
              type="primary"
              >Destek Talebi Oluştur</a-button
            >
          </div>
        </a-col>
      </a-row>
    </div>
    <a-row
      v-if="hasInteractions.includes(RequestInfo.Step)"
      class="click-box-row"
      type="flex"
      align="middle"
      justify="end"
      :gutter="16"
    >
      <a-col :span="6">
        <a-button
          :disabled="!isChecked || requestDetailFile === null"
          @click="showCancelPopUpP2P = true"
          block
          class="Roboto-Regular"
          type="secondary"
          >İptal</a-button
        >
      </a-col>
      <a-col :span="6">
        <div v-if="RequestInfo.Step === 4">
          <a-button
            :disabled="!isChecked || requestDetailFile === null"
            block
            type="primary"
            @click="showConfirmPopUpP2P = true"
            class="Roboto-Regular"
            >Transferi Onayla</a-button
          >
        </div>
        <div v-else>
          <a-button
            :disabled="!isChecked || requestDetailFile === null"
            @click="showConfirmPopUpP2P = true"
            block
            type="primary"
            class="Roboto-Regular"
            >Ödemeyi Tamamladım</a-button
          >
        </div>
      </a-col>
    </a-row>

    <ConfirmPopUpP2P
      :RequestInfo="RequestInfo"
      :file="requestDetailFile"
      :visible="showConfirmPopUpP2P"
      @close="closeConfirmPopUpP2P"
    />
    <ConfirmPopUpP2PDestek
      :RequestInfo="RequestInfo"
      :file="requestDetailFile"
      :visible="showConfirmPopUpP2PDestek"
      @close="showConfirmPopUpP2PDestek = false"
    />
    <CancelPopUpP2P
      :RequestInfo="RequestInfo"
      :visible="showCancelPopUpP2P"
      @close="showCancelPopUpP2P = false"
    />
  </a-card>
</template>

<script>
export default {
  name: 'CardThree',
  props: {
    RequestInfo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      hasText: [1, 4, 6, 8, 9],
      hasInteractions: [1, 4, 8, 9],
      requestDetailFile: null,
      showConfirmPopUpP2P: false,
      showCancelPopUpP2P: false,
      showConfirmPopUpP2PDestek: false,
      isChecked: false,
    }
  },
  methods: {
    closeConfirmPopUpP2P() {
      this.showConfirmPopUpP2P = false
      this.$emit('GetRequestInfo')
    },
  },
}
</script>

<style lang="scss" scoped>
.request-card {
  box-shadow: 0px 0px 10px #0000001a;
}
.wrapper {
  padding: 25px;
  background: #f7fbff;
}
.click-box-row {
  margin: 20px auto;
}
.line {
  border: 1px solid #d3edfb;
  margin-bottom: 10px;
}
</style>
