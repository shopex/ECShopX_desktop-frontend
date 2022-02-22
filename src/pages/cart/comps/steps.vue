<template>
  <div class="cart-steps">
    <ul class="steps-list">
      <li class="step-item">1. 购物袋</li>
      <li class="step-item">2. 填写和提交订单信息</li>
      <li class="step-item">3. 成功提交订单</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.cart-steps {
  padding: 20px 0;
  font-size: $font-size-large;
  .step-item {
    display: inline-block;
    padding: 0 20px 0 0;
    &.is-active {
      font-weight: bold;
    }
  }
}
</style>
