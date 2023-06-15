const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    index: './src/assets/scripts/index-app.js',
    project: './src/assets/scripts/project.js',
    progress: './src/assets/scripts/progress.js',
    gallery: './src/assets/scripts/gallery.js',
    news: './src/assets/scripts/news.js',
    'single-news': './src/assets/scripts/single-news.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
};

module.exports = config;
