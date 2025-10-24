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

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0004" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0004-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0004-body widget-body" :style="widgetBodyStyle">
        <div class="wgt-logowall_title">
          <h4 class="name">
            <!-- <linkPage class="more" :mode="mode" :to="handleLinkPage(value.moreLinkData)"> -->
            {{ value.text }}
            <!-- </linkPage> -->
          </h4>
          <linkPage class="more" :mode="mode" :to="handleLinkPage(value.moreLinkData)">
            {{ value.moreText }}
            <i class="espier-icon espier-icon-xiangyou-01"></i>
          </linkPage>
        </div>
        <div class="wgt-logowall_list" :id="`wgt-logowall_list_${value.uuid}`">
          <!-- 默认图片大小 -->
          <div class="logowall-item" v-if="value.data.length == 0">
            <ImgWrap :src="null" :width="value.logoWidth" :height="value.logoHeight" />
          </div>

          <div
            class="logowall-item"
            v-for="(item, index) in value.data"
            :key="`logowall-item__${index}`"
            :style="{
              width: translatePx2Device(value.logoWidth),
              height: translatePx2Device(value.logoHeight)
            }"
          >
            <linkPage :mode="mode" :to="handleLinkPage(item.pathData)">
              <ImgWrap :src="item.imgUrl" :width="value.logoWidth" :height="value.logoHeight" />
            </linkPage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'
import ImgWrap from '../../common/img-wrap'

const WIDGET_NAME = 'W0004'

export default {
  name: WIDGET_NAME,
  icon: 'icon-logoqiang2',
  title: 'Logo墙',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: 'Logo墙',
    alias: 'Logo墙',
    text: 'Logo墙',
    type: WIDGET_NAME,
    ...attrs,
    // height: 400,
    column: 5,
    widthDisabled: true,
    heightDisabled: true,
    showMore: false,
    moreText: '更多',
    moreLinkData: {},
    data: [],
    logoWidth: 230,
    logoHeight: 138
  },
  data() {
    return {
      // goodsData:[],
    }
  },
  components: {
    linkPage,
    ImgWrap
  },
  computed: {},
  // watch: {
  //   'value.data': {
  //     handler: function(nval, oval) {
  //       this.calcHeight()
  //     },
  //     deep: true
  //   },
  //   'value.column': {
  //     handler: function(nval, oval) {
  //       this.calcLogoSize()
  //       this.calcHeight()
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    // this.calcHeight()
  },
  methods: {
    handleClickLogo(href) {
      if (href) {
        window.open(href, '_blank')
      }
    }
  }
}
</script>
