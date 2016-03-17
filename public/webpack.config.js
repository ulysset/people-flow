const PathRewriterPlugin = require('webpack-path-rewriter');
const path = require('path');
const webpack = require('webpack');

const __BASE_DIR__ = process.env.BASE_DIR ? process.env.BASE_DIR : '';
const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

module.exports = {
  devTools: __DEV__ ? 'eval-source-map' : '',
  entry: {
    'index.js': './' + __BASE_DIR__ + 'src/index.js'
  },
  devServer: {
    noInfo: true
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    modulesDirectories: [
      'node_modules',
      'public/src',
      'public/src/assets',
      'public/src/web_modules',
      'public/src/core'
    ]
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
    }, {
      test: /\.json?$/,
      loader: 'json'
    },{
      test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader'
    }]
  },
  vue: {
    loaders: {
      js: 'babel',
      css: 'style!css-loader'
    }
  },
  plugins: [
    new PathRewriterPlugin(),
    new webpack.DefinePlugin({
       __PROD__: __PROD__,
       __DEV__: __DEV__,
       'process.env.NODE_ENV': __DEV__ ? '"development"' : '"production"'
    })
  ].concat(
    __PROD__ ? [
      new webpack.optimize.UglifyJsPlugin()
    ] : []
  ),
  node: {
    fs: "empty"
  }
};
