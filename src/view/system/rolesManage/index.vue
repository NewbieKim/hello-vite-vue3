<template>
  <div>
    <div>
      role {{ userStore.userInfo }}{{ userStore.token }}
    </div>
    <el-button type="primary" @click="doAdd">点击</el-button>
    <div>点击无变化{{ state.count }}</div>
    <el-button type="primary" @click="doAdd">点击</el-button>
    <div>reactive响应式 变化{{ state1.count }}-{{ state1.age }}</div>
    <el-button type="primary" @click="doRefAdd">点击</el-button>
    <div>ref响应式 变化{{ count }}</div>
    <div>
      <el-input v-model="state.count"></el-input>
    </div>
  </div>
</template>

<script>
import { useUserStoreWithOut } from '@/store/modules/user'
import { reactive, ref, unref } from 'vue'
export default {
  name: 'rolesManage',
  setup() {
    // ref
    const count = ref(0);
    const userStore = useUserStoreWithOut();
    const state = { count: 0 }
    const state1 = reactive({ count })
    function doAdd() {
      state.count++;
      state1.count++;
    }
    function doRefAdd() {
      count.value++;
    }
    return {
      state,
      state1,
      userStore,
      doAdd,
      doRefAdd,
      count
    }
  }
}
</script>

<style lang="scss" scoped>

</style>