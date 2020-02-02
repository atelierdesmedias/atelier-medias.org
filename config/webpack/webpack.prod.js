const paths = require('../global.paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../global.config');

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: config.outputPath,
    filename: '[name].js',
    publicPath: ''
  },
  devtool: 'source-map',
  plugins: [
    /**
     * MiniCssExtractPlugin
     *
     * Extracts CSS into separate files.
     *
     * Note: style-loader is for development, MiniCssExtractPlugin is for production.
     * They cannot be used together in the same config.
     */
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     */
    new CopyWebpackPlugin([
      {
        from: config.outputPath,
        to: '/',
        ignore: ['*.DS_Store']
      }
    ])
  ],
  module: {

    /**
     * Extract css in one file
     */
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  /**
   * Optimization
   *
   * Production minimizing of JavaSvript and CSS assets.
   */
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },

  stats: {
    all: false,
    assets: true
  }
});
