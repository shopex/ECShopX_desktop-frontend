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
// .sp-link {
//   display: inline-block;
// }
</style>

<template>
  <div class="sp-link">
    <a :href="href" target="_blank" v-if="!isNuxtLink" @click="handleClick">
      <slot></slot>
    </a>
    <span v-else-if="href===''">
      <slot></slot>
    </span>
    <nuxt-link :to="href" v-else>
      <slot></slot>
    </nuxt-link>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  name: 'SpLink',
  props: {
    href: String
  },
  computed: {
    isNuxtLink () {
      if (!this.href) return false
      return !/^(https?|http):\/\/.+$/.test(this.href)
    }
  },
  methods: {
    handleClick () {
      analytics.event({}, 'liveChatClick')
    }
  }
}
</script>
