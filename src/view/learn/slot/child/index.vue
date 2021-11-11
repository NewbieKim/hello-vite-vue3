<template>
  <div>
    <h1>娘西皮 我是大头儿子</h1>
    <slot :one="lover"></slot>
    <slot name="haterRoles" :two="hater"></slot>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";
  const lover = reactive({
    name: 'Siyier',
    age: 18
  })
  const hater = reactive({
    name: 'hater',
    age: -1
  })
</script>

<style lang="scss" scoped>

</style>