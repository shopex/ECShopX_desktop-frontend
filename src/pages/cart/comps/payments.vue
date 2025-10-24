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
  <div class="payments-list">
    <label class="payment-item" v-for="item in list" :key="item.app_id">
      <input
        type="radio"
        class="payment-item__radio"
        name="payment_item"
        :value="item.app_id"
        v-model="localVal"
      />
      <span>
        <div class="payment-item__img-wraper">
          <img class="payment-item__img" :src="item.img" :alt="item.app_name" />
        </div>
        <p class="payment-item__display-name">{{ item.app_display_name }}</p>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    value: String
  },

  computed: {
    localVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
}
</script>

    <style lang="scss" scoped>
.payments-list {
  .payment-item {
    &__radio {
      display: inline-block;
      margin-right: 20px;
      vertical-align: middle;
    }
    [type='radio']:checked + span:before,
    [type='radio']:not(:checked) + span:before {
      top: 50%;
      margin-top: -8px;
    }
    [type='radio']:checked + span:after,
    [type='radio']:not(:checked) + span:after {
      top: 50%;
      margin-top: -4px;
      margin-left: 0;
    }
    &__img-wraper {
      min-height: 50px;
      display: flex;
      align-items: center;
    }
    &__img {
      display: inline-block;
      visibility: middle;
    }
    &__display-name {
      text-align: center;
    }
  }
}
</style>
