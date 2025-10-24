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
.cashier-wxqrpay {
  &__title {
    font-size: 28px;
    text-align: center;
    padding: 50px 0 30px;
  }
  &__warp {
    margin: 0 auto;
  }
  &__wxbarcode {
    position: relative;
    width: 742px;
    height: 406px;
    background: url('~assets/imgs/window-wx.jpg') no-repeat center;
    background-size: cover;
    text-align: center;
    margin: 0 auto;
    img {
      position: absolute;
      width: 180px;
      left: 90px;
      top: 125px;
    }
  }
}
</style>

<template>
  <div class="cashier-wxqrpay">
    <div class="cashier-wxqrpay__title">{{ $t('comps.wxqrpay.841346-0') }}</div>
    <div class="cashier-wxqrpay__warp">
      <div class="cashier-wxqrpay__wxbarcode">
        <img :src="qrcode_url" alt width="630" />
      </div>
    </div>
  </div>
</template>

<script>
import { log } from '@/utils'
export default {
  props: {
    tids: String,
    payment_id: String,
    pay_app_id: String,
    platform: String
  },
  created() {
    this.pay()
    this.timer = setInterval(() => {
      this.tradePaymentFinish()
    }, 3000)
  },
  data() {
    return {
      qrcode_url: ''
    }
  },
  methods: {
    async pay() {
      const { tids, payment_id, pay_app_id, platform } = this
      let params = {
        payment_id,
        pay_app_id,
        platform,
        tids
      }
      const { list } = await this.$api.trade.paymentdo(params)
      log.debug('[cashier]', `wxqrpay respond: ${list.mweb_url}`)
      this.qrcode_url = list.qrcode_url
    },
    async tradePaymentFinish() {
      const { payment_id, pay_app_id } = this.$route.query
      log.debug(`payment_id: ${payment_id}`)
      if (payment_id) {
        const { rs } = await this.$api.trade.tradePaymentFinish(payment_id)
        if (rs.status === 'succ') {
          /*  */
          clearInterval(this.timer)
          this.$router.push(
            '/finish/success?payment_id=' + payment_id + '&pay_app_id=' + pay_app_id
          )
        }
      }
    }
  }
}
</script>
