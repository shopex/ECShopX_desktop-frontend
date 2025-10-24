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
.footer-nav {
  .c-h {
    span {
      vertical-align: top;
    }
  }
  .mb-iconfont {
    display: none;
  }
  @include respond(sm) {
    ul {
      padding-left: 10px;
      margin-top: 15px;
    }
    .mb-iconfont {
      display: block;
    }
  }
}
</style>

<template>
  <div class="footer-nav">
    <div class="c-h">
      <span>{{params.title}}</span>
      <img class="service2" v-if="params.icon" :src="params.icon" alt="service" />
      <i class="mb-iconfont"></i>
    </div>
    <no-ssr>
      <ul>
        <li v-for="(item, index) in params.urls" :key="index">
          <nuxt-link :to="item.link" @click.native="$track('footer_link', item.link, item.title)">{{item.title}}</nuxt-link>
        </li>
      </ul>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },
  methods: {}
}
</script>
