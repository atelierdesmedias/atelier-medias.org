const appRoot = require('app-root-path');

module.exports = {
  // src
  src: appRoot.resolve('src/'),
  srcFolder: 'src/',

  // dist
  dist: appRoot.resolve('dist/'),
  distFolder: 'dist/',

  // public
  public: appRoot.resolve('dist/public/'),
  publicFolder: 'public/',

  // assets
  assets: appRoot.resolve('dist/public/assets/'),
  assetsFolder: 'assets/',

  // assets
  static: appRoot.resolve('dist/static/'),
  staticFolder: 'static/',

  // assets
  gravAssets: appRoot.resolve('dist/user/themes/adm/assets/'),

  // .env example file
  envExample: appRoot.resolve(".env.example"),

  // .env file
  env: appRoot.resolve(".env"),

  // skeletons
  skeletonsPath: appRoot.resolve('config/skeletons/'),

  // src atoms
  atomsFolder: 'atoms/',
  atomsTypescriptFile: 'atoms.ts',

  // stuff
  node_modules: appRoot.resolve('node_modules'),

  // scaffolder
  componentCompatibleFolders: ['components', 'pages'],
  appBundleTechnoToScaffold: ['DOM'],
  twigTemplatePath: appRoot.resolve('dist/user/themes/adm/templates/')
};
