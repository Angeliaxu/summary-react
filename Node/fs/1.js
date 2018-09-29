/* 
    fs模块提供了一些与文件系统进行交互的API
    数据的基本操作：CURD

*/
const file = require('fs');


/* 
    异步模式
        1.如果目录不存在，创建文件就会失败
        2.first error:node中的一种约定，如果一个回调可能有错误发生，那么约定回调函数的第一个参数是用来提供错误对象
        file.writeFile()多次写入的时候会覆盖文件
*/
file.writeFile('./1.txt', 'hello', (err) => {
    if(err) throw err;
    console.log('file saved successfully')
})
/* 
    同步模式：使用try...catch语句
*/
try {
    file.writeFileSync('/xuchang/1.txt', 'xuchang')
    console.log('写入成功')
} catch(e){
    console.log('写入失败')
}
/* 
   同步模式下：写入到当前路径 
*/
try {
    file.writeFileSync('./2.txt', 'xuchang')
    console.log('写入成功')
} catch(e){
    console.log('写入失败')
}

/* 
    向文件追加写入：fs.appendFileSync()

*/

file.appendFileSync('./1.txt','小格格')