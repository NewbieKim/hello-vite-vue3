<template>
  <div>
    <div class="tabs">
      <Hamburger :is-active="sliderBar.opened" @toParents="triggleSilerBar"></Hamburger>
      <!-- 已开页签区域 -->
      <div class="tags-container">
        <el-tag
          v-for="tag in openTags"
          :key="tag"
          closable
          class="tag"
          @close="handleClose(tag)"
          @click="handleClick(tag.path)"
        >
          {{ tag.title }}
        </el-tag>
      </div>
      <!-- 右边menus -->
      <div class="right-menu">
        <span
            class="right-menu-item"
            title="全屏"
            @click="toggle"
        >
          <svg-icon :name="'fullScree'" />
        </span>
        <span
            class="right-menu-item"
            title="刷新"
            @click="reFreshPage"
        >
          <svg-icon :name="'reset'" />
        </span>
        <span
            class="right-menu-item"
            title="语言"
        >
          <svg-icon :name="'lan'" />
        </span>
        <span
            class="right-menu-item"
            title="用户头像"
            @click="openSysOpt"
        >
          <svg-icon :name="'user'" />
        </span>
        <span
            class="right-menu-item"
            title="系统配置"
            @click="openSysOpt"
        >
          <svg-icon :name="'xiugai'" />
        </span>
        <span
            class="right-menu-item"
            title="退出登录"
            @click="loginOutTab"
        >
          <svg-icon :name="'loginOut'" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, watchEffect, watch, inject } from 'vue';
  import { useRouter, onBeforeRouteUpdate } from 'vue-router';
  import Hamburger from '@/components/Hamburger/index.vue';
  import { useAppStore } from '@/store/modules/app'
  import { useUserStore } from '@/store/modules/user';
  import { useTagsStore } from '@/store/modules/tags'
  import { useMenusStore } from '@/store/modules/menus'

  import { useFullscreen } from '@vueuse/core';
  import { defineProps, defineEmits } from "vue";
  const { isFullscreen, enter, exit, toggle } = useFullscreen();

  const router = useRouter()
  const useApp = useAppStore();
  const useStore = useUserStore();
  const useTags = useTagsStore();
  const useMenus = useMenusStore();
  const onRefresh: any = inject<Function>('reload')

  onMounted (() => {
    let menus = useMenus.getMenus1();
    let firstMenu = findFirstMenu(menus)
    if (firstMenu) {
      // 当前path: '/'
      if (router.currentRoute.value.path === '/') {
        useTags.addTags({ path: firstMenu.path, title: firstMenu.meta.title, name: firstMenu.name })
        useTags.setActiveIndex(firstMenu.path)
        useTags.addCacheView((router.currentRoute.value))
      } else {
        useTags.addTags({ path: router.currentRoute.value.path, title: router.currentRoute.value.meta.title, name: router.currentRoute.value.name})
        useTags.setActiveIndex(router.currentRoute.value.path)
        useTags.addCacheView((router.currentRoute.value))
      }
    } else {
      // 跳转401 页面
    }
  })

  const sliderBar = computed(() => {
    return useApp.sliderBar
  })
  let openTags = computed(() => {
    // ts-ingore
    return useTags.openTags
  })
  let activeIndex = computed(() => {
    return useTags.activeIndex
  })

  // 监听路由变化 onBeforeRouteUpdate 只会监听该路由模块下的 并不会对整个路由系统进行监听
  // onBeforeRouteUpdate((to: any, from: any) => {
  //   console.log('onBeforeRouteUpdate', to)
  // })

  watch(() => router.currentRoute.value, (to: any, from: any) => {
    console.log('watch route', to)
    let flag = false
    for (let item of openTags.value) {
      if (item.title === to.meta.title) {
        useTags.setActiveIndex(to.path)
        item.path = to.path
        flag = true
      }
    }
    if (!flag) {
      useTags.addTags({ path: to.path, title: to.meta.title, name: to.name })
      useTags.setActiveIndex(to.path)
      useTags.addCacheView((router.currentRoute.value))
    }
  })
  // function
  // 是否全显左侧菜单栏
  const triggleSilerBar = () => {
    useApp.TRIGGER_BAR(false)
    // if (sliderBar.opened === 'opened') {
    //   useApp.TRIGGER_BAR(false)
    // } else {
    //   useApp.TRIGGER_BAR(true)
    // }
  }
  // 退登
  const loginOutTab = async () => {
    await useStore.LoginOut();
  }
  // 点击tag页签
  const handleClick = (path: string) => {
    router.push({ path: path })
  }
  // 关闭tag页签
  const handleClose = (tag: any) => {
    // 1.页签数组去除当前页签 2.去数上一个 3.去缓存
    useTags.deleteTags(tag.title)
    useTags.deleteCacheView(tag.name)
    if (activeIndex.value === tag.path) {
      if (openTags.value && openTags.value.length >= 1) {
          useTags.setActiveIndex(openTags.value[openTags.value.length - 1].path)
          router.push({ path: activeIndex.value })
        } else {
          router.push({ path: '/' })
        }
      }
  }

  // 刷新页面
  const reFreshPage = () => {
    // 采用provide/inject的方式来刷新路由
    onRefresh()
    // 重定向的方式来刷新路由
    // let route = router
    // useTags.reFreshPage(route)
  }

  function findFirstMenu(menus: Array<any>) {
    if (menus && menus.length) {
      for (let item of menus) {
          if (item.children && item.children.length) {
            const children: any = findFirstMenu(item.children)
            if (children) {
              return children
            }
          } else {
            return item
          }
        }
    }
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
  .tags-container {
    .tag {
      margin-left: 10px;
    }
  }
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