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

import { importAll } from '@/utils'
import req, { CreateAxios } from './req'

let api = {}

importAll(require.context('./', false, /\.js$/), (key, r) => {
  const keyPath = key.match(/\.\/(.+)\.js$/)[1]
  if (!['index', 'sign'].includes(keyPath)) {
    api[keyPath] = r(key)
  }
})

export default api
export {
  req,
  CreateAxios
  // createAxios
}
