const path = require('path');

module.exports={
    mode:'none',
    entry:{
        'index':'./src/index'
    },
    output:{
        filename:'[name].[chunkhash:5].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
                // exclude:/node_modules/
            }
        ]
    }
}