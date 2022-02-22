<template>
  <div class="page-order">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="order" active="trade"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">我的订单</div>
          <div class="member-content-right-body">
            <div class="tabs-status">
              <template v-for="tab in tabs">
                <div
                  class="tab"
                  @click="handelClick(tab.value)"
                  :class="{ active: tab.value == status }"
                >
                  {{ tab.label }}
                </div>
              </template>
            </div>

            <div class="member-content-right-list-body-content">
              <div class="list-table">
                <template>
                  <table class="table-body">
                    <colgroup>
                      <col class="number-col" />
                      <col class="consignee-col" />
                      <col class="amount-col" />
                      <col class="status-col" />
                      <col class="operate-col" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>订单详情</th>
                        <th>收货人</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody v-for="child in list">
                      <tr class="sep-row">
                        <td colspan="5"></td>
                      </tr>
                      <tr class="tr-th">
                        <td colspan="5">
                          <div class="list-table-header">
                            <span>{{ child.date }}</span>
                            订单编号：
                            <span class="ly-fn-a link-black" @click.stop="clickLink(child.order)">{{
                              child.order
                            }}</span>
                            <span>{{ child.shop_name ? child.shop_name : '总店' }}</span>
                          </div>
                        </td>
                      </tr>

                      <template v-for="(item, index) in child.children">
                        <tr class="tr-bd">
                          <td>
                            <div
                              class="product-name"
                              @click="clickGoodsName(item, child.order_class === 'pointsmall')"
                            >
                              <SpImg
                                style="width: 70px; height: 70px; margin: 0 14px"
                                :src="item.pic"
                                no-size
                              />
                              <div class="td-product-name">
                                <div class="p-name">
                                  <span>{{ item.item_name }}</span>
                                </div>
                                <div class="p-extra">{{ item.item_spec_desc }}</div>
                              </div>
                              <PointTag v-if="child.order_class === 'pointsmall'" />
                            </div>
                            <div class="product-num">x {{ item.num }}</div>
                            <div
                              v-if="child.orderStatus === 'WAIT_BUYER_CONFIRM'"
                              class="product-repair"
                            >
                              <!-- <span
                                class="ly-fn-a b-color"
                                @click="clickBtn('申请售后', item)"
                                v-if="!item.aftersales_status && child.order_class !== 'pointsmall'"
                                >申请售后</span
                              > -->
                              <span
                                class="ly-fn-a b-color"
                                v-if="item.aftersales_status"
                                @click="clickBtn('售后', item)"
                                >售后</span
                              >
                            </div>
                          </td>

                          <td v-if="index == 0" :rowspan="child.children.length || 2" colspan="1">
                            <div class="p-get-name">
                              <span>{{ child.receiver_name }}</span>
                            </div>
                          </td>
                          <td v-if="index == 0" :rowspan="child.children.length || 2" colspan="1">
                            <div class="product-price">{{ getPrice(child) }}</div>
                          </td>
                          <td :rowspan="child.children.length || 2" v-if="index == 0" colspan="1">
                            <div class="product-status-warp">
                              <div
                                class="p-status-text"
                                :class="child.orderStatus == 'NOTPAY' ? 'nopay-color' : ''"
                              >
                                {{ orderStatusText[child.orderStatus] }}
                              </div>
                              <div
                                class="ly-fn-a b-color"
                                @click="clickLink(child.order)"
                                style="text-align: center"
                              >
                                订单详情
                              </div>
                            </div>
                          </td>

                          <td
                            :rowspan="child.children.length || 2"
                            v-if="index == 0"
                            colspan="1"
                            class="product-ctrl-warp"
                          >
                            <div class="product-ctrl">
                              <!-- <div>等待卖家发货</div> -->
                              <div
                                class="btn btn-primary"
                                @click="clickBtn('付款', child)"
                                v-if="child.orderStatus == 'NOTPAY'"
                              >
                                付款
                              </div>
                              <div
                                class="btn btn-primary"
                                @click="clickBtn('确认收货', child)"
                                v-if="child.orderStatus == 'WAIT_BUYER_CONFIRM'"
                              >
                                确认收货
                              </div>
                              <span
                                class="ly-fn-a b-color"
                                @click="clickBtn('申请售后', item)"
                                v-if="
                                  !item.aftersales_status &&
                                    child.order_class !== 'pointsmall' &&
                                    child.orderStatus === 'WAIT_BUYER_CONFIRM'
                                "
                                >申请售后</span
                              >
                              <!-- <div
                                class="ly-fn-a"
                                @click="clickBtn('查看物流',child)"
                                v-if="child.orderStatus == 'WAIT_BUYER_CONFIRM' || child.orderStatus == 'DONE' || child.orderStatus == 'SUCCESS'"
                              >查看物流</div> -->
                              <div
                                class="ly-fn-a"
                                @click="clickBtn('评价', child)"
                                v-if="
                                  (child.orderStatus == 'SUCCESS' || child.orderStatus == 'DONE') &&
                                    rate_status &&
                                    child.is_rate == 0
                                "
                              >
                                评价
                              </div>
                              <div
                                class="ly-fn-a"
                                @click="clickBtn('取消订单', child)"
                                v-if="child.orderStatus == 'NOTPAY' || child.orderStatus == 'PAYED'"
                              >
                                取消订单
                              </div>
                            </div>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </template>
              </div>
            </div>

            <template>
              <div style="width: 300px; margin: 50px auto">
                <Tips v-if="list.length == 0" tips="您没有相关的订单。" />
              </div>
            </template>
            <div>
              <SpPagination
                :total="page.total"
                :pageSize="page.pageSize"
                :current="page.page"
                @on-change="changePage"
                :maxPage="5"
              />
            </div>
          </div>
          <SpModal v-model="dailogCancel" :height="200" :width="450">
            <div class="dailog dailog-cancel">
              <div class="dailog-hd">取消订单</div>
              <div class="dailog-bd">
                <span>订单号：{{ selectItem.order }}</span>
                <div style="padding-top: 20px">
                  <!-- <span style="display:inline-block;width:100px;text-align:right">取消原因：</span>
                  <SpInput placeholder="必填：取消原因" v-model="cancelMean" class="dailog-bd-input" />-->
                  <SpForm ref="form" :model="form" :rules="rules">
                    <SpFormItem prop="cancelMean">
                      <span style="display: inline-block; width: 80px; text-align: right"
                        >取消原因：</span
                      >
                      <SpInput
                        class="dailog-bd-input"
                        v-model="form.cancelMean"
                        placeholder="必填：取消原因"
                      />
                    </SpFormItem>
                  </SpForm>
                </div>
              </div>

              <div class="dailog-ft">
                <button class="btn btn-primary" @click="clickBtn('订单取消确认')">确认取消</button>
                <button class="btn" @click="clickBtn('取消')">暂不取消</button>
              </div>
            </div>
          </SpModal>
          <SpModal v-model="dailogClose" :width="520">
            <div class="dailog dailog-close">
              <div class="dailog-hd">售后</div>
              <div class="dailog-bd">
                <!-- <span>订单号：{{this.$route.params.id}}</span> -->
                <div>
                  <SpForm ref="formClose" :model="formClose" :rules="rulesClose">
                    <SpFormItem prop="num" v-if="selectItemClose.num != 1">
                      <span style="display: inline-block; width: 80px; text-align: right"
                        >商品数量:</span
                      >
                      <SpNumInput
                        style="width: 350px"
                        v-model="formClose.num"
                        :min="1"
                        :max="selectItemClose.num"
                        placeholder="商品数量"
                      ></SpNumInput>
                    </SpFormItem>
                    <SpFormItem prop="type">
                      <span style="display: inline-block; width: 80px; text-align: right"
                        >服务类型:</span
                      >
                      <SpSelect
                        style="width: 350px"
                        :data="typeData"
                        v-model="formClose.type"
                        placeholder="服务类型"
                      ></SpSelect>
                    </SpFormItem>
                    <SpFormItem prop="reason">
                      <span style="display: inline-block; width: 80px; text-align: right"
                        >退款理由:</span
                      >
                      <SpSelect
                        style="width: 350px"
                        :data="reasonData"
                        v-model="formClose.reason"
                        placeholder="退款理由"
                      ></SpSelect>
                    </SpFormItem>
                    <SpFormItem prop="description">
                      <span style="display: inline-block; width: 80px; text-align: right"
                        >申请退款说明:</span
                      >
                      <SpInput
                        style="width: 350px"
                        v-model="formClose.description"
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

          <SpModal title="物流信息" v-model="dialogLogistics" :width="520">
            <div class="dailog">
              <div class="dailog-hd">物流信息</div>
              <div class="dailog-bd" style="padding-right: 0">
                <Logistics :id="selectItem.order" :height="240"></Logistics>
              </div>
            </div>
          </SpModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from './comps/order-item'
