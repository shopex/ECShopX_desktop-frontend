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
.sub-slide {
  &__img-warp {
    width: 50%;
    font-size: 0;
  }
  @include respond(sm) {
    &__img-warp {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="sub-slide index-banner">
    <div class="wdget-smbanner clearfix banner-sm pc">
      <div class="sub-slide__img-warp fl" v-for="item in params.pic" :key="item.id">
        <SpLink :href="item.linktarget">
          <img v-lazy="item.pc_link" width="100%" height="100%" alt="sub-slide"/>
        </SpLink>
      </div>
    </div>
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
