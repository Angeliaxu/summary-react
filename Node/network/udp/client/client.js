const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
/* 
    发送数据：
        udp：无连接协议，不需要连接到服务器再发送数据
*/
socket.send('hello', 12345, '127.0.0.1')
