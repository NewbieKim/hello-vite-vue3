<template>
  <div>
    <div class="container">
      <el-input v-model="title" @keydown.enter="addList" />
      <div class="list-container">
        <ul>
          <transition-group name="list" tag="ul">
            <li v-for="(item, index) in todos" :key="index">
              <input type="checkbox" v-model="item.isDone">
              <span>{{ item.title }}</span>
            </li>
          </transition-group>
        </ul>
      </div>
      <div>
        全选<input type="checkbox" v-model="allDone">
        完成度：{{ finish  }} / {{ all }}
      </div>
    </div>
    <transition name="modal">
      <div class="info-wrapper" v-if="show" style="background-color:azure;width: 200px;height: 100px;">
        <div class="info">      哥，你啥也没输</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, watchEffect } from 'vue'
  import useStorage from '@/hooks/learn/useStorage'
  import {Base} from '@/utils/base'
  let title: any = ref('');
  let doneNum = ref(0);
  // 弹框显示字段
  let show = ref(false)
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
    let base = new Base();
    if (title.value.trim() !== '') {
      todos.push({ title: title.value, isDone: false});
    } else {
      show.value = true;
      setTimeout(() => {
        show.value = false
      }, 2000)
      // base.win.msg('哥，求你了，别输入为空')
    }
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
.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-leave-active {
  transition: all 0.3s ease;
}
// .list-move {
//   transition: transform 0.8 ease;
// }
.list-enter-active, .list-leave-active {
  transition: all 1s ease;
}
.list-enter-from, .list-leave-to {
  transform: translateX(-60px);
}
</style>