<style lang="scss">
.sp-footer {
}
</style>

<template>
  <div class="sp-footer">
    <!-- 挂件 -->
    <component
      mode="render"
      v-for="(wgt, index) in wgts"
      :is="wgt.type"
      :value="wgt"
      :page-props="pageConfig"
      :key="`wgt-${index}`"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SpFooter',
  data() {
    return {
      index: 0
    }
  },

  computed: {
    ...mapState({
      wgts: (state) => {
        const res = state.footerTemplate
        return res ? JSON.parse(res.params) : []
      },
      pageConfig: (state) => {
        return state.pageConfig
      }
    })
  },

  methods: {
    toggleMenu(m) {}
  }
}
</script>
