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
  <div class="items-sort" v-on-clickaway="handleClose">
    <div class="items-sort__value" @click="handleClickLabel"><i class="aicon aicon-jiantou"></i>{{sort_label}}</div>
    <ul class="items-sort__radio" v-if="showOptions">
      <li v-for="(item,index) in data" :key="index" @click="handleChangeSort(item)">
        <span v-if="!index">
          <i class="aicon aicon-jiantou"></i>{{item.label}}
        </span>
        <span v-else>
          {{item.label}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  props: {
    data: Array,
    value: String
  },
  mixins: [clickaway],
  data () {
    return {
      showOptions: false
    }
  },
  computed: {
    sort_label: function () {
      let label = ''
      const sort = this.value
      const sorts = this.data || []
      sorts.forEach(t => {
        if (t.value === sort) {
          label = t.label
        }
      })
      return label
    }
  },
  methods: {
    handleChangeSort (item) {
      this.showOptions = false
      this.$emit('change', item.value)
    },
    handleClose () {
      this.showOptions = false
    },
    handleClickLabel () {
      this.showOptions = !this.showOptions
    }
  }
}
</script>

    <style lang="scss" scoped>
.items-sort{
  position: relative;
  .aicon-jiantou {
    margin-right: 10px;
  }
  &__value{
    text-align: right;
    cursor: pointer;
  }
  &__radio{
    position: absolute;
    top: -21px;
    width: 130px;
    padding: 20px 20px 20px 0;
    background: #fff;
    border: 1px solid $color-primary-text;
    z-index: 1000;
    li{
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
