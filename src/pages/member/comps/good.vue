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

<template>
  <div class="good">
    <SpImg class="spimg" :src="item.item_image" no-size @click="handelClick(item.item_id)"/>
    <div class="text" v-show="haveName">
      <span @click="handelClick(item.item_id)">{{item.item_name}}</span>
    </div>
    <div class="price">
      ￥{{item.price|formatPriceToHundred}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
    haveName:{
      type: Boolean,
      default: false,
    },
  },
  computed: {
   
	},
	methods:{
	
    handelClick(id){
      this.$router.push(`/items/${id}`)
    }
	}
}
</script>

<style lang="scss" scoped>
.good {
  
  .spimg {
    width: 128px;
		height: 128px;
    // border-radius:5px ;
    cursor: pointer;
  }
  .text {
    // width: 200px;
    cursor: pointer;
    text-align: center;
    span {
      display: inline-block;
      width: 140px;
    }
  }
  .price{
    margin-top:14px;
    font-size: 12px;
    // font-weight: bold;
    // color: $color-brand-primary;
  }
}
</style>