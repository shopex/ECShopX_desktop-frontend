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
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
  computed: {
    ...mapState({
      pageConfig: (state) => {
        return state.pageConfig
      }
    }),
    getThemeColor() {
      const { themeColor } = this.pageConfig;
      console.log('themeColor', themeColor)
      return {
        color: themeColor
      }
    },
    getThemeBackground() {
      const { themeColor } = this.pageConfig
      return {
        backgroundColor: themeColor
      }
    },
    themeColor() {
      const { themeColor } = this.pageConfig
      console.log('themeColor', themeColor)
      return themeColor
    }
  },
  filters: {
    DateTimeFilter(date) {
      return moment(date * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    ...mapActions({
      CART_GETINFO: 'cart/CART_GETINFO'
    }),
    initStore() {
      if (process.client && S.getAuthToken()) {
        this.$store.dispatch('user/getUserInfo')
        // this.$store.dispatch( 'cart/getCartInfo' )
        this.CART_GETINFO()
      }
    }
  }
}
