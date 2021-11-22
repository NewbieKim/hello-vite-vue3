<template>
  <div class="loading-container" v-loading="loading">
    <div>
      <h1>指令方式</h1>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        @click="openFullScreen"
      >As a directive</el-button>
    </div>
    <div>
      <h1>函数调用方式</h1>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        @click="openFullScreen1"
      >As a Function</el-button>
    </div>
    <div>
      <h1>局部Loading</h1>
      <el-button
        type="primary"
        @click="openFullScreen2"
      >局部Loading</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import {ElLoading} from 'element-plus'
  let fullscreenLoading = ref<boolean>(false)
  let loading = ref<boolean>(false)
  function openFullScreen() {
    fullscreenLoading.value = true
    setTimeout(() => {
      fullscreenLoading.value = false
    }, 2000)
  }
  function openFullScreen1() {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
      loading.close()
    }, 2000)
  }
  function openFullScreen2() {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
</script>

<style lang="scss" scoped>

</style>