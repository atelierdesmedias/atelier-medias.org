/**
 * PUBLIC API
 */
const path = require('path');
const {Files} = require('@zouloux/files');
const {TemplateHelper} = require('./helper-template');
const globalConstants = require("../solid-constants.config");
const colors = require('colors');
const envName = require(`../properties/.envName`);
const currentProperties = require(`../properties/${envName}.properties.js`);
const fileTabs = "\t\t\t";
const fileTabRegex = new RegExp(`(\n${fileTabs})`, 'gmi');

// define message
const compileMessage = ( pMessage, pDest ) => {
    console.log([
        ``,
        `${pMessage}`.cyan,
        `   → folder path: ${pDest}`.grey
        ].join('\n')
    );
};

/**
 * PUBLIC API
 */
module.exports = {

    /**
     * PreBuild Bundle List
     * This list is use by webpack entry compilation
     */
    preBuildBundleList : () =>
    {
        // All app and async bundles
        const bundlesList = [];

        // get app bundles path in src folder
        const appBundlesPaths = Files.getFolders(`${globalConstants.srcPath}*`).files;

        // for each bundle in src folder
        appBundlesPaths.map( appBundlePath =>
        {
            // Skip "common" bundle
            if ( path.basename( appBundlePath ) === globalConstants.commonBundleName ) return;

            // extract bundle name from single bundle app path
            appBundlePath = `${path.basename(appBundlePath)}`;

            // push name in array
            bundlesList.push(appBundlePath);

        });

        // retourner tous les bundles formatés
        const bundlesObject = bundlesList.map((bundle, index) =>
        {
            // define file name
            let file = Files.getFiles(`${globalConstants.srcPath}${bundle}/Main.tsx`).exists()
                ? 'Main.tsx'
                : 'Main.ts';

            // definir un espace conditionné
            let space = "";
            if (index !== 0) space = "\n\n";

            return (
                // espace
                space +
                // bundle name comment
                `   // ${bundle} \n` +
                // object properties
                `   "bundle-${bundle}": "${globalConstants.srcPath}${bundle}/${file}"`
            )
        });

        Files.new(`${globalConstants.srcPath}${globalConstants.bundlesListFile}`).write(`
            /**
             * @name: bundles.ts
             * @description: bundles list object export for webpack.entry file
             * @WARNING : Do not edit this auto-generated file!
             */
             
            module.exports = {
                ${bundlesObject}  
            };`
        );

        compileMessage('📒 Pre-build bundles list', globalConstants.srcPath);
    },



    /**
     * Prebuild php config
     * This file contains current environment properties
     *
     */
    preBuildPhpConfig : (pEnv) =>
    {
        Files.new(`${globalConstants.phpConfigPath}config.php`).write(
            TemplateHelper
            (
                Files.getFiles(`${globalConstants.skeletonsPath}phpConfigTemplate`).read(),
                {
                    // current env (dev or production)
                    envName: pEnv,

                    // current Env URL
                    currentEnvURL: currentProperties.url,

                    // current properties base
                    currentEnvBase: currentProperties.base,
                }
            )
        );

        compileMessage('📄 Pre-build PHP config file', globalConstants.phpConfigPath);
    },


    /**
     * Prebuild atoms ts file
     */
    preBuildAtoms : () =>
    {

        const atomsTemplate = (atoms) => (`
			/**
			 * WARNING
			 * Auto-generated file, do not edit !
			 * Data are extracted from all scss files inside atoms/ directory.
			 */
			export const Atoms =
			{\n${atoms}
			};`
                .replace(fileTabRegex, "\n")
        );

        // Get scss files
        const atomsLessFiles = Files.getFiles(`${globalConstants.srcPath}${ globalConstants.commonBundleName }/${ globalConstants.atomsFolder }*.scss`);

        // Generated atoms list
        let atomList = [];

        // Browse less files
        atomsLessFiles.all(lessFile =>
        {
            // Read less file
            const lessContent = Files.getFiles(lessFile).read();

            // Browse lines
            lessContent.split("\n").map(split =>
            {
                // Trim line
                split = split.trim();

                // Get @ index (starting of a new less var)
                const atIndex = split.indexOf('$');

                // If @ is not at first index (we are trimmed), next
                if (atIndex !== 0) return;

                // Get colon index (starting of a value in less)
                const colonIndex = split.indexOf(':');

                // If there is no value on this line, next
                if (colonIndex === -1) return;

                // Get optionnal semi colon index
                const semiIndex = split.indexOf(';');

                // Extract var name and trim it
                const varName = split.substring(atIndex + 1, colonIndex).trim();

                // Extract value and trim it
                const value = split.substring(colonIndex + 1, Math.min(split.length, semiIndex)).trim();

                // Add this atom
                atomList.push({
                    // Var name
                    name: varName,

                    // Var value add quotes of not already there
                    value: (
                        (value.charAt(0) === "'" || value.charAt(0) === '"')
                            ? value
                            : "'" + value + "'"
                    )
                });
            });
        });


        // le path
        let pathFile = `${ globalConstants.srcPath }${ globalConstants.commonBundleName }/${ globalConstants.atomsFolder }${ globalConstants.atomsTypescriptFile }`;

        // Write atoms typescript files
        Files.new(pathFile).write(
            atomsTemplate(
                // Add each atom as a new var
                atomList.map(atom =>
                {
                    return `    "${ atom.name }": ${ atom.value },`
                }).join("\n")
            )
        );

        compileMessage('🐼 Pre-build atoms file', `${ globalConstants.srcPath }${ globalConstants.commonBundleName }/${ globalConstants.atomsFolder }`);
    },



    /**
     * Pre Build Yaml env properties
     * Use it about grav CMS
     */
    preBuildYamlProperties : () =>
    {
        Files.new(`${globalConstants.gravUserConfigPath}env.yaml`).write(
            `
                # current environment variable
                env: '${process.env.NODE_ENV}'
                
                # current envName URL
                currentEnvUrl: '${currentProperties.url}'
                
                # current envName base
                currentEnvBase: '${currentProperties.base}'    
                `
        );

        compileMessage('🚩 Pre-build yaml env properties');
    }





};
