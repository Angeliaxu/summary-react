const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');



module.exports={
    entry:'./src/index.js',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader']
            }
        ]
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        open:true,
        hot:true
    }
}