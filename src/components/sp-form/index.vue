<!--
// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统 
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn 
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------
-->

<style lang="scss">
.form {
  // border: 1px solid $color-border-gray-light;
  margin: 0 auto;
  // padding: 20px 30px;
  box-sizing: border-box;
}
</style>

<template>
  <div class="form" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    width: {
      type: [Number, String],
      default: null
    }
  },
  provide() {
    return { form: this }
  },
  data() {
    return {
      fields: []
    }
  },
  computed: {
    styles() {
      const width = this.width

      return {
        width: typeof width === 'number' ? `${width}px` : width
      }
    }
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
      return false
    })
  },
  methods: {
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true
        let count = 0
        let errors = {}
        this.fields.forEach((field) => {
          field.validate('', (error, props) => {
            if (error) {
              errors[props] = error
              valid = false
            }
            if (++count === this.fields.length) {
              // all finish
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid, errors)
              }
            }
          })
        })
      })
    },
    validateField(prop, cb) {
      const field = this.fields.filter((field) => field.prop === prop)[0]
      if (!field) {
        throw new Error('[warn]: must call validateField with valid prop string!')
      }

      field.validate('', cb)
    }
  }
}
</script>
