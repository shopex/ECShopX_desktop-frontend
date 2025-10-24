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
.filter-container {
  border-radius: 3px;
  font-size: 12px;
  .title {
    background: #fff;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    .highlight {
      color: $color-brand-primary;
    }
  }
  .brand-wrap {
    // border: 1px solid #e8e8e8;
    color: #333;
    .brand-title {
      float: left;
      width: 10%;
      height: 100%;
      width: 80px;
      margin-top: 16px;
      font-size: 14px;
    }
    .brand-list {
      position: relative;
      float: left;
      padding: 10px 0;
      background: #fff;
      overflow: hidden;
      width: 1068px;
      &__link {
        display: inline-block;
        cursor: pointer;
        padding: 0 5px;
        margin-right: 10px;
        line-height: 30px;
        border-radius: 3px;
        // &.active,
        // &:hover {
        //   background: $color-brand-primary;
        //   .name {
        //     color: $color-primary-text;
        //   }
        // }
        &.active {
          .ec-icon-close {
            display: inline-block;
          }
        }
        .name {
          padding: 0 5px;
          display: inline-block;
          font-size: 14px;
          color: inherit;
        }
        .ec-icon-close {
          height: 100%;
          display: none;
          color: $color-primary-text;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="filter-container">
    <div class="brand-wrap clearfix">
      <div class="brand-title">{{ $t('comps.goods-filter.752935-0') }}</div>
      <div class="brand-list">
        <a
          class="brand-list__link"
          :style="{
            color: value == item.attribute_id ? theme : ''
          }"
          :key="index"
          v-for="(item, index) in data"
        >
          <span class="name" @click="handleClick(item.attribute_id)">{{
            item.attribute_name
          }}</span>
          <!-- <i class="ec-icon ec-icon-close" @click="handleDeleteBrand()" /> -->
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    theme: {
      type: String
    },
    value: String
  },
  methods: {
    handleClick(attribute_id) {
      if (this.value && this.value == attribute_id) {
        this.$emit('onChange', '')
      } else {
        this.$emit('onChange', attribute_id)
      }
    }
  }
}
</script>
