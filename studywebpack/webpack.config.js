const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = {
    entry: './index',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['react']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 
                        {
                            loader:'css-loader',
                            options:{
                                module:true
                            }
                        }
                    ],
                exclude:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'style')
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|gif|png|jpeg)$/,
                use: [{
                    loader:"url-loader",
                    options:{
                        limit:30000
                    }
                }]
            },
            {
                test: /\.(ttf|woff|svg|eot|woff2)$/,
                use: ['file-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new htmlwebpackplugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
}