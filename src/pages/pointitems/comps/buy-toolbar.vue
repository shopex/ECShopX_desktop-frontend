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

<template functional>
  <div class="goods-btns">
    <template v-if="props.info.approve_status == 'instock'">
      <SpButton class="btn-buy btn-warning" disabled>{{$t('comps.buy-toolbar.593094-0')}}</SpButton>
    </template>
    <template v-else>
      <SpButton
        class="btn-buy btn-fast-buy custom-button"
        @click="!props.buyLoading && listeners['btn-click']('fastbuy')"
        ><span class="text">{{$t('comps.buy-toolbar.593094-1')}}</span><span class="ec-icon2 ec-icon2-anniu-01"></span
      ></SpButton>
    </template>
  </div>
</template>
