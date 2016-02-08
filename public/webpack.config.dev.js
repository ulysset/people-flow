var PathRewriterPlugin = require('webpack-path-rewriter');
var path = require('path');

var BASE_DIR = process.env.BASE_DIR ? process.env.BASE_DIR : '';



module.exports = {
    devTools: 'eval-source-map',
    entry: {
        'index.js': './' + BASE_DIR + 'src/index.js'
    },
    devServer: {
        noInfo: true
    },
    output: {
        path: path.join(__dirname, 'public/__build__'),
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
