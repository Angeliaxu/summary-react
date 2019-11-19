const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    devServer: {},
    plugins: [
        new htmlWebpackPlugin(
            {
               template: './index.html' 
            }
        )
    ]
}
console.log(__dirname)