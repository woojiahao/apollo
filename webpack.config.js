const HtmlWebpackConfigPlugin = require('html-webpack-plugin')

module.exports = [{
    mode: 'development',
    entry: './src/main/main.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src\/main/,
        use: [{
          loader: 'ts-loader'
        }]
      }]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'main.js'
    }
  },
  {
    mode: 'development',
    entry: './src/renderer/renderer.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src\/renderer/,
        use: [{
          loader: 'ts-loader'
        }]
      }]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'renderer.js'
    },
    plugins: [
      new HtmlWebpackConfigPlugin({
        template: './src/renderer/index.html'
      })
    ]
  }
]