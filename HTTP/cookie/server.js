const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    console.log('request come',req.url);
    
    if(req.url=='/'){
        const cookie = req.headers.cookie;
        const html = fs.readFileSync('index.html','utf-8');
        if(cookie){
            res.writeHead(200,{
                'Content-Type':'text/html',
            })
        }else{
            res.writeHead(200,{
                'Content-Type':'text/html',
                'Set-Cookie':['id=123','age=100;HttpOnly']
            })
        }
        
        res.end(html);
    }
    
}).listen(8888);

console.log('server listening on 8888');