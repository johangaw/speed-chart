const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'app', 'site', 'js', 'index.js'),
  mode: process.env.NODE_ENV || 'development',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Speed Chart',
      template: path.join(__dirname, 'app', 'site', 'index.html')
    })
  ],

  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
