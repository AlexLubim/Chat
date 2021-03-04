const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

 
module.exports = {
	mode: 'development',
	entry: ['babel-polyfill','./source/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
    publicPath:'./',
		filename: '[name].js'
	},
	module: {
		rules: [{
      test: /\.html$/,
      loader:'html-loader',
    }, {
			test:/\.scss$/,
			use: [
				MiniCss.loader,
        'css-loader',
				'sass-loader',
			]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },{
        test:/\.svg$/,
        type:'asset'
      }
    ]
	},
  devServer: {
    contentBase: path.resolve(__dirname, './dist/'),
    hot:true,
    port: 8080,
},
	plugins: [
    new MiniCss({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './source/index.html'), 
      filename: 'index.html',
    }),
    // new CleanWebpackPlugin(),
  ]
};