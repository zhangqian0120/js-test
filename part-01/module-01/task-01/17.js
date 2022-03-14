// 柯里化案例
const _ = require('lodash')

// 提取空白字符
// ''.match(/\s+/g)
// 提取数字
// ''.match(/\d+/g)

const match = _.curry(function (reg, str) {
  return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)


console.log(haveSpace('hello world'))
console.log(haveNumber('hello123'))

// const filter = _.curry(function (func, array) {
//   return array.filter(func)
// })
const filter = _.curry((func, array) => array.filter(func))

const findSpace = filter(haveSpace)

console.log(filter(haveSpace, ['hello world', 'hello_world']))

console.log(findSpace(['hello world', 'hello_world']))
