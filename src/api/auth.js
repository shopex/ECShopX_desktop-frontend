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

export function login (params = {}) {
  return req.post("/api/h5app/wxapp/login", params, { showError: false });
}

export function logout () {
  return req.post('/user.logout', null, { withAuth: true })
}

export function login_moblie (data) {
  return req.post('/user.mobile.login', data)
}

export function reg (data) {
  return req.post('/api/h5app/wxapp/member', data)
}

export function bindwechat (data) {
  return req.post('/api/h5app/wxapp/member/bind', data)
}

export function regImg (params = {}) {
  return req.get('/api/h5app/wxapp/member/image/code', params)
}

export function regAccountVerify (params = {}, config) {
  return req.get('/user.account.verify', params, config)
}

export function regSmsCode (params = {}) {
  return req.get('/api/h5app/wxapp/member/sms/code', params)
}

export function bindSignupUser (params = {}) {
  return req.get('/user.trustlogin.bindSignupUser', params)
}

export function bindExistsUser (params = {}) {
  return req.get('/user.trustlogin.bindExistsUser', params)
}

export function regAccount (params = {}, config) {
  return req.get('/user.check.account', params, config)
}

export function modifyPassword (params = {}, config) {
  return req.post('/api/h5app/wxapp/member/reset/password', params, config)
}

// 获取注册参数
export function getRegisterParam () {
  return req.get('/api/h5app/wxapp/member/setting')
}

export function verifyVcode (params = {}, config) {
  return req.post('/user.account.verify.code', params, config)
}

export function regEmail (params = {}) {
  return req.get('/user.account.send.email', params)
}

export function bindWechatPhone(params={}){
  return req.post('/api/h5app/wxapp/member/bind',params)
}

// 协议信息获取
export function getRuleInfo (params = {}) {
  return req.get('/api/h5app/wxapp/shops/protocol', params)
}