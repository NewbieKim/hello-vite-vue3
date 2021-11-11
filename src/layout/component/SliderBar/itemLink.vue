<template>
  <div>
    <router-link :to="to">
      <slot />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps } from "vue";
  const props = defineProps({
    to: { type: String }
  })
</script>

<style lang="scss" scoped>

</style>