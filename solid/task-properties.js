/**
 * Define Properties Scaffold
 * @type {string}
 */

const path = require('path');
const {Files} = require('@zouloux/files');
const Inquirer = require('inquirer');
const changeCase = require('change-case');
const globalConstants = require("../solid-constants.config");
const colors = require('colors');

/**
 * Select an env from its name.
 * Will not check if env exists.
 * @param pEnvName Name of env to select
 */
const _selectEnv = (pEnvName) =>
{
    // ecrire le nouveau env name dans le fichier
    Files.new( globalConstants.envNamePath ).write(`module.exports = '${pEnvName}';`);

    console.log(`Env ${ pEnvName } is now selected.`.green);
};

/**
 * Get properties files
 */
const _getConfigs = () =>
{
    // Browse properties.js files
    return Files.getFiles(`${ globalConstants.propertiesFolderPath }/*.properties.js`).all(

        configFile =>
        {
            return {
                // Return name (without properties.js extension)
                name: path.basename( configFile ).split('.properties.js')[0],

                // Method to read solid and get properties
                read: () => require(`../${ configFile }`)
            };
        }
    );
};

/**
 * Get selected env name.
 * @returns null if no env is selected.
 */
const _getSelectedEnv = () =>
{
    // Get selected env file
    const currentEnv = Files.getFiles( globalConstants.envNamePath );

    return (
        // No env selected
        ( currentEnv.files.length === 0 )
            ? null
            // Read selected env name
            : currentEnv.read()
    );
};

/**
 * Show fatal error
 */
const _showError = ( pReason, reject ) =>
{
    console.log('');

    // No env selected
    if (pReason === 'noSelectedEnv')
    {
        console.log('');
        console.log(`No env selected.`.red.bold);
        console.log(`  → Please create your properties file into ${ globalConstants.propertiesPath.bold } and feed properties from ${'default.properties.js'.bold} file.`.red);
        console.log(`  → Then select your env with ${'node solid selectEnv'.bold}`.red)
        console.log('');
    }

    // Env does not exists
    else if (pReason === 'envDoesNotExists')
    {
        console.log('');
        console.log(`Bad env`.red.bold);
        console.log(`  →  This env is not found.`.red);
        console.log(`  →  Please check that its corresponding ${'.properties.js'.bold} file exists inside ${ globalConstants.propertiesPath.bold } directory`.red);
        console.log('');
    }

    // Sound
    console.log("\007");

    // Reject
    reject({});

    // Exit with error
    process.exit(1);
};

// ----------------------------------------------------------------------------- QUESTIONS

/**
 * Ask Name
 */
const askName = () =>
{
    return Inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What\'s your name? (ex: willy)'
    });
};

// ----------------------------------------------------------------------------- START

/**
 * PUBLIC API
 */

module.exports = {

    /**
     * Create new environment
     */
    createEnv : () =>
    {
        return new Promise(async (resolve) =>
        {
            // ask questions & get answers
            let name = '';
            await askName().then(answer => name = answer.name);

            // start bundler
            let lowerName = changeCase.lowerCase(name);

            // Scaffold properties template
            Files.new(`${globalConstants.propertiesFolderPath}${lowerName}.properties.js`).write(`
            /**
             * Set ${lowerName} properties
            */
            module.exports = {
            
                /**
                 * Application base.
                 *
                 * - Set path from domain name to application. Starting and ending with slash.
                 * - ex :
                 *        If application is installed here : http://domain.com/my-sub-folder/my-app/
                 *        Base should be : "/my-sub-folder/my-app/"
                 * - ex :
                 *        If application is installed here : http://domain.com/
                 *        Base should be : "/"
                 */
                 
                base: '/',
                
                // Application URL
                url: '',
            };`
            );

            // Scaffold properties variable template
            Files.new( globalConstants.envNamePath ).write(`module.exports = '${lowerName}';`);

            console.log('');
            console.log(`.envName is `+`${lowerName}`.yellow + ` 👍`);
            console.log(`Edit your own local path in `+`properties/${lowerName}.properties.js`.yellow);
            console.log('');

            // Done
            resolve();
        });
    },

    /**
     * Select new environment
     */
    selectEnv : () => new Promise( async ( resolve, reject ) =>
    {
        // Get configs
        const configs = _getConfigs().map( env => env.name );

        // Check if we have a env name as argument
        // node ... selectEnv myEnvName
        if ( 3 in process.argv )
        {
            // Get selected env name from arguments
            const selectedEnvName = process.argv[3];

            // Check if this env exists
            if ( configs.indexOf( selectedEnvName ) === -1 )
            {
                _showError( 'envDoesNotExists', reject );
            }
            // Select env
            _selectEnv( selectedEnvName );
            // Done
            resolve();
        }

        // if there is no envName as argument, select in env list
        else
        {
            // List available scaffolders to user
            await Inquirer.prompt({
                type: 'list',
                name: 'envName',
                message: 'Select your env.',
                choices: configs,
                pageSize: 20
            }).then( answer =>
            {
                // Select env
                _selectEnv( answer.envName );
                // Done
                resolve();
            });
        }
    })


};
