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



export function name(params) {

}

export default {
  applyFilter (payload) {
    const { ids, name, list } = payload
    let filterOption = ''
    if (ids) {
      let arr = ids.toString().split(',')
      let names = []
      for (let item of list) {
        if (arr.indexOf(item.value.toString()) > -1) {
          names.push(item.label)
        }
      }
      filterOption = names.join(',')
    }

    return {
      filterCategory: name,
      filterOption: filterOption
    }
  },

  applySort (payload) {
    const { sortType } = payload
    return {
      sortType
    }
  },

  quickView (payload) {
    const { info } = payload
    const { item_id: id, title: name, product_type: badge, price, bn: style, woman } = info.item

    const product = [{
      id,
      name,
      badge,
      ratingAvg: '',
      ratingCount: '',
      price,
      style,
      discountAmount: '',
      discountCode: ''
    }]

    return {
      product
    }
  },
  addToWishlist (payload) {
    const { item_id: id, title: name, price, bn: style } = payload
    return {
      product: [{
        id,
        name,
        price,
        style,
        discountAmount: '',
        discountCode: ''
      }]
    }
  }
}