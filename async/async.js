/* 
    1
*/
// new Promise((resolve) => {
//     console.log('start')
//     resolve();
// }).then(() => {
//     console.log('then')
// })
// console.log('main');
// setTimeout(() => {
//     console.log('finally')
// }, 0)

/* 
    2
*/
// console.log('start')
// new Promise((resolve)=>{
//     console.log(1);
//     setTimeout(() => {
//         console.log(2)
//         resolve()
//         console.log(3);
//     })
// }).then(() => {
//     console.log(4)
// })
// console.log('end')


/* 
    3
*/
async function aa (){
    console.log(1)
    console.log(await bb());
    console.log(2);
}
async function bb() {
    console.log(3)
}
aa();


/* 
    4
*/
// async function async1(){
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }
// async function async2(){
//     console.log('async2')
// }
// console.log('script start')
// setTimeout(function(){
//     console.log('setTimeout')
// },0)
// async1();
// new Promise(function(resolve){
//     console.log('promise1')
//     resolve();
// }).then(function(){
//     console.log('promise2')
// })
// console.log('script end')


/* 
    5
*/
// setTimeout(function(){
//     console.log('定时器开始啦')
// });
// new Promise(function(resolve){
//     console.log('马上执行for循环啦');
//     for(var i = 0; i < 10000; i++){
//         i == 99 && resolve();
//     }
// }).then(function(){
//     console.log('执行then函数啦')
// });
// console.log('代码执行结束');


/* 
    6
*/
// console.log('1');
// setTimeout(function() {
//     console.log('2');
//     process.nextTick(function() {
//         console.log('3');
//     })
//     new Promise(function(resolve) {
//         console.log('4');
//         resolve();
//     }).then(function() {
//         console.log('5')
//     })
// })
// process.nextTick(function() {
//     console.log('6');
// })
// new Promise(function(resolve) {
//     console.log('7');
//     resolve();
// }).then(function() {
//     console.log('8')
// })
// setTimeout(function() {
//     console.log('9');
//     process.nextTick(function() {
//         console.log('10');
//     })
//     new Promise(function(resolve) {
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')
//     })
// })

