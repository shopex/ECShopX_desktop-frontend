import req from './req'

export function storeSeach (params = {}) {
  return req.get('/store.search', params, { withAuth: true })
}
