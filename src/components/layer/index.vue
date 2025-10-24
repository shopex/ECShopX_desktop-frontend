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
.sp-layer {
  background: rgba(#000, 0.6);
  z-index: $z-index-modal;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__transparent {
    background: rgba(#000, 0);
  }

  &__transition {
    &-enter-active, &-leave-active {
      transition: opacity .2s;
    }
    &-enter, &-leave-to {
      opacity: 0;
    }
  }
}
</style>

<template>
<transition name="sp-layer__transition">
  <div
    :class="classes"
    v-show="value"
  >
    <slot></slot>
  </div>
</transition>
</template>

<script>
export default {
  name: 'SpLayer',

  props: {
    transparent: Boolean,
    value: Boolean
  },

  computed: {
    classes () {
      return [
        'sp-layer',
        { 'sp-layer__transparent': this.transparent }
      ]
    }
  }
}
</script>