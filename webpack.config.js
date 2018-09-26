const path = require('path');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'client'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'webpack-bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    host: 'localhost',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
