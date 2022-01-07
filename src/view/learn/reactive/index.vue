<template>
  <div>
    <h6>ref</h6>
    <el-button type="primary" @click="handleRef">响应Ref</el-button>
  </div>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <div>
        <h6>reactive</h6>
        <el-button type="primary" @click="handleReactive">响应Reactive</el-button>
        <ul>
          <li v-for="(item, index) in reactiveVal" :key="index">
            {{ item.name }}-{{ item.song }}
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <div>
        <h6>数组</h6>
        <el-button type="primary" @click="handleTo">响应数组</el-button>
        <p>{{ age }}-{{ name }}</p>
        <p>{{ stateAsRefs.age }}-{{ stateAsRefs.name }}</p>
        <ul>
          <li v-for="(item, index) in filesRef" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <div>
        <h6>--------vue3的监听-------</h6>
        <el-button type="primary" @click="handleWatch" >watch监听</el-button>
        <el-button @click="obj.a = 2">深度监听对象</el-button>
        <el-button @click="">计算属性</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <div>
        <h6>--------nexTick-------</h6>
        <div ref="msgDiv">{{ msg }}</div>
        <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
        <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
        <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
        <el-button type="primary" @click="handleNexTick" >handleNexTick</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
  import { ref, watch, watchEffect, reactive, toRefs, isRef, computed, nextTick} from 'vue';
  import { Base } from '@/utils/base'

  const base = new Base()
  // 实验性语法
  // const refVal = $(ref('')) // 还原 $$(refVal)
  // $(defineProps({ isLoading: Boolean }))
  const refVal = ref('')
  const reactiveVal = reactive([{ name: 'jay', song: 'By Father Name' }])
  let filesRef = []

  // toRefs 将响应式对象变成普通对象
  const state = reactive({
    age: 1111,
    name: 'xtz'
  })
  const stateAsRefs = toRefs(state)

  let { age, name } = state

  function handleRef () {
    console.log(refVal, refVal.value)
  }
  function handleReactive () {
    console.log(reactiveVal)
    let { song } = toRefs(reactiveVal[0])
    song.value = "Feng"
  }
  function handleTo () {
    filesRef = reactive([{ name: '123' }]) as any
    // toRefs 将响应式对象变成普通对象
    setTimeout(() => {
      stateAsRefs.age.value = 111000,
      stateAsRefs.name.value = 'xieh'
    }, 2000)
    console.log(filesRef)
    console.log(isRef(ref('')), isRef(toRefs(reactive({}))), isRef(stateAsRefs), stateAsRefs)
  }

  // watch监听属性
  let count = ref(0)
  watch((count), (newVal, oldVal) => { // 参数才会被监听
    console.log('属性被watch监听', newVal, oldVal)
  })
  watchEffect(() => {
    // count.value++ // 回调内部参数就会被监听
    console.log('属性被watchEffect监听，初始化会被监听一次', count)
  })
  function handleWatch() {
    count.value++
  }
  // 深度监听
  const obj = reactive({a: 1})
  watch((obj), (obj) => {
    console.log('对象obj被watch监听', obj)
  })
  watchEffect(() => {
    console.log('对象obj被watchEffect监听', obj)
  })
  let computed1 = computed(() => {
    return computed1
  })

  // nexTick
  const msg = ref('Hello Vue.')
  const msg1 = ref('')
  const msg2 = ref('')
  const msg3 = ref('')
  const msgDiv = ref(null)
  function handleNexTick () {
    msg.value = "Hello girls"
    msg1.value = msgDiv.value.innerHTML;
    nextTick(() => {
      msg2.value = msgDiv.value.innerHTML
    })
    msg3.value = msgDiv.value.innerHTML
  }

</script>

<style lang="scss" scoped>

</style>