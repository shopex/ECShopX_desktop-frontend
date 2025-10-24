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
.color-picker {
  &__item {
    margin: 0 0 8px;
    cursor: pointer;
    &.active {
      .color-picker__img {
        margin: 0;
        &-wrap {
          border: 3px solid $color-brand-primary;
        }
      }
    }
  }
  &__label {
    display: inline-block;
    vertical-align: middle;
  }
  &__img {
    width: 18px;
    height: 18px;
    margin: 2px;
    border-radius: 18px;
    &-wrap {
      width: 24px;
      height: 24px;
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid #cecece;
      border-radius: 100%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <ul class="color-picker clearfix">
    <li class="color-picker__item" :class="{ 'active' : selectValue.indexOf(item.value.toString()) > -1}" v-for="(item,index) in data"
      :key="index"
      @click="change(item)"
    >
      <div class="color-picker__img-wrap">
        <div class="color-picker__img" :style="{ background: `url(${item.prop_image})` }"></div>
      </div>
      <div class="color-picker__label">{{ item.prop_value }}</div>
    </li>
  </ul>
</template>

<script>
import { isString } from '@/utils'
export default {
  props: {
    data: {
      type: [Array, Function]
    },
    value: {
      type: [Number, String]
    },
    current: {
      type: [Number, String]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function
    }
  },
  data () {
    const selectValue = !this.value
      ? []
      : isString(this.value)
        ? this.value.split(',')
        : [this.value]
    return {
      selectValue
    }
  },
  methods: {
    change (item) {
      let sv
      let index = this.selectValue.indexOf(item.value.toString())

      if (this.multiple) {
        // 选中/取消
        if (index > -1) {
          this.selectValue.splice(index, 1)
        } else {
          this.selectValue.push(item.value.toString())
        }
        sv = this.selectValue.sort().join(',')
      } else {
        // 选中/取消
        if (index > -1) {
          this.selectValue = []
          sv = ''
        } else {
          this.selectValue = [item.value.toString()]
          sv = item.value.toString()
        }
      }

      this.$emit('change', sv)
    }
  }
}
</script>
