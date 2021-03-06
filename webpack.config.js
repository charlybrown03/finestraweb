const ExtractTextPlugin = require('extract-text-webpack-plugin')
const GoogleFontsPlugin = require('google-fonts-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const SOUCE_MAP_OPT = { sourceMap: true, minimize: false }

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
    port: 9000,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [ /node_modules/ ],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015' ]
        }
      }]
    }, {
      test: /\.jpg|png$/,
      loaders: [
        'file-loader'
      ]
    }, {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: SOUCE_MAP_OPT
        }, {
          loader: 'sass-loader',
          options: SOUCE_MAP_OPT
      } ]
      })
    }, {
      test: /\.hbs$/,
      loader: "handlebars-loader"
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Love Ya Like A Sister' },
        { family: 'Tangerine' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: false,
      favicon: './resources/images/favicon.ico',
      filename: 'index.html',
      inject: true,
      chunks: [ 'vendor', 'app' ],
      chunksSortMode: (a, b) => a.names[0] > a.names[1] ? -1 : 1,
      minify: {
        collapseWhitespace: false
      }
    })
  ]
}
