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

function resolveProxy () {
  const url = new URL(process.env.VUE_APP_API_BASE_URL)
  return {
    target: `${url.origin}`,
    path: `${url.pathname}`
  }
}

export default function ProxyModule (moduleOptions) {
  const { target, path } = resolveProxy()
  const onProxyRes = (proxyRes, req, res) => {
    var body = []
    proxyRes.on('data', function (chunk) {
      body.push(chunk)
    })
    proxyRes.on('end', function () {
      body = Buffer.concat(body).toString()
      res.end(body)
    })
  }
  const proxyOptions = {
    '/api': {
      target,
      pathRewrite: { '^/api': path },
      selfHandleResponse: true,
      onProxyRes
    }
  }
  const proxy = { ...proxyOptions, ...this.options.proxy, ...moduleOptions.proxy }
  // workaround for @nuxtjs/proxy
  this.options.proxy = proxy
  this.requireModule(['@nuxtjs/proxy'])
}
