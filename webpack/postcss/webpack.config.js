module.exports=process.env.NODE_ENV !=='production'?require('./webpack/webpack.dev.js'):require('./webpack/webpack.prod.js')