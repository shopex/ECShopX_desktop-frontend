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

<!--
 * @Author: your name
 * @Date: 2021-02-03 14:27:08
 * @LastEditTime: 2021-02-22 14:31:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/components/sp-header/index.vue
-->
<style lang="scss" src="./index.scss"></style>
<template>
  <div class="header-bar" >
    <div class="header-bar__topbar">
      <div class="container container-shop" >
        <span>{{ $t('shop-header.index.645099-0') }}</span>
        <span class="exit-btn" @click="handleLogout()">{{ $t('shop-header.index.645099-1') }}</span>
      </div>
    </div>

    
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import { mapState } from 'vuex'
import { lockScreen } from '@/utils/dom'
import S from '@/spx'

export default {
  name: 'ShopHeader',
  mixins: [clickaway],
  data() {
    return {
      message: '',
      basefile: 'newwapmall/block/header.html',
      fixed: false,
      showSubNav: null,
    }
  },
  methods: {
    handleLogout() {
      this.$cookies.remove('ECSHOPX_STORE_TOKEN')
      S.logoutShop()
    },
    handleCallback(params) {
      if (params) {
        let keywords = params.data.keyword
        this.$router.push(`/items?keywords=${keywords}`)
      }
    }
  }
}
</script>
<style lang="sass" scoped>

</style>