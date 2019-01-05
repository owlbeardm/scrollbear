const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function getCommonConfig() {
  return {
    entry: {
      app: './app/app.module.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        }, {
          test: /\.html$/,
          use: ['html-loader']
        }, {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }, {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }, {
          test: /\.properties$/,
          use: ['properties-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({template: './app/index.html', filename: 'index.html'}),
      new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'assets/CNAME'
        }, {
          from: 'assets/fav.png'
        }, {
          from: 'assets/google989809d758b4217a.html'
        }
      ])
    ]
  }
}

module.exports = (env, argv) => {
  const config = getCommonConfig();
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      publicPath: '/'
    };
  }

  if (argv.mode === 'production') {
    config.plugins.push(new FaviconsWebpackPlugin({
      logo: './assets/fav.png',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }));
    config.optimization = {
      minimizer: [
        new TerserPlugin(), new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 249856,
        maxSize: 1048576,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          },
          res: {
            name: 'res',
            test: /\.json/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    };
  }

  return config;
}
