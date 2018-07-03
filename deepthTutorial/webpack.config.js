const webpack = require('webpack');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'[name].[hash].js',
        publicPath:'/'
    },
    devtool:'inline-source-map',//inline-source-map用在开发环境
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader',
                    options:{
                        modules:true,
                        camelCase:true,
                        sourceMap:true
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'public/index.html',
            favicon:'public/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        port:port,
        historyApiFallback:true,
        open:true,
        hot:true
    }
}