const path = require('path');

module.exports = {
	entry: './project/src/Main.ts',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './project/build'),
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			}
		]
	},
	node: {
		fs: "empty"
	},
	devtool: 'source-map'
};
