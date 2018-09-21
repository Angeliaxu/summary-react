
/* 
    exports：
        每一个模块文件中有一个exports对象
        在模块对象module下有个exports属性
        虽然exports == module.exports是同一个东西，但是
        使用上是有一定注意事项的
*/
console.log(module)
console.log(exports == module.exports); // true

console.log('6', require.main === module) // false

console.log('6main', require.main)