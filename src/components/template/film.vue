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
  <div class="component-wrap" :class="{'component-padded' : dataForm.base.padded}">
    <div class="current-active"></div>
    <div v-if="dataForm.base.title" class="component-header">
      <div class="component-title">
        <h3>
          {{dataForm.base.title}}
          <span class="subtitle">{{dataForm.base.subtitle}}</span>
        </h3>
      </div>
    </div>
    <div v-if="dataForm.data[0]">
      <video width="100%" controls="controls" :src="dataForm.data[0].media_id"></video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped lang="scss">
.component-padded {
  padding: 10px 0;
}
.component-wrap {
  .subtitle {
    padding-left: 5px;
    font-size: 12px;
    color: #999;
  }
  .component-header {
    padding: 0 10px 10px 10px;
  }
}
</style>
