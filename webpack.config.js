const path = require('path');

const Options = {
  ENTRY: './src/main.js',
  PATH_PROJECT: path.resolve(__dirname, 'public'),
  OUTPUT_FILE: 'bundle.js',
};

module.exports = {
  mode: 'development',
  entry: Options.ENTRY,
  output: {
    filename: Options.OUTPUT_FILE,
    path: Options.PATH_PROJECT,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: Options.PATH_PROJECT,
    hot: true,
    open: true,
  },
};
