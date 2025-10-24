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

<template>
  <div>
    <template v-for="icon in icons">
      <div class="div">
        {{ icon }}
        <i class="ec-icon" :class="icon"></i>
      </div>
    </template>
  </div>
</template>

<script>
import { exportIcon } from '@/utils/dom'
let icons = exportIcon()
export default {
  data() {
    return {
      icons
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  display: inline-block;
  width: 250px;
  height: 30px;
  border: solid 1px red;
  text-align: center;
}
</style>
