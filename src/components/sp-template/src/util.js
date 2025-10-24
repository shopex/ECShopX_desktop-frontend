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

import S from '@/spx'
import api from '@/api'
import Vue from 'vue'
export const ACTIONS = {
  UPDATE: 'update' //更新挂件
}

export const SOURCE = 'template_current'
export const POST_SOURCE = 'admin_decorate'

export function handleResloveLink(data) {
  const { id, linkPage, goodsId,linkUrl,linkType} = data
  let url = ''
  switch (linkPage) {
    case 'goods':
      url = `/items/espier-detail?id=${id || goodsId}`
      break
    case 'category':
    case 'sale_category':
      url = `/items?categoryId=${id}&isShowPils=${data.isShowPils == 0 ? 0 : 1}`
      break
    case 'custom_pc_page':
      url = '/custompage?pageid=' + id
      break
    case 'custom_page':
      url = '/custompage?pageid=' + id
      break
    case 'activity_page':
      url = '/compaign?active_id=' + id
      break
    case 'activity_pc_page':
      url = '/compaign?active_id=' + id
      break
    case 'custom_path':
      url = data.pc_path
      break
    default:
      break
  }
  if(linkPage == ''&&linkUrl  && linkType == 1){
    window.open(linkUrl)
    return
  }
  if (linkPage == 'goods') {
    this.$router.push({
      path: url,
      query: {
        // referral_page: 'homepage',
        // is_filter: '否',
        // sort_type: data.index,
      }
    })
  } else {
    if (data.linkPage == 'custom_path' && data.pc_path?.includes('/myaccount?openPointActivity')) {
      const authToken = S.getAuthToken()
      if (authToken && authToken != 'null') {
        hasPointsActivity()
      } else {
        S.showLogin(this, 'login', url)
      }
    }else {
      url && this.$router.push(url)
    }
  }
}
