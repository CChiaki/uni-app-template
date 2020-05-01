const path = require('path');
const webpack = require('webpack');
const apiMocker = require('mocker-api')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = require(`./config/conf.${process.env.NODE_ENV}.js`);

module.exports = {
	mode: process.env.NODE_ENV == "dev" ? 'development' : 'production',
	entry: {
		index: ['./cloudfunctions-dev/main.js']
	},
	output: {
		path: path.resolve(__dirname, 'cloudfunctions-aliyun'),
		filename: '[name]/[name].js',
		globalObject: "this",
		library: "main",
		libraryTarget: process.env.NODE_ENV == "dev" ? "var" : "commonjs2"
	},
	externals: {
		crypto: "crypto"
	},
	devServer: {
		before(app) {
			apiMocker(app, path.resolve('./mock/index.js'))
		},
		contentBase: path.join(__dirname, "cloudfunctions-aliyun"),
		compress: true,
		hot: true,
		port: 9000
	},
	module: {
		rules: [{
			test: /\.js/,
			loader: 'babel-loader'
		}]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //热加载插件
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'template.unicloud.html',
			inject: true
		}),
	]
}
