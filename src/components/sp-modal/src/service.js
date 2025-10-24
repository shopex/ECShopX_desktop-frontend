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

import Modal from './confirm'

let modalInstance

function getModalInstance(render = undefined) {
  modalInstance =
    modalInstance ||
    Modal.newInstance({
      closable: false,
      maskClosable: false,
      showFooter: false,
      showHeader: false,
      confirm: true,
      render: render
    })

  return modalInstance
}

function confirm(options) {
  const render = 'render' in options ? options.render : undefined
  let instance = getModalInstance(render)

  options.onRemove = function() {
    modalInstance = null
  }

  instance.show(options)
}

Modal.confirm = function(props = {}) {
  return confirm(props)
}

Modal.remove = function() {
  if (!modalInstance) {
    // at loading status, remove after Cancel
    return false
  }

  const instance = getModalInstance()

  instance.remove()
}
export default Modal
