const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const ImageminGifsicle = require('imagemin-gifsicle');
const ImageminSvgo = require('imagemin-svgo');

module.exports = {
  mode: "development",
  entry: './src/scripts/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '../build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        ]
      },
      {
        test: /.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([{
      from: './src/images',
      to: 'assets/images'
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({ quality: 80 }),
        ImageminPngquant({ quality: '65-80' }),
        ImageminGifsicle(),
        ImageminSvgo()
      ]
    })
  ],
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "../build")
    ],
    extensions: [".js"],
  },
  devtool: "source-map",
  target: "web",
  devServer: {
    open: true
  }
};
