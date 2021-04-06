const path = require('path');

const htmlLoaderRule = {
  test: /\.html$/i,
  use: {
    loader: 'simple-nunjucks-loader',
    options: {},
  },
};

const cssLoaderRule = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
};

/**
 * We need two different configs for two js builds.
 * webConfig for creating a compiled JS file that can be included directly with a <script> tag.
 * nodeConfig for compiling a JS module to be distributed via npm.
 */
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
    }, htmlLoaderRule, cssLoaderRule],
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
    rules: [htmlLoaderRule, cssLoaderRule],
  },
  output: {
    filename: 'index.js',
    library: 'userFeedbackForm',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = [webConfig, nodeConfig];
