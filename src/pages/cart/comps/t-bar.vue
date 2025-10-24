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
.t-bar {
  &__header {
    background: #efefef;
    height: 48px;
    line-height: 48px;
    // padding-left: 14px;
  }
  &__content {
    background: #fff;
    .container {
      padding: 20px 0;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: bold;
  }
  @include respond(sm) {
    &__header {
      padding: 0 15px;
    }
    &__content {
      .container {
        padding: 10px 15px;
      }
    }
  }
}
</style>

<template>
  <div class="t-bar">
    <div class="t-bar__header">
      <div class="container">
        <span class="t-bar__title">{{ title }}</span>
        <slot name="header"></slot>
      </div>
    </div>
    <div class="t-bar__content">
      <div class="container">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {}
}
</script>
