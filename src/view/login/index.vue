<template>
  <div class="container">
    <el-button type="primary" @click="handleLogin">点击</el-button>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  // import { useUserStore } from '../../store/modules/user'
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
  async function handleLogin () {
    console.log('login used')
    try {
      const userInfo = await userStore.Login({
        email: '1',
        password: '1223'
      });
      if (userInfo) {
        console.log('userInfo', userInfo)
      }
    } catch {}
  }
</script>

<style lang="less" scoped>
.container {
  button {
    color: black;
  }
}
</style>