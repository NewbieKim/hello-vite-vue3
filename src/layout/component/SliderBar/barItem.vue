<template>
  <div :class="['menu-wrapper', isCollapse ?  'simple-mode' : 'full-mode']">
    <template v-if="!item.children">
      <el-menu-item :index="item.path + ''">
        <i :class="item.meta.icon"></i>
        <router-link :to="resolvePath(item.path)">
          {{ !isCollapse ? item.meta.title : '' }}
        </router-link>
    </el-menu-item>
    </template>
    <el-sub-menu
      v-if="item.children && item.children.length !== 0"
      :index="item.path + ''"
      popper-append-to-body
    >
      <template #title>
          <i
            :class="item.meta.icon"
          />
          <span
          >{{ !isCollapse ? item.meta.title : '' }}</span>
      </template>
      <template v-if="item.children">
          <barItem
            v-for="child in item.children"
            :key="child.path + ''"
            :item="child"
            :base-path="item.path || ''"
            :is-collapse="isCollapse"
          />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
  import { watchEffect, defineComponent, defineProps, computed } from 'vue';
  import barItem from './barItem.vue'
  import itemLink from "./itemLink.vue";
  import ItemLink from './itemLink.vue';
  // import path from 'path'
  /* data */
  const props = defineProps({
    item: { type: Object, default: {}},
    isCollapse: { type: Boolean },
    basePath: { type: String }
  });
  // 父组件菜单
  const item = props.item

  /* watch */
  watchEffect(() => {
    // console.log(`item is: ` + props.item.path)
  });

  /* function */
  function resolvePath(routePath: string) {
    return props.basePath + '/' + routePath
  }
</script>

<style lang="scss" scoped>

</style>