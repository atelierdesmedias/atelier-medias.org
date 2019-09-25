/**
 * Webpack Solid
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

// check if dev
const isDev = process.env.NODE_ENV === 'dev';
// get constants
const globalConstants = require("../../solid-constants.config");
// framework webpack custom config
const customWebpackConfig = require('../../solid-webpack.config');
// Get current properties
const envName = require(`properties/.envName`);
const currentProperties = require(`./properties/${envName}.properties.js`);
// import bundles
const bundles = require(`./${globalConstants.srcPath}${globalConstants.bundlesListFile}`);

// ----------------------------------------------------------------------------- WEBPACK

const entry = {
    entry: {
        // import auto-generated bundles.ts object who contains bundles entries files paths
        ...bundles
    },
};

const output = {
    output: {
        // need an absolute path
        path: path.resolve(globalConstants.assets),
        // give name of bundle entry to the output file with [name]
        filename: '[name].js',
        publicPath: isDev
            ? currentProperties.url + globalConstants.assetsFolder
            : '',
    },
};

const resolve = {
    resolve: {
        extensions: [
            '.js', '.ts', '.tsx'
        ],
        alias: {},
        modules: [
            path.resolve('node_modules'),
            path.resolve(__dirname, './'),
            globalConstants.srcPath,
        ]
    },
};

const tsModule = {
    module: {
        rules: [
            {
                test: [/\.tsx$/, /\.ts$/],
                use: [
                    {loader: 'babel-loader'},
                    {loader: 'awesome-typescript-loader'}
                ],
            },
            {
                test: /\.js$/,
                use: [{loader: 'babel-loader'}],
                exclude: /(node_modules)/,
            },
        ]
    },
};

const cssModule = {
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('postcss-preset-env')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            }),
        }]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            // inject style in  <head> tag or generate export file
            disable: isDev,
            // chunks
            allChunks: true
        }),
    ]
};

const imagesModule = {
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: "sizeof-loader",
                        options: {
                            // utiliser file loader pour générer des images importé
                            // dans assets (default is false)
                            useFileLoader: true,
                            name: isDev
                                ? "[name].[ext]"
                                : "[name].[hash:8].[ext]",
                            publicPath: isDev
                                ? currentProperties.url + globalConstants.assetsFolder
                                : "/" + globalConstants.assetsFolder
                        }
                    },
                ]
            }
        ]
    }
};

const fontsModule = {
    module: {
        rules: [
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: isDev ? '[name].[ext]' : '[hash:8].[ext]',
                            publicPath: isDev
                                ? currentProperties.url + globalConstants.assetsFolder
                                : "/" + globalConstants.assetsFolder

                        },
                    }
                ],
            }
        ]
    }
};


const sourceMapTool = {
    devtool: "cheap-module-eval-source-map"
};

const devServerTool = {
    devServer: {
        // content base to serve local dev assets
        contentBase: path.join(__dirname, globalConstants.distPath),
        compress: true,
        port: currentProperties.port,
        hot: true,
        // display error overlay on screen
        overlay: true,
        // friendly webpack error
        // https://github.com/geowarin/friendly-errors-webpack-plugin
        // pass to true if you don't want to print compile file in the console
        quiet: customWebpackConfig.quietConsole,
        stats: {
            colors: true,
            hash: false,
            version: true,
            timings: true,
            assets: true,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Access-Control-Allow-Credentials": "true"
        },
    },
};

const stateTool = {
    stats: {
        // Display colors
        colors: true,
        // Display the entry points with the corresponding bundles
        entrypoints: true,
        //
        chunks: false,
        // Add --properties information
        env: true,
        // Add children information
        children: false,
        // yellow warning
        warnings: false,
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        errorDetails: true,
    }
};


const defineEnvPlugin = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'dev'
        }),
    ]
};


const providePlugin = {
    plugins: [
        new webpack.ProvidePlugin(customWebpackConfig.libraries)
    ],
};

const cleanWebpackPlugin = {
    plugins: [
        new CleanWebpackPlugin(path.resolve(globalConstants.assets), {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            //root: path.resolve(globalConstants.assetsPath),

            // Write logs to console.
            verbose: true,

            // Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,

            // allow the plugin to clean folders outside of the webpack root.
            // Default: false - don't allow clean folder outside of the webpack root
            allowExternal: false
        }),
    ]
};

/**
 * Console formater
 * (dev + prod)
 */
const friendlyErrorsPlugin = {
    plugins: [
        new FriendlyErrors({
            onErrors: function (severity, errors) {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    sound: customWebpackConfig.soundError ? 'Pop' : '',
                })
            },
            clearConsole: customWebpackConfig.clearConsole,
        }),
    ]
};

const manifestPlugin = {
    plugins: [
        new ManifestPlugin()
    ]
};

// -----------------------------------------------------------------------------  DEV CONFIG

/**
 * Development webpack configuraton
 */
const devConfig = merge([

    entry,
    output,
    resolve,

    // module
    tsModule,
    cssModule,
    imagesModule,
    fontsModule,

    // dev spec
    sourceMapTool,
    devServerTool,
    stateTool,

    // plugins
    defineEnvPlugin,
    providePlugin,
    cleanWebpackPlugin,
    friendlyErrorsPlugin,

]);

exports.devConfig = devConfig;

// ----------------------------------------------------------------------------- PROD CONFIG

/**
 * Production webpack configuraton
 */
const prodConfig = merge([

    // base solid
    entry,
    output,
    resolve,

    // module
    tsModule,
    cssModule,
    imagesModule,
    fontsModule,

    // tools
    stateTool,

    // plugins
    providePlugin,
    defineEnvPlugin,
    cleanWebpackPlugin,
    manifestPlugin,

]);

exports.prodConfig = prodConfig;

// ----------------------------------------------------------------------------- EXPORT

// solid export depend of properties
module.exports.default = isDev
    ? devConfig
    : prodConfig;
