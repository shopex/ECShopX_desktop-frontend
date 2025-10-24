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
// import { WidgetsEdit } from "@/mixins";
import { mapState } from 'vuex'

// import IndexMore from "../widgets/src/more/index.vue";
// import Banner from "../widgets/src/main-slide/index.vue";

export default {
  // mixins: [WidgetsEdit],
  async asyncData({ app, query, store }) {
    let { pageid } = query
    let res = []
    let wgts = []
    if (pageid) {
      res = await app.$api.theme.getTemplateContent({
        theme_pc_template_id: pageid
      })
      // const wpage = res.find((item) => item.config.type == 'W0000')
      // if (wpage) {
      //   store.commit('setPageConfig', wpage)
      // }

      res.forEach((item) => {
        const config = JSON.parse(item.config)
        if (config.type != 'W0000') {
          wgts.push(config)
        } else {
          store.commit('setPageConfig', config)
        }
      })
    }
    return {
      wgts
    }
  },
  data() {
    return {
      recList: [],
      bannerParams: {},
      basefile: 'newwapmall/index.html'
    }
  },
  components: {
    // IndexMore,
    // Banner
  },
  created() {},
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
    console.log(this.wgts, 'pageid')
  },
  methods: {
    handleRecommendClick(recommend) {
      this.recommend = recommend
    },
    handleCallback(params) {
      if (params) {
        this.$router.push(`/items?keyword=${params}`)
      }
    }
  }
}
</script>
