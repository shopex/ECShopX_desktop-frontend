<template>
    <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Col',
  computed: {
    classes () {
      return []
    },
    styles () {
      return {}
    }
  }
}
</script>
