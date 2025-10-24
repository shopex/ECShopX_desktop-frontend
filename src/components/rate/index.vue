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
  <div>
    <template v-for="i in max">
      <i class="ec-icon" :class="i <= value ? 'ec-icon-favorfill' : 'ec-icon-favor'" :style="selectStyle(i)" @click="handelClick(i)"></i>
    </template>
    <span v-if="showText"> {{text[value]}}</span>
  </div>
</template>

<script>
export default {
  name: 'SpRate',
  props: {
    max: {
      type: Number,
      default: 5,
    },
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#E43838',
    },
    text: {
      type: Array,
      default: ()=>['0','1','2','3','4','5'],
    },
    showText:{
        type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      key: 1,
    }
  },
  computed: {},
  methods: {
    selectStyle(i) {
      if (i <= this.value) {
        return `color:${this.color}`
      }
      return ''
    },
    handelClick(i) {
      this.$emit('input', i)
    },
  },
}
</script>

<style lang="scss" scoped>
.ec-icon {
  color: #aaa;
  cursor: pointer;
  margin: 5px;
}
</style>