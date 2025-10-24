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
 * @Date: 2021-01-07 14:06:09
 * @LastEditTime: 2021-01-22 11:28:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/layouts/auth_layout.vue
-->
<style lang="scss" src="@/style/index.scss"></style>

<template>
  <LayoutHoc>
  <div class="system-auth">
    <auth-header :logo="logo" />
    <div class="page-body" :style="{ backgroundImage: `url(${bg})` }">
      <Nuxt />
    </div>
    <sp-footer />

  </div>
</LayoutHoc>
</template>

<script>
import "@/main";
import { mapActions, mapState } from "vuex";
import { Tracker } from "@/service";
import { isNativeBrower } from "@/utils";
import backgroundImage from '@/assets/imgs/login_background.png'
import logoImage from '@/assets/imgs/login_yundian.jpg'

export default {
  data() {
    return {
      bg: '',
      logo:''
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (!isNativeBrower()) {
        window.location.href = location.origin + to.fullPath;
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      wgts: state => {
        const res = state.commonWgts.footerTemplate;

        return res.params ? JSON.parse(res.params) : [];
      }
    })
  },
  created() {
    this.getPic()
  },
  mounted() {
    if (this.$device.isMobile && location.pathname !== "/h5") {
      location.href = "/h5";
    }

    Tracker.use("baidu", {
      id: "e337fceafe7b537d17bc60df3ed3c246"
    });
  },
  methods: {
    handleCallback(params) {
      if (params) {
        let keywords = params.data.keyword
        this.$router.push(`/items?keywords=${keywords}`)
      }
    },

    async getPic() {
      const params = { domain: window.location.host }
      const { background, logo } = await this.$api.shop.getLoginPic(params)
      this.bg = background || backgroundImage
      this.logo = logo || logoImage
    }
  }

};
</script>
<style lang="scss" scoped>
.page-body {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>