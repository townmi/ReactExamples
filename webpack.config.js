/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */

module.exports = {
    entry: './src/app.js',
    output: {
        filename: './build/bundle.js'
    },
    module: {
        loaders:[
            { test: /\.js[x]?$/, exclude: /node_modules/, loaders: ['babel-loader'] }
            //{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};