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

export function couponList (params = {}) {
  return req.get('/shop.coupon', params, { withAuth: true })
}

export function receiveCoupon (params = {}) {
  return req.post('/shop.coupon.receive', params, { withAuth: true })
}

export function getShop (params = {}) {
  return req.get('/api/h5app/wxapp/distributor/is_valid', params, { withAuth: true })
}
// 获取附近商家
export function getNearbyShop (params) {
  return req.get('/api/h5app/wxapp/distributor/list', params,{ withAuth: true })
}
// 获取登录页图片
export function getLoginPic(params) {
  return req.get('/api/h5app/wxapp/shops/setting', params)
}
