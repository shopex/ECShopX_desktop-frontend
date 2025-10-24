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

const noop = () => {}

const debug = (...args) => {
  let cArgs = []
  args.forEach(item => {
    const cItem = typeof item !== 'object' ? ['%c' + item, 'color: #3e76f6; font-weight: normal;'] : item
    cArgs = cArgs.concat(cItem)
  })

  if (console.groupCollapsed) {
    console.groupCollapsed(...cArgs)
    console.trace(...args)
    console.groupEnd()
  } else {
    console.info(args)
  }
}

const log = {
  ...console,
  debug: process.env.NODE_ENV === 'development' ? debug : noop
}

export default log
