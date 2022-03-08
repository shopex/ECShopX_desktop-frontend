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
    return {
      
    }
  },
  created() {},
  methods: {
    renderGiftBtn() {
      return <div class='buy-toolbar'>
        <div class='btn disabled'>赠品不可购买</div>
      </div>
    },
    renderInstockBtn() {
      return <div class='buy-toolbar'>
        <div class='btn disabled'>商品已下架</div>
      </div>
    },
    renderOnsaleBtn() {
      const { theme } = this
      return <div class='buy-toolbar'>
        <div class='btn btn-addtocart' style={{
          backgroundColor: theme,
          borderColor: theme,
        }} onClick={this.handleAddToCart}>加入购物车</div>
        <div class='btn btn-fastbuy' style={{
          borderColor: theme,
          color: theme
        }} onClick={this.handleFastBuy}>立即购买</div>
      </div>
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
    if(is_gift) {
      return this.renderGiftBtn()
    } else if(approve_status == 'instock') {
      return this.renderInstockBtn()
    } else if(approve_status == 'onsale') {
      return this.renderOnsaleBtn()
    }
  }
}
</script>

