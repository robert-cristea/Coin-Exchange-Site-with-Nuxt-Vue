<template>
    <a-row :gutter="6">
        <a-col :span="6">
            <div
            class="typeItem"
            :class="{active: activeTab === 1}"
            @click="setTab(1)"
          >
            <img
              src="~/assets/images/transaction-3.svg"
              class="img-fluid"
              alt=""
            />
          </div>
        </a-col>
        <a-col :span="6">
            <div
            class="typeItem"
            :class="{active: activeTab === 2}"
            @click="setTab(2)"
          >
            <img
              src="~/assets/images/transaction-2.svg"
              class="img-fluid"
              alt=""
            />
          </div>
        </a-col>
        <a-col :span="6">
            <div
            class="typeItem"
            :class="{active: activeTab === 3}"
            @click="setTab(3)"
          >
            <img
              src="~/assets/images/transaction-1.svg"
              class="img-fluid"
              alt=""
            />
          </div>    
        </a-col>
        <a-col :span="6">
            <a-select dropdownClassName="dark-select" class="w-100" >
                <a-select-option value="0.01"> 0.01</a-select-option>
            </a-select>
        </a-col>
    </a-row>
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

  .typeItem {
        width: 100%;
        height: 30px;
        display: grid;
        place-items: center;
        border-radius: 2px;
        cursor: pointer;
  }
  .active  {
    background-color: #2B2E35;
  
}
.dark-select {
    background: black;
}
  </style>
  