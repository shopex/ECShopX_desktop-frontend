<template>
  <div class="receive-wrap">
    <h4>收货人信息</h4>
    <div>收货人:{{receiveData.receiver_name}}</div>
    <div>联系方式：{{receiveData.receiver_mobile}}</div>
    <div>收货地址:{{receiveData.receiver_state}} {{receiveData.receiver_city}} {{receiveData.receiver_district}} {{receiveData.receiver_address}}</div>
    <!-- <p class="bd-border"></p>
    <h4>物流信息</h4>
    <p>物流：{{receiveData.delivery_corp_name}}</p>
    <p>运单号：{{receiveData.delivery_code}}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    receiveData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.receive-wrap {
  padding: 0 10px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  div {
    padding-bottom: 10px;
  }
  .bd-border {
    margin: 20px 0;
    border-bottom: 1px solid $color-border-gray-light;
  }
}
</style>