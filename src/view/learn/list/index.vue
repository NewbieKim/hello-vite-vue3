<template>
  <div>
    <div class="container">
      <el-input v-model="title" @keydown.enter="addList" />
      <div class="list-container">
        <ul>
          <li v-for="(item, index) in todos" :key="index">
            <input type="checkbox" v-model="item.isDone">
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <div>
        全选<input type="checkbox" v-model="allDone">
        完成度：{{ finish  }} / {{ all }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, watchEffect } from 'vue'
  import useStorage from '@/hooks/learn/useStorage'
  let title: any = ref('');
  let doneNum = ref(0);
  // const todos = reactive([
  //   {
  //     title: '排舞',
  //     isDone: false
  //   },
  //   {
  //     title: '知识星球',
  //     isDone: false
  //   }
  // ]);
  // 实现土豆丝的前端持久化
  // let todos = reactive(JSON.parse(localStorage.getItem('todos')) || []);
  // watchEffect(()=>{ localStorage.setItem('todos', JSON.stringify(todos))})
  // 函数封装
  let todos = useStorage('todos',[])
  const addList = () => {
    todos.push({ title: title.value, isDone: false});
    title.value = '';
  }
  // 完成度：{{ todos.filter((v) => { return v.isDone === true }).length }} / {{ todos.length }}
  // 方法赋值
  function handleCheck(value: any) {
    console.log(todos.filter(v => { v.isDone === true }));
    doneNum.value = (todos.filter(v => { console.log(v.isDone); return v.isDone === true }).length);
  }
  // 计算属性
  const finish: any = computed(() => {
    let length = todos.filter(v =>  v.isDone === true ).length
    if (length === todos.length) {
      allDone.get;
    }
    // console.log(length, todos.length);
    return length;
  })
  const all: any = computed(() => {
    return todos.length;
  })
  let allDone: any = computed({
    get: function() {
      // 响应式的变量值需要通过value获取
      return finish.value === todos.length;
    },
    set: function (val: any) {
      todos.forEach(item => {
        console.log('set', val);
        item.isDone = val;
      });
    }
  })
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 20%;
}
</style>