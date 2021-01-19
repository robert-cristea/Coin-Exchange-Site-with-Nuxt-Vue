<template>
  <div @click.prevent="$router.push(localeRoute('/'))" class="navbar-brand">
    <img src="~/assets/images/logo.svg" alt="navbar_brang_logo" />
  </div>
</template>

<style lang="scss" scoped>
.navbar-brand {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 125px;

  img {
    width: 100%;
  }
}
</style>
