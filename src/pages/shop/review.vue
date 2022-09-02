<template>
  <div class="container">
    <div class="review-info">
      <div class="review-info-success" v-if="audit_status == 1">
        <img class="review-img" src="../../assets/imgs/review-submit.png" alt="" />
        <p class="review-title-head">已提交申请，请耐心等待~</p>
        <p class="review-title-info">预计会在1~5个工作日完成审核</p>
      </div>
      <div class="review-info-fail" v-if="audit_status == 2">
        <img class="review-img" src="../../assets/imgs/review-success.png" alt="" />
        <p class="review-title-head">恭喜您已完成入驻!</p>
        <p class="review-title-info">登录地址及账号密码将发送短信至</p>
        <p class="review-title-info">注册手机号,请注意查收</p>
      </div>
      <div class="review-info-loading" v-if="audit_status == 3">
        <img class="review-img" src="../../assets/imgs/review-pass.png" alt="" />
        <p class="review-title-head">很抱歉! 您的入驻申请未通过</p>
        <div class="review-suggest" v-if="audit_memo">
          <p class="review-suggest-title">审批意见:</p>
          <p class="review-suggest-info">· {{ audit_memo }}</p>
        </div>
        <SpButton type="primary" @click="handleAgain">重新填写</SpButton>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import { settlementAuditstatus } from '@/api/store'
export default {
  layout: 'shop_layout',
  components: {},
  props: {},
  data() {
    return {
      audit_status: '',
      audit_memo: ''
    }
  },
  created() {
    this.getAuditstatus()
  },
  computed: {},
  methods: {
    handleAgain() {
      this.$router.push('/shop/settleform?type=return')
    },
    // 获取商户入驻信息审核结果
    getAuditstatus() {
      settlementAuditstatus().then((res) => {
        console.log(res)
        this.audit_status = res.audit_status
        this.audit_memo = res.audit_memo
      })
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" src="./review.scss"></style>