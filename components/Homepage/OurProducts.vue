<template>
  <div class="our-products-container">
    <h1 align="center" class="Roboto-Medium">{{ $t('products_title') }}</h1>
    <a-row
      class="our-products w-100"
      :gutter="32"
      type="flex"
      align="middle"
      justify="center"
    >
      <a-col
        v-for="(product, i) in products"
        :key="i"
        :xs="24"
        :sm="12"
        :md="5"
      >
        <div class="product-box">
          <img
            class="product-box-image"
            :src="
              require(`../../assets/images/homepage/product/icons/${i + 1}.svg`)
            "
          />
          <div class="text-primary">
            {{ product }}
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'OurProducts',
  data() {
    return {
      products: [
        this.$t('products_cash'),
        this.$t('products_swap'),
        this.$t('products_creditcard'),
        this.$t('products_otc'),
        this.$t('products_p2p'),
        this.$t('products_corperate'),
        this.$t('products_gold'),
        this.$t('products_realty'),
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.our-products-container {
  background: #f7f7f7;
  padding: 20px;
}
.product-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  border-radius: 9px;
  margin: 15px auto;
  padding: 40px;
  text-align: center;
}
.product-box-image {
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
}
.product-box-image2 {
  transform: scale(1.5, 1.5);
}
.text-primary {
  color: #158cbf;
}
</style>
