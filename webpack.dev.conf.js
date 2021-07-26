const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: '',
		library: 'laputarenderer',
		libraryTarget: 'umd',
        libraryExport: 'default'
	},
	devtool: 'none',
	mode: 'development',   //
	plugins: [
		new CleanWebpackPlugin(),
		//打包静态资源
		new copyWebpackPlugin([
			{
				from:path.resolve(__dirname+'/static'),// 打包的静态资源目录地址
				to:'./static' // 打包到dist下面的static
			}
		]),
	],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js?$/,
				use: 'babel-loader'
			}
		]
	}
}