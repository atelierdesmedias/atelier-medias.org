/**
 * @name: global constants
 * @description: export all global constants of dev environment
 */

// ----------------------------------------------------------------------------- DIST

// Assets path
exports.assetsPath = 'dist/public/assets/';
// exports.assetsPath = root + 'dist/user/themes/willy/assets/';

// grav willybe path
exports.gravUserConfigPath = 'dist/user/willybe/';

// Dist path
exports.distPath = 'dist/';

// Assets folder
exports.assetsFolder = 'assets/';

// Images folder
exports.imagesFolder = 'images/';

// Font folder
exports.fontsFolder = 'fonts/';

// CSS Folder
exports.cssFolder = 'css/';

// ----------------------------------------------------------------------------- SRC

// Src path
exports.srcPath = 'src/';

// Atoms folder
exports.atomsFolder = "atoms/";

// Name of export atoms file
exports.atomsTypescriptFile = "atoms.ts";

// Common bundle name in src
exports.commonBundleName = '_common';

// ----------------------------------------------------------------------------- CONFIG

// Skeletons path
exports.skeletonsPath = 'willybe/skeletons/';

// Environment path folder
exports.propertiesFolderPath = 'properties/';

// Selected env file Path
exports.envNamePath = 'properties/.envName.js';

// Post css configuration
exports.postCssConfigFile = 'postcss.config.js';

// ----------------------------------------------------------------------------- APP BUNDLE

// Sub folder to choose for components
exports.componentSubFolderScaffold = [ 'blocks', 'components', 'molecules', 'pages' ];

// Bundles list filename
exports.bundlesListFile = 'bundles.ts';

// Folders to scaffold in app bundles
exports.appBundleFoldersToScaffold = ['molecules', 'pages', 'components', 'models'];

// Techno to scaffold
exports.appBundleTechnoToScaffold =  ['React', 'Vue', 'DOM'];

