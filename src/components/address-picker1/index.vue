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

<style lang="scss" scoped src="./index.scss"></style>

<template>
<div class="sp-address-picker">
  <div
    :class="['address-item', { 'is-active': item.addr_id === value }]"
    v-for="item in list"
    :key="item.addr_id"
    @click="curAddress = item"
  >
    <label><input name="address" type="radio" v-model="item.addr_id === value"> {{ item.name }} {{ item.area }} {{ item.addr }}</label>
  </div>
  <div class="address-picker__btns">
    <SpButton type="primary" @click="setValue()">{{ $t('address-picker1.index.033322-0') }}</SpButton>
  </div>
</div>
</template>

<script>
function resolveCurAddr (list, id) {
  return list.find(t => t.addr_id === id)
}

export default {
  name: 'SpAddressPicker',

  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: String
  },

  data () {
    const curAddress = resolveCurAddr(this.list, this.value)

    return {
      curAddress
    }
  },

  watch: {
    value (val) {
      const curAddress = resolveCurAddr(this.list, val)
      this.curAddress = curAddress
    }
  },

  methods: {
    setValue (val) {
      const { addr_id } = this.curAddress
      this.$emit('change', this.curAddress, addr_id)
      this.$emit('input', addr_id)
    }
  }
}
</script>
