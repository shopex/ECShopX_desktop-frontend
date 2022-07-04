<!--
 * @Author: your name
 * @Date: 2021-01-20 16:33:13
 * @LastEditTime: 2021-01-22 11:35:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/components/auth-header/index.vue
-->
<style lang="scss" src="./index.scss"></style>
<template>
  <div class="authcustom-header">
   <div class="login-header-container">
    <NuxtLink to="/">
      <img
        class="login-header-logo"
        referrerpolicy="no-referrer"
        src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng82d0e80cee245fcf9d2458c56afe5dabeae1c543ebaa429c5c10dfc2457cb444"/>
    </NuxtLink>
      <div class="login-header-span">
        <span class="login-header-span1">还没有账号</span>
        <NuxtLink v-if="this.$route.path != '/auth/reg'" to="/auth/reg"  class="login-header-span2">免费注册</NuxtLink>
        <NuxtLink v-else to="/auth/login"  class="login-header-span2">现在登录</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "@/plugins/clickaway";
import { mapState } from "vuex";
import { lockScreen } from "@/utils/dom";
import S from "@/spx";

export default {
  name: "AuthHeader",
  mixins: [clickaway],
  data() {
    return {
      message: "",
      basefile: "newwapmall/block/header.html",
      fixed: false,
      showSubNav: null,
      message: ""
    };
  },
  watch: {
    $route() {
      this.sub_index = null;
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      wgts: state => {
        const res = state.commonWgts.headerTemplate;

        return res.params ? JSON.parse(res.params) : [];
      }
    })
  },
  methods: {
    handleLogout() {
      S.logout();
    },
    handleCallback(params) {
      if(params){
        let keywords=params.data.keyword
        this.$router.push(`/items?keywords=${keywords}`)
      }

    }
  }
};
</script>
