<template>
  <div>
    <el-button type="primary" @click="definePropertyClick">defineProperty</el-button>
    <el-button type="primary" @click="objectReactive">objectReactive</el-button>
    <div>
      <child :value="value" @toFlag="handleFlag"></child>
    </div>
    <h1>watch监听对象</h1>
    <div>
      <el-input v-model="count"></el-input>
      <span>{{ sexyDancer.name }}</span>
      <el-button @click="observer">observer</el-button>
    </div>
     <h1>拷贝</h1>
     <span>{{ form.name }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, reactive } from 'vue';
  import { Base } from '@/utils/base'
  import child from './child/index.vue';

  const base = new Base()
  const definePropertyClick = function(): void {
    let obj = {};
    let count = 1;
    // let getDouble = (n: number) => { return n * 2 };
    // let double = getDouble(count)
    // Object.defineProperty(obj, 'count', {
    //   get() {
    //     return count;
    //   },
    //   set(val) {
    //     count = val;
    //     double = getDouble(val);
    //   }
    // })
    let proxy = new Proxy(obj, {
      get: function(target, prop) {
        return target[prop];
      },
      set: function(target, prop, value) {
        target[prop] = value;
        if (prop === 'count') {
          double = value * 2;
        }
      },
      deleteProperty(target, prop) {
        delete target[prop];
        if (prop === 'count') {
          duuble = NaN
        }
      }
    })
    console.log(obj.count);
    obj.count = 2;
    console.log(obj.count);
    // console.log(double) // 打印2
    // obj.count = 2
    // delete obj.count
    // console.log(double) // 打印4 有种自动变化的感觉
  };
  const objectReactive = function(): void {
    let _value = 1;
    let double = 0;
    let count = {
      get value() {
        return _value;
      },
      set value(value) {
        _value = value;
        double = _value * 2;
      }
    }
    console.log(count.value,double);
    count.value = 2;
    console.log(count.value,double);
  };
  // 监听ref 普通对象
  let count = ref(0)
  watch(count, (newVal: number, oldVal: number) => {
    base.win.msg(`count值发生变化了，由${oldVal}变为了${newVal}`);
  })
  // 监听reactive对象
  let sexyDancer = reactive({
    name: 'hellodance-amo',
    sort: 'house'
  })
  watch(() => sexyDancer.name, (newVal: string, oldVal: string) => {
    base.win.msg(`sexyDancer值发生变化了，由${oldVal}变为了${newVal}`);
  })
  const observer = () => {
    sexyDancer.name = 'boogie-frantic'
  }

  const shallowCopy = (obj: any) => {
    if (typeof obj !== 'object') return
    let newObj: any = obj instanceof Array ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key];
      }
    }
    return reactive(newObj)
  }
  const deepCopy = (obj: any) => {
    if (typeof obj !== 'object') return
    let newObj: any = obj instanceof Array ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
    }
    return reactive(newObj)
  }
  // 拷贝
  const form = reactive({
    name: 'Lisa',
    nz: '36D',
    country: 'Russin'
  })
  const value = shallowCopy(form)
  const handleFlag = () => {
    console.log('flag-show', form, value)
  }
</script>

<style lang="scss" scoped>

</style>