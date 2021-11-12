<template>
  <div>
    <span class="dustbin">🗑</span>
    <div class="container">
      <el-input v-model="title" @keydown.enter="addList" />
      <div class="list-container">
        <ul>
          <transition-group name="list" tag="ul">
            <li v-for="(item, index) in todos" :key="index">
              <input type="checkbox" v-model="item.isDone">
              <span>{{ item.title }}</span>
              <span @click="removeItem($event, index)">❌</span>
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
    <div class="animate-wrap">
      <transition @before-enter="beforeEnterAnimation" @enter="enterAnimation" @after-enter="afterEnterAnimation">
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'List1',
  setup() {}
})
</script>
<script lang="ts" setup>
  import { ref, reactive, computed, watchEffect } from 'vue'
  import useStorage from '@/hooks/learn/useStorage'
  import {Base} from '@/utils/base'
  let title: any = ref('');
  let doneNum = ref(0);
  // 弹框显示字段
  let show = ref(false)
  // 动画
  let animate = reactive({
    show: false,
    el: null
  })
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

  // remove动画效果
  const removeItem = (e: any, i: number) => {
    animate.el = e.target;
    animate.show = true;
    todos.splice(i , 1)
  }
  // 类似垃圾箱拖拽动画实现
  const beforeEnterAnimation = (el: any) => {
    let dom: any = animate.el;
    console.log('dom', dom, el);
    // 获取浏览器鼠标位置
    let rect = dom.getBoundingClientRect()
    console.log('rect', rect, window.innerWidth)
    let x = window.innerWidth - rect.left - 60;
    let y = rect.top - 100;
    // let x = 1000;
    // let y = 100;
    console.log('x y', x, y);
    el.style.transform = `translate(-${x}px,-${y}px)`
  }
  const enterAnimation = (el: any, done: any) => {
    document.body.offsetHeight;
    el.style.transform = `translate(0,0)`;
    el.addEventListener('transitionend', done)
  }
  const afterEnterAnimation = (el: any) => {
    animate.show = false;
    el.style.display = 'none';
  }
</script>

<style lang="scss" scoped>
.dustbin {
  left: 200px;
  position: relative;
  top: 30px;
}
.animate-wrap .animate {
  position: relative;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 1s linear;
}
.container {
  margin: 0 auto;
  width: 20%;
}
.modal-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(30px);
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
  transform: translateX(30px);
}
</style>