const appRoot = require('app-root-path');

module.exports = {

  // src
  src: appRoot.resolve('src/'),
  srcFolder: 'src/',

  // dist
  dist: appRoot.resolve('dist/'),
  distFolder: 'dist/',

  public: appRoot.resolve('dist/public/'),
  publicFolder: 'public/',

  // assets
  assets: appRoot.resolve('dist/public/assets/'),
  assetsFolder: 'assets/',

  // stuff
  node_modules: appRoot.resolve('node_modules'),

};
