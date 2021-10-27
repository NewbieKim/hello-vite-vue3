<template>
  <div>
    {{ userInfo.user_name }}权限
  </div>
</template>

<script setup>
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
</script>

<style lang="scss" scoped>

</style>