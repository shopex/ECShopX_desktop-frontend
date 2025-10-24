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

import Vue from 'vue'
import { SpToast } from '@/components'

const ToastConstructor = Vue.extend(SpToast)
let gToast

function showToast (opt) {
  let defaultOption = {
    text: '',
    loading: false,
    duration: 5000,
    type: 'default'
  }
  let option = {}
  if (typeof opt === 'string') {
    option = Object.assign(defaultOption, { text: opt })
  } else if (Object.prototype.toString.call(opt) === '[object Object]') {
    option = Object.assign(defaultOption, opt)
  }
  // if (text instanceof Error) {
  //   text = text.msg || text.message
  // }
  gToast && gToast.close()
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    // props: {
    //   type: '1231'
    // },
    data () {
      return {
        text: option.text,
        loading: option.loading,
        showWrap: true,
        showContent: true,
        type: option.type
      }
    }
  })
  gToast = toastDom
  document.body.appendChild(toastDom.$el)

  toastDom.close = function () {
    this.showContent = false
    this.showWrap = false
  }

  if (!option.loading) {
    setTimeout(() => {
      toastDom.showContent = false
    }, option.duration - 1250)

    setTimeout(() => {
      toastDom.showWrap = false
    }, option.duration)
  }

  return toastDom
}

function registryToast () {
  Vue.prototype.$toast = showToast
}

Vue.use(registryToast)