import smenu from './../comps/smenu'
import Tips from '../comps/tips'
import { mapState } from 'vuex'
import page from '@/mixins/page'
import { PointTag } from '@/components'
import { formatPriceToHundred } from '@/utils'
import Logistics from '@/pages/member/comps/logistics'
import { orderCancel, creatAftersales, confirmOrder, aftersaleList } from '@/api/member'
// let cache = false

export default {
  middleware: 'authenticated',
  // beforeRouteEnter (to, from, next) {
  //   if (
  //     from.matched.length > 0 &&
  //     (from.matched[0].path === '/trade/:id' ||
  //       from.matched[0].path === '/aftersales' ||
  //       from.matched[0].path === '/aftersales/:id' ||
  //       from.matched[0].path === '/items/:id' ||
  //       from.matched[0].path === '/aftersales/apply-refund')
  //   ) {
  //     cache = true
  //   } else {
  //     cache = false
  //   }
  //   next()
  // },
  // mixins: [page],
  data() {
    return {
      tabs: [
        { label: '全部', value: '0' },
        { label: '待付款', value: '5' },
        { label: '待收货', value: '1' },
        { label: '待自提', value: '6' },
        { label: '待评价', value: '3' }
        // { label: '售后', value: '10' },
        // { label: '已完成', value: '11' },
      ],
      list: [],
      logisticsList: [],
      intervalTime: '',
      loading: true,
      name: '',
      page: {
        pageSize: 20,
        page: 1,
        total: 0
      },
      orderStatusText: {
        NOTPAY: '未付款',
        PAYED: '已付款',
        WAIT_BUYER_CONFIRM: '已发货',
        FAIL: '已关闭',
        CLOSED: '已关闭',
        CANCEL: '已取消',
        PAYED_WAIT_PROCESS: '退款处理中',
        PAYED_PARTAIL: '部分发货',
        SUCCESS: '交易完成',
        DONE: '交易完成'
      },
      dailogCancel: false,
      selectItem: {},
      form: { cancelMean: '' },
      rules: {
        cancelMean: [{ validate: 'required', message: '取消原因必填' }]
      },
      dailogClose: false,
      formClose: {
        num: 1,
        type: '',
        reason: '',
        description: ''
      },
      rulesClose: {
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
      selectItemClose: {},
      dialogLogistics: false,
      status: '0',
      rate_status: false
    }
  },
  components: { smenu, OrderItem, Tips, Logistics, PointTag },
  computed: mapState({
    // tradeCache: state => state.tradeCache,
    // position: state => state.position,
    userInfo: (state) => state.user.userInfo,
    orderType: function() {
      return this.$route.query.type || ''
    }
  }),
  watch: {
    orderType: function() {
      // this.refresh()
    }
  },
  mounted() {
    // this.refresh()
    // this.getLogisticsList()
    let { status } = this.$route.query
    if (status) {
      this.status = status
    }
    this.getTradeList()
  },
  methods: {
    async getTradeList() {
      this.loading = true
      let params = {
        pageSize: this.page.pageSize,
        page: this.page.page,
        order_type: 'normal',
        status: this.status
      }
      let { list, pager, rate_status } = await this.$api.trade.list(params)
      // list.push(list[0])
      list = list.map((item) => {
        let obj = {
          date: item.create_date,
          order: item.order_id,
          children: item.items,
          orderStatus: item.order_status_des,
          total_fee: item.total_fee,
          shop_name: item.shop_name,
          receiver_name: item.receiver_name,
          is_rate: item.is_rate,
          order_class: item.order_class,
          freight_type: item.freight_type,
          freight_fee: item.freight_fee,
          point: item.point
        }
        return obj
      })

      // console.log(list,'list');
      // list[0].orderStatus='WAIT_BUYER_CONFIRM'
      // list[0].orderStatus = 'SUCCESS'
      // list[1].orderStatus = 'NOTPAY'
      // list[2].orderStatus = 'WAIT_BUYER_CONFIRM'
      this.rate_status = rate_status
      this.list = list
      this.page.total = pager.count
      console.log(list)
    },
    async getAftersalesList() {
      this.loading = true
      let params = {
        pageSize: this.page.pageSize,
        page: this.page.page,
        order_type: 'normal'
        // status: this.status,
      }
      let { list = [], total_count = 0 } = await aftersaleList(params)
      // list.push(list[0])

      list = list.map((item) => {
        let obj = {
          date: item.create_date,
          order: item.order_id,
          children: [].push(item.item),
          orderStatus: item.order_status_des
        }
        return obj
      })

      // console.log(list,'list');
      // list[0].orderStatus='WAIT_BUYER_CONFIRM'
      this.list = list
      this.page.total = total_count
    },
    clickLink(id) {
      this.$router.push(`/member/trade/${id}`)
    },
    getPrice(orderItem) {
      const { order_class, freight_type, freight_fee, point, total_fee } = orderItem
      if (order_class === 'pointsmall') {
        if (freight_type === 'point' || (freight_type === 'cash' && freight_fee == 0)) {
          return `${point}积分`
        } else if (freight_type === 'cash' && freight_fee != 0) {
          return `${point}积分 + ￥${formatPriceToHundred(total_fee)}`
        }
      } else {
        return `￥${formatPriceToHundred(total_fee)}`
      }
    },
    handelClick(val) {
      if (val == 10 || val == 11) {
        this.page.page = 1
        // this.getAftersalesList()

        // this.$router.push(`/member/trade/aftersale-list`)
      } else {
        this.status = val
        this.page.page = 1
        this.getTradeList()
      }
    },
    clickBtn(type, item) {
      switch (type) {
        case '付款':
          this.$router.push(`/cashier?order_id=${item.order}`)
          break
        case '确认收货':
          confirmOrder({
            order_id: item.order
          }).then((res) => {
            this.$Message.success('收货成功')
            this.getTradeList()
          })
          break
        case '查看物流':
          this.selectItem = item
          this.dialogLogistics = true
          break

        case '取消订单':
          this.selectItem = item
          this.dailogCancel = true
          break
        case '取消':
          this.dailogCancel = false
          this.dailogClose = false
          break
        case '订单取消确认':
          this.$refs['form'].validate((valid, errors) => {
            if (valid) {
              orderCancel({
                order_id: this.selectItem.order,
                cancel_reason: this.form.cancelMean
              }).then(() => {
                this.$Message.success('发起成功')
                this.getTradeList()
                this.dailogCancel = false
              })
            }
          })
          break
        case '售后':
          this.$router.push(
            `/member/trade/aftersale?orderId=${item.order_id}&itemId=${item.item_id}`
          )
          break
        case '申请售后':
          this.selectItemClose = item
          this.dailogClose = true

          // this.selectItemClose.num=5
          break

        case '售后确认':
          this.$refs['formClose'].validate((valid, errors) => {
            if (valid) {
              let arr = JSON.stringify([{ id: this.selectItemClose.id, num: this.formClose.num }])
              let params = {
                order_id: this.selectItemClose.order_id,
                detail: arr,
                // item_id: this.selectItemClose.item_id,
                distributor_id: this.selectItemClose.distributor_id,
                aftersales_type: this.formClose.type,
                reason: this.formClose.reason,
                description: this.formClose.description
              }
              creatAftersales(params).then(() => {
                this.$Message.success('发起成功')
                this.dailogClose = false
                this.getTradeList()
              })
            }
          })
          break
        case '评价':
          this.$router.push(`/member/trade/rate?id=${item.order}`)
          break
      }
    },
    changePage(page) {
      this.page.page = page
      this.getTradeList()
    },
    clickGoodsName(item, isPoint) {
      if (isPoint) {
        this.$router.push(`/pointitems/${item.item_id}`)
      } else {
        this.$router.push(`/items/${item.item_id}`)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../member.scss';
.page-order {
      background: #f5f5f5;
  overflow: hidden;
  .container {
    background: transparent;
  }
  .order-tag {
    display: inline-block;
    height: 20px;
    padding: 0 8px;
    margin-right: 5px;
    line-height: 20px;
    color: #ffffff;
    text-align: center;
    background-color: red;
  }
  .member-content-right {
    .member-content-right-body {
      padding: 20px;
      .tabs-status {
        height: 30px;
        .tab {
          display: inline-block;
          padding-right: 20px;
          cursor: pointer;
        }
        .active {
          color: $color-brand-primary;
        }
      }
      .member-content-right-list-body-content {
        .list-table {
          width: 100%;
          margin-top: 10px;
          .list-table-header {
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            text-align: left;
            color: #aaa;
            & > span {
              color: #aaa;
              margin-right: 10px;
            }
          }
          .table-body {
            width: 100%;
            border-collapse: collapse;
            thead {
              th {
                height: 32px;
                line-height: 32px;
                text-align: center;
                background: #f5f5f5;
                color: #666;
                font-weight: 400;
              }
            }
            tbody {
              td {
                border: 1px solid #e5e5e5;
              }
            }
            .link-black {
              color: black;
            }
            .tr-th {
              background: #f5f5f5;
              height: 31px;
              line-height: 31px;
              color: #aaa;
              overflow: hidden;
            }
            .sep-row {
              td {
                border: 0;
              }
            }
            .sep-row {
              height: 20px;
            }
            .number-col {
              width: 480px;
            }
            .consignee-col {
              width: 115px;
            }
            .amount-col {
              width: 110px;
            }
            .status-col {
              width: 110px;
            }
            .operate-col {
            }
            .tr-bd {
              td {
                padding: 14px 0;
              }
              .product-name {
                width: 280px;
                margin-right: 20px;
                display: inline-block;
                cursor: pointer;
                .td-product-name {
                  vertical-align: top;
                  display: inline-block;
                  width: 160px;
                  .p-name {
                    height: 36px;
                    line-height: 18px;
                    overflow: hidden;
                    color: #333;
                    text-align: left;
                    word-break: break-all;
                  }
                  .p-extra {
                  }
                }
              }
              .product-num {
                width: 70px;
                vertical-align: top;
                display: inline-block;
              }
              .product-status-warp {
                & > div {
                  margin: 6px auto;
                }
                .p-status-text {
                  text-align: center;
                  color: #aaa;
                }
                .nopay-color {
                  color: #e6a23c;
                }
              }
              .p-get-name {
                text-align: center;
                overflow: hidden;
                word-break: break-all;
              }
              .product-price {
                text-align: center;
                overflow: hidden;
              }
              .product-repair {
                width: 100px;
                vertical-align: top;
                display: inline-block;
              }
              .product-ctrl {
                text-align: center;
                & > div {
                  text-align: center;
                  margin: 6px auto;
                }
              }
              .b-color {
                color: rgb(102, 89, 89);
              }
            }
          }
        }
      }
    }
  }
  &__b {
    padding-top: 40px;
  }
  .member__tips {
    font-size: 16px;
    // color: $color-secondary-text;
    font-weight: bold;
    margin-top: 26px;
  }
  .mb20 {
    margin-bottom: 20px;
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
.dailog-cancel {
  .dailog-bd-input {
    width: 300px;
    display: inline-block;
  }
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
</style>
