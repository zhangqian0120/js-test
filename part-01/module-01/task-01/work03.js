/**
 * @description 三、基于下面提供的代码，完成后续的四个练习
 */

/**
 * 练习1: 使用 fp.add(x, y) 和 fp.map(f, x)
 * 创建一个能让 functor 里的值增加的函数 ex1
 */

// app.js
// const fp = require('lodash/fp')
// const { Maybe, Container } = require('./support')
// let maybe = Maybe.of([5, 6, 1])
// let ex1 = () => {
//    return fp.map(x => fp.add(x, 1), maybe._value)
// }
// console.log(ex1())

/**
 * 练习2: 实现一个函数 ex2 ，能够使用 fp.first 获取列表的第一个元素
 */

// app.js
// const fp = require('lodash/fp')
// const { Maybe, Container } = require('./support')
// let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// let ex2 = () => {
//     return fp.first(xs._value)
// }
// console.log(ex2())

/**
 * 练习3: 实现一个函数 ex3 ，使用 sageProp 和 fp.first 找到 user 的名字的首字母
 */

// app.js
// const fp = require('lodash/fp')
// const { Maybe, Container } = require('./support')
// let safeProp = fp.curry(function (x, o) {
//     return Maybe.of(o[x])
// })
// let user = {
//     id: 2,
//     name: 'Albert'
// }
// let ex3 = () => {
//     return fp.first(safeProp('name', user)._value)
// }
// console.log(ex3())

/**
 * 练习4: 使用 Maybe 重写 ex4，不要有 if 语句
 */

// app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let ex4 = function (n) {
    return Maybe.of(n).map(parseInt)._value
}
console.log(ex4(null))
