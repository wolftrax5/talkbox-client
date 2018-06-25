const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    https: false,
    index: path.join(__dirname,'dist/index.html'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   { loader: "style-loader" }, // Agrega el css al DOM en un <style>
        //   { loader: "css-loader" }, // interpreta los archivos css en js via import
        // ]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
	      test: /\.(html)$/,
	      use: {
	        loader: 'html-loader',
	        options: {
	          attrs: [':data-src']
	        }
	      }
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin("styles.css")
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'index.html'),
      inject: 'body',
      title: 'My talkbox App',
     })
  ]
};
