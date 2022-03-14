/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/

/**
 * 1. Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2. Promise 中有三种状态，分别为：
 * 成功 fulfilled
 * 失败 rejected
 * 等待 pending
 * 一旦状态确定就不可更改
 * 3. resolve 和 reject 函数是用来更改状态的
 * resolve : fulfilled
 * reject : rejected
 * 4. then 方法内部做的事情就是判断状态，
 * 如果状态是成功，调用成功的回调函数
 * 如果状态是失败，调用失败的回调函数
 * then 方法是被定义在原型对象中的
 * 5. then 成功回调有一个参数，表示成功的
 */
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
  constructor(executor) {
    try{
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // promise 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []

  resolve = value => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== 'pending') return
    // 状态更改为成功
    this.status = FULFILLED

    // 保存成功之后的值
    this.value = value

    // 判断成功回调是否存在，存在就调用
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) {
      this.successCallback.shift()()
    }
  }
  reject = reason => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== 'pending') return
    // 状态更改为失败
    this.status = REJECTED

    // 保存成功之后的值
    this.reason = reason

    // 判断失败回调是否存在，存在就调用
    // this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) {
      this.failCallback.shift()()
    }
  }
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      // 成功
      if (this.status === FULFILLED) {
        // 此时还没有生成promise2 需要异步执行，待promise2生成后进行判断
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
        // 失败
      } else if (this.status === REJECTED) {
        // failCallback(this.reason)
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 等待
        // 讲成功回调和失败回调存储起来
        this.successCallback.push(() => {
          // successCallback
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          // failCallback
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }
  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
      // callback()
      // return value
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
      // callback()
      // throw reason
    })
  }
  catch(failCallback) {
    // 成功不返回，只返回失败
    return this.then(undefined, failCallback)
  }
  // 所有成功才成功，一个失败即失败
  static all(array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, array[i])
        }
      }
      // resolve(result)
    })
  }
  // 返回一个promise对象
  static resolve (value) {
    // promise对象，直接返回
    if (value instanceof  MyPromise) return value
    // 变成 promise 对象返回
    return new MyPromise(resolve => resolve(value))
  }
}

/**
 * 判断 x 的值是普通值还是 promise 对象
 * 如果是普通值，直接调用 resolve
 * 如果是 promise 对象，查看 promise 对象返回的结果，再根据 promise 对象返回的结果，决定调用 resolve 还是调用 reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle...'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value => resolve(value), reason => reject(reason))
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1')
    }, 2000)
  })
}
function p2() {
  return new MyPromise((resolve, reject) => {
    reject('p2')
  })
}
p2().finally(() => {
  console.log('lll')
}).then(value => {
  console.log(value)
},value => {
  console.log(value)
})

// MyPromise.all(['a1', 'b2', p1(), p2(), 'c3']).then(value => {
//   console.log(value)
// })

const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('成功')
  // }, 2000)
  // resolve('成功')
  reject('失败')
})


// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve('other')
//   })
// }

// let p1 = promise.then(value => {
//   console.log(value)
//   // return p1
// })

// promise.then().then()
//   .then(value => {
//     console.log(value)
//     return '678'
//   }, reason => {
//     console.log(reason)
//   })
