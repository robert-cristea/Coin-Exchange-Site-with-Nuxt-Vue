<template>
  <div>
    <a-card class="mb-15 types">
      <div class="types-content">
        <div
          class="types-content__item"
          :class="activeTab == 1 && 'types-content__item-active'"
          @click="setTab(1)"
        >
          <img
            src="~/assets/images/transaction-3.svg"
            class="img-fluid"
            alt="transactions"
          />
        </div>
        <div
          class="types-content__item"
          :class="activeTab == 2 && 'types-content__item-active'"
          @click="setTab(2)"
        >
          <img
            src="~/assets/images/transaction-2.svg"
            class="img-fluid"
            alt="transaction"
          />
        </div>
        <div
          class="types-content__item"
          :class="activeTab == 3 && 'types-content__item-active'"
          @click="setTab(3)"
        >
          <img
            src="~/assets/images/transaction-1.svg"
            class="img-fluid"
            alt="transaction"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: {
      default: 1,
      type: Number,
    },
  },
  methods: {
    setTab(i) {
      this.$emit('change', i)
    },
  },
}
</script>

<style lang="less">
@import '~/assets/ant/variables.less';

.types {
  user-select: none;

  .ant-card-body {
    padding: 1rem;
  }

  &-content {
    display: flex;
    align-items: center;

    &__item {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 4px;
      margin-right: 8px;
      cursor: pointer;

      &-active {
        border: 1px solid @primary-color-darker;
      }
    }
  }
}
</style>
