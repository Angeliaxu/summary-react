const path = require('path');

module.exports={
    mode:'development',
    entry:'./src/pageA.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[hash:5].bundle.js',
        chunkFilename:'[name].[hash:5].chunk.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
}