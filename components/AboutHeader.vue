<template>
  <div id="about-header">
    <a-row
      type="flex"
      align="middle"
      justify="start"
      :gutter="18"
      class="about-header-row"
      style="margin: 0px"
    >
      <a-col :span="6">
        <div class="about-page-title">About Cointral</div>
      </a-col>
      <a-col :span="12">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="4" class="nav-links">
            <div>About</div>
          </a-col>
          <a-col :span="4" class="nav-links">
            <div>Careers</div>
          </a-col>
          <a-col :span="4" class="nav-links">
            <div>Press</div>
          </a-col>
          <a-col :span="4" class="nav-links">
            <div>Community</div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#about-header {
  position: relative;
}
.about-header-row {
  background-color: #0e1526;
  padding: 14px;
}
.about-page-title,
.nav-links {
  font-family: 'Roboto-Regular';
  padding: 0px 15px;
  font-size: 15px;
  font-weight: normal;
  text-align: center;
  color: #ffffff;
}
.about-page-title {
  font-family: 'Roboto-Medium';
  text-align: right;
  font-size: 21px;
}
</style>
