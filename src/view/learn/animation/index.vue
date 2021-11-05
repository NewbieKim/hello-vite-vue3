<template>
  <div>
    <el-button type="primary" @click="triggle">显示</el-button>
    <transition name="fade">
      <div v-if="show">你好，楚晗</div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  let show = ref(true)
  const triggle = () => {
    show.value = !show.value
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,.fade-leave-active {
    transition: opacity 0.5s linear;
  }
  .fade-enter-from,.fade-leave-to {
    opacity: 0;
  }
</style>