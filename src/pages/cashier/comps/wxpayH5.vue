<style lang="scss">
.cashier-wxpayh5 {
  &__title {
    font-size: 28px;
    text-align: center;
    padding: 50px 0 30px;
  }
  &__warp {
    width: 600px;
    margin: 0 auto;
  }
}
</style>

<template>
  <div class="cashier-wxpayh5">
    <div class="cashier-wxpayh5__title">正在支付...</div>
    <div class="cashier-wxpayh5__warp">
      <div>支付单号: {{ payment_id }}</div>
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
      log.debug('[cashier]', `wxpayH5 respond: ${list.mweb_url}`)
      window.location.href = list.mweb_url
    }
  }
}
</script>
