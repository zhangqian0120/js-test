// lodash 中的 curry 基本使用
const _ = require('lodash')

function getSum(a, b, c) {
  return a + b + c
}

// 只接收3个参数，如果为多个 一元函数 组合，超过3个以上会报错，
// 多元函数同理，超过3个以上的参数后，多余的函数会报错
const curried = _.curry(getSum)

// console.log(curried(1, 2, 3))
console.log(curried(2)(4)(4)(4))

