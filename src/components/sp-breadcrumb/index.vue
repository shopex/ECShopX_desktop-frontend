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
.bread-crumb {
  font-size: 14px;
  padding:  20px 0;
  &__name {
    span {
      color: #999;
    }
    // &:last-child {
    //   a {
    //     color: #999;
    //   }
    // }
  }
  .ec-icon-right {
    position: relative;
    top: 1px;
    margin: 0 5px;
  }
  @include respond(sm) {
    span {
      display: inline-block;
      // font-size: 18px;
      // font-weight: bold;
    }
    margin: $edge-margin 0;
    padding: 0 $edge-size;
  }
}
</style>

<template>
  <div class="bread-crumb"> 
    <!-- <nuxt-link to="/">首页</nuxt-link> -->
    <span v-for="(item, index) in value" :key="index" class="bread-crumb__name">
      <nuxt-link :to="item.url" v-if="item.url">{{item.name}}</nuxt-link>
      <span v-else>{{item}}</span><i class="ec-icon ec-icon-right" v-if="index < value.length - 1"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SpBreadCrumb',
  props: {
    value: Array
  }
  // created () {
  //   const { catname } = this.$route.query
  //   debugger
  //   // let cats = catname.split(',')
  //   // this.catsArray = cats
  // }
}
</script>
