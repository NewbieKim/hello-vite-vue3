<template>
  <RouterView>
    <template #default="{ Component }">
      <section class="app-main">
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <!-- <keep-alive>
            <router-view :key="key" />
          </keep-alive> -->
          <keep-alive>
              <component :is="Component" :key="key" />
            </keep-alive>
        </transition>
      </section>
    </template>
  </RouterView>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { computed, toRaw, unref } from 'vue';
export default {
  name: 'AppMain',
  setup() {
    const router = useRoute();
    const key = computed(() => {
      // console.log('router', router)
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