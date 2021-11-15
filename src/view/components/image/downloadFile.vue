<template>
  <div>
    <div>
      <span>根据文件名称下载</span>
      <el-button type="primary" @click="downloadByName">文件名下载</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  let url = ref('https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg')
  downloadByName = () => {
    window.open(url.value)
  }
</script>

<style lang="scss" scoped>

</style>