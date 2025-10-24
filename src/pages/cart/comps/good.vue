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
    <SpImg class="spimg" :src="pic(item)" no-size @click="handelClick(item.item_id)" />
    <div class="text">
      <span @click="handelClick(item.item_id)">{{ item.item_name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {},
  methods: {
    pic(item) {
      return (item.pics.length != 0 && item.pics[0]) || ''
    },
    handelClick(id) {
      this.$router.push(`/items/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  .spimg {
    width: 150px;
    height: 150px;
    cursor: pointer;
  }
  .text {
    // width: 200px;
    text-align: left;
    height: 33px;
    margin-top: 10px;
    span {
      display: block;
      font-size: 12px;
      cursor: pointer;
      width: 163px;
      height: 33px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
