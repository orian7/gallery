const path = require('path');

module.exports = {
  //define an entry point
  entry: './Scripts/scripts.js',
  //define an output point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  //define modules
  module: {
    //deterine the supported loaders
    loaders: [
      {
        //javaScript loader
        test:/\.js$/,
        exclude:/(node_modules)/,
        loader:'babel-loader',
        query:
        {
          presets: ['es2015']
        }
      },
      {
        //html loader
        test:/\.html$/,
        loader:'file?name=[name].[ext]'
      },
      {
        //css loader
        test:/\.css$/,
        loader:'style-loader!css-loader'
      },
      {
        //images loader
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }
    ]
  }
};
