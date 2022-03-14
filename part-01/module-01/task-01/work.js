const fp = require('lodash/fp')

// 一、将下面异步代码使用Promise的方式改进

setTimeout(function () {
  var a = 'hello'
  setTimeout(function () {
    var b = 'lagou'
    setTimeout(function () {
      var c = 'I ❤ U'
      console.log(a + b + c)
    }, 10)
  }, 10)
}, 10)

// const str = new Promise(resolve => {
//   return resolve
// })




// 二、基于以下代码完成下面的四个练习

// 数据
// horsepower 马力, dollar_value 价格, in_stock 库存

const cars = [
  {
    name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true
  },
  {
    name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false
  },
  {
    name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false
  },
  {
    name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false
  },
  {
    name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true
  },
  {
    name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false
  }
]

// 练习1： 使用函数组合 fp.flowRight()重新实现下面这个函数
let isLastInStock = function (cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars)
  // 获取最后一条数据的 in_stock 属性值
  return fp.prop('in_stock', last_car)
}

const isLastInStockNew = fp.flowRight(fp.prop('in_stock'), fp.last)

console.log(isLastInStockNew(cars)) // false

// 练习2： 使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name

const getFirstCarName = fp.flowRight(fp.prop('name'), fp.first)

console.log(getFirstCarName(cars))  // Ferrari FF

// 联系3： 使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现

let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无须改动

let averageDollarValue = function (cars) {

  let dollar_values = fp.map(function (car) {
    return car.dollar_value
  }, cars)

  return _average(dollar_values)
}

const averageDollarValueNew = fp.flowRight(_average, fp.map('dollar_value'))

console.log(averageDollarValueNew(cars))  // 790700

// 联系4： 使用 flowRight() 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式：例如： sanitizeNames(["Hello World"]) => ["hello_world"]

let _underscore = fp.replace(/\W+/g, '_') // <-- 无须改动，并在 sanitizeNames 中使用它

const sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower)))

console.log(sanitizeNames(['Hello World']))

