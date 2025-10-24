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

<style lang="scss">
.panel-bar {
  &__title {
    padding: 6px 10px;
    background: #f3f3f3;
  }
  &__container {
    padding: 10px;
  }
}
</style>

<template>
  <div class="panel-bar">
    <div class="panel-bar__title">{{ title }}</div>
    <div class="panel-bar__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sPanelBar',
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>
