var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');

module.exports = {

  entry: {
    main : './app/index',
    vendor : [
      'react',
      'redux',
      'react-redux',
      'react-dom',
      'jquery',
      'whatwg-fetch'
    ]
  },
  output: {
    path: path.join(__dirname, 'src/public/assets'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/static/',
  },
  plugins: [

     new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.bundle.js'),
     new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
     }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
    }})

  ],
  module: {
    loaders: [
      { test: /vendor\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
        test: /(\.jsx?|\.js)$/,
        loaders: ['babel?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(css|less)$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[name].[hash].[ext]?'},
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=200' },
      { test: /\.json$/, loader: 'json' }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
