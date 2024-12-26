<template>
  <div class="receive-wrap">
    <h4>付款信息</h4>
    <div>
      付款方式：{{ name }}
      <span class="view-certificate" v-if="receiveData.offline_pay_check_status == 1" @click="handleViewCertificate">查看付款凭证</span>
    </div>
    <div>付款时间：{{ receiveData.payDate }}</div>
    <!-- <div>收货地址:{{receiveData.receiver_state}} {{receiveData.receiver_city}} {{receiveData.receiver_district}} {{receiveData.receiver_address}}</div> -->
    <!-- <p class="bd-border"></p>
    <h4>物流信息</h4>
    <p>物流：{{receiveData.delivery_corp_name}}</p>
    <p>运单号：{{receiveData.delivery_code}}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    receiveData: {
      type: Object,
      default: () => {
        pay_type: 'wxpay'
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    name() {
      let typeText = {
        point: '积分支付',
        wxpaypc: '微信支付',
        alipay: '支付宝支付',
        offline_pay: this.receiveData.offline_pay_name
      }
      return (this.receiveData.pay_type && typeText[this.receiveData.pay_type]) || '微信支付'
    }
  },
  methods:{
    handleViewCertificate(){
      this.$emit('viewCertificate')
    }
  }
}
</script>

<style lang="scss" scoped>
.receive-wrap {
  padding: 0 10px 0 20px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  div {
    padding-bottom: 10px;
  }
  .bd-border {
    margin: 20px 0;
    border-bottom: 1px solid $color-border-gray-light;
  }
  .view-certificate{
    margin-left: 8px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
