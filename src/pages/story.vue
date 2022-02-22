<style lang="scss">
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
      <div class="title">品牌故事</div>
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
        pageName: '品牌故事',
        pageType: 'content',
        breadcrumb: '品牌故事'
      }
    })
  },
  methods: {}
}
</script>
