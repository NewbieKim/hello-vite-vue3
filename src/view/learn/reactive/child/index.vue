<template>
  <div>
    <el-button @click="toggle">全屏</el-button>
    <el-form :model="value">
      <el-form-item label="姓名">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="三味">
        <el-input v-model="value.nz" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="国籍">
        <el-input v-model="value.country"></el-input>
      </el-form-item>
      <el-button @click="toFlag">toFlag</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core';
  import { defineProps, defineEmits } from "vue";
  const { isFullscreen, enter, exit, toggle } = useFullscreen();
  const props = defineProps({
    value: { type: Object }
  })
  const emits = defineEmits(['toFlag'])
  const toFlag = () => {
    emits('toFlag', 'success')
  }
</script>

<style lang="scss" scoped>

</style>