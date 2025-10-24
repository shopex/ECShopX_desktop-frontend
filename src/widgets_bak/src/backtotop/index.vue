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
.widget-notice {
  &__title {
    > span {
      display: inline-block;
      margin-right: 30px;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="float-menus__item">
    <SpFloatMenu>
      <template v-for="(item, index) in params.urls">
        <SpFloatMenuItem
          iconPrefix="aicon"
          :icon="item.icon"
          :title="item.title"
          target="blank"
          :to="item.link"
          :key="index"></SpFloatMenuItem>
      </template>
      <SpFloatMenuItem iconPrefix="mb-iconfont" icon="up" @click="handleClickBackToTop"></SpFloatMenuItem>
    </SpFloatMenu>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },

  data () {
    return {}
  },

  computed: {},
  methods: {
    handleClickBackToTop () {
      if (process.client) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
