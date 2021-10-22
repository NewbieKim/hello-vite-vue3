<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRoute();
    const key = router.path;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
