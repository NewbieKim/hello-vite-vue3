<template>
  <div>
    <el-button class="" @click="handleClick">模拟Promise</el-button>
    <el-button class="" @click="handleClick2">模拟Promise2</el-button>
    <el-button class="" @click="shallowCopyClick">shallowCopyClick</el-button>
    <el-button class="" @click="deepCopyClick">deepCopyClick</el-button>
  </div>
</template>

<script lang="ts" setup>
  import myPromise from '@/utils/myPromise'
  import {Base} from '@/utils/base'
  const base = new Base()
  const promise = new myPromise((resolve, reject) => {
    resolve('success')
    // setTimeout(() => {
    //   resolve('success1')
    // }, 2000);
    // reject('err')
  })
  const handleClick = function() {
    const p1 = promise.then(value => {
      console.log('promise1')
      console.log('resolve1', value)
      throw new Error('执行器错误')
      return new Promise((resolve) => {
        resolve('success2')
      })
    }, reason => {
      console.log('error1')
      console.log('reason1', reason)
    }).then((value) => {
      console.log('promise2')
      console.log('resolve2', value)
    }, reason => {
      console.log('error1')
      console.log('reason1', reason)
      throw new Error('执行器错误')
    }).then((value) => {
      console.log('promise3')
      console.log('resolve3', value)
    },reason => {
      console.log('error2')
      console.log('reason2', reason) // 上面的错误已经捕获了 后面的错误就不应该执行到
    })
    console.log('promise then', p1)
  }
  const shallowCopyClick = function() {
    let obj = { name: { name: 'kk' }, age: 18, map: new Map(), set: new Set(), reg: new RegExp(''), 1: 2, true: 1, fun: function(){ console.log('woky')}, date: new Date()  };
    // let obj = [new Map(), 23, true, function(){ console.log('sky')}, { fun: function(){ console.log('woky')}} ]
    // obj.target = obj
    // const obj2 = Object.assign({}, obj);
    // let obj2 = JSON.parse(JSON.stringify(obj))
    obj.map.set('a', true)
    obj.map.set('b', new Set())
    let obj2 = base.util.deepClone(obj)
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