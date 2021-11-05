<template>
  <div>
    {{ userInfo.user_name }}权限
    <el-button type="primary" @click="queryMenus">查询菜单</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { useMenusStore } from '@/store/modules/menus'

  const userInfo: any = JSON.parse(sessionStorage.getItem('userInfo'));
  async function queryMenus () {
    const menusStore = useMenusStore()
    try {
      const data = await menusStore.getMenus()
      console.log('mm', data)
    } catch(error) {
      console.log('查询菜单失败', error)
    }
  }
</script>

<style lang="scss" scoped>

</style>