const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: resolve('./dev/index.ts'),

  // Add a hash to the output file name in production
  // to prevent browser caching if code changes
  output: {
    path: resolve('./dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  mode: 'development',
  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('./dev/index.html')
    }),

    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    publicPath: '/',
    contentBase: resolve('./public'),
    port: 80,
    proxy: undefined,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    quiet: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
}

function resolve (filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath)
}
