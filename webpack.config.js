const path = require('path');
const pathProject = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: pathProject,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: pathProject,
    watchContentBase: true,
  }
};
