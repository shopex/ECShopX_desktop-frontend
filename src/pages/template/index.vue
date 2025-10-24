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

<template>
  <div className="sp-page-template">
   
        <SpTemplate :list="list" type="edit" />

  </div>
</template>
<script>
import PostMessage from '@/components/sp-template/src/postmessage'
import { ACTIONS, SOURCE } from '@/components/sp-template/src/util'
export default {
  layout: 'template_layout',
  data() {
    return {
      list: []
    }
  },
  methods: {
    listener() {
      this.postmessage.onMessage((data) => {
        switch (data.action) {
          case ACTIONS.UPDATE:
            const list = [...data.payload.value]
            this.list = list
            break
        }
      })
    }
  },

  created() {
    this.postmessage = new PostMessage()
  },
  mounted() {
    if (this.$route.query.type && this.$route.query.type.includes('edit')) {
      this.listener()
    }
  }
}
</script>
<style lang="scss">
.template-edit {
   background: #fff;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, .1);
    flex: 1;
    overflow: auto;
}
</style>
