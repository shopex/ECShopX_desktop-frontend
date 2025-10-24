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

<style lang="scss" scoped>
.radio-group {
  &__warp {
    // display: inline-block;
    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
      overflow: hidden;
    }
    .sp-radio__label {
      margin-right: 20px;
    }
  }
}
</style>

<template>
  <div :class="classes" :name="name">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf, findComponentsDownward } from '@/utils'
let seed = 0
const now = Date.now()
const getUuid = () => `RadioGroup_${now}_${seed++}`

export default {
  name: 'SpRadioGroup',
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['radio', 'checkbox'])
      },
      default () {
        return 'radio'
      }
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    name: {
      type: String,
      default: getUuid
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  computed: {
    classes () {
      return [`radio-group__warp`]
    }
  },
  mounted () {
    this.updateValue()
  },
  methods: {
    updateValue () {
      this.childrens = findComponentsDownward(this, 'SpRadio')
      if (this.childrens) {
        this.childrens.forEach(child => {
          if (this.type === 'checkbox') {
            child.currentValue = this.currentValue.indexOf(child.label) > -1
          } else {
            child.currentValue = this.currentValue === child.label
          }
          child.group = true
        })
      }
    },
    change (data) {
      if (this.type === 'checkbox') {
        let index = this.currentValue.indexOf(data.value)
        if (index > -1) {
          this.currentValue.splice(index, 1)
        } else {
          this.currentValue.push(data.value)
        }
      } else {
        this.currentValue = data.value
      }
      this.updateValue()
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
      //   this.dispatch('FormItem', 'on-form-change', data.value)
    }
  },
  watch: {
    value () {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value
        this.$nextTick(() => {
          this.updateValue()
        })
      }
    }
  }
}
</script>
