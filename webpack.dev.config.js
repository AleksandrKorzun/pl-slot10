const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BuilderPlugin = require('./node_modules/@holywater-tech/ads-builder/builder/Index');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './node_modules/@holywater-tech/ads-builder/framework/App.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    devServer: {
        static: './dist',
        port: 8080,
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new BuilderPlugin({ mode: 'development' }),
    ],
};
