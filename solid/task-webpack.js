//const shell = require('shelljs');
const colors = require('colors');

const shell = require('./helper-shell');

// define message
const compileMessage = ( pMessage ) => {

    console.log([
        ``,
        `${pMessage}`.cyan
    ].join('\n'));
};

// ----------------------------------------------------------------------------- TASKS

/**
 * Prebuild tasks
 * @param pEnv
 * @private
 */
const _prebuild = (async (pEnv) =>
{
    // PreBuild bundle list
    await require('./task-prebuild').preBuildBundleList();

    // PreBuild config
    await require('./task-prebuild').preBuildPhpConfig(pEnv);
    await require('./task-prebuild').preBuildDotEnvConfig();

    // Prebuild Atoms
    await require('./task-prebuild').preBuildAtoms();
});

/**
 * PUBLIC API
 */
module.exports = {

    /**
     * Dev task
     */
    dev : (async () =>
    {
        // start prebuild
        await _prebuild('dev');

        // start webpack
        await compileMessage('🚚 Start webpack dev-server');
        await shell.exec('yarn dev');

        // if not return make runnable return undefined
        return '';
    }),

    /**
     * Production task
     */
    production : (async () =>
    {
        // start prebuild
        await _prebuild('production');

        // start webpack
        await compileMessage('😱 Start webpack production');
        await shell.exec('npm run production', (err) =>
        {
            compileMessage('webpack production end');
        });

        // if not return make runnable return undefined
        return '';
    }),
};
