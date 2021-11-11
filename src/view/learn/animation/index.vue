<template>
  <div>
    <el-button type="primary" @click="triggle">显示</el-button>
    <div class="showMyLover" v-if="show">你好，楚晗</div>
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
    transition: opacity 2s ease;
  }
  .fade-enter-from,.fade-leave-to {
    opacity: 0;
  }
  .showMyLover {
    animation: show 2s ease infinite;
  }
  @keyframes show {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>