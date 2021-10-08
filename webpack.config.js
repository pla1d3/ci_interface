const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ],
  },
  plugins: [
    new NodemonPlugin({
      script: './build/server.js',
      ignore: ['*.css'],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/[name].css',
    })
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      icons: path.resolve(__dirname, './src/icons'),
      actions: path.resolve(__dirname, './src/actions')
    }
  }
}

const serverConfig = {
    target: 'node',
    entry: './src/server.js',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, './build')
    },
    externals: [nodeExternals()],
    devtool: 'source-map',
    context: __dirname,
    node: {
      __filename: false,
      __dirname: false
    },
    optimization: { minimize: false },
    ...commonConfig
};

const browserConfig = {
  target: 'node',
  entry: './src/client.js',
  output: {
    filename: 'client.js',
    path: path.join(__dirname, './build/static')
  },
  ...commonConfig
}

module.exports = [browserConfig, serverConfig]
