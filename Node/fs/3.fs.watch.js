
const fs = require('fs');
/* 
    类：fs.FSWatcher
*/
// fs.watch()：监听文件。filename参数的提供取决操作系统，如果有filename，那么filenam的类型由encoding决定，默认是字符串
// change是FSWatcher对象
const change = fs.watch('./tmp', { encoding: 'buffer'}, (eventType, filename) => {
    console.log(eventType);
    if (filename) {
        console.log(`文件${filename}改变了`)
        // 关闭文件监听
        change.close()
    }
})
console.log(change)