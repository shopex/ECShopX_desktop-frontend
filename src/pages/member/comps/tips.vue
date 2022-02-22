<template>
  <div class="member__tips">{{showTips}}</div>
</template>
<script>
import { formatUsername } from '../helper.js'

export default {
  props: {
    tips: {
      type: String,
      default: '暂无数据'
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    showTips: function () {
      return formatUsername(this.userInfo, this.tips)
    }

  }
}
</script>

<style lang="scss">
  .member__tips{
    font-size: 16px;
    // color: $color-primary-text;
  }
</style>
