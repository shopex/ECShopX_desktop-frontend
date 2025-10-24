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

import Vue from 'vue'
import messages from '../assets/lang'

import { locales, defaultLocale } from '../utils/language'

const i18n = {
  locales: locales,
  defaultLocale: defaultLocale,
  vueI18nLoader: true,
  seo: true,
  vueI18n: {
    messages: messages,
    fallbackLocale: 'zh'
  },
  strategy: 'prefix_and_default',
  // TODO 自动切换多语言
  // detectBrowserLanguage: {
  //   useCookie: true,
  //   cookieKey: 'i18n_redirected',
  //   alwaysRedirect: false,
  //   fallbackLocale: 'en_cn'
  // },
  detectBrowserLanguage: false
}

export default i18n
