<template>
  <a-col :class="!isMobile ? 'branch-info' : 'branch-info-mobile'">
    <a-col class="Roboto-Regular" style="color: #1BA4E8" offset="1" :span="6" align="start">
      {{ title }}
    </a-col>
    <a-col class="Roboto-Bold" :span="14" :align="!isMobile ? 'start' : 'end'">
      {{ explanation }}
    </a-col>
    <a-col :span="2" align="end">
      <a-tooltip placement="topLeft"
                 title="Copied"
                 arrow-point-at-center
                 :trigger="'click'"
                 v-clipboard="explanation"
                 @success="handleSuccess"
                 @error="handleError">
        <a-button
          type="link"
          style="width: 20px; height: 30px; margin-bottom: 5px">
          <img
            style="position: relative;"
            src="@/assets/icons/copy.png" alt="Bumble">
        </a-button>
      </a-tooltip>
    </a-col>
  </a-col>
</template>

<script>
export default {
  name: 'BranchInfo',

  data: () => ({
    isMobile: null,
  }),

  props: {
    title: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      default: 'Unavailable',
    }
  },

  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },

  methods: {
    handleSuccess(e) {
    },

    handleError(e) {
    }
  }
}
</script>

<style scoped>

.branch-info {
  padding-top: 14px;
  height: 51px;
  background: #fff;
  filter: drop-shadow(0px 2px 4px rgba(136, 136, 136, 0.25));
}

.branch-info-mobile {
  padding-top: 14px;
  height: 70px;
  background: #fff;
  filter: drop-shadow(0px 2px 4px rgba(136, 136, 136, 0.25));
}

</style>
