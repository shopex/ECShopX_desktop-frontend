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

'use strict'

var Vue = require('vue')
Vue = 'default' in Vue ? Vue['default'] : Vue

var version = '2.2.2'

var compatible = /^2\./.test(Vue.version)
if (!compatible) {
  Vue.util.warn(
    'VueClickaway ' +
      version +
      ' only supports Vue 2.x, and does not support Vue ' +
      Vue.version
  )
}

// @SECTION: implementation

var HANDLER = '_vue_clickaway_handler'

function bind (el, binding, vnode) {
  unbind(el)

  var vm = vnode.context

  var callback = binding.value
  if (typeof callback !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      Vue.util.warn(
        'v-' +
          binding.name +
          '="' +
          binding.expression +
          '" expects a function value, ' +
          'got ' +
          callback
      )
    }
    return
  }

  // @NOTE: Vue binds directives in microtasks, while UI events are dispatched
  //        in macrotasks. This causes the listener to be set up before
  //        the "origin" click event (the event that lead to the binding of
  //        the directive) arrives at the document root. To work around that,
  //        we ignore events until the end of the "initial" macrotask.
  // @REFERENCE: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
  // @REFERENCE: https://github.com/simplesmiler/vue-clickaway/issues/8
  var initialMacrotaskEnded = false
  setTimeout(function () {
    initialMacrotaskEnded = true
  }, 0)

  el[HANDLER] = function (ev) {
    // @NOTE: this test used to be just `el.containts`, but working with path is better,
    //        because it tests whether the element was there at the time of
    //        the click, not whether it is there now, that the event has arrived
    //        to the top.
    // @NOTE: `.path` is non-standard, the standard way is `.composedPath()`
    var path = ev.path || (ev.composedPath ? ev.composedPath() : undefined)
    if (
      initialMacrotaskEnded &&
      (path ? path.indexOf(el) < 0 : !el.contains(ev.target))
    ) {
      return callback.call(vm, ev)
    }
  }

  document.documentElement.addEventListener('click', el[HANDLER], false)
  document.documentElement.addEventListener('touchstart', el[HANDLER], false)
}

function unbind (el) {
  document.documentElement.removeEventListener('click', el[HANDLER], false)
  document.documentElement.removeEventListener('touchstart', el[HANDLER], false)
  delete el[HANDLER]
}

var directive = {
  bind: bind,
  update: function (el, binding) {
    if (binding.value === binding.oldValue) return
    bind(el, binding)
  },
  unbind: unbind
}

var mixin = {
  directives: { onClickaway: directive }
}

// export.version = version
// export.directive = directive
// export mixin = mixin

export {
  version,
  directive,
  mixin
}
