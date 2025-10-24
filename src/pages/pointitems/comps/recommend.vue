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
    float: left;
    width: 210px;
    background: #fff;
    border: 1px solid $color-border-gray-light;
    padding: 0 15px;
    .recommend-header {
      height: 44px;
      line-height: 44px;
      text-align: left;
      font-size: 16px;
      &__more {
        float: right;
        cursor: pointer;
      }
    }
    .recommend-list {
      margin-top: 8px;
      .recommend-item {
        cursor: pointer;
        margin-bottom: 20px;
        &__img {
          width: 110px;
          height: 110px;
          display: inline-block;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 5px;
          img {
            width: 100%;
          }
        }
        &__title {
          margin: 5px 0;
          text-align: left;
          @include multi-ellipsis(1);
        }
      }
    }
    .no-store {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 50px;
      line-height: 48px;
      font-size: 16px;
      text-align: center;
    }
  }
</style>

<template>
  <div class="sp-recommend">
    <div v-if="recommendList.length > 0">
      <div class="recommend-header clearfix">
        <span class="recommend-header__title">{{ $t('comps.recommend.360779-0') }}</span>
        <!-- <span class="recommend-header__more">查看全部</span> -->
      </div>
      <div class="recommend-list">
        <div class="recommend-item" v-for="(item, index) in recommendList" :key="index" @>
          <div class="recommend-item__img" @click="clickeTo(item)">
            <img :src="item.pics[0]" v-if="item.pics && item.pics.length>0" />
          </div>
          <div class="recommend-item__title">{{item.item_name}}</div>
          <SpPrice :value="item.price" unit='cent'></SpPrice>
        </div>
      </div>
    </div>
    <div class="no-store" v-else>{{ $t('comps.recommend.360779-1') }}</div>
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
      recommendList: []
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    async getRecommend () {
      let params = {
        page: 1,
        pageSize: 5
      }
      // TODO:暂时为当季主推  接口完成之后改为 相似单品
      // let { list } = await this.$api.item.recommend(params)
      // this.recommendList = list
    },
    clickeTo(item){
      this.$router.push(`/items/${item.itemId}`)
    }
  }
}
</script>
