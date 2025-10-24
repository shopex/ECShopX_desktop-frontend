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
.page-story {
  // padding-bottom: 100px;
  &__nav {
    text-align: left;
    margin: 48px 0 38px;
    .title {
      max-width: 1150px;
      margin: 0 auto;
      font-size: 22px;
      color: #212322;
      letter-spacing: 1px;
      border-bottom: 1px solid #adadad;
      padding-bottom: 10px;
    }
  }
  .story-wall {
    max-width: 1150px;
    font-size: 0;
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="page-story page-body">
    <div class="page-story__nav article-title">
      <div class="title">{{ $t('pages.story.441931-0') }}</div>
    </div>
    <div class="story-wall pc">
      <img src="~/assets/imgs/resource/20190712/pc/story_01.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_02.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_03.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_04.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_05.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_06.jpg" alt />
    </div>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {}
  },
  components: {},
  mounted() {
    analytics.pageReady({
      page: {
        pageName: this.$t('pages.story.441931-0'),
        pageType: 'content',
        breadcrumb: this.$t('pages.story.441931-0')
      }
    })
  },
  methods: {}
}
</script>
