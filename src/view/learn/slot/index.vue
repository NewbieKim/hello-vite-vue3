<template>
  <div>
    <h1>阿西吧 我是小头爸爸</h1>
    <child>
      <template v-slot="{one}">
        <p style="color: rgb(131, 131, 87)">我是bb：{{one.name}}</p>
        <p style="color: red">我是插槽：血色玫瑰</p>
        <p style="color: green">我是插槽：绿野仙踪</p>
      </template>
      <template v-slot:haterRoles="jb">狗带：{{ jb.two.name }}</template>
    </child>
  </div>
</template>

<script lang="ts" setup>
  import child from './child/index.vue'
</script>

<style lang="scss" scoped>

</style>