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

<style lang="scss" src="./index.scss" scoped></style>
<template>
  <div class="banner">
    <div
      class="bg"
      ref="bg"
      @mouseover="bgOver($refs.bg)"
      @mousemove="bgMove($refs.bg, $event)"
      @mouseout="bgOut($refs.bg)"
    >
      <transition name="fade">
        <div
          v-for="(item, i) in data.data"
          v-if="i === mark"
          :key="i"
          style="position:absolute"
          @click="linkTo(item)"
          @mouseover="stopTimer"
          @mouseout="startTimer"
        >
          <img v-if="item.imgUrl" class="img1" :src="item.imgUrl" />
        </div>
      </transition>
    </div>
    <div class="page">
      <ul class="dots">
        <li
          class="dot-active"
          v-for="(item, i) in data.data"
          :class="{ dot: i != mark }"
          :key="i"
          @click="change(i)"
        ></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "banner",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Object
    },
    usage: {
      type: String
    }
  },
  data() {
    return {
      mark: 0,
      bgOpt: {
        px: 0,
        py: 0,
        w: 0,
        h: 0
      }
    };
  },
  created() {
    this.play();
  },
  methods: {
    autoPlay() {
      this.mark++;
      const length = this.data.data.length;
      if (this.mark > length - 1) {
        // 当遍历到最后一张图片置零
        this.mark = 0;
      }
    },
    play() {
      // 每2.5s自动切换
      this.timer = setInterval(this.autoPlay, 2500);
    },
    change(i) {
      this.mark = i;
    },
    startTimer() {
      this.timer = setInterval(this.autoPlay, 2500);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    linkTo(item) {
      let href = `/#/goodsDetails?itemId=${item.goodsId}`;
      this.usage === "store" && (href = href + `&id=${this.$route.query.id}`);
      window.open("//" + window.location.host + href);
    },
    bgOver(e) {
      this.bgOpt.px = e.offsetLeft;
      this.bgOpt.py = e.offsetTop;
      this.bgOpt.w = e.offsetWidth;
      this.bgOpt.h = e.offsetHeight;
    },
    bgMove(dom, eve) {
      let bgOpt = this.bgOpt;
      let X, Y;
      let mouseX = eve.pageX - bgOpt.px;
      let mouseY = eve.pageY - bgOpt.py;
      if (mouseX > bgOpt.w / 2) {
        X = mouseX - bgOpt.w / 2;
      } else {
        X = mouseX - bgOpt.w / 2;
      }
      if (mouseY > bgOpt.h / 2) {
        Y = bgOpt.h / 2 - mouseY;
      } else {
        Y = bgOpt.h / 2 - mouseY;
      }
      dom.style["transform"] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
      dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
    },
    bgOut(dom) {
      dom.style["transform"] = "rotateY(0deg) rotateX(0deg)";
      dom.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  }
};
</script>
