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
  <div class="cart-item-edit">
    <SpGoodsItem :info="info" :item_ts="false">
      <slot class="specs">
        <SkuSelector :info="info" :value="cartInfo.sku_id" @change="handleChangeSku" />
      </slot>
    </SpGoodsItem>
    <div class="cart-item-edit-actions">
      <span @click="handleClose">{{ $t('comps.cart-item-edit.878898-0') }}</span>
    </div>
    <slot name="btns">
      <div class="cart-item-edit-btns">
        <SpButton @click="handleClickBtn('fav')">{{ $t('comps.cart-item-edit.878898-1') }}</SpButton>
        <SpButton type="primary" @click="handleClickBtn('confirm')">{{ $t('comps.cart-item-edit.878898-2') }}</SpButton>
      </div>
    </slot>
  </div>
</template>

<script>
import store from 'store'
import { SpGoodsItem } from '@/components'
import SkuSelector from '@/components/sku-selector'

export default {
  components: { SpGoodsItem, SkuSelector },

  props: {
    isSelect: Boolean,
    info: Object,
    cartInfo: Object
  },

  data() {
    return {
      curSku: null
    }
  },

  methods: {
    handleClose(e) {
      this.$emit('close')
    },
    handleChangeSku(curSku, curSkuInfo) {
      this.curSku = curSku
      this.$emit('change', curSku)
    },
    async updateCartItem() {
      const { cartInfo, curSku } = this
      const params = [
        {
          cart_id: cartInfo.cart_id,
          sku_id: curSku.sku_id,
          is_checked: cartInfo.is_checked,
          selected_promotion: cartInfo.goodspromotion && cartInfo.goodspromotion.promotion_id,
          totalQuantity: cartInfo.quantity
        }
      ]
      await this.$store.dispatch('cart/updateCart', params)
      this.$emit('confirm', this.curSku)
      this.handleClose()
    },
    async handleClickBtn(type) {
      if (type === 'confirm') {
        if (!this.curSku) {
          this.$Message.error(this.$t('comps.cart-item-edit.878898-3'))
          return
        }
        this.updateCartItem()
      }

      if (type === 'fav') {
        const { item_id } = this.info
        try {
          await this.$api.member.favoriteItemAdd({ item_id })
          await this.$store.dispatch('cart/delCartInfo', { cart_id: this.cartInfo.cart_id })
          this.$Message.success(this.$t('comps.cart-item-edit.878898-4'))
          this.$emit('add-fav', item_id)
        } catch (e) {
          console.info(e)
        }
      }
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-item-edit {
  background: $color-bg-gray;
  position: relative;
  z-index: 5;
  &-actions {
    position: absolute;
    top: 16px;
    right: 10px;
    font-size: 14px;
    color: #525252;
    cursor: pointer;
  }
  &-btns {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 76%;
    text-align: right;
    .sp-btn {
      width: 200px;
      margin: 0 10px;
      font-size: $font-size-large;
    }
  }

  .goods-sku__wrap {
    width: 70%;
  }
}
</style>
