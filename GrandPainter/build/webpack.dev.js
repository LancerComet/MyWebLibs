const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: {
    index: './dev/index.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "targets": {
                    "ie": "11"
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase: './',
    compress: true,
    historyApiFallback: true,
    https: false,
    port: 5000,
    quiet: true,
    disableHostCheck: true,
    host: '0.0.0.0'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/index.html',
      chunks: ['index']
    }),

    new FriendlyErrorsPlugin()
  ]
}
