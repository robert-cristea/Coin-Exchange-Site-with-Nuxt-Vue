<template>
  <div id="bounty-header">
    <img
      class="brand-logo"
      src="~/assets/images/logo.svg"
      alt="navbar_brang_logo"
    />
    <div class="program-title">
      <div class="program-title-text Gilroy-Light">
        {{ $t('text_bug_hunting') }}
      </div>
      <div class="program-subtitle-text Gilroy-ExtraBold">
        {{ $t('text_bug_program') }}
      </div>
      <div class="program-other-text Roboto-Medium">
        {{ $t('text_whatisbb') }}
      </div>
    </div>
    <div class="program-detail Roboto-Regular">
      {{ $t('text_whatisbbtext') }}
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#bounty-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 703px;
  color: #ffffff;
  background-image: linear-gradient(to top, #1c2436, #2f384a);
}
.brand-logo {
  width: 261px;
  height: auto;
}
.program-title,
.program-detail {
  width: 715px;
}
.program-title-text {
  font-size: 71px;
  font-weight: 300;
}
.program-subtitle-text {
  font-size: 43px;
  font-weight: 800;
}
.program-title,
.program-subtitle-text {
  line-height: 0.9;
}
.program-other-text {
  margin: 40px auto;
  font-size: 26px;
}
.program-detail {
  font-size: 18px;
  line-height: 1.17;
}
</style>
