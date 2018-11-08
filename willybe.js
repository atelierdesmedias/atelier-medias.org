/**
 * @name: willybe
 * @description: node tasks
 */
const path = require('path');
process.env.PATH += (path.delimiter + path.join(__dirname, 'node_modules', '.bin'));

module.exports = {

    // task dev
    dev : () => require('./willybe/task-webpack').dev(),

    // task production
    production : () => require('./willybe/task-webpack').production(),

    // Create environment
    createEnv : () => require('./willybe/task-properties').createEnv(),

    // Select environment
    selectEnv : () => require('./willybe/task-properties').selectEnv(),

    // Scaffold component
    scaffold : () => require('./willybe/task-scaffold').scaffold(),

};
require('make-runnable/custom')({ printOutputFrame: false });


