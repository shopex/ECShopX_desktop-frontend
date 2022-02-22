<template>
  <div class="address__item" >
    <p class="address__item-title" v-if="info.def_addr === 1">默认地址</p>
    <SpRadio v-else type="checkbox" size="small" :value="def_addr" @change="handleEmitAction('setDef')">
      <span class="set-default-addr">设置为默认收货地址</span>
    </SpRadio>
    <div class="address__item-content">
      <p>{{info.name}}</p>
      <p>{{info.mobile}}</p>
      <p>{{info.area}},{{info.addrdetail}}</p>
      <p>{{info.zip}}</p>
    </div>
    <div class="address__item-set">
      <span @click="handleEmitAction('edit')">编辑</span>
      <span>/</span>
      <span @click="handleEmitAction('delete')">删除</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    def_addr: function () {
      const { def_addr } = this.info
      return def_addr === 1
    }
  },
  methods: {
    handleEmitAction (type) {
      const { addr_id } = this.info
      this.$emit(type, addr_id)
    }
  }
}
</script>

<style lang="scss">
.address__item {
  position: relative;
  padding: 17px 0 20px 20px;
  background-color: $color-bg-gray;
  margin-bottom: 20px;
  &-title {
    height: 22px;
    letter-spacing: 2px;
    color: $color-secondary-text;
  }
  &-content {
    letter-spacing: 2px;
    color: $color-primary-text;
    margin-top: 13px;
    p {
      margin-top: 4px;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  &-set {
    position: absolute;
    top: 20px;
    right: 10px;
    font-size: 14px;
    color: $color-primary-text;
    span {
      cursor: pointer;
    }
  }
}
</style>
