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
.page-license-staff {
  padding: 50px 200px;
  .licensetext {
    font-size: 20px;
    text-align: center;
  }
  //   .license {
  //      &-title: {
  //       font-size: 20px;
  //       text-align: center;
  //     }
  //   }
  @include respond(sm) {
    padding: 15px 10px;
  }
}
</style>

<template>
  <div class="page-license-staff page-body">
    <div class="licensetext">{{title}}</div>
    <div v-html="agreement"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      agreement: ''
    }
  },
  created () {
    const { type } = this.$route.query
    this.getAgreement(type)
  },
  methods: {
    async getAgreement (type) {
      const { content, title } = await this.$api.user.userClause(type)
      this.title = title
      this.agreement = content
    }
  }
}
</script>
