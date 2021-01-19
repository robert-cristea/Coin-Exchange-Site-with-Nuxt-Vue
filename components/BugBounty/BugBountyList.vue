<template>
  <div id="bounty-list" :style="containerStyle">
    <div class="list-title" :style="titleStyle">
      <slot name="title"> </slot>
    </div>
    <div class="list-wrapper">
      <ul v-if="type === 'RULES'" class="list">
        <li
          v-for="(n, index) in 9"
          class="list-item"
          :style="listItemStyle"
          :key="n"
        >
          {{ $t('text_bb_r_' + n) }}
        </li>
      </ul>
      <ul v-if="type === 'OUTOFSCOPE'" class="list">
        <li v-for="n in 7" class="list-item" :style="listItemStyle" :key="n">
          {{ $t('text_bb_o_' + n) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      type: String,
    },
    containerStyle: {
      required: false,
      type: Object,
      default: () => {},
    },
    titleStyle: {
      required: false,
      type: Object,
      default: () => {},
    },
    listItemStyle: {
      required: false,
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
#bounty-list {
  padding: 30px;
}
.list-wrapper {
  text-align: left;
}
.list-title,
.list-wrapper {
  margin: 10px auto;
  width: 715px;
}
.list-title {
  margin: auto;
  text-align: center;
  font-size: 43px;
  font-family: 'Roboto-Medium';
}
.list-item {
  font-size: 18px;
  font-family: 'Roboto-Regular';
  line-height: 1.3;
  margin-bottom: 18px;
}
.list-item::before {
  /* background-image: url('~/assets/'); */
}
.list {
  list-style-type: none;
}
</style>
