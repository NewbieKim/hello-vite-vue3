<template>
  <div>
    <div>
      role {{ userStore.userInfo }}{{ userStore.token }}
    </div>
  </div>
</template>

<script>
import { useUserStoreWithOut } from '@/store/modules/user'
import { reactive, ref, unref } from 'vue'
import { useRoute } from 'vue-router';
export default {
  name: 'rolesDetails',
  setup() {
    const userStore = useUserStoreWithOut();
    const route = useRoute();
    console.log(route.params.userId);
    return {
      userStore
    }
  }
}
</script>

<style lang="scss" scoped>

</style>