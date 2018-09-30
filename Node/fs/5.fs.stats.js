/* 
    类： fs.Stats
        fs.stat()、fs.lstat()、fs.fstat返回对象
        返回对象下的atimeMs, mtimeMs, ctimeMs, birthtimeMs这些属性是以毫秒展示的，
        atime, mtime, ctime, and birthtime这些属性是以时间对象展示的。前者和后者不是一一对应关系
        ，如果改变日期时间对象，不会改变以毫秒展示的属性。
        1.atime：access time，文件最后一次访问的时间
        2.mtime:modified time,文件最后一次修改的时间
        3.ctime：change time,文件状态最好一次修改的时间
        4.birthtime：文件创建的时间

*/
const fs = require('fs');
fs.stat('5.fs.stats.js', (err, res) => {
    console.log(res.isFile())
})