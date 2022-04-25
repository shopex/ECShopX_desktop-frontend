<style lang="scss">
.sp-goods-info {
  @include clearfix();
  .goodsinfo-left {
    float: left;
    width: 410px;
    .goods-imgs {
      width: 410px;
      height: 410px;
    }
    .goods-img-swiper {
      margin: 10px 0;
      width: 410px;
      padding: 0 20px;
      position: relative;
      .goods-imgs__slider {
        // margin-left: 30px;
      }
      .ec-icon-back {
        position: absolute;
        left: 0;
        top: 32px;
      }
      .ec-icon-right {
        position: absolute;
        right: 0;
        top: 32px;
      }
      .swiper-button-disabled {
        color: #d8d8d8;
      }
    }
  }
  .slider-item {
    overflow: hidden;
    height: 85px;
  }
  .goodsinfo-right {
    float: left;
    width: 765px;
    margin-left: 10px;
    .goodsinfo-hd {
      margin-bottom: 10px;
      @include clearfix();
    }
  }
  .goods-title {
    font-size: 18px;
    color: #646464;
    @include multi-ellipsis(2);
    width: 600px;
    float: left;
  }
  .btn-collect {
    float: right;
    cursor: pointer;
  }
  .goodsinfo-f {
    background-color: #f5f5f5;
    padding: 20px 15px;
    margin-bottom: 20px;
    .r-w {
      @include clearfix();
      height: 30px;
      line-height: 30px;
    }
    .r-c-label {
      float: left;
      color: #888;
      margin-right: 10px;
      background: #fa5eef;
      color: #fff;
      font-size: 12px;
      border-radius: 2px;
      height: 20px;
      line-height: 20px;
      margin-top: 4px;
      padding: 0 2px;
    }
    .sp-price {
      float: left;
      .price__symbol {
        font-size: 20px;
      }
      .price__int {
        font-size: 26px;
      }
      .price__decimal {
        font-size: 26px;
      }
    }
    .market-price {
      margin-left: 10px;
      margin-top: 3px;
    }
    .open-vip {
      font-size: 12px;
      margin-top: 4px;
      .vip-name {
        padding: 2px;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
      }
      .vip-discount {
        padding: 2px;
        color: #fff;
        border-radius: 4px;
      }
      .vip-desc {
        color: #888;
      }
      .espier-icon-xiangyou-01 {
        font-size: 12px;
        color: #888;
      }
    }
  }
  .promation {
    @include clearfix();
    margin-top: 20px;
    &-label {
      float: left;
      width: 68px;
      color: #888;
    }
    &-values {
      float: left;
    }
    .promat-item {
      @include clearfix();
      margin-bottom: 12px;
    }
    .promat-label {
      float: left;
      width: 40px;
      height: 15px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      margin-right: 15px;
      line-height: 15px;
      margin-top: 2px;
    }
    .promat-name {
      float: left;
      font-size: 12px;
      color: #888;
      margin-top: 1px;
    }
  }
  .goodsinfo-skus {
    margin-top: 20px;
  }
  .goodsinfo-ft {
    @include clearfix();
    .sp-num-input {
      float: left;
      margin-right: 15px;
      height: 40px !important;
      &__input {
        height: 40px;
      }
      &__btn {
        height: 40px;
        line-height: 40px;
      }
    }
    .buy-toolbar {
      float: left;
    }
  }
}
</style>
<template>
  <div class="sp-goods-info">
    <div class="goodsinfo-left">
      <div class="goods-imgs">
        <SpPhotoZoom :url="info.pics[curImgIndex]" />
      </div>
      <div class="goods-img-swiper">
        <div class="goods-imgs__slider" v-swiper:imgs="swiperOptions" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, idx) in info.pics" :key="idx">
              <div
                class="slider-item"
                :class="{ 'is-active': curImgIndex === idx }"
                @click="handleClickImg(idx)"
              >
                <img class="slider-item__img" :src="img" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
        <div class="goods-imgs__slider-btn ec-icon ec-icon-back"></div>
        <div class="goods-imgs__slider-btn ec-icon ec-icon-right"></div>
      </div>
    </div>
    <div class="goodsinfo-right">
      <div class="goodsinfo-hd">
        <div class="goods-title">{{ info.item_name }}</div>
        <div class="btn-collect" @click="handleClickCollect">
          <i
            class="ec-icon"
            :class="collected ? 'ec-icon-favorfill' : 'ec-icon-favor'"
            :style="{
              color: theme
            }"
          ></i>
          <span>{{ collected ? '取消收藏' : '收藏' }}</span>
        </div>
      </div>
      <div class="goodsinfo-f">
        <div class="r-w">
          <div class="r-c-label">{{ info | FilterPriceLabel }}</div>
          <SpPrice :value="filterPrice(info)" size="large" />
          <SpPrice class="market-price" :value="info.market_price / 100" />
        </div>
        <div class="r-w open-vip" v-if="info.vipgrade_guide_title">
          开通
          <span class="vip-name">{{ info.vipgrade_guide_title.vipgrade_name }}</span>
          <span
            class="vip-discount"
            :style="{
              backgroundColor: theme
            }"
            >享{{ info.vipgrade_guide_title.gradeDiscount }}折</span
          >
          <nuxt-link to="/">
            <span class="vip-desc"
              >{{ info.vipgrade_guide_title.guide_title_desc }}
              <i class="espier-icon espier-icon-xiangyou-01"></i>
            </span>
          </nuxt-link>
        </div>
      </div>
      <div class="promation" v-if="info.promotion_activity">
        <div class="promation-label">促销</div>
        <div class="promation-values">
          <div
            class="promat-item"
            v-for="(promat, index) in info.promotion_activity"
            :key="`promat-item__${index}`"
          >
            <div
              class="promat-label"
              :style="{
                backgroundColor: theme
              }"
            >
              {{ promat.promotion_tag }}
            </div>
            <div class="promat-name">{{ promat.marketing_name }}</div>
          </div>
        </div>
      </div>
      <div class="goodsinfo-skus" v-if="!info.nospec">
        <SpSkuPicker :info="info" :theme="theme" @change="handleChangeSku" />
      </div>
      <!-- <div>
        库存
      </div> -->
      <div class="goodsinfo-ft">
        <SpNumInput size="sm" width="50" v-model="quantity" />
        <BuyToolbar :info="info" :theme="theme" @onAddToCart="handleClickAddCart" />
      </div>
    </div>
  </div>
