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
  data () {
    return {
      pageCur: 1,
      pageSize: 18,
      pageCount: -1
    }
  },
  computed: {
    pageTotal () {
      if (this.pageCount < 0) return 0

      const total = Math.ceil(this.pageCount / this.pageSize)
      return total
    }
  },
  methods: {
    async refresh (isReset) {
      if (isReset) {
        this.resetPage()
      }
      await this.goPage(this.pageCur)
    },
    resetPage () {
      this.pageCur = 1
      this.pageCount = -1
    },
    nextPage () {
      return this.goPage(this.pageCur + 1)
    },
    prevPage () {
      return this.goPage(this.pageCur - 1)
    },
    async goPage (page = 1) {
      if (page > this.pageTotal && this.pageCount !== -1) this.pageCur = this.pageTotal
      else if (page < 0) this.pageCur = 0
      else this.pageCur = page

      const { count } = await this.fetch({
        page_no: this.pageCur,
        page_size: this.pageSize
      })
      this.pageCount = count
    }
  }
}
