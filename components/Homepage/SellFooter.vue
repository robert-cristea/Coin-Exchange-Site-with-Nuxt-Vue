<template>
  <div class="sell-footer w-100">
    <h2 align="center" class="Roboto-Regular text-white">
      {{$t('sellfooter_title')}}
    </h2>
    <p align="center" class="Roboto-Regular text-white">
      {{$t('sellfooter_text')}}
    </p>
    <a-form-model class="sell-footer-form" layout="inline">
      <a-form-model-item>
        <a-input-number
          v-model="buysellvalue"
          type="number"
          class="Roboto-Regular"
          style="width: 200px; border-color: black"
        ></a-input-number>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          @click="$router.push(localeRoute('/buy-crypto/USD/BTC'))"
          class="Roboto-Medium"
          style="color: black"
          >{{$t('sellfooter_button')}}</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'SellFooter',
  data() {
    return {
      buysellvalue: '50',
    }
  },
}
</script>

<style lang="scss" scoped>
.sell-footer {
  background: #171b21;
  padding: 20px;
}
.sell-footer-form {
  text-align: center;
  min-width: 300px;
}
</style>
<style lang="less" scoped>
@import '~ant-design-vue/dist/antd.less';
@input-bg: black;
@input-color: white;
</style>
