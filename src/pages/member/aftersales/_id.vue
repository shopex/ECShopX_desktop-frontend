<style lang="scss" src='./apply-refund.scss'></style>
<style lang="scss">
.page-aftersales-detail{
  .goods-item{
    margin-bottom: 20px;
  }
  .refund-info{
    .form-limit{
      width: 400px;
    }
    &__label{
      font-size: 16px;
      color: #525252;
      letter-spacing: 2px;
    }
    &__hd{
      color: #525252;
      letter-spacing: 2px;
      font-size: 16px;
      line-height: 30px;
    }
    .logistics-label{
      font-size: 16px;
      width: 140px;
      line-height: 30px;
    }
    .logistics-value{
      width: 250px;
    }
  }
  .refund-reason{
    font-size: 16px;
    color: #525252;
    letter-spacing: 2px;
    margin: 20px 0;
  }
  .pb100{
    padding-bottom: 100px;
  }
}
</style>

<template>
  <div class="page-apply-refund page-aftersales-detail member page-body container-member">
    <div class="member-top">
      <p class="member-top-title">会员中心</p>
    </div>
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="order" active="all-order"></smenu>
      </div>
      <div class="member-content-right" v-if="info">
        <div class="pb100">
          <div class="page-apply-refund__status border-top">
            <p class="page-apply-refund__status-text">申请退货</p>
            <p class="page-apply-refund__status-order">订单号：{{info.tid}}</p>
            <p class="page-apply-refund__status-order">退货单号：{{info.aftersales_bn}}</p>
          </div>
          <SpGoodsItem
            v-if="info.sku"
            :info="handleGoodsData(info.sku)"
            :showPromotion="false"
          />
          <SpForm>
            <SpFormItem prop="account">
              <span class="label-text">退款/退货说明</span>
              <div class="page-apply-refund__explain">
                <textarea class="textarea" v-model="info.reason" cols="30" rows="10"></textarea>
              </div>
            </SpFormItem>
            <SpFormItem prop="account" class="mb20">
              <div class="label-text">
                <p>凭证</p>
              </div>
              <div class="img-list" v-if="info.evidence_pic">
                <li v-for="(url, index) in info.evidence_pic" :key="index">
                  <img :src="url" alt=""/>
                </li>
              </div>
            </SpFormItem>
          </SpForm>

          <div class="refund-reason" v-if="info.status == '3' && info.shop_explanation">
            <span class="label-text">拒绝原因</span><span>{{info.shop_explanation}}</span>
          </div>

          <!--'0' => '等待商家处理', '3' => '商家已驳回',"aftersales_type": "ONLY_REFUND" -->
          <template v-if="info.progress != '0' && info.progress != '3' && info.aftersales_type != 'ONLY_REFUND'">
            <div class="refund-info">
              <div v-if="info.returnGoodsLogistics">
                <div class="refund-info__label">
                  <span class="label-text">物流公司</span><span>{{info.returnGoodsLogistics.logi_name}}</span>
                </div>
                <div class="refund-info__label">
                  <span class="label-text">物流单号</span><span>{{info.returnGoodsLogistics.logi_no}}</span>
                </div>
              </div>
              <div class="logistics-form" v-if="info.progress == '1'">
                <SpForm ref="form-logistics" :model="logisticsInfo" :rules="rules">
                  <div class="form-limit">
                    <SpFormItem prop="corp_code">
                      <span class="logistics-label">物流公司</span>
                      <div class="logistics-value">
                        <SpSelect v-model="logisticsInfo.corp_code" :data="logisticsList" placeholder="物流公司" />
                      </div>
                    </SpFormItem>
                    <SpFormItem prop="logi_no">
                      <span class="logistics-label">物流单号</span>
                      <div class="logistics-value">
                        <SpInput v-model="logisticsInfo.logi_no" placeholder="物流单号" />
                      </div>
                    </SpFormItem>
                  </div>
                  <SpFormItem class="btn-container-member">
                    <div class="btn-container__login">
                      <SpButton
                        class="button-dark"
                        type="primary"
                        @click="submitLogistics('form-logistics')"
                      >提交</SpButton>
                    </div>
                  </SpFormItem>
                </SpForm>
              </div>
              <div v-if="info.progress != '1' && !info.returnGoodsLogistics">暂无物流信息，请稍后查看</div>
            </div>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SpGoodsItem } from '@/components'
import smenu from '../comps/smenu'

export default {
  components: {
     smenu
  },
  data () {
    return {
      info: null,
      ORDER_STATUS: {
        'online': '在线支付',
        'offline': '货到付款',
        'rechange': '预存款充值'
      },
      logisticsList: [],
      logisticsInfo: {
        corp_code: '',
        logi_no: ''
      },
      rules: {
        corp_code: [{
          validate: (rule, value, callback) => {
            if (value) {
              // eslint-disable-next-line standard/no-callback-literal
              callback()
            } else {
              callback('请选择物流商')
            }
          },
          trigger: 'blur'
        }],
        logi_no: [{
          validate: (rule, value, callback) => {
            if (value) {
              // eslint-disable-next-line standard/no-callback-literal
              callback()
            } else {
              callback('请输入物流单号')
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.aftersales_bn = id
    this.getAftersalesDetail()
    this.getLogisticsList()

    // '0' => '等待商家处理',
    // '1' => '商家接受申请，等待消费者回寄',
    // '2' => '消费者回寄，等待商家收货确认',
    // '3' => '商家已驳回',
    // '4' => '商家已处理',//换货的时候可以直接在商家处理结束
    // '5' => '商家确认收货',
    // '6' => '平台驳回退款申请',
    // '7' => '平台已处理退款申请',//退款，退货则需要平台确实退款
    // '8' => '同意退款,提交到平台,等待平台处理',
  },
  methods: {
    async getAftersalesDetail () {
      const { rs } = await this.$api.aftersales.detail({ aftersales_bn: this.aftersales_bn })
      this.info = rs
    },
    async getLogisticsList () {
      const { data } = await this.$api.aftersales.logisticsList()
      let list = []
      for (let item of data) {
        list.push({
          label: item.corp_name,
          value: item.corp_code
        })
      }
      this.logisticsList = list
    },
    handleClickItem (item) {
      this.$router.push(`/items/${item.item_id}`)
    },
    handleGoodsData (item) {
      return {
        title: item.title,
        sub_title: item.sub_title,
        item_id: item.item_id,
        bn: item.bn,
        image_default_id: item.pic_path,
        spec_info: item.spec_nature_info,
        quantity: item.num,
        total_fee: item.payment,
        price: item.price,
        color: item.color,
        size: item.size
      }
    },
    submitLogistics (name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.sendLogistics()
        }
      })
    },
    async sendLogistics () {
      let logi_name = ''
      this.logisticsList.map(item => {
        if (item.value === this.logisticsInfo.corp_code) {
          logi_name = item.label
        }
      })
      let params = {
        ...this.logisticsInfo,
        logi_name,
        aftersales_bn: this.aftersales_bn
      }
      await this.$api.aftersales.logistics(params)
      this.$Message.success('填写物流信息成功')
      this.getAftersalesDetail()
    }
  }
}
</script>
