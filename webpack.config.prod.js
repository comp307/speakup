const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    devtool: 'source-map',
    entry: [
        './app.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new ExtractTextPlugin('style.css'),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader',
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                ),
            },
        ],
    },
};

module.exports = config;
