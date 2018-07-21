const MiniExtractCss = require('mini-css-extract-plugin');
module.exports={
    mode:'none',
    entry:{
        app:'./src/index.js',
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    MiniExtractCss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new MiniExtractCss({
            filename:'[name].css'
        })
    ]
}