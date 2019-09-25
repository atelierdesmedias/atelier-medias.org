/**
 * @name: Solid
 * @description: node tasks
 */
const path = require('path');
process.env.PATH += (path.delimiter + path.join(__dirname, 'node_modules', '.bin'));

module.exports = {

    // task dev
    dev : () => require('./config/tasks/task-webpack').dev(),

    // task production
    production : () => require('./config/tasks/task-webpack').production(),

    // Create environment
    createEnv : () => require('./config/tasks/task-properties').createEnv(),

    // Select environment
    selectEnv : () => require('./config/tasks/task-properties').selectEnv(),

    // Scaffold component
    scaffold : () => require('./config/tasks/task-scaffold').scaffold(),

};
require('make-runnable/custom')({ printOutputFrame: false });


