// module.exports=process.env.NODE_ENV !=='production'?require('./webpack/webpack.dev.js'):require('./webpack/webpack.prod.js')




// multiple pages config 
const htmlwebpackplugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const cleanwebpackplugin = require('clean-webpack-plugin');
const minicssextract = require('mini-css-extract-plugin')
const path = require('path');


const baseConfig = {
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].[chunkhash].js'
    },
    plugins:[
        new cleanwebpackplugin('dist'),
        new minicssextract({
            filename:'css/[name].[contenthash].css'
        })
    ],
    module:{
        rules:[
            {
                test:/.scss$/,
                use:[
                    minicssextract.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                react:{
                    test:/react/,
                    chunks:'initial',
                    name:'react'
                }
            }
        }
    }
}


const generatePage = function({
    title = '',
    entry = '',
    template = './src/index.html',
    name = '',
    chunks=[]
}={}){
    return{
        entry,
        plugins:[
            new htmlwebpackplugin({
                chunks,
                template,
                filename:name+'.html'
            })
        ]
    }
}

const pages=[
    generatePage({
        title:'pageA',
        entry:{
            a:'./src/pages/a.js'
        },
        name:'a',
        chunks:[
            'react',
            'a'
        ]
    }),
    generatePage({
        title:'pageB',
        entry:{
            b:'./src/pages/b.js'
        },
        name:'b',
        chunks:[
            'react',
            'b'
        ]
    }),generatePage({
        title:'pageC',
        entry:{
            c:'./src/pages/c.js'
        },
        name:'c',
        chunks:[
            'react',
            'c'
        ]
    })
]
console.log(pages);
// 多页面配置
module.exports=pages.map(page=>merge(baseConfig,page))

// 单配置
module.exports=merge([baseConfig].concat(pages))