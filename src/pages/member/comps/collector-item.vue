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
$img-ratio:0.723;
.collector-item {
  position: relative;
  float: left;
  width: 22.8%;
  margin: 10px 10px 35px;
  text-align: center;
  border: 1px solid #ddd;
  // padding: 0 10px 10px;
  cursor: pointer;
  .img-wrap {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto;
    border: 0;
    background: #efefef;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    color: #666;
    @include multi-ellipsis(1);
    margin: 5px 0 0 0;
  }
  .sp-price {
    span {
      color: $color-brand-primary;
    }
  }
  @include respond(lg) {
    width: 240px;
  }
  .ctrl{
    position: relative;
    bottom: -35px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
<template>
  <div class="collector-item" >
    <div class="img-wrap" @click="$router.push({path:`/items/${info.item_id}`})">
      <img :src="info.item_image" />
    </div>
    <div class="name" @click="$router.push({path:`/items/${info.item_id}`})">{{info.item_name}}</div>
    <SpPrice unit="cent" :value="info.item_price"></SpPrice>
    <div class="ctrl" @click="remove(info.item_id)">
      {{ $t('comps.collector-item.851336-0') }}
    </div>
  </div>
</template>

<script>



import { pickBy } from '@/utils'

export default {
  

  props: {
    info: Object,
  },

  data () {
    return {
      
    }
  },

  methods: {
   remove(id){
    this.$emit('remove',id) 
   }


    

  }
}
</script>
