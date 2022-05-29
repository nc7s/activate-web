// This config is basically copy-pasted from https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph.

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtracePlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: './demo/index.tsx',
	output: {
		path: `${__dirname}/_demo/`,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				resolve: {
					extensions: ['.ts', '.tsx', '.js', '.json'],
				},
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtracePlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './demo/index.html',
		}),
		new MiniCssExtracePlugin(),
		new CopyPlugin({
			patterns: [
				'./demo/vanilla.html',
				'./demo/style.css',
				'./lib.js',
			],
		}),
	],
	devServer: {
		static: {
			directory: `${__dirname}/demo/public/`,
		},
	},
}
