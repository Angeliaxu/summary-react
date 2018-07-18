const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const purifyCssPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const path = require('path');

module.exports={
    mode:'none',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js',
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
                        modules:true,
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
                test:/\.(jpe?g|gif|png)$/,
                use:{
                    loader:'url-loader',
                    options:{
                       limit:10000 ,
                       name:'[name].[ext]',
                       useRelativePath:true
                    }
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ],
    devServer: {
        open:true
    }
}