
/* 
    1. Promise的基本使用
*/
// const p1 = new Promise((resolve, reject) => {
//     // 模拟一个异步操作
//     setTimeout(() => {
//         // resolve('p1 success');
//         // reject('p1 failed')
//     }, 2000)
// })
// p1.then((resolve) => {
//     console.log(resolve)
// }, (reject) => {
//     console.log(reject)
// })

/* 
    2. 关于then回调
        默认返回一个状态为resolve包裹的值
*/

// const p2 = new Promise((resolve, reject) => {
//     // resolve('p2 success');
//     reject('p2 failed');
// })

// p2.then((value) => {
//     console.log(value)
// }, (error) => {
//     console.log(error)
// }).then((value) => {
//     console.log(value)
// }, (error) => {
//     console.log(error)
// })

/* 
    3. 关于catch：
        catch是then的语法糖，then(null, (error)=> {})
*/

// const p3 = new Promise((resolve, reject) => {
//     reject('p3 failed')
// })
// p3.then((value) => {
//     console.log(vlaue)
// }).then(value => {
//     console.log(value)
// }, error => {
//     console.log(error)
//     return 2
// }).then(null, (error) => {
//     console.log(error)
// }).then(value => {
//     console.log(value)
// })

/* 
    4. 关于finally： 
        finally 是then函数的特例,不接受任何参数
        finally(() => {
            执行语句
        })
            等同于
                then(value => {
                    执行语句
                }, error => {
                    执行语句
                })
*/

// const p4 = new Promise((resolve, reject) => {
//     // resolve('p4 successful')
//     reject(new Error('p4 failed'))
// })
// p4.then((value) => {
//     console.log(value)
//     return 2
// }).catch((error) => {
//     console.warn(error)
// }).finally(() => {
//     console.log('一些执行逻辑')
// }).then((value) => {
//     console.log(value)
// })

/* 
    5. resolve和reject不会终止后续代码执行
*/

// const p5 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let arr = [0, 1];
//         let num = arr[Math.floor(Math.random() * 2)];
//         switch (num) {
//             case 0:
//                 resolve('success');
//             case 1:
//                 reject('failed');
//         }
//         console.log('这里执行了一些逻辑代码')
//     }, 1000);
// })

// p5.then(value => {
//     console.log(value)
// }).catch(error => {
//     console.log(error)
// })