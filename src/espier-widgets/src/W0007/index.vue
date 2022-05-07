<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0007" :style="widgetStyle">
    <slot></slot>
    <!-- {{value.categoryData}} -->
    <div class="widget-w0007-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0007-body widget-body" :style="widgetBodyStyle">
        <!-- pageProps1: {{ pageProps }} -->
        <div :class="['all-category', !value.hover ? 'hover' : 'open']">
          <div class="all-category__btn" :style="{ backgroundColor: value.wgtTypeBackgroundColor, color: value.wgtTypeLabelColor, fontWeight:'800'}">
            全部商品分类
          </div>
          <div class="category-list" :style="{ paddingTop: '16px'}">
            <div class="category-main" v-for="item in value.categoryData" :key="`category-${item.category_id}`"
              @mouseover="btnHover = item.category_id" @mouseleave="btnHover = ''">
              <div class="category-main__btn" :style="{
                  backgroundColor: btnHover != item.category_id ? value.wgtBackgroundColor : value.wgtSelectColor,
                }">
                <img class="category-main__btn__img" :src="item.image_url" width="16" height="16" />

                <span class="category-main__btn_title" :style="{
                    color:value.wgtTextColor
                    }">{{ item.category_name }}</span>
                <br />
                <span :class="sindex==0?'category-main__btn_subtitle__first':''" class="category-main__btn_subtitle"
                  :style="{
                  color: value.wgtSubTextColor
                  }" v-for="(sitem, sindex) in item.children">
                  {{sitem.category_name}}
                </span>

              </div>
              <template v-if="item.children">
                <div class="category-main__con">
                  <div class="category-child" v-for="(sitem, sindex) in item.children" :key="`scategory-${sindex}`">
                    <linkPage class="category-child__btn" ctitleColor="#3B3B3B" :mode="mode"
                      :to="`/items?cat_id=${sitem.category_id}`">{{ sitem.category_name }}</linkPage>

                    <!-- <div class="category-child__btn">{{ sitem.category_name }}</div> -->
                    <div v-if="sitem.children" class="category-subchild-main">
                      <div class="category-subchild" ctitleColor="#8C8C8C" v-for="(titem, tindex) in sitem.children"
                        :key="`tcategory-${tindex}`">
                        <!-- <div class="category-subchild__btn">{{ titem.category_name }}</div> -->
                        <span class="category-subchild__line">|</span>
                        <linkPage class="category-subchild__btn" :mode="mode"
                          :to="`/items?cat_id=${titem.category_id}`"> {{ titem.category_name }}</linkPage>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="navs-con">
          <linkPage class="nav-item" v-for="(item, idx) in value.data" :key="`nav-item__${idx}`" :mode="mode"
            :to="handleLinkPage(item.pathData)"
            :ctitleColor="item.wgtHotKeywordTextColor">{{ item.title }}</linkPage>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import braidStyle from './props'
  import mixins from '../../mixins'
  import {
    attrs
  } from '../../mixins/common-props'
  import linkPage from '../../common/linkpage'
  import ImgWrap from '../../common/img-wrap'

  // 头部导航挂件
  const WIDGET_NAME = 'W0007'

  export default {
    name: WIDGET_NAME,
    icon: 'icon-caidan1',
    title: '导航菜单',
    mixins: [mixins],
    panel: braidStyle,
    navs: ['nav2', 'nav2-1'],
    // 挂件类型
    widgetType: ['pc', 'h5'],
    setting: {
      // 元件名称
      name: '导航菜单',
      alias: '导航菜单',
      text: '导航菜单',
      type: WIDGET_NAME,
      ...attrs,
      proportion: 'disabled',
      height: 40,
      heightDisabled: true,
      customerThemeEnabled: true,
      wgtTypeBackgroundColor:'#FF5D02',
      wgtTypeLabelColor:'#FFFFFF',
      wgtBackgroundColor: '#FFFFFF',
      wgtSelectColor: '#F5F6FA',
      wgtTextColor: '#3B3B3B',
      wgtSubTextColor: '#8C8C8C',
      // 分类数据
      categoryData: [],
      hover: false,
      // 展开菜单位置
      menuTop: 40
    },
    data() {
      return {
        btnHover: true,
      }
    },
    components: {
      ImgWrap,
      linkPage
    },
    computed: {},
    mounted() {},
    methods: {
      handleMainBtnHover() {
        this.btnHover = true
      }
    }
  }
</script>
