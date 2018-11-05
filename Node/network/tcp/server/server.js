/* 
    TCP:
        在node中，tcp协议基于net模块来实现的
*/
const net = require('net');
const fs = require('fs');

/* 
    创建一个服务器：
        1.监听地址以及端口
        2.处理发送到当前监听地址以及端口的数据
        3.返回(发送）数据到连接的端口

    net.Server 类
            new net.Server()
            net.createServer() => return new net.Server()
*/

/* const server = net.createServer(()=>{});
// 等同于
function createServer(cb) {
    let s = new net.Server();
    s.on('connection', cb);
    return s;
} */

const server = net.createServer();
// 当有客户端链接的时候触发，回调函数第一个参数是一个Net.socket实例对象，数据的传输就是通过socket来实现的
server.on('connection', (socket) => {
    // console.log('有人连接了')
    // server.write('你好吗')
    // socket.on('data', (data) => {
    //     console.log(data.toString());
    // })
    // socket.write('欢迎光临')
    // socket.on('data', data => {
    //     console.log(data.toString());
    //     // socket.write('你来干什么')
    // remoteAddress、remotePort表示客户端发送输的地址以及端口号
    //     console.log(socket.remoteAddress,socket.remotePort)
    // })
    try {
        const pic = fs.readFileSync('../1.jpg');
    } catch (error) {
        console.log(err)
    }
    // socket.write(pic)
    socket.end(pic)
})
// server.listen(12345, '127.0.0.1')
// 0.0.0.0: *通配，指我这台电脑上所分配的所有ip地址
server.listen(9000, '0.0.0.0')