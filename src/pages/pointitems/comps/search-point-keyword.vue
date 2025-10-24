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
  <div class="price-point-wrap-keyword">
    <input type="text" placeholder="" v-model="keywords" autocomplete="off" class="search-input" />
    <div class="search-click" @click="search">{{ $t('comps.search-point-keyword.802752-0') }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: null
    }
  },
  methods: {
    search() {
      this.$emit('search-point', this.keywords)
    }
  }
}
</script>

    <style lang="scss" scoped>
.price-point-wrap-keyword {
  display: inline-block;
  .search-label {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  .search-input {
    height: 34px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ea2329;
    border-radius: 3px;
    border: 1px solid #ccc;
    background: #fff;
    height: 100%;
    color: #333;
    padding: 0;
    width: 160px;
  }
  .search-click {
    display: inline-block;
    vertical-align: middle;
    /* margin-left: -5px; */
    background: #ea2329;
    color: #fff;
    line-height: 34px;
    text-align: center;
    width: 60px;
    cursor: pointer;
    border-radius: 3px;
  }
}
</style>
