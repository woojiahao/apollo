const path = require('path')
const {
  IgnorePlugin
} = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  entry: './src/main/index.ts',
  target: 'electron-main',
  module: {
    rules: [{
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^pg-native$/
    }),
    new CopyPlugin({
      patterns: [{
        from: 'public/icons',
        to: '.'
      }]
    })
  ]
};