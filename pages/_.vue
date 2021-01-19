<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button
        type="primary"
        @click="$router.push(localeRoute('/'))"
        icon="home"
      >
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  middleware: ['auth'],
  head(){
    return{
      title: '404 - Bulunamadı | Cointral.com',
    }
  },
}
</script>

<style scoped>
.container-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
}
</style>
