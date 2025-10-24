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

import Message from './message'

let messageInstance

function getMessageInstance( text, type ) {
  if ( messageInstance ) {
    messageInstance.remove()
  }

  messageInstance =
    messageInstance ||
    Message.newInstance({
      message: text,
      type
    })

  return messageInstance
}

function showMessage (text, type) {
  let instance = getMessageInstance(text, type)
  let options = {
    message: text,
    onRemove: function () {
      messageInstance = null
    }
  }
  instance.show(options)
  setTimeout( () => {
    // debugger
    instance.remove()
  }, 3000)
}

Message.warning = function (text) {
  return showMessage(text, 'warning')
}

Message.success = function (text) {
  return showMessage(text, 'success')
}

Message.error = function (text) {
  return showMessage(text, 'error')
}

export default Message
