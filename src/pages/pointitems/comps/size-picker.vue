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
.size-picker {
    &__item {
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-weight: bold;
    }
    &__border {
        float: left;
        margin: 0 15px 15px 0;
        padding: 2px;
        cursor: pointer;
        border: 1px solid #cecece;
        &.active {
            // border: 1px solid $color-brand-primary;
        }
    }
}
</style>

<template>
    <ul class="size-picker clearfix">
        <li class="size-picker__border active" v-for="(item, index) in value" :key="index" @click="change(item)">
            <div class="size-picker__item">{{item.label}}</div>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change (item) {

    }
  }
}
</script>
