<template>
  <div>
    <div class="receive-wrap" v-if="receiveData.receipt_type=='ziti'">
      <h4>自提信息</h4>
      <span v-if="receiveData.ziti_info">
        <div>自提点：
          <span>{{ receiveData.ziti_info.name }}</span>
        </div>
        <div>自提地址：
          <span>{{ receiveData.ziti_info.city }} {{ receiveData.ziti_info.area }} {{ receiveData.ziti_info.address }}</span>
        </div>
        <div>联系电话：
          <span>{{ receiveData.ziti_info.contract_phone }}</span>
        </div>
        <div>提货时间：
          <span>{{ receiveData.ziti_info.pickup_date }} {{ receiveData.ziti_info.pickup_time[0] }} - {{ receiveData.ziti_info.pickup_time[1] }}</span>
        </div>
      </span>
      <div>提货人：{{receiveData.receiver_name}}</div>
      <div>提货手机：{{receiveData.receiver_mobile}}</div>
    </div>
    <div class="receive-wrap" v-else>
      <h4>收货人信息</h4>
      <div>收货人:{{receiveData.receiver_name}}</div>
      <div>联系方式：{{receiveData.receiver_mobile}}</div>
      <div>收货地址:{{receiveData.receiver_state}} {{receiveData.receiver_city}} {{receiveData.receiver_district}} {{receiveData.receiver_address}}</div>
      <!-- <p class="bd-border"></p>
      <h4>物流信息</h4>
      <p>物流：{{receiveData.delivery_corp_name}}</p>
      <p>运单号：{{receiveData.delivery_code}}</p> -->
    </div>
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