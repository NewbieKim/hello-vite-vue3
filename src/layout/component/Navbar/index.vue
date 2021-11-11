<template>
  <div>
    <div class="tabs">
      <Hamburger :is-active="sliderBar.opened" @toParents="triggleSilerBar"></Hamburger>
      <!-- 已开页签区域 -->
      <!-- 右边menus -->
      <div class="right-menu">
        <span
            class="pointer"
            title="退出登录"
            @click="loginOutTab"
        >
          <i class="el-icon-s-promotion"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import Hamburger from '@/components/Hamburger/index.vue';
  import { useAppStore } from '@/store/modules/app'
  import { useUserStore } from '@/store/modules/user';

  const useApp = useAppStore();
  const useStore = useUserStore();
  const sliderBar = computed(() => {
    return useApp.sliderBar
  })

  // function
  // 是否全显左侧菜单栏
  const triggleSilerBar = () => {
    useApp.TRIGGER_BAR(false)
  }
  // 退登
  const loginOutTab = async () => {
    await useStore.LoginOut();
  }
</script>

<style lang="scss" scoped>
.tabs {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background: #fff;
}
.right-menu {
  position: absolute;
  right: 10px;
  cursor: pointer;
  height:40px;
  line-height: 40px;
  display: flex;
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
  }
}
</style>