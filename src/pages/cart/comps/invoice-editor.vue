<template>
  <div class="invoice-editor">
    <div class="form-group form-group-type">
      <SpForm ref="form-submit" :rules="rules" :model="value">
        <label
          ><input type="radio" v-model="value.title" value="individual" /> <span>个人</span></label
        >
        <label><input type="radio" v-model="value.title" value="unit" /> <span>公司</span></label>

        <template v-if="value.title === 'individual'">
          <SpFormItem prop="content" key="content">
            <span class="label-text label-required">发票抬头</span>
            <SpInput class="input-text" v-model="value.content" />
          </SpFormItem>
        </template>

        <template v-if="value.title === 'unit'">
          <SpFormItem prop="company_name" key="company_name">
            <span class="label-text label-required">公司名称</span>
            <SpInput class="input-text" v-model="value.company_name" />
          </SpFormItem>
          <SpFormItem prop="registration_number" key="registration_number">
            <span class="label-text label-required">税号</span>
            <SpInput class="input-text" v-model="value.registration_number" />
          </SpFormItem>
          <SpFormItem prop="company_address" key="company_address">
            <span class="label-text">公司地址</span>
            <SpInput class="input-text" v-model="value.company_address" />
          </SpFormItem>
          <SpFormItem prop="company_phone" key="company_phone">
            <span class="label-text">电话号码</span>
            <SpInput class="input-text" v-model="value.company_phone" />
          </SpFormItem>
          <SpFormItem prop="bankname" key="bankname">
            <span class="label-text">开户银行</span>
            <SpInput class="input-text" v-model="value.bankname" />
          </SpFormItem>
          <SpFormItem prop="bankaccount" key="bankaccount">
            <span class="label-text">银行账户</span>
            <SpInput class="input-text" v-model="value.bankaccount" />
          </SpFormItem>
        </template>
      </SpForm>
    </div>
  </div>
</template>

<script>
const defaultModel = () => ({
  'title': 'individual',
  'content': '',
  'company_name': '',
  'company_address': '',
  'company_phone': '',
  'registration_number': '',
  'bankname': '',
  'bankaccount': ''
})

const rules1 = {
  content: [{ validate: 'required', message: '请输入发票抬头' }]
}

const rules2 = {
  company_name: [{ validate: 'required', message: '请输入公司名称' }],
  registration_number: [{ validate: 'required', message: '请输入税号' }]
}

export default {
  props: {
    value: {
      type: Object,
      default() {
        return this.defaultModel()
      }
    }
  },

  computed: {
    rules: function() {
      return this.value.title === 'unit' ? rules2 : rules1
    }
  },

  created() {
    const initVal = defaultModel()
    const value = this.value
    const assignVal = { ...initVal, ...value }
    this.$emit('input', assignVal)
  }
}
</script>

<style lang="scss">
.invoice-editor {
  .form-group {
    margin: 0 0 4px;
    .form-item {
      margin-bottom: 6px;
    }
    .label-text {
      font-size: 14px;
      color: $color-primary-text;
      line-height: 26px;
      margin: 0;
    }
    .input-text {
      width: 100%;
      height: 32px;
      line-height: 32px;
      .sp-input__input {
        background: #fff;
      }
    }
  }
  .form-group-type {
    label {
      display: inline-block;
      width: 45%;
    }
  }
}
</style>
