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

<style lang="scss" src="./index.scss" scoped></style>

<template>
<div
  class="sp-float-menu-item"
  @click="handleClickItem"
>
  <i
    class='sp-float-menu-item__icon'
    :class="[iconPrefix, `${iconPrefix}-${icon}`]"
    v-if="icon"
  ></i>
  <img
    class="sp-float-menu-item__img"
    v-else-if="img"
    :src="img"
  >
  <div class="sp-float-menu-item__text"><slot>{{title}}</slot></div>
</div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  name: 'SpFloatMenuItem',
  props: {
    iconPrefix: {
      type: String,
      default: 'iconfont'
    },
    icon: String,
    img: String,
    title: String,
    to: String,
    target: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleClickItem () {
      if (this.to) {
        if (/^(http|https)/.test(this.to)) {
          if (this.target === 'blank') {
            analytics.event({}, 'liveChatClick')
            window.open(this.to, '_blank')
          } else {
            location.href = this.to
          }
        } else {
          this.$router.push(this.to)
        }
      }

      this.$emit('click')
    }
  }
}
</script>
