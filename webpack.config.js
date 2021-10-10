const HtmlWebpackConfigPlugin = require('html-webpack-plugin')

module.exports = [{
    mode: 'development',
    entry: './src/main/main.ts',
    target: 'electron-main',
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
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
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    module: {
      rules: [{
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{
            loader: 'ts-loader'
          }, ]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'renderer.js'
    },
    plugins: [
      new HtmlWebpackConfigPlugin({
        template: './public/index.html'
      })
    ]
  }
]