/**
 * @name: adm
 * @description: node tasks
 */
const path = require('path');
process.env.PATH += (path.delimiter + path.join(__dirname, 'node_modules', '.bin'));

module.exports = {

    // task dev
    dev : () => require('./adm/task-webpack').dev(),

    // task production
    production : () => require('./adm/task-webpack').production(),

    // Create environment
    createEnv : () => require('./adm/task-properties').createEnv(),

    // Select environment
    selectEnv : () => require('./adm/task-properties').selectEnv(),

    // Scaffold component
    scaffold : () => require('./adm/task-scaffold').scaffold(),

};
require('make-runnable/custom')({ printOutputFrame: false });


