
function devide(num, deno) {
    return new Promise((resolve, reject) => {
        if (typeof num !== 'number' || typeof deno !== 'number') {
            reject(new TypeError('must be number'))
        }
        if (deno === 0) {
            reject(new Error('cannot devide by 0'))
        }
        console.log(1)
        return resolve(num / deno);
    })
}
console.log(devide(3, 0))