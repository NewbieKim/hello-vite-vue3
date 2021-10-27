<template>
  <div style="color: red">
    <el-menu-item>
        <!-- <i :class="item.meta.icon"></i> -->
        <router-link :to="item.path">
          {{ item.meta.title }}
        </router-link>
      </el-menu-item>
  </div>
</template>

<script setup>
  import { watchEffect, defineComponent, defineProps } from 'vue'
  const props = defineProps({
    item: { type: Object, default: {}}
  })
  // 父组件菜单
  const item = props.item
  // console.log('props', props);
  watchEffect(() => {
    // console.log(`item is: ` + props.item.path)
  });
</script>

<style lang="scss" scoped>

</style>