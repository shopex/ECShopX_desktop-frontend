<template>
  <div class="content">
    <SpForm
      class="settle__form"
      ref="form-settle"
      :model="info"
      :rules="accountRules"
      style="{height: 372px;}"
    >
      <SpFormItem prop="merchant_name" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>企业名称</span>
        <SpInput v-model="info.merchant_name" />
      </SpFormItem>
      <SpFormItem prop="social_credit_code_id" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>统一社会信用代码</span>
        <SpInput v-model="info.social_credit_code_id" />
      </SpFormItem>
      <SpFormItem prop="regions_id" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>所在省市</span>
        <div class="member-input-text">
          <SpAddress v-model="info.regions_id" @onChange="changeRegions" />
        </div>
      </SpFormItem>
      <SpFormItem prop="address" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>详细地址</span>
        <SpInput class="address-input" v-model="info.address" />
      </SpFormItem>
      <SpFormItem prop="legal_name" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>法人姓名</span>
        <SpInput v-model="info.legal_name" />
      </SpFormItem>
      <SpFormItem prop="legal_cert_id" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>身份证号码</span>
        <SpInput v-model="info.legal_cert_id" />
      </SpFormItem>
      <SpFormItem prop="legal_mobile" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>手机号码</span>
        <SpInput v-model="info.legal_mobile" />
      </SpFormItem>
      <SpFormItem prop="bank_acct_type" class="form-select ">
        <span class="label-text">
          <span class="must-icon">*</span>
          结算银行类型
        </span>
        <SpRadioGroup v-model="info.bank_acct_type">
          <SpRadio label="1" :theme="themeColor">对公</SpRadio>
          <SpRadio label="2" :theme="themeColor">对私</SpRadio>
        </SpRadioGroup>
      </SpFormItem>
      <SpFormItem prop="card_id_mask" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>结算银行账号</span>
        <SpInput v-model="info.card_id_mask" />
      </SpFormItem>
      <SpFormItem prop="bank_name" v-if="info.bank_acct_type == 1" class="form-select bank_info">
        <span class="label-text"> <span class="must-icon">*</span>结算银行</span>
        <div @click="showBank" class="bank_input">
          <SpInput v-model="info.bank_name" class="bank_input" placeholder="搜索银行名称" />
        </div>
        <div v-if="!info.bank_name && rulesShow" class="form-item__error-message">
          请请选择结算银行
        </div>
      </SpFormItem>
      <SpFormItem prop="bank_mobile	" v-if="info.bank_acct_type == 2" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>绑定手机号</span>
        <SpInput v-model="info.bank_mobile" />
        <div v-if="!info.bank_mobile && rulesShow" class="form-item__error-message">
          请填写绑定手机号
        </div>
      </SpFormItem>
    </SpForm>
    <p class="tips">• 结算银行卡持卡人姓名要与法人姓名一致</p>
    <!-- 银行弹出框 -->
    <SpModal v-model="dailogVisible" :width="600">
      <div slot="title" class="confirm-title">选择结算银行</div>
      <div class="confirm-info">
        <!-- <SpInput v-model="searchBank.bank_name" @input="changeSearch" /> -->
        <div class="chooseBanck" @click="changeSearch">{{searchBank.bank_name}}</div>
        <div class="bank-list">
          <SpRadioGroup v-model="info.bank_name" v-if="loading">
            <div v-for="(item, index) in bankList" :key="index" class="bank-list-info">
              <SpRadio size="small" :label="item.label" :theme="themeColor">{{
                item.label
              }}</SpRadio>
            </div>
          </SpRadioGroup>
        </div>
        <div class="pagination-wrap">
          <SpPagination
            :total="total"
            :pageSize="searchBank.page_size"
            :current="searchBank.page"
            @on-change="changePage"
            :maxPage="5"
          />
        </div>
        <div class="btns">
          <div class="btn" @click="clickCancel">取消</div>
          <div class="btn btn-ok" @click="clickSumbit">确认</div>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import { getBank } from '@/api/store'
