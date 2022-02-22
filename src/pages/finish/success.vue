<style lang="scss">
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
      <div class="trade-status__title">支付成功</div>
      <div class="trade-status__content">
        <p>谢谢您的惠顾。</p>
        <p v-if="tradeInfo" class="trade-status__info">订单号：{{ tradeInfo.tid }}</p>
      </div>
      <div class="trade-status__actions">
        <SpButton type="primary" @click="handleNavigate('/member/trade')">查看订单</SpButton>
        <SpButton type="primary" @click="handleNavigate('/')">返回主页</SpButton>
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
