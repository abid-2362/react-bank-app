const path = require('path');

module.exports = {
  // watch: true,
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.(jpg|jpeg|gif|png|ico|html)$/,
        exclude: /node_modules/,
        loader:'file-loader?name=[path][name].[ext]&context=./src'
      },
      {
        test: /\.(js|jsx)$/, // check for .js and .jsx files (uses Regex)
        loader: 'babel-loader', // use this loader for .js and .jsx files found
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ['transform-decorators-legacy']
          ]
        }
      },
      {
        // check for files ending with  .css (uses Regex)
        test: /\.css$/,
         // use these loaders of .css files. 'css-loader gets run first and is
         // used to handle the imports of our css files inside our jsx files.
         // The style loader then mounts our css in to the DOM
        loaders: ['style-loader', 'css-loader']
      },
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
      // {
      //   test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 8192
      //   }
      // }
    ]
  },
  // set the file extensions we want webpack to resolve
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};