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

export const locales = [
    {
      code: 'en',
      name: 'English',
      language: 'en-US',
      iso: 'en-US'
    },
    {
      code: 'zh',
      name: '中文',
      iso: 'zh-CN',
      language: 'zh-CN'
    }
  ]
  
  export const languageKey = 'i18n_redirected'
  console.log('process.env.DEFAULT_LANG:', process.env.DEFAULT_LANG)
  export const defaultLocale = process.env.DEFAULT_LANG || 'en'
  