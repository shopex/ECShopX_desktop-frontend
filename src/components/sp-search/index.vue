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

<style lang="scss" src="./index.scss"></style>

<template>
  <div :class="classes" :style="inputStyle">
    <div class="search-wrap">
      <input
        type="text"
        ref="input"
        :placeholder="placeholder || $t('sp-search.index.457496-0')"
        v-model="searchValue"
        @input="handleChangeSearch"
        @focus="handleOnFocus"
        @blur="handleOnBlur"
        @keyup.enter="onSearch"
        autocomplete="off"
      />
      <div class="icon" @click="onSearch" :style="{ height: height + 'px' }">
        <!-- <slot name="icon"><i class="mb-iconfont mb-iconfont-search"></i></slot> -->
        
        搜索
      </div>
    </div>
    <div class="hot-keyword">
      <span>热门搜索：</span> 
      <NuxtLink to="/items" v-for="(item, index) in hotKeyword" :key="index">
        {{item}}
        <span v-if="index < (hotKeyword.length-1)"> |</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { oneOf } from "@/utils";
const prefixCls = "sp-search";
export default {
  name: "SpSearch",
  props: {
    value: String,
    type: {
      validator(value) {
        return oneOf(value, [
          "default",
          "primary",
          "dashed",
          "text",
          "info",
          "success",
          "warning",
          "error"
        ]);
      },
      default: "default"
    },
    width: {
      type: Number,
      default: 240
    },
    height: {
      type: Number,
      default: 36
    },
    placeholder: {
      type: String,
      default: ""
    },
    isFocus: {
      type: Boolean
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, `${prefixCls}__${this.type}`];
    },
    inputStyle() {
      return {
        // width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  data() {
    return {
      searchValue: this.value,
      hotKeyword: ['短袖', '童装', '手机', 'ONex', '平板电视']
    };
  },
  watch: {
    searchValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.searchValue = val;
    },
    isFocus(val) {
      if (val) {
        this.$refs["input"].focus();
      }
    }
  },
  methods: {
    handleChangeSearch() {
      this.$emit("input", this.searchValue);
      this.$emit("change", this.searchValue);
    },
    onSearch() {
      this.$emit("search", this.searchValue);
    },
    handleOnFocus() {
      this.$emit("focus", this.searchValue);
    },
    handleOnBlur() {
      this.$emit("blur", this.searchValue);
    }
  }
};
</script>
