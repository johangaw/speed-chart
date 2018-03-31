const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'site', 'js', 'index.js'),
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Speed Chart',
      template: path.join(__dirname, 'site', 'index.html')
    })
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
