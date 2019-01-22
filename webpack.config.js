const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'window',
    library: 'VueHelpers'
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  externals: {
    'axios': 'axios',
    'vue-events': 'vue-events',
    'keen-ui': 'keen-ui',
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};