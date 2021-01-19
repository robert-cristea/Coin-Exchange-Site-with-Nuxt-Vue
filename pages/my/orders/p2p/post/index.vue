<template>
  <div>
    <a-layout>
      <a-layout-content class="content">
        <a-row>
          <a-col class="Roboto-Regular">
            <!-- <a-breadcrumb separator=">">
            <a-breadcrumb-item>{{ $t('processes') }}</a-breadcrumb-item>
            <a-breadcrumb-item>{{ $t('p2p_processes') }}</a-breadcrumb-item>
            <a-breadcrumb-item>{{ breadcrumb }}</a-breadcrumb-item>
            </a-breadcrumb> -->
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <History feild="OrderList" />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  head(){
    return{
      title: 'P2P İlan Geçmişi | Cointral.com',
    }
  },
}
</script>

<style scoped>
.content {
  padding: 24px;
}
</style>
