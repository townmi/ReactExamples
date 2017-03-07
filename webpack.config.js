/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const rimraf = require('rimraf');
const argv = require('yargs').argv;

const debug = require('debug')('app:webpack:config');

const config = {
    dev: process.env.NODE_ENV || 'development'
};

config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
    '__DEV__': config.env === 'development',
    '__PROD__': config.env === 'production',
    '__TEST__': config.env === 'test',
    '__COVERAGE__': !argv.watch && config.env === 'test',
    '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
};

const __DEV__ = config.globals.__DEV__;
const __PROD__ = config.globals.__PROD__;
const __TEST__ = config.globals.__TEST__;

function base() {
    const args = [path.resolve(__dirname, '.')].concat([].slice.call(arguments));
    return path.resolve.apply(path, args)
}

config.paths = {
    client: base.bind(null, 'src'),
    build: base.bind(null, 'dist')
};


rimraf(config.paths.build(), function () {
    console.log(arguments)
});

const APP_ENTRY = config.paths.client('app.js');

const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    resolve: {
        root: base('src'),
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {}
};

webpackConfig.entry = {
    app: __DEV__ ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=/__webpack_hmr`) : [APP_ENTRY],
    vendor: [
        'react',
        'react-router'
    ]
};

webpackConfig.output = {
    filename: `[name].[hash].js`,
    path: config.paths.build(),
    publicPath: '/'
};


webpackConfig.plugins = [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
        template: config.paths.client('index.html'),
        hash: false,
        // favicon: base('static/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    })
];

if (__DEV__) {
    debug('Enable plugins for live development (HMR, NoErrors).');
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    )
} else if (__PROD__) {
    debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
    webpackConfig.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        })
    )
}

webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: ['es2015', 'react', 'stage-0']
    }
}, {
    test: /\.json$/,
    loader: 'json'
}];


const BASE_CSS_LOADER = 'css?sourceMap&-minimize';

webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: null,
    loaders: [
        'style',
        BASE_CSS_LOADER,
        'postcss',
        'sass?sourceMap'
    ]
});

webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: null,
    loaders: [
        'style',
        BASE_CSS_LOADER,
        'postcss'
    ]
});

// webpackConfig.sassLoader = {
//     includePaths: paths.client('styles')
// };

webpackConfig.postcss = [
    cssnano({
        autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
        },
        discardComments: {
            removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
    })
];

module.exports = webpackConfig;