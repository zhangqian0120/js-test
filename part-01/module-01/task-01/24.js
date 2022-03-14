// 调试
// NEVER SAY NO => never-say-no

const _ = require('lodash')

// _.split()
const split = _.curry((sep, str) => _.split(str, sep))

// _.join()
const join = _.curry((sep, array) => _.join(array, sep))

// _.toLower()
const map = _.curry((fn, array) => _.map(array, fn))

const mapLower = array => _.map(array, i => _.toLower(i))

const log = v => {
  console.log(v)
  return v
}

const f = _.flowRight(join('-') ,log, mapLower, log, split(' '))


console.log(f('NEVER SAY NO'))