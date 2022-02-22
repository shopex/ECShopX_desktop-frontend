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
