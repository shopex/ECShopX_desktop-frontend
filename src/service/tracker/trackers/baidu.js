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

import Base from './base'

export default class Baidu extends Base {
  name = 'baidu'

  constructor (options) {
    super(options)

    if (process.client) {
      global._hmt = global._hmt || []

      var hm = document.createElement('script')
      hm.src = `https://hm.baidu.com/hm.js?${options.id}`
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  }

  trackEvent ({ category, action, label, value }) {
    global._hmt.push(['_trackEvent', category, action, label, value])
  }
}
