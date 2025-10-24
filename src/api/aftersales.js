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

import req from './req'

export function info (params) {
  return req.get('/aftersales.apply.view', params, { withAuth: true })
}

export function apply (params) {
  return req.post('/aftersales.apply', params, { withAuth: true })
}

export function list (params) {
  return req.get('/aftersales.list.get', params, { withAuth: true })
}

export function logistics (params) {
  return req.post('/aftersales.send.back', params, { withAuth: true })
}

export function logisticsList () {
  return req.get('/logistics.dlycorp.get.list', { withAuth: true })
}

export function detail (params) {
  return req.get('/aftersales.detail.get', params, { withAuth: true })
}

export function uploadPic (params) {
  return req.post('/aftersales.uploadPic', params, { withAuth: true })
}
