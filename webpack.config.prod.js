import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  devtool: 'source-map',
  entry: {
      vendor: path.resolve(__dirname,'src/vendor'),
      main: path.resolve(__dirname, 'src/index')
    },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  mode: 'production',

      // Use CommonsChunkPlugin to create a separate bundle
      // of vendor libraries so that they're cached separately.
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      },

  plugins: [
      //generate an external css file with a hash in the filename
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[hash].css",
        chunkFilename: "[id].css"
      }),
      //hash the files using MD5 so that their names change when the content changes
      new WebpackMd5Hash(),

      //create HTML file that includes reference to bundled JS.
      new HtmlWebpackPlugin ({
          template: 'src/index.html',
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
          },
          inject: true
      }),
      new webpack.LoaderOptionsPlugin({
          debug: false,
          noInfo: true
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
       
      { test: /\.css$/, loader: MiniCssExtractPlugin.loader }      
    ]
  }
};