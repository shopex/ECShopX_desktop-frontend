<template>
  <div class="receive-wrap">
    <h4>发票信息</h4>
    <div class="invoice">
        <div class="invoice-item">类型：{{ invoiceInfo.title=='individual'?'个人': invoiceInfo.title=='unit'?'企业':'' }}</div>
        <div class="invoice-item">开票状态：{{ receiveData.is_invoiced==true?'已开票':receiveData.is_invoiced==false?'未开票':'' }}</div>
        <!-- 个人 -->
        <div class="invoice-item"  v-if="invoiceInfo.title=='individual'">发票抬头：{{ invoiceInfo.content }}</div>
        <!-- 企业 -->
        <div v-else-if="invoiceInfo.title=='unit'" class="invoice-list">
            <div>公司名称：{{ invoiceInfo.content }}</div>
            <div>税号：{{ invoiceInfo.registration_number }}</div>
            <div>公司地址：{{ invoiceInfo.company_address }}</div>
            <div>电话号码：{{ invoiceInfo.company_phone }}</div>
            <div>开户银行：{{ invoiceInfo.bankname }}</div>
            <div>银行账号：{{ invoiceInfo.bankaccount }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    receiveData: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      invoiceInfo:this.receiveData.invoice||[]
    }
  },
  computed: {
    // name() {
    //   let typeText= {
    //     point:'积分支付',
    //     wxpaypc:'微信支付',
    //     alipay:'支付宝支付'
    //   }
    //   return this.receiveData.pay_type&&typeText[this.receiveData.pay_type]||'微信支付'
    // }
  },
}
</script>

<style lang="scss" scoped>
.receive-wrap {
  
//   padding: 0 10px 0 20px;
  padding: 10px 10px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  div {
    padding-bottom: 10px;
  }
  .invoice{
    // display: flex;
    width: 100%;
    .invoice-item{
        width: 50%;
        float: left;
    }
    .invoice-list{
        width: 100%;
        &>div{
            width: 50%;
            float: left;
        }
    }
  }
}
</style>