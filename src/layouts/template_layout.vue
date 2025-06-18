<template>
  <!-- <TemplateHoc> -->
    <!-- <HmNavigationHeader /> -->
    <div class="page-body">
      <Nuxt />
    </div>
  <!-- </TemplateHoc> -->
</template>

<script>
export default {

  head() {
    return {
      title: process.env.VUE_APP_TITLE
    }
  }
}
</script>
