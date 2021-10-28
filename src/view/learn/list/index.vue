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

<script setup>
  import { ref, reactive, computed } from 'vue'
  let title = ref('');
  let doneNum = ref(0);
  const todos = reactive([
    {
      title: '排舞',
      isDone: false
    },
    {
      title: '知识星球',
      isDone: false
    }
  ]);
  const addList = () => {
    todos.push({ title: title.value, isDone: false});
    title.value = '';
  }
  // 完成度：{{ todos.filter((v) => { return v.isDone === true }).length }} / {{ todos.length }}
  // 方法赋值
  function handleCheck(value) {
    console.log(todos.filter(v => { v.isDone === true }));
    doneNum.value = (todos.filter(v => { console.log(v.isDone); return v.isDone === true }).length);
  }
  // 计算属性
  const finish = computed(() => {
    return todos.filter(v =>  v.isDone === true ).length
  })
  const all = computed(() => {
    return todos.length;
  })
  const allDone = computed({
    get: function() {
      return finish === todos.length;
    },
    set: function (val) {
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