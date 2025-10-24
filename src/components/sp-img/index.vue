<!--
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
-->

<script>
import { resolveImgPath } from '@/utils'

export default {
  name: 'SpImg',

  functional: true,

  props: {
    src: String,
    size: {
      type: String,
      default: 'm' // s | t | m | l
    },
    noSize: Boolean
  },

  render(h, ctx) {
    const { src = '', size, noSize } = ctx.props
    const url = !noSize ? resolveImgPath(src, size) : src
    ctx.data.attrs.src = url

    return h('img', ctx.data, ctx.children)
  }
}
</script>
