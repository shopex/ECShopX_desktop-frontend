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
.page-fail {
  text-align: center;
  margin-bottom: 0;
  &__container {
    margin: 130px auto 150px;
    text-align: center;
    display: inline-block;
    .text-underline {
      color: #cb0025;
      /* text-decoration: underline; */
      border-bottom: 2px solid #cb0025;
      padding-bottom: 2px;
      padding-left: 8px;
    }
  }
  &__img {
    display: inline-block;
    margin-right: 10px;
  }
  &__content {
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    top: -12px;
  }
  @include respond(sm) {
    &__container {
      padding: 0 $edge-size;
      width: 100%;
    }
    &__img {
      width: 36px;
    }
    &__content {
      font-size: 18px;
    }
  }
}
</style>

<template>
  <div class="page-fail page-body container">
    <div class="page-fail__container clearfix">
      <img class="page-fail__img" src="~/assets/imgs/fail.png" alt />
      <div class="page-fail__content">
        <span>{{ $t('finish.fail.429253-0') }}</span>
        <a class="text-underline" @click="goPay">{{ $t('finish.fail.429253-1') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      payment_id: '',
      paytype: null
    }
  },
  created() {
    const { payment_id, pay_app_id } = this.$route.query
    this.payment_id = payment_id
    this.paytype = pay_app_id
  },
  methods: {
    goPay() {
      this.$router.push(`/cashier?${qs.stringify(this.$route.query)}`)
    }
  }
}
</script>
