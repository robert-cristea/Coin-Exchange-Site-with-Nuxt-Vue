<template>
  <div>
    <a-row type="flex" align="middle">

      {{/*Banner Side*/}}
      <a-col :xs="!isMobile ? 20 : 24" :md="17" class="card-height">
        <banner />
      </a-col>
      {{/*------------*/}}


      {{/*Signup Form*/}}
      <a-col :xs="!isMobile ? 20 : 24" :md="7" class="card-height">
        <a-card :bordered="false" class="border-none" style="min-height: 100vh;">
          <div>        
            <slot name="auth-card-header"></slot>
            <div class="my-20">
              <slot name="auth-card-feedback"></slot>
            </div>
            <slot name="auth-card-content"></slot>
            <slot name="auth-card-actions"></slot>
          </div>
        </a-card>
      </a-col>
      {{/*------------*/}}

    </a-row>
  </div>
</template>

<script>
import banner from './banner'

export default {
  layout: 'login',
    components: {
    banner,
  },
  data: () => ({
    isMobile: null,
  }),
  mounted() {
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
  },
}
</script>
<style lang="less" scoped>
.card-height {
    height: 100vh;
}

@media (max-width:768px){
    .card-height {
        height: auto;
    }
}

</style>