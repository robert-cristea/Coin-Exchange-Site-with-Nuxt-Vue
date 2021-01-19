<template>
  <div>
    <div class="favorites-mobile px-3" @click="isOpen = true">
      <div>
        <span>EOS / BTC</span>
      </div>
      <div class="c-pointer">
        <img src="~/assets/icons/angle-icon.svg" alt="" />
      </div>
    </div>

    <div v-show="isOpen" class="favorites-modal">
      <div class="favorites-modal__head" @click="isOpen = false">
        <a-icon type="close" />
      </div>
      <div>
        <a-input-search class="no-focus-shadow" placeholder="Arama" />
      </div>
      <div class="favorites-modal__body">
        <a-tabs default-active-key="1" :animated="false" class="tabs">
          <a-tab-pane key="1" tab="F">
            <div class="exchange-table exchange-table-sm">
              <div class="exchange-table__head">
                <div class="exchange-table__head-item">Çift</div>
                <div class="exchange-table__head-item">Fiyat</div>
                <div class="exchange-table__head-item">Değişim</div>
              </div>
              <div class="table-overlay">
                <table>
                  <tbody>
                    <tr v-for="x in 10" :key="x">
                      <td>ADA/BTC</td>
                      <td>0.0003644</td>
                      <td class="text-success">%-3.84</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="ETH"> </a-tab-pane>
          <a-tab-pane key="3" tab="BTC"> </a-tab-pane>
          <a-tab-pane key="4" tab="USDT"> </a-tab-pane>
          <a-tab-pane key="5" tab="ALL"> </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style lang="scss">
.favorites-mobile {
  background: #202429;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.favorites-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  background: #0e1317;

  &__head {
    padding: 1rem;

    i.anticon {
      font-size: 16px;
    }
  }

  input {
    background: #202429;
    border: 0;

    & + .ant-input-suffix i {
      color: #7c8795;
    }

    &::placeholder {
      color: #7c8795;
    }
  }

  &__body {
    .ant-tabs-bar,
    .ant-tabs-nav .ant-tabs-tab {
      margin: 0;
    }
  }
}
</style>
