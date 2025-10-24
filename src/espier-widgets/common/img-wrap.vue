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
.img-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #d3d3d3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    font-size: 22px;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
<template>
  <div class="img-wrap" :style="{ width: `${width}px`, height: `${height}px` }">
    <img v-if="src" :src="src" :style="{ borderRadius: `${borderRadius}px` }" />
    <span v-else>{{ `${width}px * ${height}px` }}</span>
  </div>
</template>

<script>
export default {
  name: 'ImgWrap',
  props: {
    src: String,
    width: Number,
    height: Number,
    borderRadius: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
