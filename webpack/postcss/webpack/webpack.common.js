const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 该插件可以给每一个chunk生成html
const miniExtractPlugin = require('mini-css-extract-plugin');
const webpack =require('webpack');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin= require('clean-webpack-plugin');


let devMode = process.env.NODE_ENV !== 'production';
let pathsToClean = ['dist'];
let cleanOptions = {
    root: path.resolve(__dirname,'../'),
}

module.exports={
    entry:{
        index:'./src/index.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader'],
                exclude:['node_modules'],
                include:path.resolve(__dirname,'../src')
            },
            {
                test:/\.scss$/,
                use: [{
                        loader:devMode?'style-loader':miniExtractPlugin.loader
                    },
                    { 
                        loader: 'css-loader',
                        options:{
                            // modules:true,
                            // camelCase:true,
                            sourceMap:true,
                            minimize: devMode ? false : true
                        }
                    },
                    {
                        loader:'sass-loader'
                    },
                    {
                        loader:'sass-resources-loader',
                        options:{
                            // 避免在resouces文件中@import其他scss，打包速度会减慢，直接在下面数组里面配,在引入scss文件时，全局注册下面两个文件
                            resources:['./src/css/config/var.scss','./src/css/config/mixins.scss']
                        }
                    }
                ],
                // exclude:['node_modules']
            },
            {
                test:/\.(ttf|woff|eot|woff2)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'fonts/[name].[ext]'
                    }
                }]
            }
            
        ]
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            favicon: './src/wps.ico',
            title:'【WPS+云办公】官网 _企业在线一站式云办公平台',
            filename:'index.html',//生成的文件名
            // chunks:['index','vendor'],//需要引入的chunk
            minify:{
                collapseWhitespace:true,
                removeAttributeQuotes:true //减少文件大小 <script src=index.js></script>
            }
        }),
        new miniExtractPlugin({
            filename: 'css/[name].[contenthash:5].css',
            chunkFilename:'css/[name].[contenthash:5].css'
        }),
        new webpack.ProvidePlugin({
            React:'react',
            ReactDOM:'react-dom',
            Component:['react','Component']
        }),
        new CleanWebpackPlugin(pathsToClean,cleanOptions)
    ],
    resolve:{
        alias:{
            component:'../component',
            images:'../../images',
        }
    },
    // optimization: {
    //     splitChunks:{
    //         cacheGroups:{
    //             styles: {
    //                 name: 'common',
    //                 test: /\.scss$/,
    //                 chunks: 'all',
    //                 enforce: true
    //               }
}