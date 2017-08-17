const path = require('path');
const webpack = require('webpack');

const config = {
  entry: ['babel-polyfill', './lib/components/Index.js'],
  output: {
    path: path.resolve(__dirname, 'lib/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'   // this will try to find node jquery module
    })
  ]
};

module.exports = config;
