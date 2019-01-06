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
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

function getCommonConfig() {
  return {
    entry: {
      app: './app/app.module.js'
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
      new HtmlWebpackPlugin({template: './app/index.html', filename: '404.html'}),
      new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
      new webpack.HashedModuleIdsPlugin(),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
      }),
      new WebpackPwaManifest({
        name: 'ScrollBear Spellbook',
        short_name: 'ScrollBear',
        description: 'Scrollbear spellbook reference for Pathfinder RPG.',
        background_color: '#ca945c',
        crossorigin: 'anonymous', //can be null, use-credentials or anonymous
        theme_color: '#ca945c',
        'theme-color': '#ca945c',
        start_url: '/',
        standalone: 'standalone',
        icons: [
          {
            "src": path.resolve("resources/img/android-chrome-36x36.png"),
            "sizes": "36x36",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-48x48.png"),
            "sizes": "48x48",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-72x72.png"),
            "sizes": "72x72",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-96x96.png"),
            "sizes": "96x96",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-144x144.png"),
            "sizes": "144x144",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-192x192.png"),
            "sizes": "192x192",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-256x256.png"),
            "sizes": "256x256",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-384x384.png"),
            "sizes": "384x384",
            "type": "image/png"
          }, {
            "src": path.resolve("resources/img/android-chrome-512x512.png"),
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }),
      new CopyWebpackPlugin([
        {
          from: 'assets/CNAME'
        }, {
          from: 'assets/sitemap.txt'
        }, {
          from: 'assets/logo.svg'
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
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    };
  }

  if (argv.mode === 'production') {
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js'
    };
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      publicPath: '/'
    };
    config.plugins.push(new FaviconsWebpackPlugin({
      logo: './assets/logo.svg',
      prefix: 'icons/',
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
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    };
  }

  return config;
}
