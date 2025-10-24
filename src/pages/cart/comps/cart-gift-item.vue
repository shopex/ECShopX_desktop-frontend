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
  <div class="cart-gift-item" :class="{ 'has-selection': hasSelection }">
    <div class="cart-gift__selection" v-if="hasSelection">
      <SpRadio type="radio" :value="info.selected" @change="handleSelection" />
    </div>
    <div class="cart-gift-item-cont">
      <slot>
        <SpGoodsItem :info="info" :show-promotion="false" />
      </slot>
    </div>
    <div class="cart-gift-item-actions" v-if="!noActions">
      <slot name="actions">
        <!-- <span href="javascript:;" @click="handlePerformAct('edit')">编辑</span> -->
      </slot>
    </div>
  </div>
</template>

<script>
import { SpGoodsItem } from '@/components'

export default {
  components: { SpGoodsItem },

  props: {
    hasSelection: {
      type: Boolean,
      default: true
    },
    noActions: Boolean,
    info: Object
  },

  methods: {
    handleSelection() {
      this.$emit('selection', this.info)
    },
    handlePerformAct(action) {
      this.$emit(action, this.info)
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-gift-item {
  position: relative;
  &.has-selection {
    padding-left: 50px;
    .cart-gift-item-selection {
      position: absolute;
      top: 50%;
      margin: -10px 0 0 -50px;
    }
  }
  .goods-item {
    padding-left: 180px;
    min-height: 210px;
    margin: 0 0 20px;
    @include clearfix();
    &__img {
      @include pdt-img(160px);
      height: 210px;
      border: 1px solid #ccc;
      position: absolute;
      float: left;
      margin-left: -180px;
    }
    &__right {
      width: auto;
      float: none;
      font-size: 16px;
      line-height: 1.5;
    }
    &__title {
      color: #232323;
      margin: 0 0 12px;
      padding: 16px 0 0;
    }
    &__specs {
      &-bn,
      &-color,
      &-size {
        display: block;
        margin: 0 0 5px;
      }
    }
    &__price {
      position: absolute;
      bottom: 10px;
    }
  }

  &-actions {
    position: absolute;
    top: 18px;
    right: 10px;
    font-size: 14px;
    color: #525252;
    span {
      cursor: pointer;
    }
  }
}
</style>
