
<template>
  <Rate :value="score"></Rate>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Rate from './child/index.vue'
  let score = ref(3)
  let score1 = ref(5)
  let score2 = ref(1)
</script>

<style lang="scss" scoped>

</style>