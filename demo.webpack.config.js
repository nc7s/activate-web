// This config is basically copy-pasted from https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph.

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtracePlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: './demo/react/index.tsx',
	output: {
		path: `${__dirname}/_demo/react/`,
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
			template: './demo/react/index.html',
		}),
		new MiniCssExtracePlugin(),
	],
}
