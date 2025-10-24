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
.topbar-member__exit-btn{
  margin-left: 40px;
}
</style>

<template>
  <no-ssr class="topbar-member">
    <span v-if="userInfo">
      <nuxt-link
        to="/member/user-info"
      >
      <!-- {{userInfo.is_staff === '1' ? (userInfo.work_name || userInfo.work_mobile || userInfo.email) : (userInfo.login_account || userInfo.mobile || userInfo.email)}} -->
      我的账户
      </nuxt-link>
      <a class="topbar-member__exit-btn" href="javascript:void(0);" @click="exitSys">退出</a>
      <!-- <img class="icon" src="~/assets/imgs/user.png" @click="userClick" width="20" height="20" alt="topbar-member"/> -->
    </span>
    <span v-else>
      <nuxt-link to="/auth/login" @click.native="$track('header', '登录')">登录</nuxt-link> <span>/</span>
      <nuxt-link to="/auth/reg" @click.native="$track('header', '注册')">注册</nuxt-link>
      <!-- <nuxt-link to="/auth/login">
        <img class="icon" src="~/assets/imgs/user.png" @click="handleClick" width="20" height="20" alt="topbar-member"/>
      </nuxt-link> -->
    </span>
  </no-ssr>
</template>

<script>
import S from '@/spx'
export default {
  props: {
    params: Object
  },

  data () {
    return {}
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async exitSys () {
      await this.$api.auth.logout()
      S.logout()
    },
    userClick () {
      this.$router.push('/member/trade')
    },
    handleClick () {
      this.$EventBus.$emit('close-menu')
    }
  }
}
</script>
