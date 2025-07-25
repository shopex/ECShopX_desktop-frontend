<style lang="scss" scoped >
</style>

<template>
  <div class="sp-analytics" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>

import { analytics } from '@/plugins/analytics'
export default {
  name: 'SpAnalytics',
  props: {
    event: Function
  },
  methods: {
    async handleClick () {
      const { res, name } = await this.event()
      analytics.event(res, name)
    }
  }
}
</script>
