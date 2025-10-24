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
.widget-logo {
  img {
    width: 100%;
  }
  @include respond(sm) {
    img {
      width: 110px;
    }
  }
}
</style>

<template>
  <div class="widget-logo">
    <NuxtLink to="/">
      <img class="logo" :src="params.logo_image" @click="handleCloseMenu" alt="logo"/>
    </NuxtLink>
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
    handleCloseMenu () {
      this.$EventBus.$emit('close-menu')
    }
  }
}
</script>
