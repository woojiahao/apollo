const HtmlWebpackConfigPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {
  IgnorePlugin
} = require('webpack')

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
    },
    plugins: [
      new IgnorePlugin({
        resourceRegExp: /^pg-native$/
      }),
      new CopyPlugin({
        patterns: [{
            from: 'public/icons',
            to: '.'
          },
          {
            from: 'public/svg-loaders',
            to: '.'
          }
        ]
      })
    ]
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
      }, {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }, {
        test: /\.svg$/,
        use: [
          '@svgr/webpack'
        ]
      }],
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