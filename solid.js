/**
 * @name: Solid
 * @description: node tasks
 */
const path = require('path');
process.env.PATH += (path.delimiter + path.join(__dirname, 'node_modules', '.bin'));

module.exports = {

    // task dev
    dev : () => require('./solid/task-webpack').dev(),

    // task production
    production : () => require('./solid/task-webpack').production(),

    // Create environment
    createEnv : () => require('./solid/task-properties').createEnv(),

    // Select environment
    selectEnv : () => require('./solid/task-properties').selectEnv(),

    // Scaffold component
    scaffold : () => require('./solid/task-scaffold').scaffold(),

};
require('make-runnable/custom')({ printOutputFrame: false });


