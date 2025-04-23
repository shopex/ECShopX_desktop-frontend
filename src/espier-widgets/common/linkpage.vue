<style lang="scss" scoped>
// 添加z-index防止:after元素盖住跳转
a {
  position: relative;
  z-index: 999;
}
</style>

<template>
  <span class="link-page">
    <a
      class="link-page__a"
      :style="{ color: ctitleColor }"
      v-if="mode == 'design' || mode == 'preview'"
      ><slot></slot
    ></a>
    <template v-else>
      <!-- 绑定router -->
      <!-- <nuxt-link class="link-page__a" v-if="to && !isTargetLink(to)" :to="to" :style = "{color:ctitleColor}"><slot></slot></nuxt-link> -->
      <!-- 未绑定router -->
      <!-- <a class="link-page__a" v-if="to && isTargetLink(to)" :style = "{color:ctitleColor}" :href="to" target="_bank"><slot></slot></a> -->
      <a class="link-page__a" v-if="to" :style="{ color: ctitleColor }" :href="to"><slot></slot></a>
      <!-- 自定义连接 -->
      <!-- <a class="link-page__a" v-if="!to" :style = "{color:ctitleColor}"><slot></slot></a> -->
      <a class="link-page__a" v-if="!to" :style="{ color: ctitleColor }"><slot></slot></a>
    </template>
  </span>
</template>
<script>
import mixins from '../mixins'
export default {
  name: 'linkPage',
  mixins: [mixins],
  props: {
    to: String,
    ctitleColor: {
      type: String,
      default: '#333333'
    }
  },
  data() {
    return {}
  },
  methods: {
    isTargetLink(to) {
      if (/^(http|https)/.test(to)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
