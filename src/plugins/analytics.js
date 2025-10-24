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
import adobe from './aa-adobe'

class Analytics {
  constructor (options = {}) {
    this.options = {}
  }

  pageReady (params) {
    let visitor = this.getVisitor()
    this.track({
      ...params,
      visitor
    })
  }

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

  track (params) {
    // console.log('--page ready--', params)
    process.env.VUE_APP_ADOBE && adobe.track(params)
  }

  // click
  event (params, eventname) {
    // console.log('--analytics event--', params, eventname)
    process.env.VUE_APP_ADOBE && adobe.event(params, eventname)
  }
}

let analytics = new Analytics()

export { analytics }
