const path = require('path');
const webpack = require('webpack');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  GenerateSW,
} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const VersionFile = require('webpack-version-file');

function getCommonConfig() {
  return {
    entry: {
      app: './app/app.module.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      }, {
        test: /\.html$/,
        use: ['html-loader'],
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
          },
        }],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      }, {
        test: /\.properties$/,
        use: ['properties-loader'],
      }, {
        test: /\.md$/,
        use: [{
          loader: 'html-loader',
        },
        {
          loader: 'markdown-loader',
        },
        ],
      }],
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: ['!version.txt'],
      }),
      new HtmlWebpackPlugin({
        template: './app/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin([{
        from: 'assets/CNAME',
      }, {
        from: 'assets/robots.txt',
      }, {
        from: 'assets/sitemap.xml',
      }, {
        from: 'assets/logo.png',
      }, {
        from: 'assets/google989809d758b4217a.html',
      }]),
    ],
  };
}

module.exports = (env, argv) => {
  const config = getCommonConfig();
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      publicPath: '/',
      port: 9000,
    };
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    };
    config.plugins.push(new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }));
  }

  if (argv.mode === 'test') {
    config.optimization = {
      minimize: false,
    };
  }

  if (argv.mode === 'production') {
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    };
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      publicPath: '/',
    };
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin(), new TerserPlugin(), new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.((s[ac])|c)ss$/,
            chunks: 'all',
            enforce: true,
            // maxSize: 244000
          },
          res: {
            name: 'res',
            test: /\.json/,
            // chunks: 'all',
            enforce: true,
            maxSize: 244000,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            // chunks: 'all',
            enforce: true,
            maxSize: 244000,
          },
        },
      },
    };
    config.plugins.push(
      new VersionFile({
        output: './dist/version.txt',
        verbose: true,
      }),
    );
    config.plugins.push(new FaviconsWebpackPlugin({
      logo: './assets/logo.png',
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
        windows: true,
      },
    }));
    config.plugins.push(new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }));
    config.plugins.push(new WebpackPwaManifest({
      name: 'ScrollBear Spellbook',
      short_name: 'ScrollBear',
      description: 'Scrollbear spellbook reference for Pathfinder RPG.',
      background_color: '#463e43',
      crossorigin: 'anonymous', // can be null, use-credentials or anonymous
      theme_color: '#463e43',
      'theme-color': '#463e43',
      start_url: '/',
      standalone: 'standalone',
      icons: [{
        src: path.resolve('resources/img/android-chrome-36x36.png'),
        sizes: '36x36',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-48x48.png'),
        sizes: '48x48',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-72x72.png'),
        sizes: '72x72',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-96x96.png'),
        sizes: '96x96',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-144x144.png'),
        sizes: '144x144',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-256x256.png'),
        sizes: '256x256',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-384x384.png'),
        sizes: '384x384',
        type: 'image/png',
      }, {
        src: path.resolve('resources/img/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
      }],
    }));
  }

  config.plugins.push(new webpack.DefinePlugin({
    APP_VERSION: (env && env.version) ? JSON.stringify(env.version) : JSON.stringify('0.0.0'),
  }));

  return config;
};
