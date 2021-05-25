const path = require('path');

const Options = {
  ENTRY: './src/main.js',
  PATH_PROJECT: path.resolve(__dirname, 'public'),
  OUTPUT_FILE: 'bundle.js',
  ALIAS: {
    api: path.resolve(__dirname, './src/api'),
    const: path.resolve(__dirname, './src/const'),
    utils: path.resolve(__dirname, './src/utils'),
    view: path.resolve(__dirname, './src/view'),
    model: path.resolve(__dirname, './src/model'),
    presenter: path.resolve(__dirname, './src/presenter'),
  },
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
  resolve: {
    alias: Options.ALIAS,
  },
};
