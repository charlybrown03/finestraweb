const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
    vendor: './vendor.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    port: 9000
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }]
    }, {
      test: /\.jpg|png$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [
            path.resolve(__dirname, 'src/resources/styles/main.scss')
          ]
        }
      }]
    }, {
      test: /\.hbs$/,
      loader: "handlebars-loader"
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: false,
      favicon: './resources/images/favicon.ico',
      filename: 'index.html',
      inject: false,
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
