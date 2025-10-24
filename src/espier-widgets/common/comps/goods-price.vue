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
.widgets-goods-price {
  display: inline-block;
  vertical-align: middle;
  .price__symbol {
    margin-right: 2px;
    font-size: 14px;
    font-weight: 700;
    font-family: MicrosoftYahei-regular, Arial, Helvetica, sans-serif;
    color: inherit;
    float: left;
    margin-top: 5px;
  }
  .price__int,
  .price__decimal,
  .price__append {
    // float: left;
    text-decoration: inherit;

    font-weight: 700;
    font-family: arial, sans-serif;
    color: inherit;
    float: left;
  }
  &__small {
    .price__symbol {
      font-weight: 500;
    }
    .price__int,
    .price__decimal,
    .price__append {
      font-weight: 500;
    }
  }
  &__default {
    font-size: $font-size;
  }
  &__large {
    font-size: $font-size-large;
  }
}
</style>

<template>
  <span :class="classes" :style="{ color: theme, fontSize: afontSize + 'px' }">
    <!-- {{ value < 0 ? '-' : '' }} -->
    <template v-if="isValid">
      <span
        v-if="!noSymbol"
        class="price__symbol"
        :style="{
          fontSize: afontSize - (marginTop != 5 ? 0 : 4) + 'px',
          marginTop: marginTop + 'px'
        }"
      >
        {{ symbol }}</span
      >
      <span class="price__int">{{ priceVals.int }}</span>
      <span class="price__decimal" v-if="!noDecimal && priceVals.decimal !== undefined"
        >.{{ priceVals.decimal }}</span
      >
      <span class="price__append" v-if="appendText">{{ appendText }}"</span>
    </template>
    <template v-else>{{ defaultValue }}</template>
  </span>
</template>

<script>
import { oneOf, isNumber } from '@/utils'

const prefixCls = 'widgets-goods-price'

export default {
  name: 'goodsPrice',
  props: {
    symbol: {
      type: String,
      default: '¥'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    defaultValue: {
      type: String,
      default: '-'
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default() {
        return 'default'
      }
    },
    noSymbol: Boolean,
    noDecimal: Boolean,
    unit: String,
    appendText: String,
    theme: {
      type: String,
      default: '#e1251b'
    },
    afontSize: {
      type: [String, Number],
      default: 18
    },
    marginTop: {
      type: [String, Number],
      default: 5
    },
    toFixed: {
      type: [String, Number],
      default: 2
    }
  },
  computed: {
    isValid() {
      return !isNaN(parseFloat(this.value, 10))
    },
    classes() {
      return `${prefixCls} ${prefixCls}__${this.size} clearfix`
    },
    priceVals() {
      const value = +this.value
      let priceVal = this.unit === 'cent' ? value / 100 : value
      if (isNumber(priceVal)) {
        priceVal = priceVal.toFixed(this.toFixed)
      }
      const [int, decimal] = (priceVal || '').split('.')
      return {
        int,
        decimal
      }
    }
  }
}
</script>
