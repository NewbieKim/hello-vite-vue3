<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, toRaw, unref } from 'vue';
export default {
  name: 'AppMain',
  setup() {
    const router = useRoute();
    const key = computed(() => {
      console.log('router', router)
      return router.path;
    })
    return {
      key
    }
  }
}
</script>

<style lang="scss" scoped>

</style>