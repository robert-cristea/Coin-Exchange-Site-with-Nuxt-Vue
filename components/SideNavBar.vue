<template>
  <div v-if="open" class="side-nav-bar" :class="open && 'side-nav-bar-open'">
    <div class="side-nav-bar__overlay" @click="close"></div>
    <div class="side-nav-bar__content">
      <div>
        <div class="side-nav-bar__content-close c-pointer" @click="close">
          <a-icon type="close" />
        </div>
        <ul class="side-nav-bar__content-menu">
          <li>Trade</li>
          <li>Exchange</li>
          <li>Campains</li>
        </ul>
      </div>
      <div>
        <div class="text-secondary side-nav-bar__content-footer">
          2020 Cointral
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      setTimeout(() => {
        this.$emit('close')
      })
    },
  },
}
</script>

<style lang="scss">
.side-nav-bar {
  width: 100vw;
  z-index: 100;
  height: 100vh;

  &-open {
    .side-nav-bar__content {
      left: 0;
    }
  }

  &,
  &__overlay,
  &__content {
    position: fixed;
    left: 0;
    top: 0;
  }

  &__overlay {
    background: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    z-index: 101;
  }

  &__content {
    width: 70%;
    height: 100vh;
    background: #171b21;
    z-index: 102;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    left: -70%;
    transition: all 1s ease-in-out;

    &-menu {
      padding-left: 1.25rem;
      list-style: none;
      display: flex;
      flex-direction: column;

      li {
        margin-bottom: 15px;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 600;
      }
    }

    &-close {
      display: flex;
      padding: 1rem;
      margin: 0;
      justify-content: flex-end;

      i {
        font-size: 24px;
        color: #414448;
        stroke-width: 20px;
      }
    }

    &-footer {
      height: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
