
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  // 状态 成功值 失败值
  status = PENDING
  value = null
  reason = null

  // 函数回调
  onFulfilledCallback = []
  onRejectedCallback = []

  // 成功状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      // 判断成功回调是否存在，如果存在就调用
      // @ts-ignore
      // this.onFulfilledCallback && this.onFulfilledCallback(value)
      while (this.onFulfilledCallback.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        // @ts-ignore
        this.onFulfilledCallback.shift()(value)
      }
    }
  }
  // 失败状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      // @ts-ignore
      // this.onRejectedCallback && this.onRejectedCallback(reason)
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
    }
  }
  // then 返回值穿透
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        // 调用成功回调，并且把值返回
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        // 传入 resolvePromise 集中处理
        resolvePromise(x, resolve, reject);
      } else if (this.status === REJECTED) {
        // 调用失败回调，并且把原因返回
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        // PENDING状态 目前不知道明确状态
        // resolve在setTimeout中返回
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })
    return promise2
  }
}

function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
export default MyPromise