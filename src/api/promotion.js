import req from './req'

export function useCoupon (params = {}) {
  return req.post('/promotion.coupon.use', params, { withAuth: true })
}

export function cancelCoupon (params = {}) {
  return req.post('/promotion.coupon.cancel', params, { withAuth: true })
}
