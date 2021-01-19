<template>
  <div class="trade-tab px-3">
    <a-tabs default-active-key="1" :animated="false">
      <a-tab-pane key="1" tab="Al">
        <div class="d-flex mb-15">
          <div class="flex-1 pr-2">
            <div>
              <span style="color: #adadad">Kullanılabilir: </span>
              <span>0.00427905</span>
            </div>
          </div>
          <div class="flex-1 pl-2">
            <span class="font-weight-600">0.023485</span>
          </div>
        </div>
        <a-button class="btn-success"> Buy Now </a-button>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Sat"> Charts </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="scss">
.trade-tab {
  .ant-tabs-content {
    padding: 1rem 0;
  }
}
</style>
