/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const AutoDllPlugin = require('autodll-webpack-plugin');

let isProduction = process.env.NODE_ENV == 'production';
let sourceMapQueryStr = isProduction ? '' : 'sourceMap';
console.log('isProduction:', isProduction);
console.log('NODE_ENV:', process.env.NODE_ENV);
let dir = {
  src: path.resolve(__dirname, 'public'),
  build: path.resolve(__dirname, isProduction ? 'dist' : 'dist-dev'),
  css: path.resolve(__dirname, 'css')
};

let config = {
  entry: {
    app: path.resolve(dir.src, 'index.js')
  },
  output: {
    path: dir.build,
    // filename: 'bundle.js'
    filename: 'js/[name].[hash].js',
    // publicPath: '/',
    //sourceMapFilename: '[name].[hash].map'
  },
  // externals: {
  //   Zepto: 'zepto'
  // },
  resolve: {
    modules: ['node_modules', dir.src],
    alias: {}
  },
  devtool: isProduction ? false : 'cheap-module-source-map',
  devServer: {
    // inline: false, // iframe mode, js about live-reloading will not mixed with application file
    // contentBase: dir.build,
    // publicPath: '/',
    disableHostCheck: true,
    host: "0.0.0.0", // disable host check and set host to allow accessing externally
    port: 9000
  },
  stats: {
    colors: true,
    chunkModules: false
  },
  plugins: [
    // new AutoDllPlugin({ // not work properly with import-loader
    //   filename: '[name].dll.js',
    //   inherit: true,
    //   entry: {
    //     vendor: [
    //       'color',
    //       'zepto',
    //       'quicksettings',
    //       'deepmerge'
    //     ]
    //   }
    // })
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(dir.src, './index.html'),
      // favicon: path.resolve(__dirname, '../src/images/favicon.ico')
    }),
    new ExtractTextPlugin('[name].[hash].css')
  ],
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
      options: {
        presets: [
          isProduction ? 'es2015' : ["env", {
            "targets": {
              "chrome": 56
            }
          }]
        ],
        plugins: ["transform-class-properties"],
        cacheDirectory: true
      }
    }, {
      test: /zepto(\.min)?\.js$/,
      use: 'imports-loader?this=>window'
    }, {
      test: /\.css$/,
      include: dir.src,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [`css-loader?${sourceMapQueryStr}`]
      }),
      // options: {
      //   name: "css/[name].[hash].[ext]"
      // }
    }, {
      test: /\.svg$/,
      loader: 'file-loader',
      options: {
        name: "[name].[hash].[ext]"
      }
    }, {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          // attrs: [':data-src']
          attrs: ['img:src', 'link:href']
        }
      }
    }]
  }
}
let addVendor = function(name, path, regx) {
  config.resolve.alias[name] = path;
  if (regx) {
    if (!config.module.noParse) config.module.noParse = [];
    config.module.noParse.push(regx);
  }
};
addVendor('zepto', path.resolve('./node_modules/zepto/dist/zepto.min.js'));// , /node_modules[\/\\]zepto[\/\\]dist[\/\\]zepto\.(min\.)?js$/
addVendor('quicksettings', path.resolve('./node_modules/quicksettings/quicksettings.min.js'));

module.exports = config;