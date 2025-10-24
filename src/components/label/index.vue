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
.sp-label {
  // font-size: $font-size;
  display: inline-block;
  // padding: 3px 5px;
  vertical-align: middle;
  font-size: 14px;
  background: #c51333;
  color: #fff;
  text-align: center;
  padding: 2px 4px;
  margin: 0 6px 0 0;
}
</style>

<template>
  <div class="sp-label">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpLabel'
}
</script>
