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
.page-article {
}
</style>

<template>
  <div class="page-article page-body container">
    {{ $t('article.index.147915-0') }}
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    imgStyle() {
      let width = 180
      return {
        width: width + 'px',
        height: Math.floor(width * 1.2825) + 'px'
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
