<template>
  <div>
    <slot :user="user"></slot>
  </div>
</template>

<script setup>
  const user = {
    name: 'kikim'
  }
</script>

<style lang="scss" scoped>

</style>