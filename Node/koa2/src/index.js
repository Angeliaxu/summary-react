const koa = require('koa');
const app = new koa;

app.use(async(ctx) => {
    let url = ctx.url;
    let request = ctx.request;
    let req = ctx.req;
    let req_query = request.query;
    let req_querystring = request.querystring;

    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    console.log(ctx.url, ctx.method)
    // console.log(ctx.request)
    if (ctx.url == '/login' && ctx.method == 'GET') {
        console.log(ctx.request.headers)
        ctx.body = {num: 11111};
    }
    // ctx.body= {
    //     url,
    //     req_query,
    //     req_querystring,
    //     ctx_query,
    //     ctx_querystring
    // }
})

/* 
    1. 通过ctx.request可以获取query和querystring
    2. 通过ctx可以获取query和querystring
    3. query和querystring区别：前者是对象，后者是字符串
    4. 通过ctx.url来获取请求的资源地址
    5. 通过ctx.method来获取请求方法
    6. ctx.request和ctx.req的区别：前者较后者封装了一下，可以通过后者取得更多node.js提供的原生HTTP请求对象

*/
app.listen(8080, '0.0.0.0');