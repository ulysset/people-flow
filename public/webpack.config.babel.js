var PathRewriterPlugin = require('webpack-path-rewriter');

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
        path: './' + BASE_DIR + '__build__',
        publicPath: '__build__/',
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
