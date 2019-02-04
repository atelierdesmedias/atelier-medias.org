// /**
//  * @name: Solid
//  * @description: node tasks
//  */
// const path = require('path');
// process.env.PATH += (path.delimiter + path.join(__dirname, 'node_modules', '.bin'));
//
// module.exports = {
//
//     // task dev
//     dev : () => require('./solid/task-webpack').dev(),
//
//     // task production
//     production : () => require('./solid/task-webpack').production(),
//
//     // Create environment
//     createEnv : () => require('./solid/task-properties').createEnv(),
//
//     // Select environment
//     selectEnv : () => require('./solid/task-properties').selectEnv(),
//
//     // Scaffold component
//     scaffold : () => require('./solid/task-scaffold').scaffold(),
//
// };
// require('make-runnable/custom')({ printOutputFrame: false });
//
//

// resolve path
const path = require('path');

// Some colors in the terminal @see : https://github.com/marak/colors.js/
require('colors');

// Get Files helper for easy Files/Folder manipulating
const { Files } = require('@zouloux/files');

// fix about make runnable
process.env.PATH += (
    path.delimiter + path.join(__dirname, 'node_modules', '.bin')
);


/**
 * TODO: on utilise ici la dependance make runnable pour executer
 * TODO: une function spécifique
 *
 * node solid dev --> require task dev from task-parcel
 * ...
 *
 * Surement un moyen de ne pas utiliser cette dépendance.
 *
 */

module.exports = {

    // start dev
    dev : () => require('./solid/task-parcel').dev(),

    // start production
    production : () => require('./solid/task-parcel').production(),

    // clean cache, assets...
    clean : () => require('./solid/task-clean').clean(),

    // scaffold bundle or component
    scaffold :() => require('./solid/task-scaffold').scaffold(),

    // Create environment
    createEnv : () => require('./solid/task-properties').createEnv(),

    // Select environment
     selectEnv : () => require('./solid/task-properties').selectEnv(),

};
// use make renable to launch these tasks
require('make-runnable/custom')({ printOutputFrame : false });

