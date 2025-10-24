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

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-index" :style="{ backgroundColor: backgroundColor }">
    <!-- 挂件 -->
    <component
      mode="render"
      v-for="(wgt, index) in wgts"
      :is="wgt.type"
      :value="wgt"
      :page-props="pageConfig"
      :key="`wgt-${index}`"
      @callback="handleCallback"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { hasValue } from '@/utils'
import { useWechatLogin } from '@/api/user'
import { aliPayResult } from '@/api/trade'
import S from '@/spx'

export default {
  async asyncData({ app, route ,query ,store}) {
    let { pageid } = query

    const bodyTemplate = await app.$api.theme.getTemplateContent({
        theme_pc_template_id: pageid
      })
    const _bodyTemplate = []
    bodyTemplate.forEach((item) => {
      const config = JSON.parse(item.config)
      if (config.type != 'W0000') {
        _bodyTemplate.push(config)
      }else{
      console.log('config', config)
        store.commit('setPageConfig', config)
      }
    })
    return {
      wgts: _bodyTemplate
    }
  },
  data() {
    return {
      recList: [],
      bannerParams: {},
    }
  },
  components: {
    // IndexMore,
    // Banner
  },
  created() {
  },
  computed: {
    ...mapState({
      // wgts: (state) => {
      //   const res = state.commonWgts.bodyTemplate
      //   return res
      // },
      pageConfig: (state) => {
        return state.pageConfig
      },
      backgroundColor: (state) => {
        return state.pageConfig.backgroundColor
      }
    })
  },
  mounted() {
    // analytics.pageReady({
    //   page: {
    //     pageName: "Home",
    //     pageType: "home",
    //     breadcrumb: "Home"
    //   }
    // });
    // this.$api.theme.getTemplateContent({
    //   company_id: 1
    // })
    const { code, state, redi_url } = this.$route.query
    const APP_ID = window.localStorage.getItem('APP_ID')
    const SECRET = window.localStorage.getItem('LOGIN_WECHAT_SECRET')

    if (hasValue(code) && hasValue(state) && hasValue(APP_ID) && hasValue(SECRET)) {
      useWechatLogin({
        appid: APP_ID,
        secret: SECRET,
        state: state,
        code: code
      }).then(({ token }) => {
        const info = token.split('.')[1]
        const res = atob(info)
        //const rUrl = redi_url ? decodeURIComponent(redi_url) : ''
        if (res) {
          const { openid, unionid, user_id } = JSON.parse(res)
          if (user_id && user_id > 0) {
            S.setAuthToken(token)
            this.$router.push('/')
          } else {
            this.$router.push(`/auth/bindwechat?open_id=${openid}&unionid=${unionid}`)
          }
        }
      })
    }
    
    const query = this.$route.query;
    if (query) {
      this.alipayCallBack(query);
    }
  },
  methods: {
    handleRecommendClick(recommend) {
      this.recommend = recommend
    },
    handleCallback(params) {
      if (params) {
        let keywords = params.data.keyword
        this.$router.push(`/items?keywords=${keywords}`)
      }
    },
    alipayCallBack(data){
      if (data.out_trade_no != window.localStorage.getItem('payInfo')) {
        aliPayResult(data).then(res => {
          window.localStorage.setItem("payInfo", data.out_trade_no)
        })
      }
    }
  }
}
</script>
