<template>
  <div>
    <Line />
    <Line1 />
  </div>
</template>

<script lang="ts" setup>
  import Line from "@/components/charts/Line.vue";
  import Line1 from "@/components/charts/Line1.vue";
</script>

<style lang="scss" scoped>
::v-deep .echarts-container {
  margin: 0 auto !important;
}
</style>