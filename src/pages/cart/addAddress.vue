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
.page-address {
  .address-body {
    padding: $edge-size $edge-margin;
  }
  .btn-container {
    padding: $edge-size $edge-margin;
  }
}
</style>

<template>
  <div class="page-address page-body">
    <div class="address-body">
      <van-picker :columns="columns" @change="onChange" />
    </div>
    <div class="btn-container">
      <SpButton type="primary" long size="large">{{ $t('cart.addAddress.163303-0') }}</SpButton>
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'header'
  data() {
    return {
      list: [],
      columns: [this.$t('cart.addAddress.163303-1'), this.$t('cart.addAddress.163303-2'), this.$t('cart.addAddress.163303-3'), this.$t('cart.addAddress.163303-4'), this.$t('cart.addAddress.163303-5')]
    }
  },
  created() {
    this.addressList()
  },
  methods: {
    async addressList() {
      const { list } = await this.$api.member.addressList()
      this.list = list
    },
    onChange(picker, value, index) {
      console.log(this.$t('cart.addAddress.163303-6', [value,index]))
    }
  }
}
</script>
