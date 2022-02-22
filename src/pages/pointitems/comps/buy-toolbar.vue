<template functional>
  <div class="goods-btns">
    <template v-if="props.info.approve_status == 'instock'">
      <SpButton class="btn-buy btn-warning" disabled>商品已下架</SpButton>
    </template>
    <template v-else>
      <SpButton
        class="btn-buy btn-fast-buy custom-button"
        @click="!props.buyLoading && listeners['btn-click']('fastbuy')"
        ><span class="text">立即兑换</span><span class="ec-icon2 ec-icon2-anniu-01"></span
      ></SpButton>
    </template>
  </div>
</template>
