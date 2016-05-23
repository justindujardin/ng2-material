// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig() {
  var isProd = false;

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    app: './src/main.ts' // our angular app
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    path: root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: 'js/[name].js'
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    cache: true,
    root: root(),
    // only discover files that have those extensions
    extensions: ['', '.js', '.ts', '.css']
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts',
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      // Support for CSS as raw text
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: root('src'), loader: 'raw'},

      // load font files
      {test: /\.woff$/, loader: 'url?limit=100000'},
      {test: /\.woff2$/, loader: 'url?limit=100000'},
      {test: /\.ttf/, loader: 'url?limit=100000'},
      {test: /\.eot/, loader: 'url?limit=100000'}

    ],
    postLoaders: [],
    noParse: [/.+zone\.js\/dist\/.+/]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Inject script and link tags into html files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    }),

    // Extract css files
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('css/[name].css')
  ];

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
