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

import store from 'store'
import { areaList } from '@/api/member'
export const state = () => ({
    region: [],
})

export const mutations = {
    SET_REGION (state, val) {
        state.region = val
    }
}

export const actions = {
    async getRegion ({ state,commit }) {
        if (state.region!='') {
            return state.region
        } else {
            let res = await areaList()
            commit('SET_REGION', res)
            return res
        }
    }
}
