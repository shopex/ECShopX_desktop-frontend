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

import actions from './actions'

function enable (target, name, descriptor) {
  if (process.env.VUE_APP_ANALYTICS) {
    return descriptor
  }

  descriptor.value = function (type, payload) {
    if (process.env.VUE_APP_ANALYTICS_DEBUG) {
      console.info(`[analytics ${name}]:  type: ${type}, payload:`, payload)
    }
  }
  return descriptor
}

class Analytics {
  constructor (options = {}) {
    this.options = options
  }

  @enable
  pageReady (params) {
    let visitor = this.getVisitor()
    this.track({
      ...params,
      visitor
    })
  }

  @enable
  errorPage (code) {
    let page = {
      pageType: 'error',
      errorCode: code
    }
    let visitor = this.getVisitor()
    this.track({
      page,
      visitor
    })
  }

  @enable
  getVisitor () {
    // eslint-disable-next-line no-undef
    const { userInfo } = $nuxt.$store.state.user
    if (userInfo) {
      return {
        customerID: userInfo.userId,
        isRewardsMember: userInfo.grade_id,
        login_type: userInfo.login_type,
        isLoggedIn: !!userInfo
      }
    } else {
      return {
        customerID: null,
        isRewardsMember: false,
        login_type: null,
        isLoggedIn: false
      }
    }
  }

  @enable
  track (params) {
    adobe.track(params)
  }

  @enable
  event (params, evtName) {
    adobe.event(params, evtName)
  }

  @enable
  dispatch (type, payload) {
    const fn = actions[type]
    if (fn) {
      this.event(fn(payload), type)
    } else {
      console.error(`no such events: ${type}`)
    }
  }
}

export default new Analytics()
