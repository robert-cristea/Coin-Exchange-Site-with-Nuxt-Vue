<template>
  <div id="bug-prize">
    <a-row type="flex" align="middle">
      <a-col :span="12">
        <div class="prize-title">
          <slot name="prizeTitle"></slot>
        </div>
        <div class="prize-detail">
          <slot name="prizeDetail"></slot>
        </div>
        <div class="prize-list-wrapper" v-if="prizeList.length">
          <ul class="prize-list">
            <li class="prize-list-item" v-for="(l, index) in prizeList">
              {{ l }}
            </li>
          </ul>
        </div>
      </a-col>
      <a-col :span="12">
        <img
          v-if="!prizeList.length"
          class="brand-logo"
          src="~/assets/images/logo.svg"
          alt="navbar_brang_logo"
        />
        <div class="svg-container">
          <img
            class="prize-svg"
            src="~/assets/images/bugBounty/prize.svg"
            alt="prizesvg"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    prizeList: {
      required: false,
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
#bug-prize {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px;
  background-image: linear-gradient(to bottom, #20273e, #0b0e11);
  height: 1043px;
}
.prize-title {
  font-family: 'Roboto-Regular';
  font-size: 54px;
  text-align: left;
  color: #ffffff;
}
.prize-detail {
  font-family: 'Roboto-Regular';
  font-size: 20px;
  text-align: left;
  color: #ffffff;
}
.brand-logo {
  width: 261px;
  height: auto;
}
.prize-list {
  list-style-type: none;
}
.prize-list-item {
  font-size: 35px;
  color: #97bed6;
}
</style>
