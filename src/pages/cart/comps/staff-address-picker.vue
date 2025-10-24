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
  <div class="staff-address-picker address-picker">
    <div
      :class="['address-item', { 'is-active': item.addr_id === value }]"
      v-for="item in list"
      :key="item.addr_id"
      @click="handleSelectItem(item)"
    >
      <label>
        <input name="staff-address" type="radio" v-model="item.addr_id === value" />
        {{ item.name }} {{ item.area }} {{ item.addr }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffAddressPicker',

  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: String
  },

  methods: {
    handleSelectItem(item) {
      const { addr_id } = item

      this.$emit('change', item)
      this.$emit('input', addr_id)
    }
  }
}
</script>
