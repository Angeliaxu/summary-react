const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
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
        }]
    },
    plugins: [
        new htmlwebpackplugin({
            filename: 'main.html',
            template: './index.html'
        })
    ]
}