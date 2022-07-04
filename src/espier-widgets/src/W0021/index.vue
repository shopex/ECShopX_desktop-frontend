<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-W0015" :style="widgetStyle">
    <slot></slot>
    <div class="widget-W0015-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0015-body widget-body" :style="widgetBodyStyle">
        <div class="wgt-goodstab_tab">
          <div class="title "
            :style="{ backgroundColor: value.wgtBackgroundColor,borderRadius:`${value.wgtBorderRadius?'15px':'0px'}`}">
            <span class="title-span" :style="{color:value.wgtTextColor,fontSize: value.wgtTitleFontSize +'px' }">{{ value.text }}</span>
          </div>
          <div class="tabList" style="margin-left: 26px;margin-top: 25px;">
            <span class="tabItem" :style="{color:value.wgtSubTextColor,fontSize:value.wgtSubTitleFontSize +'px' }">{{ value.subTitle }}</span>
          </div>
          <!-- <ul class="tabList">
            <a class="tabItem" v-for="(tab, index) in value.data" :key="`tabitem__${index}`"
              @mouseover="handleOverShow(index)" :class="{ active: index == tabIndex }">{{ tab.text }}</a>
          </ul> -->
        </div>
        <div class="wgt-goodstab_goods">
          <div class="wgt-goodstab_goods_scroll">
            <div v-for="(item, index) in value.data" :class="[`goods-wrap`, { active: index == tabIndex }]"
              :id="`goods-wrap__${value.uuid}_${index}`" :key="`goods-wrap__${index}`">
              <div class="goods-wrap__info">
                <div class="goods-image">
                  <linkPage :mode="mode" :to="`/items/${item.goods_id}`">
                    <ImgWrap :src="item.coupons_pic" :width="378"
                      :height="115" />
                  </linkPage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    goodsPrice
  } from '../../common/comps'
  import braidStyle from './props'
  import mixins from '../../mixins'
  import ImgWrap from '../../common/img-wrap'
  import linkPage from '../../common/linkpage'
  import {
    attrs,
    LinkMaps
  } from '../../mixins/common-props'


  const WIDGET_NAME = 'W0021'

  export default {
    name: WIDGET_NAME,
    icon: 'icon-chuchuang1',
    title: '优惠券',
    mixins: [mixins],
    panel: braidStyle,
    navs: ['nav2', 'nav2-1'],
    // 挂件类型
    widgetType: ['pc', 'h5'],
    setting: {
      // 元件名称
      name: '优惠券',
      alias: '优惠券',
      text: '优惠券 >',
      type: WIDGET_NAME,
      ...attrs,
      widthDisabled: true,
      height: 462,
      heightDisabled: true,
      wgtTextColor: '#ffffffff',
      wgtBackgroundColor: '#FF5D02',
      wgtPriceColor: "#FF0036",
      wgtTitleColor: "#3B3B3B",
      wgtBorderRadius: false,
      wgtTitleFontSize: 18,
      wgtPriceFontSize: 18,
      wgtToFixed: 2,
      subTitle: '副标题',
      wgtSubTitleFontSize: 16,
      wgtSubTextColor: "#3B3B3B",
      data: [{
        coupons_id: '',
        coupons_pic: '',
        price: 123,
        coupons_name: '产品标题文案0',
        subTitle: "副标题文案最多控制副标题文案最多控制副标题文案最多控制副标",
        tagList: [],
        linkPage: 'coupons',
        linkPageLabel: '优惠券'
      }],
      foregroundColor: '#ffffffff',
      imgWidth: 200,
      imgHeight: 200
    },
    data() {
      return {
        defaultImg: '',
        tabIndex: 0,
        imgWidth: 0,
        imgHeight: 0,
        leftWidth: 0.3333
      }
    },
    components: {
      goodsPrice,
      ImgWrap,
      linkPage,
    },
    computed: {
      goodsImageStyle() {
        const {
          value
        } = this
        return {
          // width: Math.floor((value.width * (1 - this.leftWidth)) / 2),
          // height: Math.floor((value.width * (1 - this.leftWidth)) / 2)
          width: 200,
          height: 200
        }
      }
    },
    created() {
      // 数据兼容处理
      if (this.isRenderMode()) {
        const {
          data
        } = this.value
        data.forEach(item => {
          item.data.forEach(coupons => {
            if (!coupons.coupons_id) {
              coupons = {
                coupons_id: '',
                coupons_pic: '',
                title: '',
                price: 0,
                coupons_name: '商品名称',
                tagList: [],
                linkPage: 'coupons',
                linkPageLabel: '优惠券'
              }
            }
          })
        })
        // console.log(JSON.stringify(data))
        // this.getGooditems()
      }
    },
    methods: {
      callback() {},
      handleOverShow(index) {
        this.tabIndex = index
      },
      handleClickGooditem(item) {
        if (this.isRenderMode()) {
          this.$router.push(LinkMaps[item.linkPage](item))
        }
      }
    }
  }
</script>
