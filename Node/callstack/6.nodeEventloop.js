const fs = require('fs');
// const setTimeOutlogger = ()=>{
//     console.log('setTimeout logger');
// }
// const setImmediateLogger = ()=>{
//     console.log('setImmediate logger');
// }
// //For timeout 
// setTimeout(setTimeOutlogger, 1000);
// //File I/O operation
// fs.readFile('test.txt', 'utf-8',(data)=>{
//     console.log('Reading data 1');
// });
// fs.readFile('test.txt', 'utf-8',(data)=>{
//     console.log('Reading data 2');
// });
// fs.readFile('test.txt', 'utf-8',(data)=>{
//     console.log('Reading data 3');
// });
// fs.readFile('test.txt', 'utf-8',(data)=>{
//     console.log('Reading data 4');
// });
// fs.readFile('test.txt', 'utf-8',(data)=>{
//     console.log('Reading data 5');
// });
// //For setImmediate
// setImmediate(setImmediateLogger);
// setImmediate(setImmediateLogger);
// setImmediate(setImmediateLogger);

/* 
    在i/o cycle里面，setImmediate比setTimeout先执行
*/
// fs.readFile('test.txt', 'utf-8',(data)=>{
//     setTimeout(() => {
//        console.log(1) 
//     }, 1000);
//     setImmediate(()=>{
//         console.log(2)
//     },1000)
// });

/* 
    没有 i/o cycle setImmediate和setTimeout执行顺序不确定，受到进程性能的约束，与setTimeout相比起来setImmediate的使用优点在于在i/o cycle中，setImmediate总是比setTimeout先执行。
*/
// setImmediate(()=>{
//     console.log(2)
// })
// setTimeout(() => {
//     console.log(1) 
// }, 0);

/* 
    process.nextTick(),process.nextTick()在技术上来说不是event loop的一部分，然而nextTickQueue无论当前事件循环的当前阶段如何，都将在当前操作完成后处理
*/
// function apiCall(arg, callback) {
//     if (typeof arg !== 'string')return process.nextTick(callback, new TypeError('argument should be string'));
// }
// apiCall('132', (argu)=>{
//     console.log(argu)
//     // console.log(2222)
// })

function Fn(){
    this.arrs;
    process.nextTick(()=>{ //根据nextTick的特性，可以先赋值，再在下一个队列中使用
        console.log(111)
        console.log(this);
        this.arrs();
    })
}
Fn.prototype.then=function(){
    this.arrs=function(){
        console.log(1)
    }
}
let fn=new Fn();
fn.then();
  
  