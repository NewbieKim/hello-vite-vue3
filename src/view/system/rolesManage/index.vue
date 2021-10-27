<template>
  <div>
    <div @click="goDetails">
      role {{ userStore.userInfo }}
    </div>
    <div>---------响应式----------</div>
    <div>
      <el-button type="primary" @click="doAdd">点击</el-button>
      <div>点击无变化{{ state.countRef }}</div>
      <el-button type="primary" @click="doReativeAdd">点击</el-button>
      <div>reactive响应式 变化{{ count }}-{{ state1.age }}</div>
      <!-- <div>ref响应式 变化{{ count }}</div> -->
      <el-row justify="center">
        <!-- <el-button type="primary" @click="doRefAdd">点击</el-button> -->
        <el-col :span="6">
          <div style="">
        <!-- <el-input v-model="state.count"></el-input> -->
      </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { useUserStoreWithOut } from '@/store/modules/user'
import { reactive, ref, unref, toRefs, isRef } from 'vue'
import { useRouter } from 'vue-router';
export default {
  name: 'rolesManage',
  setup() {
    // ref
    // const count = ref(0);
    const userStore = useUserStoreWithOut();
    const state = { countRef: 0 }
    const state1 = reactive({ count: 0 });
    const router = useRouter();
    function doAdd() {
      console.log(isRef(state));
      console.log(unref(state));
      state.countRef++;
      // state1.count++;
    }
    function doReativeAdd() {
      console.log(isRef(state1));
      console.log(unref(state1))
      state1.count++;
    }
    // function doRefAdd() {
    //   count.value++;
    // };
    function goDetails () {
      // router.push({ path: '/system/rolesDetails/' + userStore.userId })
      router.push({ name: 'RolesDetails', params: { userId: userStore.userId } })
    }
    return {
      state,
      state1,
      ...toRefs(state1),
      userStore,
      doAdd,
      // doRefAdd,
      // count,
      doReativeAdd,
      goDetails
    }
  }
}
</script>

<style lang="scss" scoped>

</style>