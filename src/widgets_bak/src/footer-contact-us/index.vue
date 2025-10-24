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

<style lang="scss">
.footer-contact-us {
  ul {
    li {
      float: left;
    }
  }
  .qr-code {
    width: 200px;
    height: 200px;
  }
  .qr-desc {
    color: #fff;
  }
  .sp-modal__content {
    text-align: center;
    background: none;
    box-shadow: none;
  }
  .mb-iconfont {
    display: none;
  }
  @include respond(sm) {
    ul {
      padding-left: 10px;
      margin-top: 15px;
    }
    .mb-iconfont {
      display: block;
    }
  }
}
</style>

<template>
  <div class="footer-contact-us" v-on-clickaway="away">
    <div class="c-h" @click="toggleShow">
      <span>{{params.title}}</span>
      <i
        class="mb-iconfont"
        :class="{'mb-iconfont-zengjia' : !show, 'mb-iconfont-jiansvg' : show }"
      ></i>
    </div>
    <no-ssr>
      <SpDpTransition>
        <div v-if="show">
          <ul class="clearfix">
            <li>
              <a :href="params.weibo.link">
                <img class="contact-icon" :src="params.weibo.icon" width="43" alt="weibo"/>
              </a>
            </li>
            <li>
              <a href="javascript: volid(0);" @click="modalShow = !modalShow">
                <img class="contact-icon" :src="params.weixin.icon" width="43" alt="weixin"/>
              </a>
            </li>
          </ul>
        </div>
      </SpDpTransition>
    </no-ssr>
    <SpModal v-model="modalShow" :width="300" :height="300" maskClose>
      <img :src="params.weixin.qrcode" alt="qrcode" class="qr-code" />
      <div class="qr-desc">扫一扫Aigle微信号：AigleChina</div>
    </SpModal>
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
export default {
  mixins: [clickaway],
  props: {
    params: Object
  },
  data () {
    return {
      show: true,
      modalShow: false
    }
  },
  computed: {
    isMobile () {
      return false
    }
  },
  methods: {
    toggleShow () {
      if (this.isMobile) {
        this.show = !this.show
      }
    },
    away: function () {
      if (this.isMobile) {
        this.show = false
      }
    }
  }
}
</script>
