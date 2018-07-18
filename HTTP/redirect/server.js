const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{

    const html = fs.readFileSync('redirect.html','utf-8');
    if(req.url=='/'){
        
        res.writeHead(301,{
            'location':'/redirect'
        })
        res.end('');

        console.log('url come from :' +req.url)
    }
    if(req.url=='/redirect'){
        res.writeHead(200,{
            'Content-Type':'text/html'
        })
        console.log('url come from :' +req.url)
        
        res.end(html);
    }
   
    
}).listen(8888);

console.log('server listening on 8888');