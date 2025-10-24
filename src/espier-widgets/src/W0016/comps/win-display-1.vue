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
.win-dispaly-1 {
  // width: 350px;
  .ad-img {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
}
</style>
<template>
  <div class="win-dispaly-1">
    <div class="ad-img">
      <linkPage :mode="mode" :to="`${handleLinkPage(value[0].pathData)}`">
        <ImgWrap :src="value[0].imgUrl" :width="342" :height="160" />
      </linkPage>
    </div>
    <div class="ad-img">
      <linkPage :mode="mode" :to="`${handleLinkPage(value[1].pathData)}`">
        <ImgWrap :src="value[1].imgUrl" :width="342" :height="160" />
      </linkPage>
    </div>
  </div>
</template>

<script>
import ImgWrap from '../../../common/img-wrap'
import linkPage from '../../../common/linkpage'
export default {
  name: 'WinDisplay1',
  inject: ['mode', 'handleLinkPage'],
  props: {
    value: Array
  },
  data() {
    return {
      list: this.value
    }
  },
  components: {
    ImgWrap,
    linkPage
  },
  created() {},
  methods: {}
}
</script>
