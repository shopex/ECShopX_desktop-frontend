<style lang="scss" scoped>
.page-cashier {
  margin: 30px 0 50px;
  .payment-info {
    border-bottom: 1px solid #efefef;
    .success-info {
      margin-top: 30px;
      padding-bottom: 30px;
      text-align: center;
      .success-info-tl {
        height: 46px;
        line-height: 32px;
        font-size: 24px;
        color: $color-success-text;
      }
    }
  }
  .payment-block {
    margin-top: 20px;
    .b-item {
      margin-bottom: 10px;
      @include clearfix();
      .label {
        width: 100px;
        float: left;
        text-align: right;
        color: #888;
      }
      .value {
        float: left;
      }
    }
    .sp-btn-picker {
      width: 164px;
      height: 53px;
    }
  }

  .btn-pay {
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-top: 30px;
    margin-left: 100px;
    cursor: default;
  }

  .wxpay-bg {
    width: 742px;
    height: 406px;
    background: url('~assets/imgs/window-wx.jpg');
    margin: 0 auto;
    position: relative;
    #qr {
      position: absolute;
      width: 200px !important;
      height: 200px !important;
      left: 81px;
      top: 114px;
      z-index: 10;
    }
  }
}
</style>
<template>
  <div class="page-cashier">
    <div class="container">
      <div class="payment-info">
        <div class="success-info">
          <div class="success-info-tl">订单提交成功，请您尽快付款！</div>
          <div class="success-info-tl-text">请您在提交订单后尽快完成支付，否则订单将被取消。</div>
        </div>
      </div>

      <div class='payment-block' v-show="isPayment">
        <div class="b-item">
          <div class="label">订单号：</div>
          <div class="field">{{tradeId}}</div>
        </div>
        <div class="b-item">
          <div class="label">应付金额：</div>
          <div class="field">
            <SpPrice :value="total_fee / 100" />
          </div>
        </div>
        <div class="b-item">
          <div class="label">支付方式：</div>
          <div class="field">
            <SpBtnPickerGroup v-model="paymentType">
              <SpBtnPicker
                v-for="(item, index) in paymentList"
                :value="item.type"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                >
                <img :src="item.img" alt="" width="100%"/>
              </SpBtnPicker>
              <!-- <SpBtnPicker
                v-for="(item, index) in paymentList"
                :value="item.pay_type_code"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                >
                <img :src="item.img" alt="" width="100%"/>
              </SpBtnPicker> -->
            </SpBtnPickerGroup>
          </div>
        </div>
        <div class="btn-pay" @click="clickPayment" :style="{
          backgroundColor: themeColor
        }">去支付</div>
      </div>

      <div class="wxpay-bg" v-show="!isPayment">
        <canvas id="qr"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import { mixin } from '@/mixins'
import wxpayImage from '@/assets/imgs/weixinpay.png'
import alipayImage from '@/assets/imgs/alipay.png'
export default {
  mixins: [mixin],
  data() {
    return {
      paymentList: [
        {
          type: 'alipay',
          img: alipayImage,
          title: '支付宝'
        },
        {
          type: 'wxpaypc',
          img: wxpayImage,
          title: '微信'
        }
      ],
      paymentType: 'wxpaypc',
      tradeId: '',
      total_fee: 0,
      orderData: {},
      isPayment: true,
      app_id: null,
      payment_id: null
    }
  },
  created() {
    // this.getPaymentList()
    this.getOrderInfo()
  },
  methods: {
    async getOrderInfo() {
      const { order_id } = this.$route.query
      const { pay_type, tradeId, total_fee } = await this.$api.cart.getOrderDet({ pay_type:this.paymentType }, order_id)
      this.paymentType = pay_type
      this.tradeId = tradeId
      this.total_fee = total_fee
    },
    async getPaymentList() {
      const res = await this.$api.cart.getPaymentList()
      this.paymentList = res
    },
    // 付款按钮
    async clickPayment() {
      const { order_id } = this.$route.query
      const res = await this.$api.cart.payMent({
        order_id,
        pay_type: this.paymentType
      })
      if(this.paymentType == 'alipay') {
        const div = document.createElement('div')
        div.innerHTML = res.payment // 此处form就是后台返回接收到的数据
        document.body.appendChild(div)
        document.forms['alipay_submit'].submit()
        return
      } else if(this.paymentType == 'wxpaypc') {
        const { code_url, trade_info, appId } = res
        this.isPayment = false
        const msg = document.getElementById('qr')
        const val = `${code_url}`
        this.codeImg = QRCode.toCanvas(msg, val, (err) => console.log(err))
        this.payment_id = trade_info.trade_id
        this.app_id = appId
        this.timer = setInterval(() => {
          this.tradePaymentFinish()
        }, 3000)
      }
    },
    async tradePaymentFinish() {
      const { order_id } = this.$route.query
      if (this.payment_id) {
        const {
          orderInfo: { total_fee, order_status, order_class },
          // tradeInfo
        } = await this.$api.member.getOrderInfo({ id: order_id })
        if (order_status === 'PAYED' || order_status === 'CANCEL') {
          //订单完成支付
          clearInterval(this.timer)
          this.$router.push(`/finish/result?order_id=${order_id}&total_fee=${total_fee}&order_class=${order_class}&pay_status=${order_status}`)
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
