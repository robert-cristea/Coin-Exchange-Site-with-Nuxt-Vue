<template>
<div class="abc">
  <a-result title="Cointral P2P Çok Yakında">
    <template #extra>
      <a-button key="console" type="primary" @click="$router.push(localeRoute('/'))">
        Ana Sayfa
      </a-button>
    </template>
  </a-result>
</div>
</template>



<script>
export default {
  middleware: ['auth'],
  head(){
    return{
      title: 'Yakında | Cointral.com',
    }
  },
}
</script>

<style scoped>
.abc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
</style>
