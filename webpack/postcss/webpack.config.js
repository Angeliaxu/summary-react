const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const purifyCssPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const path = require('path');

module.exports={
    mode:'none',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].bundle.js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader'
            },{
                test:/\.css$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader
                },
                {
                    loader:"css-loader",
                    options:{
                        // modules:true,
                        // localIdentalName:
                    }
                },{
                    loader:"postcss-loader",
                    options:{
                        ident:'postcss',
                        plugins:[
                            // require('autoprefixer')(),
                            require('postcss-cssnext')()
                        ]
                    }
                }]
            },{
                test:/\.(jpe?g|gif|png|svg)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                       limit:100,
                       name:'[name].[ext]',
                    //    useRelativePath:true,
                       outputPath:'assert/images/'
                    }
                },{
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
                }]
            },
            // {
            //     test:path.resolve(__dirname,'src/component/a.js'),
            //     use:{
            //         loader:'imports-loader',
            //         options:{
            //             $:'jquery'
            //         }
            //     }
            // }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            minify:{
                collapseWhitespace:true
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $:'jquery',
            React:'react',
            ReactDom:'react-dom',
            Component:['react','Component']
        })
    ],
    devServer: {
        open:true
    },
    resolve:{
        alias:{
            jquery:path.resolve(__dirname,'lib/jquery.js'),
        }
    }
}