<template>
  <div>
    <router-view v-if="showPage" />
  </div>
</template>


<script lang="ts" setup>
  import { ref, provide, nextTick } from "vue";
  import { useRoute } from 'vue-router'
  const showPage = ref<boolean>(true)
  const onRefresh = () => {
      showPage.value = false
      nextTick(() => {
        showPage.value = true
      })
    }
  provide('reload', onRefresh)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
