<style lang="scss" src="@/style/index.scss"></style>

<template>
  <div class="system-container">
    <SpHeader />
    <div class="page-body">
      <Nuxt />
    </div>
    <SpFooter />
  </div>
</template>

<script>
import '@/main'
import { mapActions, mapState } from 'vuex'
// import { Header, Footer } from "@/components";
import { Tracker } from '@/service'
import { isNativeBrower } from '@/utils'
import { mixin } from '@/mixins'

export default {
  mixins: [mixin],
  head () {
    return {
      title: this.pageSeo.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.pageSeo.mate_keywords },
        { hid: 'description', name: 'description', content: this.pageSeo.mate_description }
      ]
    }
  },
  computed: {
    ...mapState({
      pageSeo: (state) => {
        return state.pageSeo
      }
    })
  },
  data() {
    return {
      pageOptions: {}
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (!isNativeBrower()) {
        window.location.href = location.origin + to.fullPath
      }
    }
  },
  created() {
    this.initStore()
  },
  mounted() {

  },
  methods: {
    // ...mapActions(["initStore"])
  }
}
</script>
