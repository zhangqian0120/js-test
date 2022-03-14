// 记忆函数

const _ = require('lodash')

function getArea(r) {
  console.log(r)
  return Math.PI * r * r
}

// let getAreaWidthMemory = _.memoize(getArea)
//
// console.log(getAreaWidthMemory(4))
// console.log(getAreaWidthMemory(5))
// console.log(getAreaWidthMemory(4))

// 模拟 memoize 方法的实现

function memoize(f) {
  let cache = {}
  return function() {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || f.apply(f, arguments)
    return cache[key]
  }
}

let getAreaWidthMemory = memoize(getArea)

console.log(getAreaWidthMemory(4))
console.log(getAreaWidthMemory(5))
console.log(getAreaWidthMemory(4))