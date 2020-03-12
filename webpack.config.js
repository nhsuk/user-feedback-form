const path = require('path');

const webConfig = {
  entry: ['@babel/polyfill', './src/browser-entrypoint.js'],
  mode: 'development',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }, {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: false,
          interpolate: true,
        },
      },
    }],
  },
  output: {
    filename: 'user-feedback-form.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const nodeConfig = {
  entry: ['./src/index.js'],
  mode: 'development',
  module: {
    rules: [{
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: false,
          interpolate: true,
        },
      },
    }],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = [webConfig, nodeConfig];
