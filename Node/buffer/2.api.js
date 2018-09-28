/* 
   Buffer.alloc(size[, fill[, encoding] ]) 返回一个指定长度并被filled（若未指定，默认是undefined）填满的Buffer实例,encoding默认是utf-8，这个方法
   比Buffer.allocUnsafe(size)要慢，但是能保证被创建的Buffer实例不会包含旧的并且敏感的数据。

   Buffer.allocUnsafe(size)、Buffer.allocUnsafeSlow(size)：
        1.返回一个指定长度的Buffer实例，但是这个实例的内容必须使用实例下的方法.fill（）来初始化。这个方法比Buffer.alloc()要快
        2.如果Buffer.allocUnsafe(size)的size小于或者等于Buffer.poolSize的一半，
        那这个方法返回的Buffer实例可能会被分配进一个共享的内部内存池
        3.Buffer.allocUnsafeSlow()方法返回的Buffer实例不会共享内部内存池
        */

const buff1 = Buffer.from([1,2,3]); // <Buffer 01 02 03>
const buff2 = Buffer.from(buff1); // 返回buff1的拷贝
console.log(buff1 == buff2) // false
const buff3 = Buffer.from('xuchang'); // <Buffer 78 75 63 68 61 6e 67>
const buff4 = Buffer.from('徐畅') // <Buffer e5 be 90 e7 95 85> 一个中文字符3个字节
const buff5 = Buffer.allocUnsafe(5);
buff5.fill(1)
// console.log(Buffer.poolSize) // 8192



/* 
    1.在repl命令行中运行node命令，并且声明一个Buffer.allocUnsafe(4),返回的是一个<Buffer 40 35 4b 00>，
    所以为什么使用这个命令的时候需要用fill来初始化内容。
    2. 在node 带入参数 --zero-fill-buffers时，再次声明buffer，出现的是<Buffer 00 00 00 00>

*/

/* 
    是什么使Buffer.allocUnsafe()和Buffer.allocUnsafeSlow会“不安全”
    当使用以上两者方法时，被分配的内存段是未初始化的。虽然这样的设计使得内存分配非常快，但是分配de
    内存段可能包含敏感旧数据，在Buffer创建没有被完全重写内存的情况下，在buffer内存可读情况下，
    可能泄露它的旧数据。所有在使用上得注意
*/


/* 
    buffers and character encodings
    使用Buffer的实例来给字符加密，比如utf-8、usc2、base64、hex-encoded
*/
// const buff6 = Buffer.from('hello world', 'ascii');
// console.log(buff6.toString('base64'));

/* 
    Buffer的实例可以使用for...of
*/

const buff7 = Buffer.alloc(2147483648);
console.log(buff7);
const buffer = require('buffer');
console.log(buffer.constants.MAX_LENGTH)