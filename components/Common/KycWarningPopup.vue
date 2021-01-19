<template>
  <a-modal
    id="kyc-warning"
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
    <div class="content">
      <img alt="kyc_warning" src="~/assets/icons/identity-check.svg" />
      <span class="spacer"></span>
      <h3 align="center" class="Roboto-Medium m-0">
        Kimlik doğrulama talebinde bulununuz.
      </h3>
      <span class="spacer"></span>
      <div class="action-buttons">
        <a-button
          class="Roboto-Medium"
          block
          type="secondary"
          style="margin-right: 5px"
          @click="$emit('close')"
          >İptal et</a-button
        >
        <a-button
          class="Roboto-Medium"
          block
          type="primary"
          @click="$router.push(localePath('/account/kyc'))"
          >Kimliği doğrula</a-button
        >
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'KycWarningPopup',
  props: {
    visible: {
      required: true,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.spacer {
  flex-grow: 1;
}
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
