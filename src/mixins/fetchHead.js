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

export default {
  data() {
    return {
      pageType: 'item',
      currentKeywords: '',
      currentDescription: '',
      currentTitle: ''
    }
  },
  head() {
    return {
      title: this.currentTitle,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.currentKeywords },
        { hid: 'description', name: 'description', content: this.currentDescription }
      ]
    }
  },
  methods: {
    async getListAndSetSeo(incomingParams = {}, id) {
      console.log('--getListAndSetSeoasdas--')
      const globalSeo = this.$store.state.global.pageSeo
      const newParams = {
        ...incomingParams,
        is_tdk: 1
      }
      let list
      if (this.pageType === 'item') {
        list = await this.$api.item.list(newParams)
      } else if (this.pageType === 'itemDetail') {
        list = await this.$api.item.detail(id, newParams)
      } else if (this.pageType === 'pointitem') {
        list = await this.$api.item.pointsmallList(newParams)
      } else if (this.pageType === 'pointitemDetail') {
        list = await this.$api.item.pointsmallDetail(id, newParams)
      }
      let mergeObject = Object.assign({}, globalSeo, JSON.parse(JSON.stringify(list)).tdk_data)
      this.currentTitle = mergeObject.title
      this.currentKeywords = mergeObject.mate_keywords
      this.currentDescription = mergeObject.mate_description
      return list
    }
  }
}
