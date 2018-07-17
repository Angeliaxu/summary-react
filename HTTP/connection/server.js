const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    console.log('request come',req.url);
    
    if(req.url=='/'){
        const html = fs.readFileSync('index.html','utf-8');
            res.writeHead(200,{
                'Content-Type':'text/html',
                'Connection':'close'
            })
            res.end(html);
    }else{
        const img = fs.readFileSync('WechatIMG23.jpeg');
        res.writeHead(200,{
            'Content-Type':'image/jpeg',
            'Connection':'close'
        })
        res.end(img);
    }
    
}).listen(8888);

console.log('server listening on 8888');