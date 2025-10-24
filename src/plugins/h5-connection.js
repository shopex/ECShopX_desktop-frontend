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

const h5Routes = [{
  title: '首页',
  url: '/pages/index/index'
},
{
  title: '商品列表',
  url: '/pages/item/list'
},
{
  title: '商品详情',
  url: '/pages/item/detail'
},
{
  title: '购物车',
  url: '/pages/cart/index'
},
{
  title: '资讯',
  url: '/pages/article/index'
},
{
  title: '登录',
  url: '/pages/auth/login'
},
{
  title: '注册',
  url: '/pages/auth/reg'
},
{
  title: '会员中心',
  url: '/pages/member/index'
},
{
  title: '法国工艺',
  url: 'pages/technology/index'
},
{
  title: '经典传承',
  url: 'pages/story/index'
},
{
  title: '品牌资讯',
  url: 'pages/news/index'
},
{
  title: 'lookbook',
  url: 'pages/frenchstyle/index'
}]

function navigateH5 () {
  this.$route
}

function registerRoutes () {
  Vue.prototype.$navigateH5 = navigateH5
}

Vue.use(registerRoutes)