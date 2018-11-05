/* 
    服务端：
        监听当前服务器上指定的ip与端口，如果有数据发送到ip和端口上，我就处理
    
*/
const dgram = require('dgram');
/* 
    创建一个socket类，scoket类就是用来处理网络数据的一个标准API对象
    通过socket，我们就可以对网络数据进行读取和输出
*/
// const socket = new dgram.Socket();
// udp4 => ipv4
const socket = dgram.createSocket('udp4');

/* 
    监听指定的地址以及端口
*/
socket.bind(12345, '127.0.0.1')
/* 
    事件
        close
        error
        listening
        message
*/
socket.on('listening', () => {
    console.log('server start successfully')
})
socket.on('message', data => {
    console.log(data.toString())
})

