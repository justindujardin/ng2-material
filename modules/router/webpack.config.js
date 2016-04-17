var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      // TypeScript
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};


var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'dist')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join(__dirname, 'src/**/*.html')},
      {from: path.join(__dirname, 'src/**/*.css')}
    ])
  ]
};

// Default config
var defaultConfig = {
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  context: __dirname,
  resolve: {
    root: path.join(__dirname, 'src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  }
};


var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig)
];
