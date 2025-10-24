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
.sp-footer {
}
</style>

<template>
  <div class="sp-footer">
    <!-- 挂件 -->
    <!-- <component
      mode="render"
      v-for="(wgt, index) in wgts"
      :is="wgt.type"
      :value="wgt"
      :page-props="pageConfig"
      :key="`wgt-${index}`"
    ></component> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SpFooter',
  data() {
    return {
      index: 0
    }
  },

  computed: {
    ...mapState({
      // wgts: (state) => {
      //   const res = state.footerTemplate
      //   return res ? JSON.parse(res.params) : []
      // },
      pageConfig: (state) => {
        return state.pageConfig
      }
    })
  },

  methods: {
    toggleMenu(m) {}
  }
}
</script>
