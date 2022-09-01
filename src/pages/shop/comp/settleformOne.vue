<template>
  <div class="content">
    <SpForm
      class="settle__form"
      ref="form-settle"
      :model="info"
      :rules="accountRules"
      style="{height: 372px;}"
    >
      <SpFormItem prop="shopType" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>商户类型</span>
        <SpInputSelect
          v-model="info.shopType"
          @change="chooseShopType"
          :data="shopTypeList"
          placeholder="请选择"
        ></SpInputSelect>
      </SpFormItem>
      <SpFormItem prop="bussinessScope" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>经营范围</span>
        <!-- <SpSelect
          v-model="info.bussinessScope"
          :data="bussinessScopeList"
          placeholder="请选择"
        ></SpSelect> -->
        <SpInputSelect
          v-model="info.bussinessScope"
          :data="bussinessScopeList"
          @change="chooseShopList"
          placeholder="请选择"
        ></SpInputSelect>
      </SpFormItem>
      <SpFormItem prop="settled_type" class="form-select ">
        <span class="label-text"><span class="must-icon">*</span>入驻类型</span>
        <SpRadioGroup v-model="info.settled_type">
          <SpRadio label="enterprise" :theme="themeColor">企业</SpRadio>
          <SpRadio label="soletrader" :theme="themeColor">个体户</SpRadio>
        </SpRadioGroup>
        <div v-if="!info.settled_type && rulesShow" class="form-item__error-message">
          请上传银行卡正面照片
        </div>
      </SpFormItem>
    </SpForm>
  </div>
</template>

<script>
import { getMerchantType } from '@/api/store'
export default {
  components: {},
  props: {},
  data() {
    return {
      themeColor: '#479EE9', // 单选按钮颜色
      rulesShow: false,
      info: {
        shopType: '',
        bussinessScope: '',
        settled_type: ''
      },
      shopTypeList: [
        {
          label: '测试',
          value: '测试11'
        },
        {
          label: '测试',
          value: '测试11'
        },
        {
          label: '测试',
          value: '测试11'
        }
      ],
      bussinessScopeList: [
        {
          label: '测试',
          value: '测试12'
        },
        {
          label: '测试',
          value: '测试12'
        },
        {
          label: '测试',
          value: '测试12'
        }
      ],
      typeParams: {
        page: 1,
        page_size: 10,
        parent_id: 0,
        name: ''
      },
      accountRules: {
        settled_type: [{ required: true, validate: 'required', message: '请选择入驻类型' }]
      }
    }
  },
  created() {
    this.getStoreTypeList()
  },
  computed: {},
  methods: {
    // 获取 商户类型列表
    getStoreTypeList() {
      getMerchantType(this.typeParams).then((res) => {
        if (this.typeParams.parent_id == 0) {
          // this.shopTypeList = res.result
        } else {
          this.bussinessScopeList = res.result
        }
      })
    },
    check() {
      this.$refs['form-settle'].validate((valid) => {
        if (!valid) {
          this.$emit('resule', valid)
        } else {
          this.$emit('resule', valid, this.info)
        }
      })
    },
    // 获取选中的商户类型
    chooseShopType(item) {
      this.typeParams.parent_id = item.label
      this.info.shopType = item.value
      this.typeParams.bussinessScope = ''
      this.getStoreTypeList()
    },
    // 选中的经营范围
    chooseShopList(item) {
      this.info.bussinessScope = item.value;
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped></style>