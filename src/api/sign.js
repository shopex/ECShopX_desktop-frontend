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

import _sortBy from 'lodash/sortBy'

const md5 = require('md5')

export default function createSign (...args) {
  const params = args
    .reduce((obj, item) => ({ ...obj, ...item }), {})

  let sparams = _sortBy(Object.keys(params).map(k => ({
    k,
    v: params[k]
  })), 'k')

  let sign = ''
  sparams.forEach(({ v, k }) => {
    if (typeof v !== 'undefined') {
      sign += `${k}${v || ''}`
    }
  })

  return md5(md5(sign).toUpperCase() + process.env.VUE_APP_TOKEN).toUpperCase()
}
