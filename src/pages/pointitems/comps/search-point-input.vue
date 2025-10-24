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
  <div class="price-point-wrap">
    <SpInput class="price-input front" v-model="start_point" placeholder=""></SpInput>
    <span class="symbol">-</span>
    <SpInput class="price-input behind" v-model="end_point" placeholder=""></SpInput>
    <span class="price-btn" @click="submitPrice()">{{ $t('comps.search-point-input.683294-0') }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start_point: null,
      end_point: null
    }
  },
  methods: {
    submitPrice() {
      this.$emit('change-point', this.start_point, this.end_point)
    }
  }
}
</script>

    <style lang="scss" scoped>
.price-point-wrap {
  display: inline-block;
  display: flex;
  align-items: center;
  .symbol {
    margin: 0 3px;
    display: inline-block;
    margin-top: -5px;
  }
  .price-input {
    width: 73px;
    height: 26px;
    vertical-align: top;
    border-width: 0;
    .sp-input__input {
      border-radius: 3px;
      border: 1px solid #ccc;
      background: #fff;
      height: 100%;
      color: #333;
      padding: 0;
    }
  }
  .price-btn {
    display: inline-block;
    background: $color-brand-primary;
    color: $color-primary-text;
    width: 60px;
    text-align: center;
    border-radius: 3px;
    margin-left: 4px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
  }
}
</style>
