const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    console.log(req.headers.host)
    let wait =(seconds)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve();
            },seconds*1000)
        })
    }
    
    if(req.url=='/'){
        const html = fs.readFileSync('index.html','utf-8');
        res.writeHead(200,{
            'Content-Type':'text/html'
            
        })
        res.end(html);     
    }
    if(req.url=='/data'){
        wait(5).then(()=>{
            res.writeHead(200,{
                'Cache-Control':'s-maxage=20',
                'Vary':'x-test'
            })
            res.end('success!');
        })
        
    }
   
    
}).listen(8888);

console.log('server listening on 8888');