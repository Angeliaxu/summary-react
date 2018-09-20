/* 
    异步任务：
        主线程询问有没有异步回调函数

    异步任务也有区别：
        第一阶段： timer，用来处理所有setTimeOut、setInterval的回调
        第二阶段： i/o 异步任务，文件操作、网络操作等
                poll：轮询阶段（不断轮询），看是否有i/o回调任务，如果没有这会阻塞（有超时和基本检测）一段时间
        第三阶段：check，处理setImmediate
        第四阶段：close callback


    宏任务
        主体script、setTimeout、setInterval
    微任务
        promise、process.nextTick

    宏任务先执行再执行微任务
*/

async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
// 开定时器是同步，注册的回调函数是异步的
setTimeout(function(){
    console.log('setTimeout')
},0)
async1();
// 宏任务
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    // 微任务
    console.log('promise2')
})
console.log('script end')


// 'script start'
// 'async1 start'
// 'async2'
// 'promise1'
// 'script end'
// 'async1 end'
// 'promise2'
// 'setTimeout'