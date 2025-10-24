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
  <div class="cart-steps">
    <ul class="steps-list">
      <li class="step-item">{{ $t('comps.steps.003931-0') }}</li>
      <li class="step-item">{{ $t('comps.steps.003931-1') }}</li>
      <li class="step-item">{{ $t('comps.steps.003931-2') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-steps {
  padding: 20px 0;
  font-size: $font-size-large;
  .step-item {
    display: inline-block;
    padding: 0 20px 0 0;
    &.is-active {
      font-weight: bold;
    }
  }
}
</style>
