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
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutHoc',
  mounted() {
    const getlanguageByPath = (path) => {
      const zhKey = 'zh'
      const enKey = 'en'
      return path.includes(zhKey) ? 'zh' : path.includes(enKey) ? 'en' : null
    }
    const language = getlanguageByPath(this.$route.path)
    if (language && this.$store.state.locale != language) {
      this.$store.commit('SET_LANG', language)
    } else if (!language) {
      this.$store.commit('SET_LANG', 'zh')
    }   
  } 
}
</script>

<style scoped>

</style>