<template>
  <div>
    <Line />
    <Map />
  </div>
</template>

<script lang="ts" setup>
  import Line from "@/components/charts/Line.vue";
  import Map from "@/components/charts/Map.vue";
</script>

<style lang="scss" scoped>
::v-deep .echarts-container {
  margin: 0 auto !important;
}
</style>