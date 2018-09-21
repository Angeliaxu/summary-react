/* 
    file module
    folder as module    
        node_modules    
        global folders
    core module
*/

/* 
    当导入模块名称是一个文件夹路径的时候，
        1.读取该文件夹下的package.json
        2.导入 package.json下的main选项指定的文件
        3.如果不存在package.json或者main指定的文件，默认自动导入文件夹下的index.js  

*/
let folder = require('./folder');
console.log(folder)