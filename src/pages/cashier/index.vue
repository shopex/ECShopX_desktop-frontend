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

  .el-textarea {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        &__content {
          width: 100%;
          border-radius: 4px;
          color: #606266;
          border-color: #dcdfe6;
          padding: 5px 15px;
        }
        &__count {
          color: #909399;
          background: #fff;
          font-size: 12px;
          position: absolute;
          bottom: 8px;
          right: 10px;
          z-index: 10;
        }
      }

  .account-box{
    display: flex;
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
    &-left{
      width: 80px;
      height: 80px;
      margin-right: 12px;
    }
    &-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-item{
        line-height: initial;
        text-align: left;
      }
    }
  }

  .examine{
    &-title{
      font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    &-item{
      margin-bottom: 12px;
    }
  }


  .offline-pay {
    display: flex;
    margin-top: 16px;
    &-left {
      width: 420px;
      margin-right: 32px;
      &-title{
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .account-select {
        display: flex;
        flex-direction: column;
      }
      .sp-btn-picker {
        width: 420px;
        height: auto;
      }
    }
    &-right {
      flex: 1;
      .upload-pic-tips{
        padding: 8px;
        background: #F3F3F5;
        margin-top: 16px;
        color: #999;
      }
      .required::before{
        content: '*';
        position: absolute;
        left: -8px;
        top: -2px;
        color: red;
      }
      .upload {
          // text-align: left;
          .input {
            visibility: hidden;
            height: 19px;
            width: 1px;
          }
          .spimg-item {
            display: inline-block;
            vertical-align: text-top;
            margin-right: 10px;
            position: relative;
            .spimg1 {
              width: 90px;
              height: 90px;
            }
            &-delete{
              position: absolute;
              right: -5px;
              top: -5px;
              width: 16px;
              height: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: #666;
              color: #fff;
              cursor: pointer;

              z-index: 10;
            }
          }
          .input-icon {
            display: inline-block;
            vertical-align: text-top;
            width: 90px;
            height: 90px;
            background-color: #f6f6f6;
            text-align: center;
            cursor: pointer;
            .ec-icon {
              font-size: 32px;
              line-height: 90px;
              color: #ddd;
            }
          }
        }
    }
  }
}
</style>
<template>
  <div class="page-cashier">
    <div class="container">
      <div class="payment-info" v-if="!isView">
        <div class="success-info">
          <div class="success-info-tl">订单提交成功，请您尽快付款！</div>
          <div class="success-info-tl-text">请您在提交订单后尽快完成支付，否则订单将被取消。</div>
        </div>
      </div>

      <div class="payment-block" v-show="isPayment">
        <div class="b-item">
          <div class="label">订单号：</div>
          <div class="field">{{ tradeId }}</div>
        </div>
        <div class="b-item" v-if="!isView">
          <div class="label" >应付金额：</div>
          <div class="field">
            <SpPrice :value="total_fee / 100" />
          </div>
        </div>
        <div class="b-item" v-if="!isView">
          <div class="label">支付方式：</div>
          <div class="field">
            <SpBtnPickerGroup v-model="paymentType">
              <SpBtnPicker
                v-for="(item, index) in paymentList"
                :value="item.type"
                :key="`btn-item__${index}`"
                :theme="themeColor"
              >
                <img v-if="item.img" :src="item.img" alt="" width="100%" />
                <span
                  v-else
                  style="font-size: 14px;display: block;height: 100%;line-height: 53px;"
                  >{{ item.title }}</span
                >
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
        <div class="offline-pay" v-if="paymentType == 'offline_pay'">
          <div class="offline-pay-left">
            <div class="offline-pay-left-title">1：请选择转入银行</div>
            <SpBtnPickerGroup v-model="accountId" class="account-select">
              <SpBtnPicker
                v-for="(item, index) in accountList"
                :value="item.id"
                :key="`btn-item__${index}`"
                :theme="themeColor"
              >
              <div class="account-box">
                <img class="account-box-left" :src="item.pic" alt="" width="100%" />
                <div class="account-box-right">
                  <div class="account-box-right-item">收款人户名:{{ item.bank_account_name }}</div>
                  <div class="account-box-right-item">开户行:{{ item.bank_name }}</div>
                  <div class="account-box-right-item">账户:{{ item.bank_account_no }}</div>
                </div>
              </div>
              </SpBtnPicker>
            </SpBtnPickerGroup>
          </div>
          <div class="offline-pay-right">
            <div class="offline-pay-left-title">2：请填写汇款信息</div>
            <SpForm ref="form" :model="transferInfo" :rules="transferInfoRules">
              <SpFormItem prop="pay_sn">
                <span class="label-text">交易流水号：</span>
                <SpInput class="input-text" v-model="transferInfo.pay_sn" />
              </SpFormItem>
              <SpFormItem prop="total_fee">
                <span class="label-text required">订单金额：</span>
                <SpInput class="input-text" disabled :value="(transferInfo.total_fee/100).toFixed(2)" />
              </SpFormItem>
              <SpFormItem prop="transfer_remark">
                <span class="label-text">转账备注：</span>
                <div class="el-textarea">
                  <textarea
                    class="el-textarea__content"
                    rows="3"
                    v-model="transferInfo.transfer_remark"
                    :maxlength="200"
                    placeholder="请输入回复内容"
                  ></textarea>
                  <span class="el-textarea__count"
                    >{{ transferInfo.transfer_remark.length }}/200</span
                  >
                </div>
              </SpFormItem>
              <SpFormItem prop="postalCode">
                <span class="label-text required">凭证图片：</span>
                <div class="upload">
                    <input type="file" ref="input" class="input" @change="(e)=>changeUpload(e)"></input>
                        <div  v-for="(pic,idx) in transferInfo.voucher_pic" class="spimg-item" :key="idx" >
                            <SpImg class="spimg1" :src="pic" no-size  />
                            <div class="spimg-item-delete" @click="handlePicDelete(idx)">x</div>
                        </div>
                    <div class="input-icon" v-if="this.transferInfo.voucher_pic.length < 6" @click="clickUpLoad()"><i class="ec-icon ec-icon-camera"></i></div>
                </div>
                <div v-if="!transferInfo.voucher_pic.length && rulesShow" class="form-item__error-message">
                  请选择凭证图片
                </div>
                <div class="upload-pic-tips">支持png、jpg、gif、jpeg格式文件</div>
              </SpFormItem>

            </SpForm>

            <div class="examine" v-if="examineInfo.check_status">
              <div class="examine-title examine-item">审核信息</div>
              <div class="examine-item">审核状态：{{ examineInfo.check_status == 2 ? '审核拒绝' : '审核通过' }}</div>
              <div class="examine-item">审核备注：{{ examineInfo.remark }}</div>
              <div class="examine-item">审核时间：{{ examineInfo.update_time }}</div>
            </div>

          </div>
        </div>
        <div
          class="btn-pay"
          @click="clickPayment"
          :style="{
            backgroundColor: themeColor
          }"
          v-if="!isView"
        >
         {{ paymentType == 'offline_pay' ? '提交凭证':'去支付' }}
        </div>
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
import uploadImageFn from '@/utils/upload'
import moment from 'moment'
export default {
  mixins: [mixin],
  data() {
    var voucherPicValidate = (rule, value, callback) => {
      if (value.length == 0) {
        callback('请选择凭证图片')
      }
      callback()
    }
    return {
      paymentList: [
        // {
        //   type: 'alipay',
        //   img: alipayImage,
        //   title: '支付宝'
        // },
        // {
        //   type: 'wxpaypc',
        //   img: wxpayImage,
        //   title: '微信支付'
        // }
      ],
      accountList:[],
      transferInfo: {
        pay_sn:'',
        total_fee:'',
        transfer_remark:'',
        voucher_pic:[]
      },
      transferInfoRules: {
        voucher_pic: [{validate: voucherPicValidate, message: '请选择凭证图片'}],
        total_fee: [{required: true, validate: 'required', message: '请输入订单金额' }],
      },
      rulesShow:false,
      examineInfo:{},
      paymentType: 'wxpaypc',
      tradeId: '',
      total_fee: 0,
      orderData: {},
      isPayment: true,
      app_id: null,
      payment_id: null,
      home_url: '',
      accountId:'',
      isView:false,
    }
  },
  created() {
    this.initFunc()
  },
  methods: {
  async initFunc(){
    this.home_url = window.location.origin
    const { has_check,isView } = this.$route.query
    this.isView = isView
    await this.getPaymentList()
    await this.getOrderInfo()
    await this.getBackaccount()
    if(has_check == 'true'){
      //编辑,数据回显
      this.getVoucher()
    }
    },
    async getVoucher(){
      const { order_id } = this.$route.query
      const accountRes = await this.$api.cart.getVoucher({order_id})
      console.log('accountRes',accountRes);
      const {bank_account_id,id,check_status,remark,update_time,bank_account_no,bank_name,china_ums_no,pay_sn,voucher_pic,transfer_remark} = accountRes;
      this.transferInfo = {
        ...this.transferInfo,
        pay_sn,
        transfer_remark,
        voucher_pic,
        id
      };
      this.examineInfo = {
        check_status,
        remark,
        update_time:moment(update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      this.accountId = bank_account_id

    },
    async getBackaccount(){
      const {list, setting} = await this.$api.cart.getBackaccount()
      console.log('getBackaccount',list, setting)
      this.accountList = list
      this.accountId = list.find(item=>item.is_default == '1')?.id
    },
    async getOrderInfo() {
      const { order_id } = this.$route.query
      const { pay_type, tradeId, total_fee } = await this.$api.cart.getOrderDet(
        { pay_type: this.paymentType },
        order_id
      )
      this.tradeId = tradeId ? tradeId : order_id
      this.total_fee = total_fee
      this.transferInfo.total_fee = total_fee
      if(pay_type == 'offline_pay'){
        this.paymentType = pay_type
      }

    },
    async getPaymentList() {
      let params = { platform: 'pc' }
      const res = await this.$api.cart.getPaymentList(params)
      this.paymentList = res.map((item) => {
        return {
          type: item.pay_type_code,
          img:
            item.pay_type_code === 'wxpaypc'
              ? wxpayImage
              : item.pay_type_code === 'alipay'
              ? alipayImage
              : '',
          title: item.pay_type_name
        }
      })

      this.paymentType = this.paymentList[0].type
    },
    // 付款按钮
    async clickPayment() {
      const { order_id } = this.$route.query
      let params = {
        order_id,
        pay_type: this.paymentType, // 支付宝/微信
        return_url: this.home_url,
      }

      if(this.paymentType == 'offline_pay'){
        params.pay_channel = this.paymentType
      }

      // 找到支付方式的对应支付是否汇付   --如果非汇付，微信或支付宝支付使用pay_type，但有汇付pay_type是汇付字段，pay_channel是微信或支付宝支付
      this.paymentList.map((ele) => {
        if (ele.type == this.paymentType && ele.pay_type) {
          params.pay_type = ele.pay_type // 汇付
          params.pay_channel = this.paymentType // 支付宝/微信
        }
      })

      const res = await this.$api.cart.payMent(params)

      if (this.paymentType == 'alipay' || this.paymentType == 'alipay_qr') {
        const div = document.createElement('div')
        div.innerHTML = res.payment // 此处form就是后台返回接收到的数据
        document.body.appendChild(div)
        document.forms['alipay_submit'].submit()
        return
      } else if (this.paymentType == 'wxpaypc' || this.paymentType == 'wx_qr') {
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
      } else if (this.paymentType == 'deposit') {
        this.timer = setInterval(() => {
          this.tradePaymentFinish()
        }, 2000)
      } else if (this.paymentType == 'point') {
        this.timer = setInterval(() => {
          this.tradePaymentFinish()
        }, 2000)
      }else if(this.paymentType == 'offline_pay'){
        this.$refs['form'].validate((valid, errors) => {
          if (valid) {
            if( !this.transferInfo.voucher_pic.length ){
              this.rulesShow = true
              return
            }
            //调用提交转账接口
            this.handleVoucherFunc()
          }
        })
      }
    },
    async handleVoucherFunc(){
      const { has_check, order_id } = this.$route.query
      console.log(this.transferInfo,this.isPayment,order_id)
      // const {bank_account_name,bank_account_no,bank_name,china_ums_no} = this.accountList.find(item=>item.id ==  this.accountId) ?? {}
      const params = {
        ...this.transferInfo,
        order_id,
        bank_account_id: this.accountId,
        pay_fee: this.transferInfo.total_fee
      }
      console.log('params',params)
      if(has_check == 'true'){
        //更新凭证
        await this.$api.cart.updateVoucher(params)
        this.$Message.success('更新成功')
      }else{
        // 创建凭证
        await this.$api.cart.uploadVoucher(params)
        this.$Message.success('上传成功')
      }

      const {
        orderInfo: { total_fee, order_status, order_class }
        // tradeInfo
      } = await this.$api.member.getOrderInfo({ id: order_id })

      this.$router.push(
        `/finish/result?order_id=${order_id}&total_fee=${total_fee}&order_class=${order_class}&pay_status=${order_status}`
      )

    },
    handlePicDelete(idx){
      this.transferInfo.voucher_pic.splice(idx,1)
    },
    clickUpLoad() {
      this.$refs.input.value = null

      this.$refs.input.click()

    },
    changeUpload(e, index) {
      let files = e.target.files
      if (files.length + this.transferInfo.voucher_pic.length > 6) {
        this.$Message.error('最多上传6张图片')
        return false
      }
      uploadImageFn(e.target.files).then((imgs) => {
        const url = imgs[0]?.url
        if(url){
          this.transferInfo.voucher_pic = this.transferInfo.voucher_pic.concat(imgs[0].url)
          debugger
          this.rulesShow = false
        }
      })
    },
    async tradePaymentFinish() {
      const { order_id } = this.$route.query
      // if (this.payment_id) {
      const {
        orderInfo: { total_fee, order_status, order_class }
        // tradeInfo
      } = await this.$api.member.getOrderInfo({ id: order_id })
      if (order_status === 'PAYED' || order_status === 'CANCEL') {
        //订单完成支付
        clearInterval(this.timer)
        this.$router.push(
          `/finish/result?order_id=${order_id}&total_fee=${total_fee}&order_class=${order_class}&pay_status=${order_status}`
        )
      }
    }
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
