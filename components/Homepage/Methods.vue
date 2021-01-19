<template>
  <a-row
    class="methods-row w-100"
    :gutter="16"
    type="flex"
    align="middle"
    justify="center"
  >
    <a-col :span="24" :md="20">
      <h1 class="method-box-heading Roboto-Bold text-white">
       >{{$t('methods_title')}} 
      </h1>
      <a-row :gutter="32">
        <a-col :xs="24" :sm="12" :md="6">
          <div class="methods-box">
            <img
              class="method-box-image"
              src="../../assets/images/homepage/method1.svg"
              alt=""
            />
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step1_title')}}</h2>
            <h2 class="Roboto-Medium text-white m-0">
              {{$t('methods_step1_text')}}
            </h2>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <div class="methods-box">
            <img
              class="method-box-image"
              src="../../assets/images/homepage/method2.svg"
              alt=""
            />
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step2_title')}}</h2>
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step2_text')}}</h2>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <div class="methods-box">
            <img
              class="method-box-image"
              src="../../assets/images/homepage/method3.svg"
              alt=""
            />
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step3_title')}}</h2>
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step3_text')}}</h2>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <div class="methods-box">
            <img
              class="method-box-image"
              src="../../assets/images/homepage/method4.svg"
              alt=""
            />
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step4_title')}}</h2>
            <h2 class="Roboto-Medium text-white m-0">{{$t('methods_step4_text')}}</h2>
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Methods',
}
</script>

<style>
.methods-row {
  background-color: #1c2640;
  padding: 60px 20px;
  margin: auto 0px !important;
}
@media screen and (max-width: 768px) {
  .methods-row {
    text-align: center;
  }
}
.method-box-heading {
  margin-bottom: 50px;
}
.methods-box {
  margin: 15px auto;
}
.method-box-image {
  width: 80px;
  margin-bottom: 15px;
}
</style>
