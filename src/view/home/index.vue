<template>
  <div>
    home page
    <div>
      <el-button type="primary" @click="goLogin">跳转登录</el-button>
      <el-button type="primary" @click="reDo">刷新</el-button>
    </div>
  </div>
</template>

<script>
import { useGo, useRedo } from '@/hooks/web/usePage';
import { computed, defineComponent, unref } from 'vue';
import { PageEnum } from '@/enums/pageEnum';
import { useRouter } from "vue-router" 
export default defineComponent({
  setup() {
    const router = useRouter()
    const go = useGo();
    const redo = useRedo();
    go();
    function goLogin() {
      // go(PageEnum.BASE_LOGIN);
      // 1.页面跳转 图标转动
      // let routeUrl = router.resolve({ path: "/login" });
      // window.open(routeUrl.href, '_blank');
      // 2.图标不动
      // router.push({ name: 'Login', params: {} })
      router.replace({ path: '/login' })
      // router.go(-1)
    }
    function reDo() {
      console.log('reDo')
      redo();
    }
    return {
      goLogin,
      reDo
    }
  }
})
</script>

<style lang="scss" scoped>

</style>