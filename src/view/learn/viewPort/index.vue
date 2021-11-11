<template>
  <div class="container">
    <div>
      <el-button @click="getAllPage">获取整个网页高度</el-button>
      <h1>scroll宽{{ scrollWidth }}高 {{ scroolHeight }}</h1>
      <h1>client宽{{ clientWidth }}高 {{ clientHeight }}</h1>
    </div>
    <div>
      <el-button @click="getElement()">获取元素宽高</el-button>
      <h1>宽{{ eLeft }}高 {{ eTop }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  // 整个网页啦
  let scrollWidth = ref();
  let scroolHeight = ref();
  let clientWidth = ref();
  let clientHeight = ref();
  // 当前元素
  let eLeft = ref();
  let eTop = ref();
  const getAllPage = () => {
    // 
    scrollWidth.value = document.documentElement.scrollWidth;
    scroolHeight.value = document.documentElement.scrollHeight;
    clientHeight.value = document.documentElement.clientHeight;
    clientWidth.value = document.documentElement.clientWidth;
  }
  const getElement = (el: any) => {
    eLeft.value = el.offsetLeft;
  }
</script>

<style lang="scss" scoped>
.container {
  // height: 600px;
}
</style>