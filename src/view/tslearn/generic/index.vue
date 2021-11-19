<template>
  <div>
    <el-button @click="getCourseInfo">泛型初体验</el-button>
  </div>
</template>

<script lang="ts" setup>
  let courseInfo = {
    '课程名字': '程序员把妹72招',
    '价格': '￥9999.99',
    '受众': '前端臭弟弟'
  }
  const getProperty = <T, K extends keyof T>(o: T, name: K): T[K] => {
    return o[name]
  }
  function getCourseInfo() {
    console.log(getProperty(courseInfo, '课程名字'))
  }
</script>

<style lang="scss" scoped>

</style>