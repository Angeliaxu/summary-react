http = require('http');

const server = http.createServer((req, res) => {
    console.log('有人来了');
    setTimeout(() => {
        res.end('123')
    }, 5000);
});

server.listen(8888)