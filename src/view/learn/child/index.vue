<template>
  <div>
    轩弟bro
  </div>
</template>

<script lang="ts" setup>
  import mittObject from '../comProps/mitt';
  import { onUnmounted } from 'vue';
  const someMethod = () => {
    //
  }
  // 中央总线开关控制
  mittObject.on('handleChange', someMethod);
  // onUnmounted(() => {
  //   mittObject.off('handleChange', someMethod);
  // })

</script>

<style lang="scss" scoped>

</style>