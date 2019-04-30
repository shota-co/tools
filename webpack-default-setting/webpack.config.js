const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',

  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //   // TODO
          //   }
          // },
          // {
          //   loader: 'css-loader',
          //   options: {
          //     url: false,
          //     minimize: true,
          //   }
          // },
          // {
          //   loader: 'sass-loader'
          // }
        ]
      }
    ]
  }
};
