<template>
  <div class="order-good">
    <h4>商品信息</h4>
    <table class="table">
      <colgroup>
        <col name="table-goods-pic" style="width: 85px" />
      </colgroup>
      <thead>
        <tr>
          <td colspan="2">商品</td>
          <!-- <td>单价(元)</td> -->
          <td colspan="1">数量</td>
          <!-- 动态判断colspan否则ui会空出一块 -->
          <td :colspan="!aftersale?'1':'2'">小计</td>
          <td colspan="2" style="text-align: center" v-if="!aftersale">操作</td>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr v-for="(item,index) in orderGoodData.detail" :key="index">
            <td>
              <div class="table-goods-pic">
                <SpImg style="width: 65px; height: 65px" :src="item.pic || item.item_pic" no-size />
              </div>
            </td>
            <td>
              <p class="">{{ item.item_name }}</p>
              <p>{{ item.item_spec_desc }}</p>
              <p class="giftTag" v-if="item.order_item_type == 'gift'"> 赠品</p>
            </td>
            <!-- <td>￥{{item.price|formatPriceToHundred}}</td> -->
            <td>{{ item.num }}</td>
            <td>
              <span v-if="orderGoodData.order_class != 'pointsmall'&& !item.aftersales_bn"
                >￥{{ item.item_fee | formatPriceToHundred }}</span
              >
              <span v-else-if="orderGoodData.order_class != 'pointsmall' && item.aftersales_bn"
                >￥{{ item.orderItem.item_fee | formatPriceToHundred }}</span
              >
              <span v-else> {{ item.point }} 积分 </span>
            </td>
            <td
              style="text-align:center"
            >
              <button
                class="btn btn-primary"
                v-if="
                  orderGoodData.can_apply_aftersales == 1 &&
                    orderGoodData.order_class != 'pointsmall'
                "
                @click="clickBtn('申请售后', item)"
                size="small"
              >
                申请售后
              </button>
              <div
                v-if="
                  orderTotalData.order_status_des === 'WAIT_BUYER_CONFIRM' &&
                    !aftersale &&
                    orderGoodData.order_class != 'pointsmall'
                "
                style="text-align: center"
              >
                <!--  -->

                <button
                  class="btn btn-primary"
                  v-if="item.aftersales_status"
                  @click="clickBtn('售后', item)"
                  size="small"
                >
                  售后
                </button>
              </div>
              <!--<div class="ly-fn-a" @click="clickBtn('评价',item)" v-if="(orderTotalData.order_status_des == 'SUCCESS' || orderTotalData.order_status_des == 'DONE')&&!item.is_rate">评价</div> -->
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="order-total clearfix">
      <div class="orderdtl-box-right">
        <div class="text">
          <span class="text-right">下单时间</span>
          <span>{{ orderTotalData.create_time | parseTime }}</span>
        </div>
        <div class="text">
          <span class="text-right">商品总金额</span>
          <span v-if="orderGoodData.order_class != 'pointsmall'"
            >￥{{ orderTotalData.item_fee | formatPriceToHundred }}</span
          >
          <span v-else>{{ orderTotalData.point }} 积分</span>
        </div>
        <div class="text">
          <span class="text-right">运费</span>
          <span class="col-lg-2" v-if="orderTotalData.freight_type == 'cash'"
            >￥{{ orderTotalData.freight_fee | formatPriceToHundred }}</span
          >
          <span class="col-lg-2" v-else>{{ `${orderTotalData.freight_fee} 积分` }}</span>
        </div>
        <div class="text" v-if="orderGoodData.order_class != 'pointsmall'">
          <span class="text-right">优惠</span>
          <span class="col-lg-2">￥{{ orderTotalData.discount_fee | formatPriceToHundred }}</span>
        </div>
        <div class="text" v-if="orderGoodData.order_class != 'pointsmall'">
          <span class="text-right">积分抵扣</span>
          <span class="col-lg-2">￥{{ orderTotalData.point_fee/100}}</span>
        </div>
        <div class="text-total">
          <span class="text-right">实付金额</span>
          <span class="ly-text-red" v-if="orderGoodData.order_class != 'pointsmall'"
            >￥{{ orderTotalData.total_fee | formatPriceToHundred }}</span
          >
          <span class="ly-text-red" v-else
            ><h6 class="ly-text-red">{{ orderTotalData.point }} 积分</h6>
            <h6 v-if="orderTotalData.total_fee != 0" class="ly-text-red">
              +￥{{ orderTotalData.total_fee | formatPriceToHundred }}
            </h6></span
          >
        </div>
      </div>
    </div>
    <SpModal v-model="dailogClose" :height="320" :width="520">
      <div class="dailog dailog-close">
        <div class="dailog-hd">售后</div>
        <div class="dailog-bd">
          <!-- <span>订单号：{{this.$route.params.id}}</span> -->
          <div>
            <SpForm ref="form" :model="form" :rules="rules">
              <SpFormItem prop="num" v-if="selectItem.num != 1">
                <span style="display: inline-block; width: 90px; text-align: right">商品数量:</span>
                <SpNumInput
                  style="width: 350px"
                  v-model="form.num"
                  :min="1"
                  :max="selectItem.num"
                  placeholder="商品数量"
                ></SpNumInput>
              </SpFormItem>
              <SpFormItem prop="type">
                <span style="display: inline-block; width: 90px; text-align: right">服务类型:</span>
                <SpSelect
                  style="width: 350px"
                  :data="typeData"
                  v-model="form.type"
                  placeholder="服务类型"
                ></SpSelect>
              </SpFormItem>
              <SpFormItem prop="reason">
                <span style="display: inline-block; width: 90px; text-align: right">退款理由:</span>
                <SpSelect
                  style="width: 350px"
                  :data="reasonData"
                  v-model="form.reason"
                  placeholder="退款理由"
                ></SpSelect>
              </SpFormItem>
              <SpFormItem prop="description">
                <span style="display: inline-block; width: 90px; text-align: right"
                  >申请退款说明:</span
                >
                <SpInput
                  style="width: 350px"
                  v-model="form.description"
                  placeholder="申请退款说明"
                />
              </SpFormItem>
            </SpForm>
          </div>
        </div>
        <div class="dailog-ft">
          <button class="btn btn-primary" @click="clickBtn('售后确认')">确认</button>
          <button class="btn" @click="clickBtn('取消')">取消</button>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import { creatAftersales } from '@/api/member'

