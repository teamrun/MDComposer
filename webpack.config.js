var path = require('path');

var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");


module.exports = {
    entry: {
        basic: ['./example/basic/app'],
        markdown: ['./example/markdown/app']
    },
    output: {
        path: path.join(__dirname, 'example/dist') ,
        filename: "[name]-bundle.js",
        // 打包好的文件 作为静态资源的基础路径
        publicPath: '/example/dist/'
    },
    plugins: [
        new CommonsChunkPlugin("share.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
             { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] },
             { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'] }
        ]
    },
    // postcss: [autoPrefixer],
    // react模块使用全局变量 不需要再打包起来
    externals: {
        // react: 'React'
    }
}
