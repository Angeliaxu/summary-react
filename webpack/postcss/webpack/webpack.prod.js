const merge= require('webpack-merge');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩优化css
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩代 */码，减小打包体积
const common = require ('./webpack.common.js');
const webpack = require('webpack');
const miniExtractPlugin = require('mini-css-extract-plugin');
// const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');



module.exports=merge(common,{
    mode:"production",
    output:{
        filename:'js/[name].[chunkhash:5].bundle.js',
        path:path.resolve(__dirname,'../','dist'),
        publicPath:'/',
        // chunkFilename:'js/[name].[chunkhash:8].chunk.js' // which determines the name of non-entry chunk files
    },
    module:{
        rules:[
            {
                test:/\.(png|jpg|jpeg|gif|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            query:{
                                limit:10000,
                                name:'images/[name]_[hash:5].[ext]'
                            }
                        }
                    },
                    {
                        loader:'img-loader',
                        options:{
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
        ]
    },
    //  生成环境下使用这个可以减小打包速度
    devtool: 'source-map',
    optimization: {
        runtimeChunk: true,
        splitChunks:{
            cacheGroups:{
                // styles: {
                //     name: 'common',
                //     test: /\.scss$/,
                //     chunks: 'all',
                //     enforce: true
                //   },
                  vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendor',
                    chunks:'all'
                    
                }
            }
        }
    },
    plugins:[
        // new Analyzer(),
        new webpack.NamedChunksPlugin()
    ]
})