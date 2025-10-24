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

<style lang="scss" scoped>
.product-swiper {
    position: relative;
    .swiperBox {
        margin: 10px 0;
        .swiper-slide {
        .img-warp {
            display: inline-block;
            border: 1px solid #000;
            font-size: 0;
            img {
            @include pdt-img(100px);
            }
        }
        }
    }
    }
</style>

<template>
    <div class="product-swiper">
        <div class="swiper swiperBox" v-swiper:swiper="swiperOption" ref="swiperBox">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(sitem, sindex) in orders" :key="sindex">
            <div class="img-warp">
                <img :src="resolveImgPath(sitem.pic_path, 't')" />
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { resolveImgPath } from '@/utils'
export default {
  props: {
    value: Array
  },
  data () {
    return {
      orders: this.value,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
  },
  methods: {
    resolveImgPath (url, size) {
      return (resolveImgPath(url, size))
    }
  }
}
</script>
