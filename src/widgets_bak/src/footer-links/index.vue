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
  .footer-links {
    ul {
      text-align: center;
      a{
        font-size: 12px;
        letter-spacing: 1px;
        color: $color-secondary-text;
      }
    }
  }
</style>

<template>
  <div class="footer-links">
    <ul>
      <li v-for="(item, index) in params.urls" :key="index">
        <a :href="item.link" v-if="item.link">{{item.title}}</a>
        <span v-else>{{item.title}}</span>
      </li>
    </ul>
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

  computed: {}
}
</script>
