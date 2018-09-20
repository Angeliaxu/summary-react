/* 
    模块化：
        每一个模块都有自己的独立作用域
    nodejs：
        实现这套模块系统方案（一个文件就是一个模块、
        有模块作用域、导入导出规则）-规范：commonJS
        完整commonJS不止这些，还包括其他定义
    global：
        把一个内部私有的数据到全局对象下面，但是不推荐,污染全局变量
    模块数据的导出：
        如果想把一个模块中的私有数据导出到外部使用, 那么可以把这个数据挂载到exports的对象下面。
*/
// 该方法的返回值就是导入模块的exports对象
let moduleB = require('./4.module.js');
console.log(moduleB)