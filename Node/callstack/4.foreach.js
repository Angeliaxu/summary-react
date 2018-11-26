// synchronous
const arr = [1, 2, 3, 4, 5, 6];
arr.forEach((item) => {
    console.log(item)
})

// asynchronous

function asyncForEach(arrar, cb) {
    arrar.forEach(function() {
        setTimeout(cb, 0)
    })
}

asyncForEach(arr, function(i) {
    console.log(i)
})