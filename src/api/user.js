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

import req from './req'

export function trustLoginBind (params) {
  return req.post('/user.trustlogin.bind', params)
}

export function trustLoginList (params = {}) {
  const redirect_uri = `${process.env.VUE_APP_HOST}/auth/redirect`

  return req.get('/user.trustlogin.list', {
    view: 'wap',
    redirect_uri,
    ...params
  })
}

export function userAttr () {
  return req.post('/user.attr', null, { withAuth: true })
}

export function userAttrSave (params) {
  return req.post('/user.attr.save', params, { withAuth: true })
}

export function bindExistsUser (params) {
  return req.post('/user.trustlogin.bindExistsUser', params)
}

export function userLicense () {
  return req.post('/user.license')
}

export function userClause (type) {
  return req.post('/user.clause', {
    type
  })
}

export function unbindLogin (params = {}) {
  return req.post('/user.trustlogin.unbind', params)
}

export function bindMobile (params = {}) {
  return req.post('/user.bindMobile', params)
}

export function userPointGet (params = {}) {
  return req.post('/user.point.get', params, { withAuth: true })
}

export function userRights () {
  return req.post('/user.rights', { withAuth: true })
}

//获取微信授权二维码
export function getWechatLoginCode(){
  return req.get(`/api/h5app/wxapp/trustlogin/params`,{ 
    trustlogin_tag: "weixin",
    version_tag: "standard",
    redirect_url: process.env.VUE_APP_HOST,
  })
}

//微信登陆
export function useWechatLogin(params={}){
  return req.post(`/api/h5app/wxapp/login`,{
    auth_type: "pc_wxqrcode",  
    url: process.env.VUE_APP_HOST,
    ...params
  },{ withAuth: true })
}

//获取第三方登录列表
export function getLoginWayList(param={}){
  return req.get(`/api/h5app/wxapp/trustlogin/list`)
}

// 店铺入驻登录接口
export function merchantLogin(param={}){
  return req.post(`/api/h5app/wxapp/merchant/login`,{
    ...param
  })
}
