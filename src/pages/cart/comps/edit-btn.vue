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
.edit-btn {
  display: inline;
  &__icon {
    float: left;
    position: relative;
    top: 4px;
    margin-right: 2px;
  }
  &__warp {
    // width: 100px;
    position: relative;
  }
  &__text {
    color: #cb0025;
    position: relative;
  }
}
</style>

<template>
  <div class="edit-btn" @click.stop="handleClick">
    <SpButton type="text">
      <div class="edit-btn__warp">
        <!-- <i class="mb-iconfont mb-iconfont-dropdown up"></i>
          <i class="mb-iconfont mb-iconfont-dropdown down"></i> -->
        <img class="edit-btn__icon" src="~/assets/imgs/rectangle.png" alt="" width="8" />
        <span class="edit-btn__text">{{ text }}</span>
      </div>
    </SpButton>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: this.$t('comps.edit-btn.393972-0')
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
