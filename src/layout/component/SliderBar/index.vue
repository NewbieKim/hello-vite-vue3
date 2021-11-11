<template>
  <div>
    <div class="el-logo">
      <span>{{ !isCollapse?'运营平台':'' }}</span>
    </div>
    <!-- 循环构建菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active="2"
          :collapse="isCollapse"
          :unique-opened="true"
          :collapse-transition="false"
          :background-color="'#ffffff'"
        >
          <barItem
            v-for="data in menus"
            :key="data.url"
            :item="data"
            :base-path="data.path || ''"
            :is-collapse="isCollapse"
          />
        </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref, defineComponent, computed } from 'vue'
  import { getMenus } from '@/router/menus';
  import barItem from './barItem.vue'
  import { useUserStore } from '@/store/modules/user';
  import { useAppStore } from '@/store/modules/app';
  import { useMenusStore } from '@/store/modules/menus'
  import createMenuTree from '@/hooks/user/menu'
  let useStore = useUserStore();
  let useApp = useAppStore();
  let useMenus = useMenusStore();
  // data
  let menus = useMenus.getMenus1();
  // computed
  const isCollapse = computed(() => {
    return useApp.sliderBar.opened
  })
  // // 路由path拼接
  // let menus = createMenuTree(routes, '')
</script>

<style lang="scss" scoped>
.el-logo {
  display: flex;
  padding: 0 3px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background: #304156;
  color: #fff;
  span {
    height: 16px;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
  }
}
.sliderBar-container {
  width: 160px;
  float: left;
  background: #304156;
  .el-scrollbar {
    height: calc(100% - 79px);
  }
  .el-logo {
    /* height: 65px; */
    padding: 0 3px;
    display: flex;
    height: 80px;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(48, 65, 86);
    // padding-bottom: 15px;
    span {
      height: 16px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
