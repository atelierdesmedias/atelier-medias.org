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

  // php config
  phpConfigPath: appRoot.resolve('dist/public/themes/wordplate/'),

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

  // properties
  propertiesFolderPath: appRoot.resolve('properties/'),
  envNamePath: appRoot.resolve('properties/.envName.js'),
  propertiesPath: 'properties/',

  //
  //twigTemplatePath: appRoot.resolve('dist/public/themes/wordplate/templates/')
  twigTemplatePath: appRoot.resolve('dist/user/themes/quark/templates/')
};
