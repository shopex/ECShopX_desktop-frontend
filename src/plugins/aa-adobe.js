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

import { log } from '@/utils'
class Adobe {
  constructor (options = {}) {
    this.init()
  }

  init () {
    if (process.client) {
      window.digitalData = {
        core: {
          language: 'zh', // language of content on page
          currencyCode: 'CNY'
        },
        page: {},
        visitor: {},
        ecommerce: {}
      }
    }
  }

  track (params) {
    this.init()
    window.digitalData = {
      ...window.digitalData,
      ...params
    }
    if (window._satellite) {
      window._satellite.track('page ready')
    } else {
      console.error('adobe script load fail')
    }
    // console.log('--page--ready--', window.digitalData)
  }

  event (params, name) {
    window.digitalData.eventData = {
      ...params
    }

    window.digitalData.event = name
    // console.log('--digitalData event--', window.digitalData, window.digitalData.event)
  }
}

export default new Adobe()
