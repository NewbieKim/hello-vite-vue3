<template>
  <div>
    <el-button class="" @click="handleClick">模拟Promise</el-button>
    <el-button class="" @click="shallowCopyClick">shallowCopyClick</el-button>
    <el-button class="" @click="deepCopyClick">deepCopyClick</el-button>
  </div>
</template>

<script lang="ts" setup>
  import myPromise from '@/utils/myPromise'
  import {Base} from '@/utils/base'
  const base = new Base()
  const promise = new myPromise((resolve, reject) => {
    // resolve('success')
    setTimeout(() => {
      resolve('success')
    }, 2000);
    // reject('err')
  })
  const handleClick = function() {
    promise.then(value => {
      console.log('1')
      console.log('resolve', value)
      return new Promise((resolve) => {
        resolve('other Promise')
      })
    }, reason => {
      console.log('reject', reason)
    }).then(value => {
      console.log('2')
      console.log('resolve', value)
    })
  }
  const shallowCopyClick = function() {
    let obj = { name: { name: 'kk' }, age: 18, map: new Map(), set: new Set(), reg: new RegExp('') };
    // obj.target = obj
    // const obj2 = Object.assign({}, obj);
    // let obj2 = JSON.parse(JSON.stringify(obj))
    obj.map.set('a', true)
    obj.map.set('b', new Set())
    let obj2 = base.util.deepClone(obj)
    obj2.name.name = 'ss'
    console.log(obj, obj2);//{ name: 'sss', age: 18 }
  }
  const deepCopyClick = function () {
    let arr = [1,2,3]
    let target = arr
    console.log(arr, target)
  }
</script>

<style lang="scss" scoped>

</style>