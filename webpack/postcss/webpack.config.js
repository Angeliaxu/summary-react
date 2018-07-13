const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const purifyCssPlugin = require('purifycss-webpack');
const path = require('path');

module.exports={
    mode:'none',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js',
        publicPath:'dist/'
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
                    loader:'file-loader',
                    options:{
                        useRelativePath:true,
                        publicPath:'',
                        ouputPath:'dist/'
                        
                    }
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ]
}