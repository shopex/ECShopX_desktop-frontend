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
.sp-btn-picker-group {
  @include clearfix();
  .sp-btn-picker {
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="sp-btn-picker-group">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '@/utils'
export default {
  name: 'SpBtnPickerGroup',
  props: {
    value: [Boolean, String, Number],
    theme: String
  },
  data() {
    return {}
  },
  watch: {
    value(nval, oval) {
      this.updateValue()
    }
  },
  created() {},
  methods: {
    onChange(val) {
      this.$emit('input', val)
      this.$emit('onChange')
    },
    updateValue() {
      this.childrens = findComponentsDownward(this, 'SpBtnPicker')
      if (this.childrens) {
        this.childrens.forEach((child) => {
          child.currentValue = this.value
        })
      }
    }
  }
}
</script>