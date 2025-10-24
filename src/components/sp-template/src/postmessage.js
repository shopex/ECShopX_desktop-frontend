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

import { SOURCE, POST_SOURCE } from './util'

export default class PostMessage {
  constructor(postUrl) {
    this.url = postUrl
    this._$parent = window.parent
  }
  post({ action, payload }) {
    window?.parent?.postMessage(
      {
        source: SOURCE,
        payload: payload,
        action
      },
      this.url
    )
  }
  onMessage(fallback) {
    window.addEventListener('message', (event) => {
      // 确保消息来源是可信的
      // if (event.origin !== this.url) return
      if (event.data.source == POST_SOURCE) {
        fallback && fallback(event.data)
      }
    })
  }
  removeMessage() {
    window.removeEventListener('message')
  }
}
