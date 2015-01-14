var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = 3005;
// for develop
config.devtool = 'source-map';
// for hot replacement
for( var i in config.entry ){
    config.entry[i].unshift('webpack-dev-server/client?http://0.0.0.0:3005');
    config.entry[i].unshift('webpack/hot/only-dev-server');
}


new WebpackDevServer(webpack(config), {
    // noInfo: true,
    watchDelay: 150,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        assets: false,
        cached: false,
        hash: false,
        cachedAssets: false,
        colors: true
    }
}).listen(port, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at 0.0.0.0:', port);
});
