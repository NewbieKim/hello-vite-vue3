<template>
  <div>
    前端网络
  </div>
  <div>
    <h4>Content-Type</h4>
    <el-button @click="handleRequest">点击请求</el-button>
  </div>
</template>

<script lang="ts" setup>
  import axios from "axios";
  // import jsonp from 'jsonp'
  import { onMounted } from "vue";

  onMounted(() => {
    handleQuery()
  })
  const handleQuery = function(): void {
    axios.get('http://localhost:3000/').then((res: any) => {
      //
    })
  }
  const handleRequest = function(): void {
    axios({
      url: 'http://localhost:3000/thirdService/upload',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      // 发送的数据
      data: {file: '1', fileName: 'file.name'}
    })
  }
  // jsonpMock
  const jsonpMock = function() {
    // jsonp({
    //   url: '',
    //   a: 1,
    //   b: 2
    // }).then((data: any) => {
    //   console.log(data)
    // })
  }
</script>

<style lang="scss" scoped>

</style>