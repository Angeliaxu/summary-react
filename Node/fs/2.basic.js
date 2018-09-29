const fs = require('fs');


/* 
    fs.unlink():异步删除某个文件
    fs.unlinkSync(): 同步删除某个文件
*/
// fs.unlink('./tmp/hello.txt', (err) => {
//     if(err)throw err;
//     console.log('成功删除1.txt');
// })

/* 
    当使用同步操作的时候：任何异常都会立即被抛出，使用try/catch语句来处理异常
*/

// try {
//     fs.unlinkSync('./tmp/2.txt')
//     console.log('删除成功')
// } catch(err){
//     console.log(err)
// }

/* 
    异步的方法不能保证执行顺序，所以下面的操作可能会报错，fs.stat()可能会在fs.rename()操作之前完成
*/

// fs.rename('./tmp/1.txt', './tmp/2.txt', (err) => {
//     if(err) throw err;
// })
// fs.stat('./tmp/2.txt', (err, stats)=> {
//     if(err) throw err;
//     console.log(stats)
// })

/* 
    解决办法： 把fs.stat()放入fs.rename()回调函数中
*/

// fs.rename('./tmp/1.txt', './tmp/2.txt', (err) => {
//     if(err) throw err;
//     fs.stat('./tmp/2.txt', (err, stats)=> {
//         if(err) throw err;
//         console.log(stats)
//     })
// })

/* 
    文件路径：
        1.大部分fs操作接受字符串、buffer、file：协议的URL对象作为文件路径
        2.字符串形式的路径会被解释为表示绝对路径或相对路径的UTF-8序列
        3.相对路径会相对于process.cwd（）定义的当前工作目录进行处理
        4.URL对象在不同的平台上会有特定的行为
        5.fs类下的方法路径参数接受字符串或者buffer，buffer可以使路劲参数不是utf-8格式的。但是对于大多数应用是不必使用buffer。在NTFS或者HFS+这些文件系统下，文件名
        必须是utf-8格式，buffer在此操作系统不会如你所想。

*/
// absolute path
// fs.rename('tmp/2.txt', 'tmp/3.txt', (err) => {
//     if (err) throw err;
//     console.log('rename successfully')
// })

// URL path
// const { URL } = require('url');
// const oldurl = new URL('file:///Users/xuchang/summary-react/Node/fs/tmp/5.txt');
// const newurl = new URL('file:///Users/xuchang/summary-react/Node/fs/tmp/6.txt');
// fs.rename(oldurl, newurl, (err) => {
//     if (err) throw err;
//     console.log('rename successfully')
// })

// URL的各种表现不同形式,暂时不知道怎么复现情景
// const hostname = new URL('file:///C:/tmp/hello')
// console.log(hostname)