</template>

<script>
const swiperOptions = {
  slidesPerView: 4,
  spaceBetween: 10,
  navigation: {
    nextEl: '.ec-icon-right',
    prevEl: '.ec-icon-back'
  },
  lazy: {
    loadPrevNext: true
  },
  breakpoints: {
    768: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0
    }
  }
}
import S from '@/spx'
import BuyToolbar from './buy-toolbar'
import { connect } from 'tls';
export default {
  name: 'SpGoodsInfo',
  props: {
    info: Object,
    theme: String
  },
  components: {
    BuyToolbar
  },
  data() {
    return {
      curImg: null,
      curImgIndex: 0,
      swiperOptions,
      quantity: 1,
      curSku: null,
      selection: null,
      collected: false,

    }
  },
  filters: {
    FilterPriceLabel(info) {
      const { act_price, member_price } = info

      if (act_price) {
        return '活动价'
      } else if (member_price) {
        return '会员价'
      } else {
        return '价格'
      }
    },
    FilterPrice(info) {
      const { act_price, activity_info, member_price, price } = info
      if (activity_info) {
        return act_price / 100
      } else if (member_price) {
        return member_price / 100
      } else {
        return price / 100
      }
    }
  },
  created() {
    const { nospec } = this.info
    if (nospec) {
      this.curSku = this.info
    }
  },
  mounted() {
    console.log('getAuthToken:', S.getAuthToken())
    if (S.getAuthToken()) {
      this.getCollectionList()
    }
  },
  methods: {
    async handleClickCollect() {
      const { distributor_id, item_id } = this.info
      if (this.collected) {
        await this.$api.member.removeCollection({
          distributor_id,
          item_ids: [item_id],
          is_empty: false
        })
        this.$Message.success('商品移除收藏成功')
        this.collected = false
      } else {
        await this.$api.member.addCollection(
          {
            distributor_id
          },
          item_id
        )
        this.$Message.success('商品收藏成功')
        this.collected = true
      }
    },
    filterPrice() {
      const { activity_info } = this.info
      console.log("this.curSku",this.curSku)
      const { price,member_price,act_price }=this.curSku||{}
      if (activity_info) {
        return act_price / 100
      } else if (member_price) {
        return member_price / 100
      } else {
        return price / 100
      }
    },
    handleClickImg(index) {
      this.curImgIndex = index
    },
    handleChangeSku(sku, selection) {
      this.curSku = sku
      this.selection = selection
    },
    async getCollectionList() {
      const { distributor_id, item_id } = this.info
      const { list } = await this.$api.member.getCollectionList({
        distributor_id
      })
      const fd = list.find((item) => item.item_id == item_id)
      if (fd) {
        this.collected = true
      }
    },
    async handleClickAddCart(mode) {
      if (!this.curSku) {
        this.$Message.error('请选择规格')
        return
      }
      // const { item_id, distributor_id } = this.curSku
      const { item_id, distributor_id } = this.info;
      
      const res = await this.$store.dispatch('cart/CART_ADD', {
        item_id,
        shop_type: 'distributor',
        cart_type: mode,
        distributor_id,
        quantity: this.quantity
      })
      if (res.message) {
        this.$Message.error(res.message)
        return
      }
      if (mode == 'cart') {
        this.$Message.success('成功加入购物车')
      } else {
        this.$router.push(`/cart/checkout?mode=fastbuy&id=${distributor_id}`)
      }
    }
  }
}
</script>
