/* 
    每一个模块中都有一个内置的对象：module
    该对象包括当前模块的所有信息
    {
        id：当前模块的唯一标识，默认id为当前这个文件的绝对路径
        filename：当前模块的文件
        parent：父模块
        children：子模块
        loaded：当前模块是否加载完成
        paths：
    }
*/

console.log(module)
require('./6.module.js'); // module.require()
/* 
    一个文件若直接被node运行，这个文件下的require.main === module，可以通过此判断条件
    来判断一个文件是否被直接运行

*/
console.log('5', require.main === module) //true
console.log('5main', require.main)
console.log(module._cache)

exports = {}; //把exports和module.exports关系砍断了