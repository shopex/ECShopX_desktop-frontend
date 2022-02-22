<style lang="scss">
.page-article {
}
</style>

<template>
  <div class="page-article page-body container">
    列表
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    imgStyle() {
      let width = 180
      return {
        width: width + 'px',
        height: Math.floor(width * 1.2825) + 'px'
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
