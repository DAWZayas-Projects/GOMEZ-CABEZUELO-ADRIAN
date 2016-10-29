var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {

    main : [
      'webpack-hot-middleware/client?http:localhost:9000',
      'webpack/hot/only-dev-server',
      './app/index'
    ],
    vendor : [
      'react',
      'redux',
      'react-redux',
      'react-dom',
      'jquery',
      'whatwg-fetch',
    ]
  },
  output: {
    publicPath: "http://0.0.0.0:9000/assets/",
    path: path.join(__dirname, 'src/public/assets'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
     new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.bundle.js'),
     new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("development")
      }}),
     new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /vendor\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },


      {
        test: /(\.jsx|\.js)$/,
        loaders: ['babel?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(css|less)$/,
        loader: 'null'
      },
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
