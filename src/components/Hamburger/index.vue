<template>
  <div :class="[{ 'is-active': isActive }]" class="hamburger-container" @click="triggleClick">
    <i class="el-icon-s-fold"></i>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, defineEmits } from "vue";
  const props = defineProps({
    isActive: {
      type: Boolean
    }
  })
  const emits = defineEmits(['toParents']);
  const triggleClick = () => {
    emits('toParents');
  }
</script>

<style lang="scss" scoped>
.is-active {
  transform: rotate(180deg);
  cursor: pointer;
}
.hamburger-container {
  line-height: 40px;
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
  // position: absolute;
}
</style>