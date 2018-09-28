/* 
    stream流
        四种类型：
            1.writable
            2.readable
            3.duplex：可读可写流
            4.transform：在读写过程中可以修改或转换数据的duplex流
        对象模式
            streams操作于字符串或者Buffer对象。还可以用来作用于其他类型的js值上（除了null，null在流中有特殊作用），这种流是以对象模式操作。流的实例转换成ObjectMode是不安全的。
        缓冲
            1.可读流与可写流在内部存储数据额的大小取决于向stream构造函数传入的highWaterMark选项，
            2.普通流：highWaterMark表示的是字节数的总数量
            3.objectMode stream：highWaterMark表示的是对象的总数量
            4.stream.push(chunk)写入可读流到缓冲区，这个可读流会待在内部的队列中直到stream.read()读取才会出队列
            5.
*/
const stream = require('stream');