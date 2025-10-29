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
  <div class="open-source-badge">
    <img src="~/assets/imgs/powered-logo.png" alt="Powered by ECShopX" />
  </div>
</template>

<script>
export default {
  name: 'OpenSourceBadge',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.open-source-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  margin-top: 20px;
  
  img {
    max-width: 120px;
    height: auto;
    object-fit: contain;
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    padding: 12px 0;
    margin-top: 16px;
    
    img {
      max-width: 100px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      max-width: 80px;
    }
  }
}
</style>
