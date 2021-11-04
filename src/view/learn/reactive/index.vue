<template>
  <div>
    <el-button type="primary" @click="definePropertyClick">defineProperty</el-button>
    <el-button type="primary" @click="objectReactive">objectReactive</el-button>
    <div>
      <child></child>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import child from './child/index.vue';
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
  }
</script>

<style lang="scss" scoped>

</style>