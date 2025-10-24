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
.page-trade-status {
  padding: 20px;
  margin-bottom: 0;
  .trade-status {
    &__title {
      font-size: 22px;
      border-bottom: 1px solid #adadad;
      line-height: 54px;
      margin: 0 0 18px;
    }
    &__content {
      color: #212322;
      font-size: 16px;
      p {
        margin: 0 0 18px;
      }
    }
    &__info {
      font-size: $font-size;
      margin: 0 0 18px;
    }
    &__actions {
      .sp-btn {
        width: 120px;
        margin-right: 15px;
      }
    }
  }
}
</style>

<template>
  <div class="page-trade-status page-body">
    <div class="container">
      <div class="trade-status__title">{{ $t('finish.success.925932-0') }}</div>
      <div class="trade-status__content">
        <p>{{ $t('finish.success.925932-1') }}</p>
        <p v-if="tradeInfo" class="trade-status__info">{{ $t('finish.success.925932-2') }}{{ tradeInfo.tid }}</p>
      </div>
      <div class="trade-status__actions">
        <SpButton type="primary" @click="handleNavigate('/member/trade')">{{ $t('finish.success.925932-3') }}</SpButton>
        <SpButton type="primary" @click="handleNavigate('/')">{{ $t('finish.success.925932-4') }}</SpButton>
      </div>
    </div>
  </div>
</template>

<script>
import Recommend from './../items/comps/recommend'
import S from '@/spx'
import { analytics } from '@/plugins/analytics'

export default {
  components: { Recommend },
  mounted() {
    this.fetch()
  },
  data() {
    return {
      tradeInfo: null
    }
  },
  methods: {
    handleNavigate(to) {
      this.$router.push(to)
    },
    async fetch() {
      const { payment_id, pay_app_id } = this.$route.query
      const res = await this.$api.trade.tradeList({
        payment_id
      })
      this.tradeInfo = res[0]
    },
    handleChangeSearch(val) {
      console.log(val)
    }
  }
}
</script>
