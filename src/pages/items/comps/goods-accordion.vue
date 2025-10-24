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
  <div class="goods-acoordion">
    <SpCollapse
      v-for="(item, index) in info"
      :key="index"
      :title="item.title"
      :open="!!opened[index]"
      @change="(val) => handleItemChange(index, val)"
    >
      <div v-html="item.content"></div>
    </SpCollapse>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      curIdx: 0,
      opened: {}
    }
  },

  methods: {
    handleItemChange(idx, val) {
      this.opened[idx] = val
    }
  }
}
</script>

    <style lang="scss" scoped>
.goods-acoordion {
  .acoord-item {
    &-hd {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .mb-iconfont {
    font-size: 20px;
    float: right;
    margin: 0 10px 0 0;
    cursor: pointer;
    transition: all 0.3s;
  }
  .mb-iconfont-down {
    transform: rotate(-90deg);
  }
  .mb-iconfont-up {
    transform: rotate(-180deg);
  }
  .collapse {
    margin: 0 0 15px;
    &__title {
      height: 36px;
      font-size: 16px;
      font-weight: bold;
      padding: 0;
      line-height: 34px;
      border-bottom: 1px solid $color-border-gray;
    }
    &__panel {
      padding-top: 10px;
    }
  }
}
</style>
