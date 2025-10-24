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
.page-error {
  text-align: center;
  &__container {
    margin-bottom: 100px;
  }
  .icon {
    margin-top: 50px;
  }
  .sp-tip-message {
    padding: 50px;
    font-weight: bold;
    &__txt {
      // display: block;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
  <LayoutHoc>
  <div class="page-error page-body">
    <div v-if="statusCode === 404" class="page-error__container">
      <div class="icon">
        <img src="~/assets/imgs/404.png" alt />
      </div>
      <SpTipMessage
        :value="true"
        :tipText="$t('layouts.error.251551-0')"
        :tipLink="$t('layouts.error.251551-1')"
        to="/"
      ></SpTipMessage>
    </div>
    <div v-else class="page-error__container">
      <SpTipMessage
        :value="true"
        :tipText="$t('layouts.error.251551-2')"
        :tipLink="$t('layouts.error.251551-1')"
        to="/"
      ></SpTipMessage>
    </div>
    <!-- <Recommend /> -->
  </div>
</LayoutHoc>
</template>

<script>
import Recommend from '@/pages/items/comps/recommend'
import { analytics } from '@/plugins/analytics'

export default {
  props: ['error'],
  components: { Recommend },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  },
  mounted() {
    // analytics.errorPage(this.statusCode)
    // console.log('*****error page*****')
    // console.log(this.$store.state.user.userInfo)
  },
  methods: {}
}
</script>
