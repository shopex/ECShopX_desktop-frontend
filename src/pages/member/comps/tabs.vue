<!--
// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统 
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn 
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------
-->

<style lang="scss" scoped>
.sp-smenu__sub-title-ul{
  li{
    cursor: pointer;
  }
  .active{
    color: $color-active ;
  }
}
</style>
<template>
  <ul class="sp-smenu__sub-title-ul">
    <li
      v-for="(item, index) in data"
      :key="index"
      :class="{'active': showActive && item.value == value}"
      @click="handleClick(item)"
    >{{item.label}}
    <!-- <span class="active-sign" v-if="showActive && item.value === value"></span> -->
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    data: Array,
    showActive: Boolean
  },
  methods: {
    handleClick (item) {
      this.$emit('input', item.value)
      this.$emit('change', item)
    }
  }
}
</script>
