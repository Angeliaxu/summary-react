const http = require('http');

const client = http.request({
    // protocol: 'http',
    host: '127.0.0.1',
    port: 8080,
    // path: '/index.html?name=xuchang#middle'

}, (res)=> {
    // res是一个socket对象
    res.on('data', data => {
        // console.log(res.socket);
        console.log(data);
    })
})
client.end();