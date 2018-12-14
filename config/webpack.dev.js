const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js"
    //filename: "[name].[contenthash].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [' ','.js','.json','.vue','.scss','.css']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
        //use: ['css-loader']
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   {
        //     loader: "css-loader",
        //     options: {
        //       minimize: true
        //     }
        //   }
        // ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        /* 排除模块安装目录的文件 */
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          { 
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      minify: {
        collapseWhitespace: true //把生成的 index.html 文件的内容的没用空格去掉，减少空间
      },
      hash: true //为了更好的 cache，可以在文件名后加个 hash
    }),
    new MiniCssExtractPlugin({
      filename: "./main.css"
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      dry: false
    })
  ],
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.common.js"
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 8888,
    inline: true, //设置为true，当源文件改变的时候会自动刷新
    // historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    hot: true, //允许热加载
    open: true,
    overlay: true  // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
  }
};