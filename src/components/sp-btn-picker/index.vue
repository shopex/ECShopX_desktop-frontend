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
.sp-btn-picker {
  margin-right: 10px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ececec;
  position: relative;
  font-size: 12px;
  cursor: default;
  &.disabled {
    filter: opacity(0.5);
  }
  .corner {
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-bottom: 15px solid #ea2329;
    border-left: 15px solid transparent;
    z-index: 10;
    .ec-icon {
      &::before {
        position: absolute;
        font-size: 10px;
        color: #fff;
        top: -5px;
        left: -10px;
      }
    }
  }
  &.active {
    .corner {
      display: block;
    }
  }
}
</style>
<template>
  <div
    class="sp-btn-picker"
    :class="{
      active: currentValue == value,
      disabled: disabled
    }"
    :style="{
      borderColor: currentValue == value ? theme : ''
    }"
    @click="handleClick"
  >
    <slot></slot>
    <span
      class="corner"
      :style="{
        borderBottomColor: currentValue == value ? theme : ''
      }"
    >
      <i class="ec-icon ec-icon-check"></i>
    </span>
  </div>
</template>

<script>
import { findComponentUpward } from '@/utils'
export default {
  name: 'SpBtnPicker',
  props: {
    value: [Boolean, String, Number],
    theme: String,
    disabled: Boolean
  },
  data() {
    const parent = findComponentUpward(this, 'SpBtnPickerGroup')
    return {
      currentValue: parent.value,
      parent
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      if (this.disabled) {
        return
      }
      if (this.parent) {
        this.parent.onChange(this.value)
      } else {
      }
    }
  }
}
</script>
