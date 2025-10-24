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

const hashSum = require('hash-sum')
const cacheManager = require('cache-manager')
const memCache = cacheManager.caching({
  store: 'memory', max: 100, ttl: 60 * 5/* seconds */
})

function isCacheable (path, pages = []) {
  return pages.some(p =>
    p instanceof RegExp
      ? p.test(path)
      : path === p
  )
}

const CacheMiddleware = (options, app) => async function (req, res, next) {
  if (req.method.toLowerCase() !== 'get' || !isCacheable(req.url, options.pages)) {
    return next()
  }

  const hash = hashSum({
    url: req.url
  })

  let dataFromCache
  try {
    dataFromCache = await memCache.get(hash)
  } catch (e) {
    console.log(e)
  }

  if (dataFromCache) {
    console.log('[page-cache] hit', req.url)
    return res.end(dataFromCache, 'utf8')
  }

  res.origEnd = res.end
  res.end = async function (data) {
    if (res.statusCode === 200) {
      try {
        await memCache.set(hash, data)
      } catch (e) {
        console.log(e)
      }
    }

    res.origEnd(data, 'utf-8')
  }

  next()
}

export default function PageCacheModule (moduleOptions) {
  this.addServerMiddleware(CacheMiddleware(moduleOptions, this.nuxt.server.app))
}
