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

<template functional>
  <div class="vip-progress">
    <div class="vip-progress-inner" :style="{'width':(props.value || '50') + '%','background':props.color || '#aabab7'}"></div>
  </div>
</template>

    <style lang="scss" scoped>
.vip-progress {
  width: 100%;
  height: 7px;
  background-color: #ffffff;
  border-radius: 6px;
  &-inner {
    height: 7px;
    border-radius: 6px;
    opacity: 0.8;
  }
}
</style>
