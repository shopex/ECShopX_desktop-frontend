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
    .good-type-picker {
      margin-bottom: 10px;
      &__title {
        height: 46px;
        line-height: 46px;
        font-size: 18px;
        background: $color-brand-primary;
        border: 1px solid $color-brand-primary;
        color: #fff;
        padding-left: 20px;
        cursor: pointer;
        .mb-iconfont-jiansvg {
          float: right;
          margin-right: 10px;
          font-weight: bold;
        }
      }
      &__content {
        width: 100%;
        border: 1px solid $color-brand-primary;
        li {
          padding-left: 20px;
          margin: 10px 0;
        }
        li:hover {
          span {
            border-bottom: 1px solid $color-brand-primary;
          }
        }
      }
    }
</style>

<template>
    <div class="good-type-picker">
        <div class="good-type-picker__title">
          {{title}}
          <i class="mb-iconfont mb-iconfont-jiansvg"></i>
        </div>
        <ul class="good-type-picker__content">
            <li v-for="(item, index) in value" :key="index">
              <span>{{item.label}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Array
    }
  }
}
</script>
