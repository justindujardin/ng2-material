var webpack = require('webpack');
var path = require('path');

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      // TypeScript
      {test: /\.ts$/, loader: 'ts-loader'},
      // Material font
      {test: /\.woff$/, loader: 'url?limit=100000'},
      {test: /\.woff2$/, loader: 'url?limit=100000'},
      {test: /\.ttf/, loader: 'url?limit=100000'},
      {test: /\.eot/, loader: 'url?limit=100000'}
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};


var clientConfig = {
  target: 'web',
  entry: './ng2-material/all',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'ng2-material.js'
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};

var prodConfig = {
  output: {
    filename: 'ng2-material.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
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
  externals: [
    /angular2\/.*/,
    /rxjs\/.*/
  ],
  context: __dirname,
  resolve: {
    root: path.join(__dirname, '/ng2-material')
  },
  output: {
    libraryTarget: 'commonjs',
    library: 'ng2-material',
    publicPath: '/'
  }
}


var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),
  webpackMerge({}, defaultConfig, commonConfig, clientConfig, prodConfig),
];

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}
//
//
// module.exports = {
//   entry: {
//     'all.webpack': './ng2-material/webpack_all.js',
//     'all.webpack.styles': './ng2-material/webpack_styles.js'
//   },
//   output: {
//     // We use CommonJS because of Meteor 1.3 specification that uses it
//     libraryTarget: 'commonjs',
//     path: './out/',
//     filename: "[name].js"
//   },
//   resolve: {
//     extensions: ['', '.webpack.js', '.web.js', '.css', '.js']
//   },
//   externals: [
//     /angular2\/.*/
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.woff$/,
//         loader: 'url?limit=100000'
//       },
//       {
//         test: /\.woff2$/,
//         loader: 'url?limit=100000'
//       },
//       {
//         test: /\.ttf/,
//         loader: 'url?limit=100000'
//       },
//       {
//         test: /\.eot/,
//         loader: 'url?limit=100000'
//       }
//     ]
//   }
// };
