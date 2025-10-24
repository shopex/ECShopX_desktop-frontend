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
  <div class="index-banner">
    <SpLink :href="params.ad_pic_link">
      <img v-lazy="params.ad_pic_pc" width="100%" height="100%" alt="ad-onepic"/>
    </SpLink>
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
    // repalceurl (url) {
    //   return url.replace('http://qa-api.dickies.com.cn', 'https://shopex-demo.shopex.cn')
    // }
  }
}
</script>

<style lang="scss">
.index-banner {
  position: relative;
  font-size: 0;
}
</style>
