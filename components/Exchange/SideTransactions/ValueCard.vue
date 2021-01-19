<template>
  <a-card class="value-card">
    <h2 class="value-card-title">
      {{ formatAll(getValue, 'PRICE') }}
    </h2>
  </a-card>
</template>

<script>
import formatter from '~/Mixins/formatter'
import { mapGetters } from 'vuex'

export default {
  mixins: [formatter],
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
    }),
    getValue() {
      return this.value
    },
  },
}
</script>

<style lang="scss">
.value-card {
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-card-body {
    padding: 0 1rem;
  }

  &-title {
    color: var(--value-card-color);
    margin: 0;
    height: 31.5px;
  }
}
</style>
