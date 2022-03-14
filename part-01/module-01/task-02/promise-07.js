// promise 方式的 ajax

function ajax(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// console.log(11)
console.log(window.location.href)
const promise = ajax('/api/user.json')

const promise2 = promise
  .then(function onFulfilled(value) {
    console.log('onFulfilled', value)
  })
  .catch(response => {
    console.log(response)
  })

