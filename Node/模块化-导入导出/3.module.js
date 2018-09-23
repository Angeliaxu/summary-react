/* 
    模块化：
        每一个模块都有自己的独立作用域
    nodejs：
        实现这套模块系统方案（一个文件就是一个模块、
        有模块作用域、导入导出规则）-规范：commonJS
        完整commonJS不止这些，还包括其他定义

        核心模块：node自带的二进制执行文件
        文件模块：用户自己写的

        模块加载（优先从缓存加载编译和执行之后的对象，减少开销）
            路径分析
            文件定位
            编译执行
    global：
        把一个内部私有的数据到全局对象下面，但是不推荐,污染全局变量
    模块数据的导出：
        如果想把一个模块中的私有数据导出到外部使用, 那么可以把这个数据挂载到exports的对象下面。
    
    模块化分类：
        file module
        folder module
            node_module
            global module
        core module
    当我们导入模块名称是一个文件夹的时候：
        1.读取该文件夹下的package.json文件
        2.导入package.json文件中main选项指定的文件
        3.如果不存做packge.json文件或者main选项，默认自动导入文件夹下index.json文件
        
    如果我们导入的模块是在node_modules目录下，又是以另一种规则加载模块    
        如果模块的加载是以./ ../ /开始的，那么就是路径模块加载模式
        不以./ ../ /开始的模块，按照另外一种加载模式加载
            当非路径加载模式的时候，会按照如下规则进行模块的查找
                在module对象下有一个属性，paths，是一个数组，里面保存的就是这种非路径加载模式
                需要查找的路径列表 
        
    模块文件处理机制：
        文件>.js>.json>.node

    ECMA模块化支持
        开启支持：--experimental-modules
        .mjs后缀
        */
// 该方法的返回值就是导入模块的exports对象
let moduleB = require('./4.module.js');
console.log(moduleB)