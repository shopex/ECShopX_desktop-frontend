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

<style lang="scss">
.buy-toolbar {
  @include clearfix();
  .btn {
    width: 105px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    float: left;
    text-align: center;
    margin-right: 15px;
    cursor: pointer;
  }
  .disabled {
    background-color: #cdcdcd;
    color: #fbfbfb;
  }
  .btn-addtocart {
    color: #fff;
  }
  .btn-fastbuy {
    border-width: 1px;
    border-style: solid;
  }
}
</style>

<script>
export default {
  name: 'BuyToolbar',
  props: {
    info: Object,
    theme: String
  },
  inheritAttrs: false,
  data() {
    return {}
  },
  created() {},
  methods: {
    renderGiftBtn() {
      return (
        <div class='buy-toolbar'>
          <div class='btn disabled'>{ this.$t('sp-goods-info.buy-toolbar.855108-0') }</div>
        </div>
      )
    },
    renderInstockBtn() {
      return (
        <div class='buy-toolbar'>
          <div class='btn disabled'>{ this.$t('sp-goods-info.buy-toolbar.855108-1') }</div>
        </div>
      )
    },
    renderOnsaleBtn() {
      const { theme, info } = this
      return (
        <div class='buy-toolbar'>
          <div
            class='btn btn-addtocart'
            style={{
              display: info.activity_type != 'seckill' ? 'block' : 'none',
              backgroundColor: theme,
              borderColor: theme
            }}
            onClick={this.handleAddToCart}
          >
            { this.$t('sp-goods-info.buy-toolbar.855108-2') }
          </div>
          <div
            class='btn btn-fastbuy'
            style={{
              borderColor: theme,
              color: theme
            }}
            onClick={this.handleFastBuy}
          >
            { this.$t('sp-goods-info.buy-toolbar.855108-3') }
          </div>
        </div>
      )
    },
    handleAddToCart() {
      this.$emit('onAddToCart', 'cart')
    },
    handleFastBuy() {
      this.$emit('onAddToCart', 'fastbuy')
    }
  },
  render() {
    const { is_gift, approve_status } = this.info
    if (is_gift) {
      return this.renderGiftBtn()
    } else if (approve_status == 'instock') {
      return this.renderInstockBtn()
    } else if (approve_status == 'onsale') {
      return this.renderOnsaleBtn()
    }
  }
}
</script>