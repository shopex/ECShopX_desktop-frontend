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

import req from "./req";

// 获取模版页面列表
export function getThemeData() {
  return req.get("/theme.tmpl", {
    platform: "pc"
  });
}

// 获取页面挂件
export function getTemplateContent(params) {
  let url = "/api/h5app/wxapp/pctemplate/getTemplateContent";
  return req.get(url, {
    ...params
  });
}

// 获取头部尾部
export function getHeaderOrFooter(params) {
  console.log('getHeaderOrFooter', params);
  let url = "/api/h5app/wxapp/pctemplate/getHeaderOrFooter";
  return req.get(url, {
    ...params
  });
}
