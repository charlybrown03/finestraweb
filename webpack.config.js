const ExtractTextPlugin = require('extract-text-webpack-plugin')
const GoogleFontsPlugin = require('google-fonts-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const SOUCE_MAP_OPT = { sourceMap: !IS_PRODUCTION, minimize: IS_PRODUCTION }

const HASH = '[hash:6]'

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
    vendor: './vendor.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: IS_PRODUCTION ? `[name]-${HASH}.js` : '[name].js'
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
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            bypassOnDebug: true,
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
    new ExtractTextPlugin(IS_PRODUCTION ? `[name]-${HASH}.css` : '[name].css'),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Love Ya Like A Sister' },
        { family: 'Tangerine' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: IS_PRODUCTION,
      favicon: './resources/images/favicon.ico',
      filename: 'index.html',
      inject: true,
      chunks: [ 'vendor', 'app' ],
      chunksSortMode: (a, b) => a.names[0] > a.names[1] ? -1 : 1,
      minify: {
        collapseWhitespace: IS_PRODUCTION
      }
    }),
    new UglifyJSPlugin({
      test: /\.js$/,
      exclude: [ /node_modules/ ],
      compress: IS_PRODUCTION,
      beautify: !IS_PRODUCTION
    }),
    new webpack.LoaderOptionsPlugin({
      debug: !IS_PRODUCTION
    })
  ]
}
