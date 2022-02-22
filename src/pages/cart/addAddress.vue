<style lang="scss">
.page-address {
  .address-body {
    padding: $edge-size $edge-margin;
  }
  .btn-container {
    padding: $edge-size $edge-margin;
  }
}
</style>

<template>
  <div class="page-address page-body">
    <div class="address-body">
      <van-picker :columns="columns" @change="onChange" />
    </div>
    <div class="btn-container">
      <SpButton type="primary" long size="large">保存</SpButton>
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'header'
  data() {
    return {
      list: [],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  created() {
    this.addressList()
  },
  methods: {
    async addressList() {
      const { list } = await this.$api.member.addressList()
      this.list = list
    },
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
    }
  }
}
</script>
