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

class Cookie {
  constructor() {
    this.expire = 30
  }

  setCookie( name, value ) {
    const exp = new Date();
    exp.setTime( exp.getTime() + this.expire * 24 * 60 * 60 * 1000 );
    document.cookie =  `${name}=${escape(value)};expires=${exp.toGMTString()}`
  }

  getCookie( name ) {
    let arr = ''
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ( ( arr = document.cookie.match( reg ) ) ) {
      return unescape( arr[2] );
    }
    else {
      return null;
    } 
  }

  deleteCookie( name ) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}

const cookie = new Cookie()

export default cookie;