export default {
  components: {},
  props: { formInfo: Object },
  data() {
    var unifiedCode = (rule, value, callback) => {
      let reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
      if (!value) {
        callback('请填写统一社会信用代码')
      } else if (!reg.test(value)) {
        callback('请填写正确的统一社会信用代码')
      }
      callback()
    }
    var idCard = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        callback('请输入身份证号码')
      } else if (!reg.test(value)) {
        callback('请填写正确的身份证号码')
      }
      callback()
    }
    var mobile = (rule, value, callback) => {
      let reg = /^1\d{10}$/
      if (!value) {
        callback('请输入手机号码')
      } else if (!reg.test(value)) {
        callback('请填写正确的手机号码')
      }
      callback()
    }
    var area = (rule, value, callback) => {
      if (value.length == 0) {
        callback('请选择所在省市')
      }
      callback()
    }
    var companyName = (rule, value, callback) => {
      if (!value) {
        callback('请填写企业名称')
      }
      callback()
    }
    var address = (rule, value, callback) => {
      if (!value) {
        callback('请输入详细地址')
      }
      callback()
    }
    var nameInput = (rule, value, callback) => {
      if (!value) {
        callback('请输入法人姓名')
      }
      callback()
    }
    var bankType = (rule, value, callback) => {
      if (!value) {
        callback('请选择请选择结算银行类型所在省市')
      }
      callback()
    }
    var bankCardId = (rule, value, callback) => {
      if (!value) {
        callback('请输入结算银行账号')
      }
      callback()
    }
    return {
      dailogVisible: false,
      disabled: true,
      themeColor: '#479EE9', // 单选按钮颜色
      rulesShow: false,
      info: {
        merchant_name: '',
        social_credit_code_id: '',
        regions_id: [],
        regions: [],
        address: '',
        legal_name: '',
        legal_cert_id: '',
        legal_mobile: '',
        bank_acct_type: '1',
        card_id_mask: '',
        bank_name: '',
        bank_mobile: ''
      },
      bankList: [],
      loading: true,
      searchBank: {
        bank_name: '',
        page: 1,
        page_size: 20
      },
      chooseBanks: '',
      total: 0,
      accountRules: {
        merchant_name: [{ validate: companyName, message: '请填写企业名称' }],
        social_credit_code_id: [{ validate: unifiedCode }],
        regions_id: [{ validate: area, message: '请选择所在省市' }],
        address: [{ validate: address, message: '请输入详细地址' }],
        legal_name: [{ validate: nameInput, message: '请输入法人姓名' }],
        legal_cert_id: [{ validate: idCard, message: '请输入身份证号码' }],
        legal_mobile: [{ validate: mobile, message: '请输入手机号码' }],
        bank_acct_type: [{ validate: bankType, message: '请选择结算银行类型' }],
        card_id_mask: [{ validate: bankCardId, message: '请输入结算银行账号' }]
        // bank_name: [{ validate: bankName, message: '请选择结算银行' }]
      }
    }
  },
  created() {
    if (this.formInfo) {
      const {
        merchant_name,
        social_credit_code_id,
        regions_id,
        province,
        city,
        area,
        address,
        legal_name,
        legal_cert_id,
        legal_mobile,
        bank_acct_type,
        card_id_mask,
        bank_name,
        bank_mobile
      } = this.formInfo
      let regions = province + '-' + city + '-' + area
      regions = regions.split('-')
      // 保存已选中银行信息
      this.chooseBanks = bank_name
      this.info = {
        merchant_name,
        social_credit_code_id,
        address,
        legal_name,
        legal_cert_id,
        legal_mobile,
        bank_acct_type,
        card_id_mask,
        bank_name,
        bank_mobile,
        regions_id: regions_id ? JSON.parse(regions_id) : [],
        regions: regions
      }
    }

    this.getBankList()
  },
  computed: {},
  methods: {
    // 获取结算银行
    getBankList() {
      this.loading = false
      // 将已保存的银行信息赋值给表单
      this.info.bank_name = this.chooseBanks
      getBank(this.searchBank).then((res) => {
        this.bankList = []
        let num = 0
        res.list.forEach((item) => {
          // 判断表单已选中的是否是在此次列表中
          if (this.info.bank_name == item.bank_name) {
            num++
          }
          this.bankList.push({
            label: item.bank_name,
            value: item.bank_code,
            id: item.id
          })
        })
        if (num <= 0) {
          this.info.bank_name = ''
        }
        this.loading = true
        this.total = res.total_count
      })
    },
    check() {
      this.$refs['form-settle'].validate((valid) => {
        if (!valid) {
          if (
            (this.info.bank_acct_type == '1' && !this.info.bank_name) ||
            (this.info.bank_acct_type == '2' && !this.info.bank_mobile)
          ) {
            this.rulesShow = true
          }
          this.$emit('resule', valid)
        } else {
          this.$emit('resule', valid, this.info)
        }
      })
    },
    // 获取所在省市
    changeRegions(name, ids) {
      this.info.regions_id = ids
      this.info.regions = name
    },
    // 选择银行
    chooseBank(item) {
      this.info.bank_name = item.label
    },
    changeInput(e) {
      this.searchBank.bank_name = e
      this.getBankList()
    },
    showBank() {
      this.dailogVisible = true
    },
    // 关闭弹出框
    clickCancel() {
      this.info.bank_name = this.info.bank_name ? this.info.bank_name : this.chooseBanks;
      this.dailogVisible = false
    },
    clickSumbit() {
      this.clickCancel()
    },
    // 页码变化
    changePage(val) {
      this.searchBank.page = val
      this.getBankList()
    },
    // 搜索框变化
    changeSearch(val) {
      this.searchBank.bank_name = val
      this.searchBank.page = 1
      this.getBankList()
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
.bank_input{
  cursor: pointer;
  ::v-deep.sp-input__input {
    cursor: pointer;
  }
}  
</style>