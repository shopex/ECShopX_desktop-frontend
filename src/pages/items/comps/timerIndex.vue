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
  <div class="timer-index">
    <span>{{time.dd}}{{ $t('comps.timerIndex.792449-0') }}</span>
    <span>{{time.hh}}{{ $t('comps.timerIndex.792449-1') }}</span>
    <span>{{time.mm}}{{ $t('comps.timerIndex.792449-2') }}</span>
    <span>{{time.ss}}{{ $t('comps.timerIndex.792449-3') }}</span>
  </div>
</template>

<script>
export default {
  props: {
    timer: {
      type: Object,
      default: () => {
        return { dd: 0, hh: 0, mm: 0, ss: 0 }
      },
    },
  },
  data() {
    return {
      interval: null,
      time: {},
    }
  },
  created () {
      console.log(this.timer,'0');
  },
  mounted() {
    this.time = JSON.parse(JSON.stringify(this.timer))
      this.interval = setInterval(() => {
        if (this.time.ss === 0 && this.time.mm === 0 && this.time.hh === 0 && this.time.dd === 0) {
          clearInterval(this.interval)
        }
        this.time.ss -= 1
        if (this.time.ss <= 0) {
          this.time.mm -= 1
          this.time.ss = 59
          if (this.time.mm <= 0) {
            this.time.hh -= 1
            this.time.mm = 59
            if (this.time.hh <= 0) {
              this.time.dd -= 1
              this.time.hh = 23
            }
          }
        }
      }, 1000)
  },
}
</script>

<style lang="scss" scoped>
.timer-index{
    display: inline-block;
    vertical-align: top;
}
</style>