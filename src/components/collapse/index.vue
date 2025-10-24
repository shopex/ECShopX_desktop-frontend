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
.collapse {
  &__title {
    padding: 10px 0;
    font-size: 15px;
    cursor: pointer;
  }
  .mb-iconfont {
    font-size: 20px;
    float: right;
    margin: 0 10px 0 0;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="collapse">
    <div class="collapse__title" @click="handleClick">
      <i class="mb-iconfont" :class="{ 'mb-iconfont-down': !isShowPanel, 'mb-iconfont-up': isShowPanel  }"></i>
      <span>{{title}}</span>
    </div>
    <SpDpTransition>
      <div class="collapse__panel" v-if="isShowPanel">
        <slot></slot>
      </div>
    </SpDpTransition>
  </div>
</template>

<script>
export default {
  name: 'SpCollapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShowPanel: this.open
    }
  },
  methods: {
    handleClick () {
      this.isShowPanel = !this.isShowPanel
      this.$emit('change', this.isShowPanel)
    }
  }
}
</script>
