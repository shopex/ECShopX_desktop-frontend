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
.sp-message {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 300px;
  height: 100px;
  border: 1px solid $color-border-gray;
  z-index: $z-index-toast;
  background: #fff;
  text-align: center;
  padding: 10px;
  transform: translate(-50%, -50%);
  &__content {
    margin-top: 20px;
    i {
      font-size: 35px;
      vertical-align: middle;
      margin-right: 5px;
      &.ec-icon-roundcheckfill {
        color: $color-success;
      }
      &.ec-icon-roundclosefill {
        color: $color-active;
      }
      &.ec-icon-infofill {
        color: $color-warning;
      }
    }
    > span {
      vertical-align: middle;
      position: relative;
    }
  }
  &.fadein {
    animation: animate_in 0.25s;
  }
  &.fadeout {
    animation: animate_out 0.25s;
  }
}

@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<template>
  <div
    class="sp-message"
    v-if="visible"
    :class="visible ? 'fadein' : 'fadeout'"
  >
    <div class="sp-message__content">
      <i
        class="ec-icon"
        :class="{
          'ec-icon-infofill': type == 'warning',
          'ec-icon-roundcheckfill': type == 'success',
          'ec-icon-roundclosefill': type == 'error'
        }"
      >
      </i>
      <span v-html="message"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpMessage",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: String,
    type: String
  },
  data() {
    return {
      visible: this.value
    };
  }
};
</script>
