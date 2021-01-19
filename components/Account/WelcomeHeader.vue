<template>
  <div class="account-header">
    <div class="account-overlay"></div>
    <div class="account-content-wrapper">
      <h1 style="margin-bottom: 0" class="account-white-text Roboto-Bold">
        {{ $t('text_welcome') }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    UserInfo: {
      required: true,
      type: Object,
      default: { KYCStatus: 'Verified' },
    },
  },
  data() {
    return {
      badgeNumberStyle: {
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: '3px',
        color: '#999',
        height: '20px',
        width: '20px',
        borderRadius: '50%',
      },
    }
  },
}
</script>

<style lang="less" scoped>
.account-card {
  box-shadow: 0px 0px 9px #00000012;
  border-radius: 4px;
}
.account-white-text {
  color: #ffffff;
}
.account-secondary-text {
  color: #999b9f;
}
.account-welcome-wrapper {
  position: relative;
}
.account-header-status {
  display: flex;
  flex-direction: column;
  position: relative;
  .account-header-status-progress-wrapper {
    display: flex;
  }
  .account-header-status-text-wrapper {
    display: flex;
  }
}
.account-header-status {
  margin-top: 10px;
  .account-header-status-text {
    padding-top: 8px;
    margin-right: 50px;
    margin-bottom: 0px;
  }
  .account-header-status-item {
    max-width: 200px;
    .account-header-status-badge {
      position: relative !important;
      z-index: 1 !important;
    }
    .account-header-status-badge .line {
      content: '';
      /* display: block; */
      /* width: 2px; */
      border: 0.5px dashed #1ba4e8;
      height: 200px;
      /* background-color: white; */
      transform: rotate(90deg);
      position: absolute;
      top: -100px;
      left: 100px;
      z-index: -1;
    }
  }
}
.account-status-button {
  height: 20px;
  color: white;
  background-image: linear-gradient(180, #8cd8fd, #1ba4e8);
  background: transparent linear-gradient(180deg, #8cd8fd 0%, #1ba4e8 100%) 0%
    0% no-repeat padding-box;
  border-radius: 3px;
}
.account-header {
  border-radius: 5px;
  padding: 12px 20px;
  background-color: black;
  background: url('~assets/images/dashboard/dashboard-header.png') no-repeat
    center;
  background-size: cover;
  height: 256px;
  position: relative;
}
.account-content-wrapper {
  position: relative;
  z-index: 2;
}
.account-overlay {
  background-image: linear-gradient(to top left, #000000, #1c2640, #3d4867);
  position: absolute;
  border-radius: 5px;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
  opacity: 0.8;
  z-index: 1;
}
</style>
