/* 
    fs.access(path[,mode],callback)
    mode： default fs.constants.F_OK,判断文件是否存在
        fs.constants.R_OK：文件是否可读
        fs.constants.W_OK：文件是否可写
        fs.constants.X_OK：文件是否可执行
*/

const fs = require('fs')
// fs.access('tmp/6.txt', fs.constants.R_OK, (err) => {
//     console.log(err);
// })
// /* 
//     fs.appendFile(file, data[, options], callback)
// */
// fs.appendFile('tmp/6.txt', '啊啊啊啊啊啊啊啊啊啊啊', (err) => {
//     if (err) throw err;
//     console.log(`写入文件成功`)
// })

/* 
    fs.copyFile(src, dest [, flags], callback)
    flags：改变copy的操作行为，默认是0
    The only supported flag is fs.constants.COPYFILE_EXCL, which causes the copy operation to fail if dest already exists.
*/
// const { COPYFILE_EXCL } = fs.constants;
// fs.copyFile('tmp/6.txt', 'dest/6.txt', COPYFILE_EXCL, (err) => {
//     console.log(err);
// })

/* 
    fs.createReadStream(path[, options])
*/

// console.log(fs.createReadStream('tmp/6.txt'))

/* 
    fs.readFile(path[,options],callback)
    options: 
        enconding：default null
    如果path为一个文件夹，那么在macos，linux，windows上会返回错误
    在fressbsd上返回目录下的内容
*/
// fs.readFile('tmp/6.txt', 'utf-8', (err, file) => {
//     if(err) throw err;
//     console.log(file)
// })

/* 
    fs.rmdir(path, callback)
    只能移除一个空的文件夹
*/
// fs.rmdir('sample/', (err) => {
//     if (err) throw err;
// })

/* 
    fs.unlink(path, callback)
    删除文件
*/
// fs.unlink('dest/', (err) => {
//     if (err) throw err;
// })

/* 
    fs.unwatchFile(filename[, listener])
*/