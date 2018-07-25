const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require ('webpack');
const path = require('path');


module.exports=merge(common,{
    mode:"development",
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'../','dist'),
        chunkFilename:'js/[name].js', // which determines the name of non-entry chunk files
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.(png|jpg|jpeg|gif|svg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'images/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer:{
        hot:true,
        open:true,
    }
})