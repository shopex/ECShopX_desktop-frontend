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
.staff-label {
  color: #fff;
  background-color: $color-invalid;
  font-size: 12px;
  border-radius: 10px;
  display: inline-block;
  padding: 0 5px;
}
</style>

<template>
  <div class="staff-label">
    {{ $t('comps.staff-label.919533-0') }}
  </div>
</template>

<script>
export default {
  name: 'StaffLabel'
}
</script>
