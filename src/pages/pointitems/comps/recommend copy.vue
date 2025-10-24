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
.sp-recommend {
  padding: 70px 0 100px 0;
  .title {
    font-size: 22px;
    letter-spacing: 2px;
    color: #020304;
    margin-bottom: 20px;
  }
  &__warp {
    width: 1190px;
    margin: 0 auto;
    // overflow: hidden;
  }

  @include respond(sm) {
    &__warp {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="sp-recommend">
    <div class="sp-recommend__warp">
      <div class="title">{{ $t('comps.recommend copy.192989-0') }}</div>
      <GoodsRecommend :data="recList" :slidesPerView="5" :spaceBetween="22"></GoodsRecommend>
    </div>
  </div>
</template>

<script>
import GoodsRecommend from './goods-recommend'
export default {
  name: 'SpRecommend',
  props: {},
  components: { GoodsRecommend },
  data () {
    return {
      recList: []
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    async getRecommend () {
      // TODO:暂时为当季主推  接口完成之后改为 相似单品
      const { list } = await this.$api.item.recommend()
      this.recList = list
    }
  }
}
</script>
