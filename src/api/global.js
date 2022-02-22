import req from './req'

export function getGlobalTdk(params) {
  return req.get('/api/h5app/wxapp/pagestemplate/gettdk', params)
}
