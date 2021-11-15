<template>
  <div>
    <!-- <el-image :src="imageUrl" :preview-src-list="imagesList"></el-image> -->
    <div class="image-container">
      <el-image v-for="(item, index) in imagesList" :key="index" :src="item" :preview-src-list="imagesList"></el-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref,reactive } from "vue";
  let imagesList = reactive([
    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
  ])
  let imageUrl = 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  display: inline-block;
  .el-image {
    margin: 20px;
    width: 150px !important;
    height: 150px !important;
  }
}
</style>