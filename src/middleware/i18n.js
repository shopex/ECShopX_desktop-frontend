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

import { locales, languageKey, defaultLocale } from '@/utils/language'
import { getlanguageByPath } from '@/utils/doc'
export default function (context) {
  const { store, route, redirect, app, isHMR, error } = context
  if (isHMR) return

  const enPath = `en`
  const zhPath = 'zh'

  const pathLang = getlanguageByPath(route.path) 
  let lang = pathLang || app.i18n.locale || defaultLocale
  const routePath = route.path;
  store.commit('SET_LANG', lang)

  app.i18n.locale = lang
  if (
    routePath.indexOf(`${lang}`) === -1 &&
    defaultLocale !== lang
  ) {
    const trans = routePath.indexOf(zhPath) !== -1
      ? {
        c: zhPath,
        r: enPath
      }
      : routePath.indexOf(enPath) !== -1
        ? {
          c: enPath,
          r: zhPath
        }
        : null;
    const path = trans ? routePath.replace(trans.c, trans.r) : `/${`${lang}`}${routePath}`
    return redirect({ path: path, query: route.query })
  }
}
