var Webpack = require('webpack');
var path = require('path');

var viewPath = path.resolve(__dirname, 'views');
var nodePath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'assets', 'scripts');

var config = {
  context: __dirname,
  entry: {
    home: path.resolve(viewPath, 'home.js')
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/assets/',
    library: 'require',
    libraryTarget: 'this'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [nodePath]
      },
      {
        test: /\.png$/,
        loader: 'file?name=images/[name].[ext]',
        exclude: [nodePath]
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
