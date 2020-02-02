const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('../global.config');
const paths = require('../global.paths');

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  entry: {
    main: paths.src + 'Main.ts'
  },

  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: config.outputPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  /**
   * Resolve
   *
   */
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'scss', 'css'],
    alias: {},

    modules: [paths.node_modules, paths.src]
  },

  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),

    /**
     * Import lib
     */
    new webpack.ProvidePlugin({
      $: 'zepto-webpack'
    }),

    /**
     * Dotenv Wepback
     * @doc https://github.com/mrsteele/dotenv-webpack
     */
    new Dotenv({
      path: paths.env,
      systemvars: true
    }),

    /**
     * Define Plugin
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    })
  ],

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: {
    rules: [
      /**
       * JavaScript
       *
       * Use Babel to transpile JavaScript files.
       */
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}, {loader: 'awesome-typescript-loader'}]
      },

      /**
       * Styles
       *
       * Inject CSS into the head with source maps.
       */
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      },

      /**
       * Images
       *
       * Copy image files to build folder.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          // prevent display of src/ in filename
          context: 'src'
        }
      },

      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
          // prevent display of src/ in filename
          context: 'src'
        }
      }
    ]
  }
};
