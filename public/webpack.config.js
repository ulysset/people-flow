var PathRewriterPlugin = require('webpack-path-rewriter');
var path = require('path');

var __BASE_DIR__ = process.env.BASE_DIR ? process.env.BASE_DIR : '';
var __DEV__ = process.env.NODE_ENV === 'development';
var __PROD__ = process.env.NODE_ENV === 'production';

module.exports = {
    devTools: 'eval-source-map',
    entry: {
        'index.js': './' + __BASE_DIR__ + 'src/index.js'
    },
    devServer: {
        noInfo: true
    },
    output: {
        path: __DEV__ ? path.join(__dirname, 'public/__build__') : './' + __BASE_DIR__ + '__build__',
        publicPath: '',
        filename: '[name]'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /[.]html$/,
            loader: PathRewriterPlugin.rewriteAndEmit({
                name: '[name].html'
            })
        }]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    plugins: [
        new PathRewriterPlugin()
    ]
};
