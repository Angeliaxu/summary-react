console.log('normal10');
setTimeout(() =>{
    console.log('setTimeout')
}, 0)
process.nextTick(() => {
    console.log('processNexttick')
})
setImmediate(() => {
    console.log('setimmediate')
})
console.log('normal1');
new Promise((resolve, reject) => {
    console.log('promise 内');
    resolve();
}).then(() => {
    console.log('then1')
}).then(() => {
    console.log('then2')
})
console.log('normal2')
/* 
    normal10
    normal1
    promise 内
    normal2
    processNexttick
    then1
    then2
    setTimeout
    setimmediate
*/