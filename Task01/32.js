// Either 函子
class Left {
  static of (value) {
    return new Left(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return this
  }
}

class Right {
  static of (value) {
    return new Right(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return Left.of(fn(this._value))
  }
}

let r1 = Left.of(12).map(x => x + 2)
let r2 = Right.of(12).map(x => x + 2)

console.log(r1)
console.log(r2)

function parseJSON (str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({error: e.message})
  }
}

// let r = parseJSON('{ "name": "zhang" }')
// console.log(r)

let r = parseJSON('{ "name": "zhang" }').map(x => x.name.toUpperCase())
console.log(r)

