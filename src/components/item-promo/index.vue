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
export default {
  functional: true,

  name: 'SpItemPromo',

  props: {
    info: Object
  },

  render (h, context) {
    const { info } = context.props

    return (
      <div class="item-promo">
        <span class="item-promo__tag">{info.promotion_tag}</span>
        <div class="item-promo__name">{info.promotion_name}</div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.item-promo {
  color: $color-brand-primary;
  font-size: 13px;
  &__tag {
    border: 1px solid $color-brand-primary;
    margin-right: 20px;
    padding: 1px 10px;
    display: inline-block;
    vertical-align: middle;
  }
  &__name {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>