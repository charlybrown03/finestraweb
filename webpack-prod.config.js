const ChangeExtensionPlugin = require('change-extension-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const GoogleFontsPlugin = require('google-fonts-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const SOUCE_MAP_OPT = { sourceMap: false, minimize: true }

const HASH = '[hash:6]'

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
    vendor: './vendor.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `[name]-${HASH}.js`
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
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
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
    new CompressionPlugin({
      asset: "[path].gz[query]",
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin(`[name]-${HASH}.css`),
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
        collapseWhitespace: true
      }
    }),
    new UglifyJSPlugin({
      test: /\.js$/,
      exclude: [ /node_modules/ ],
      compress: true,
      beautify: false
    })
  ]
}
