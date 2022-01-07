<template>
  <div>
    <el-button @click="getCourseInfo">泛型初体验</el-button>
  </div>
  <div>
    <h6>pinia初体验</h6>
    <p>获取state的值：{{ useUser.userInfo}}</p>
    <p>获取getters的值 name：{{ name }}</p>
    <ul>
      <li v-for="(item, index) in books" :key="index">
        <p>书名：{{ item.name }}-价格{{ item.price }}-数量{{ item.count }}</p>
        <el-input v-model="item.count"></el-input>
      </li>
    </ul>
    <p>总价：{{ price }}</p>
    <el-button @click="handleAdd">patch修改state值</el-button>
    <el-button @click="handleReset">reset重置state值</el-button>
    <el-button @click="handleConsole">打印state值</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user'
  import { useCartStore } from '@/store/modules/cart'
  import { mapState, mapWritableState, storeToRefs } from 'pinia'
  import { ref, computed, onMounted } from 'vue';
  const useUser = useUserStore()
  const userCart = useCartStore()
  let { name, books, price } = storeToRefs(useCartStore()) as any

  onMounted(() => {
    console.log(books)
  })

  // 监听state和mutation的动作
  // 初始化触发了两次
  userCart.$subscribe((mutation, state) => {
    console.log('m', mutation);
    console.log('s', state);
  })

  let courseInfo = {
    '课程名字': '程序员把妹72招',
    '价格': '￥9999.99',
    '受众': '前端臭弟弟'
  }
  const getProperty = <T, K extends keyof T>(o: T, name: K): T[K] => {
    return o[name]
  }
  function getCourseInfo() {
    console.log(getProperty(courseInfo, '课程名字'))
  }

  // 获取监听pinia
  computed(() => {
    // ...mapState(useUser, ['getWatchData'])
    mapWritableState(useUser, {
      username: useUser.getWatchData()
    })
  })

  computed(() => {
    price = userCart.price
  })

  function handleAdd () {
    userCart.$patch((state) => {
      state.books[1].count = 10;
    })
  }

  function handleReset () {
    userCart.$reset();
  }

  function handleConsole () {
    console.log('userCart', userCart)
  }



</script>

<style lang="scss" scoped>

</style>