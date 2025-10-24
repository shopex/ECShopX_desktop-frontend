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

import _widgets from './src'

// export const Widgets = {
//   ...widgets
// }

const install = (Vue) => {
  Object.keys(widgets).forEach((key) => {
    const widget = widgets[key]
    widget['propsComponent'] = widget.panel.name
    Vue.component(widget.name, widget)
    if (widget.panel) {
      Vue.component(widget.panel.name, widget.panel)
    }
  })
}

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

const widgets = _widgets

export { widgets }

export default {
  install

  // install(Vue) {
  //   Object.keys(widgets).forEach((key) => {
  //     const widget = widgets[key]
  //     widget['propsComponent'] = widget.panel.name
  //     Vue.component(widget.name, widget)
  //     if (widget.panel) {
  //       Vue.component(widget.panel.name, widget.panel)
  //     }
  //   })
  // }
}
