const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    console.log('request come',req.url);
    res.writeHead(200,{
        'Access-Control-Allow-Origin':'*'
    })
    res.end('123');
    
}).listen(8887);

console.log('server listening on 8888');