//const shell = require('shelljs');
const colors = require('colors');
const shell = require('./helper-shell');

// define message
const compileMessage = ( pMessage ) => {
    console.log("-".yellow);
    console.log(`${pMessage}`.yellow);
};

// ----------------------------------------------------------------------------- TASKS

/**
 * PUBLIC API
 */
module.exports = {

    /**
     * Dev task
     */
    dev : () =>
    {
        // current env
        const env = 'dev';

        // PreBuild bundle list
        require('./task-prebuild').preBuildBundleList();

        // PreBuild php config
        require('./task-prebuild').preBuildPhpConfig(env);

        // Prebuild Atoms
        require('./task-prebuild').preBuildAtoms();

        // start webpack
        compileMessage('start webpack dev-server');
        shell.exec('npm run dev');

        // if not return make runnable return undefined
        return '';
    },

    /**
     * Production task
     */
    production : () =>
    {
        // current env
        const env = 'production';

        // PreBuild bundle list
        require('./task-prebuild').preBuildBundleList();

        // PreBuild php config
        require('./task-prebuild').preBuildPhpConfig(env);

        // Prebuild Atoms
        require('./task-prebuild').preBuildAtoms();

        // start webpack
        compileMessage('start webpack production');
        shell.exec('npm run production', (err) =>
        {
            compileMessage('webpack production end');
        });

        // if not return make runnable return undefined
        return '';
    },
};