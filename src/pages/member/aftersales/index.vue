<style lang="scss" src='./index.scss'></style>

<template>
<div class="page-refund member page-body container-member">
  <div class="member-top">
    <p class="member-top-title">会员中心</p>
  </div>
  <div class="member-content">
    <div class="member-content-left">
      <smenu activeTitle="order" active="all-order"></smenu>
    </div>

    <div class="member-content-right">
      <h3 class="page-refund__title">退货/退款列表</h3>
      <div class="refund-list" v-if="total">
        <div class="refund-list__header clearfix">
          <div class="refund-id">退单号</div>
          <div class="refund-reason">售后服务内容</div>
          <div class="refund-time">申请时间</div>
          <div class="refund-status">处理状态</div>
          <div class="refund-action">操作</div>
        </div>
        <div class="refund-list__body">
          <div class="refund-list__body-c" v-for="(item, index) in list" :key="index">
            <div class="refund-list__body-b">
              <div class="refund-id">{{item.aftersales_bn}}</div>
              <div class="refund-reason">
                <span>{{item.reason}}</span>
              </div>
              <div class="refund-time">{{handleDatetime(item.created_time)}}</div>
              <div class="refund-status">{{item.progress_val}}</div>
              <div class="refund-btn">
                <SpButton class="btn-wrap" type="text" @click="goRefundDetail(item.aftersales_bn)">查看</SpButton>
              </div>
            </div>

            <div class="refund-list__body-mb">
              <div>售后单号：{{item.aftersales_bn}}</div>
              <div>申请时间：{{handleDatetime(item.created_time)}}</div>
              <div>状态：{{item.progress_val}}</div>
              <div class="refund-reason"><span>售后服务内容：{{item.reason}}</span></div>
              <div class="view-btn">
                <SpButton type="text" @click="goRefundDetail(item.aftersales_bn)">查看</SpButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpTipMessage
        loading
        loadingText="正在加载退款售后订单列表..."
        :isLoading="loading"
        v-model="tip"
        tipText="抱歉！您的退款售后订单列表为空"
        tipLink="请继续购物。"
        to="/items"
      ></SpTipMessage>
    </div>
  </div>
</div>
</template>

<script>
import smenu from '../comps/smenu'
import { formatDataTime } from '@/utils'

export default {
  data () {
    return {
      orderType: '',
      keyword: '',
      page_no: 1,
      page_size: 100,
      total: 0,
      list: null,
      loading: false,
      tip: false,
      tid: null
    }
  },
  components: { smenu },
  created () {
    const { tid } = this.$route.query
    this.tid = tid
    this.refundList()
  },
  methods: {
    async refundList () {
      if (this.loading) {
        return
      }
      this.loading = true
      let params = {
        page_no: this.page_no,
        page_size: this.page_size,
        tid: this.tid
      }
      const { list, total_found } = await this.$api.aftersales.list(params)
      this.list = list
      this.total = total_found
      this.loading = false
      this.tip = total_found === 0
    },
    goBack () {
      this.$router.back()
    },
    goRefundDetail (id) {
      this.$router.push(`/member/aftersales/${id}`)
    },
    handleDatetime (timestamp) {
      return formatDataTime(timestamp * 1000)
    },
    handleChangePage (page) {
      this.page_no = page
      this.refundList()
    }
  }
}
</script>
