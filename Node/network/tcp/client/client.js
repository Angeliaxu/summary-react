const net = require('net');
const fs = require('fs');

/* 
    创建客户端与udp不同
        net.Socket类
        1、new net.Socket()
        2、net.createConnection();
*/
// 以下两种方式访问使用0.0.0.0都可以接受得到。
// const socket = net.createConnection(12345, '127.0.0.1');
// 与服务端地址建立链接，并向此链接发送数据
const socket = net.createConnection(9000, '127.0.0.1');
let imgBuffer = Buffer.alloc(0);
socket.on('data', data => {
    imgBuffer =  Buffer.concat([imgBuffer,data])
    console.log('数据来了', imgBuffer);
    // socket.write('我来了')
})


// 客户端end与服务端end配套使用，在服务端触发end后，客户端可监听到end结束事件
socket.on('end', ()=> {
    // 把从服务端穿过来的图片写入到本地
    try {
        fs.writeFileSync('./1.jpg', imgBuffer) 
    } catch (error) {
        console.log(err)
    }
    
})