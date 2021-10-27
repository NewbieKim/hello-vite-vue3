<template>
  <div>
    <el-button type="primary" @click="handClick" :key="key" :vaule="value">子组件按钮</el-button>
  </div>
</template>

<script setup>
import { useAttrs, ref, inject } from "vue";

  const emit = defineEmits(['myClick'])
  const handClick = () => {
    emit('myClick', { name: 'mt', age: '18' });
  }
  // 子组件向父组件暴露属性 和 方法
  defineExpose({
    childAttr: '子属性',
    someMethods() {
      console.log('执行子组件方法');
    }
  })
  // attr
  const attrs = useAttrs();
  console.log('attrs', attrs.boys);

  // zcf emit
  const key = ref('name');
  const value = ref('wi');

  // privide
  console.log('inject', inject('name'));
</script>

<style lang="scss" scoped>

</style>