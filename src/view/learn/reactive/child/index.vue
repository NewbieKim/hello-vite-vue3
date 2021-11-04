<template>
  <div>
    <el-button @click="toggle">vueuse</el-button>
  </div>
</template>

<script setup>
  import { useFullscreen } from '@vueuse/core';
  const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>

</style>