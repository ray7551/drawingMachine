/* global __dirname */
var path = require('path');
var webpack = require('webpack');
var dir_js = path.resolve(__dirname, 'public');
var dir_css = path.resolve(__dirname, 'css');
var dir_build = path.resolve(__dirname, 'dist');
var fs = require('fs');

// var nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

module.exports = {
  entry: {
    app: path.resolve(dir_js, 'index.js')
  },
  output: {
    path: dir_build,
    filename: 'bundle.js'
  },
  //externals: nodeModules,
  resolve: {
    modules: ['node_modules', dir_js],
  },
  devServer: {
    inline: true,
    // contentBase: dir_build,
    publicPath: '/',
    disableHostCheck: true,
    host: "0.0.0.0", // disable host check and set host to allow accessing externally
    port: 9000
  },
  stats: {
    colors: true,
    chunkModules: false
  },
  plugins: [
    //new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          presets: [
            // ["env", {
            //   "targets": {
            //     "chrome": 56
            //   }
            // }]
            'es2015'
          ],
          plugins: ["transform-class-properties"],
          cacheDirectory: true
        }
      }, {
        loader: 'file-loader?name=/[name].html',
        test: /\.html$/
      }, {
        loader: 'file-loader?name=/[name].css',
        test: /\.css$/
      }, {
        loader: 'file-loader?name=/[name].svg',
        test: /\.svg$/
      }
    ]
  }
}