export default {
  props: {
    orderGoodData: {
      type: Object,
      default: () => {}
    },
    orderTotalData: {
      type: Object,
      default: () => {}
    },
    aftersale: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dailogClose: false,
      form: {
        num: 1,
        type: '',
        reason: '',
        description: ''
      },
      rules: {
        type: [{ validate: 'required', message: '选择退款类型' }],
        reason: [{ validate: 'required', message: '选择退款原因' }]
      },
      typeData: [
        { label: '仅退款', value: 'ONLY_REFUND' },
        { label: '退货退款', value: 'REFUND_GOODS' }
      ],
      reasonData: [
        { label: '物流破损', value: '物流破损' },
        { label: '产品描述与实物不符', value: '产品描述与实物不符' },
        { label: '质量问题', value: '质量问题' },
        { label: '皮肤过敏', value: '皮肤过敏' }
      ],
      selectItem: {}
    }
  },

  methods: {
    async reasonList(){
      let list = await this.$api.trade.reasonList()
      if(list.length > 0){
        this.reasonData = []
        list.map(ele=>{
          this.reasonData.push({
            label: ele,
            value: ele
          })
        })
      }
    },
    clickBtn(type, item) {
      switch (type) {
        case '申请售后':
          this.selectItem = item
          this.dailogClose = true
          this.reasonList()
          break
        case '售后':
          this.$router.push(
            `/member/trade/aftersale?orderId=${item.order_id}&itemId=${item.item_id}`
          )
          break
        case '售后确认':
          this.$refs['form'].validate((valid, errors) => {
            if (valid) {
              let arr = JSON.stringify([{ id: this.selectItem.id, num: this.form.num }])
              let params = {
                order_id: this.selectItem.order_id,
                detail: arr,
                // item_id: this.selectItem.item_id,
                distributor_id: this.selectItem.distributor_id,
                aftersales_type: this.form.type,
                reason: this.form.reason,
                description: this.form.description
              }
              params.return_type = this.form.type=="REFUND_GOODS"? "logistics": ""
              creatAftersales(params).then(() => {
                this.$Message.success('发起成功')
                this.$emit('change')
                Object.assign(this.$data, this.$options.data())
              })
            }
          })
          break
        case '取消':
          this.dailogClose = false
          break
        case '评价':
          this.$router.push(
            `/member/trade/rate?id=${item.order_id}&order_class=${this.orderTotalData.order_class}`
          )
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ly-fn-a {
  text-align: center;
}
.order-good {
  padding: 0 10px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .table {
    margin-top: 10px;
    width: 100%;
    border: 1px solid $color-border-gray-light;
    border-spacing: 0;
    border-collapse: collapse;

    thead {
      background: #f5f5f5;
      height: 30px;

      line-height: 30px;
      color: #666666;
      border-bottom: 1px solid #efefef;
      td {
        padding: 0 10px;
      }
    }
    tbody {
      tr {
        border: 1px solid $color-border-gray-light;
      }
      td {
        padding: 10px;
        .giftTag{
          width: 32px;
          background: rgb(71, 158, 233);
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .order-total {
    padding: 30px 0 10px 0;
    .orderdtl-box-right {
      float: right;
      text-align: center;
      span {
        display: inline-block;
        width: 140px;
        text-align: left;
      }
      .text-right {
        display: inline-block;
        width: 150px;
        text-align: right;
      }
      .text-total {
        & > span {
          vertical-align: top;
          h6 {
            display: inline-block;
          }
        }
      }
    }
  }
  .dailog {
    .dailog-hd {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding-left: 15px;
      border-bottom: 1px solid $color-border-gray-light;
    }
    .dailog-bd {
      padding: 20px 20px 0;
      text-align: center;
    }
    .dailog-ft {
      width: 100%;
      // position: absolute;
      // bottom: 0;
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .dailog-close {
  }
  .btn {
    background-color: #fff;
    cursor: pointer;
    border-radius: 3px;
    height: 32px;
    width: 70px;
    text-align: center;
    line-height: 32px;
    border: 1px solid $color-border-gray-light;
    &:hover {
      background-color: $color-border-gray-light;
    }
  }
  .btn-primary {
    background-color: $color-brand-primary;
    border: 1px solid $color-brand-primary;
    color: #fff;
    &:hover {
      background-color: $color-brand-primary;
    }
  }
}
</style>
