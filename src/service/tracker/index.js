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
import Trackers from './trackers'

function enable (target, name, descriptor) {
  if (process.env.VUE_APP_TRACK) {
    return descriptor
  }

  descriptor.value = function (params) {
    console.info(`[tracker ${name}]: `, params)
  }
  return descriptor
}

const defaults = {}

class Tracker {
  constructor (options = {}) {
    if (options.provider) {
      this.use(options.provider, options.providerConfig)
    }
  }

  resolveEvent (...args) {
    let action = 'click'
    let category, label, value

    if (args.length === 1 && Array.isArray(args[0])) {
      ({ category, action, label, value } = args[0])
    } else if (args.length < 4) {
      [category, label, value] = args
    } else {
      [category, action, label, value] = args
    }

    return {
      category,
      action,
      label,
      value
    }
  }

  @enable
  use (provider, config) {
    this._tracker = Trackers.get(provider, config)
  }

  @enable
  setVar (vars) {
    Object.keys(vars).forEach(k => {
      const v = vars[k]
      log.debug('[tracker] setVar: ', vars)
      this._tracker.setVar(k, v)
    })
  }

  @enable
  trackEvents (...events) {
    if (typeof events[0] === 'string') {
      events = [events]
    }

    events.forEach(e => {
      const evt = this.resolveEvent.apply(this, Array.isArray(e)
        ? e
        : [e])
      log.debug('[tracker] trackEvents', evt)
      this._tracker.trackEvent(evt)
    })
  }
}

function createInstance (options) {
  const inst = new Tracker(options)
  return inst
}

const tracker = createInstance(defaults)

tracker.create = function (opts) {
  createInstance({
    ...defaults,
    ...opts
  })
}

const plugin = {
  install (Vue) {
    Vue.prototype.$track = tracker.trackEvents.bind(tracker)
    Vue.prototype.$trackerSet = tracker.setVar.bind(tracker)
  }
}

export default tracker
export {
  plugin
}
