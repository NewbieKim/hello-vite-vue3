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
  import { ref, computed, onMounted, watchEffect, watch } from 'vue';
  import { useRouter, onBeforeRouteUpdate  } from 'vue-router';
  import Hamburger from '@/components/Hamburger/index.vue';
  import { useAppStore } from '@/store/modules/app'
  import { useUserStore } from '@/store/modules/user';
  import { useTagsStore } from '@/store/modules/tags'

  const router = useRouter()
  const useApp = useAppStore();
  const useStore = useUserStore();
  const useTags = useTagsStore();

  onMounted (() => {
    // console.log('onmounted',  router.currentRoute.value)
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

  // 监听路由变化
  onBeforeRouteUpdate((to: any, from: any) => {
    let flag = false
    for (let item of openTags.value) {
      if (item.title === to.meta.title) {
        useTags.setActiveIndex(to.path)
        item.path = to.path
        flag = true
      }
    }
    if (!flag) {
      useTags.addTags({ path: to.path, title: to.meta.title })
      useTags.setActiveIndex(to.path)
    }
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
  // 点击tag页签
  const handleClick = (path: string) => {
    router.push({ path: path })
  }
  // 关闭tag页签
  const handleClose = (tag: any) => {
    // 1.页签数组去除当前页签 2.去数上一个 3.去缓存
    useTags.deleteTags(tag.title)
    if (activeIndex.value === tag.path) {
      if (openTags.value && openTags.value.length >= 1) {
          useTags.setActiveIndex(openTags.value[openTags.value.length - 1].path)
          router.push({ path: activeIndex.value })
        } else {
          router.push({ path: '/' })
        }
      }
  }

  function findFirstMenu() {
    let menus = 
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