module.exports = {
  entry: [
    './webpack/style.js',
    './webpack/all.js'
  ],
  output: {
    // We use CommonJS because of Meteor 1.3 specification that uses it
    libraryTarget: 'commonjs',
    path: './out/',
    filename: "all.webpack.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.css', '.js']
  },
  externals: [
    /angular2\/.*/
  ],
  module: {
    loaders: [
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.ttf/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.eot/,
        loader: 'url?limit=100000'
      }
    ]
  }
};