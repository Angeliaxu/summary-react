const http = require('http');
const { URL } = require('url');
// 该类继承自net.Server
// const server = new http.server();
const server = http.createServer((req, res) => {
    console.log(req)
    // res.end('index')
    // res.write('222')
    // const ul =  new URL(req.url)
    // console.log(ul.hash)
    res.end();
})

server.listen(8080, '0.0.0.0');