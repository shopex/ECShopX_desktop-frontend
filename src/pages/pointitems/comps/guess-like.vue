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
 * @Date: 2021-02-24 17:24:20
 * @LastEditTime: 2021-02-24 17:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/pages/pointitems/comps/guess_like.vue
-->
<style lang="scss" src="./guess-like.scss"></style>
<template>
  <div class="goods-details clearfix">
    <!-- <Recommend /> -->

    <div class="goods-details__main test">
      <div class="tab-wrap">
        <div class="tab-list clearfix">
          <div
            class="tab-item"
            :class="{ active: index == curTabIdx }"
            v-for="(tab, index) in tabList"
            :key="index"
          >
            {{ tab }}
          </div>
        </div>
      </div>

      <div class="goods-intro" v-if="curTabIdx == 0">
        <GoodsLike :list="guessLikeList" />
      </div>
    </div>
  </div>
</template>

<script>
import GoodsLike from './goods_like'
export default {
  props: ['guessLikeList'],
  data() {
    return {
      tabList: [this.$t('comps.guess-like.884315-0')],
      curTabIdx: 0
    }
  },
  components: {
    GoodsLike
  }
}
</script>
