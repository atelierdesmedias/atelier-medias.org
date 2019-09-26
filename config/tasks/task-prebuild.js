const path = require('path');
const paths = require('../paths');
const {Files} = require('@zouloux/files');
const {QuickTemplate} = require('../helpers/helper-template');
const colors = require('colors');
const fileTabs = "\t\t\t";
const fileTabRegex = new RegExp(`(\n${fileTabs})`, 'gmi');

// current properties
const envName = require(`../../properties/.envName`);
const currentProperties = require(`../../properties/${envName}.properties.js`);

// define message
const compileMessage = ( pMessage, pDest ) => {
    console.log([
        ``,
        `${pMessage}`.cyan,
        `→ folder path: ${pDest}`.grey
        ].join('\n')
    );
};

/**
 * PUBLIC API
 */
module.exports = {

    /**
     * Prebuild php config
     * This file contains current environment properties
     *
     */
    preBuildPhpConfig : (pEnv) =>
    {
        // écrire le fichier avec un template renseigné de variables choisies
        Files.new(`${paths.phpConfigPath}config.php`).write(
            QuickTemplate
            (
                Files.getFiles(`${paths.skeletonsPath}phpConfigTemplate`).read(),
                {
                    // current env (dev or production)
                    envName: pEnv,

                    // current Env URL
                    currentEnvURL: currentProperties.url,

                    // current properties base
                    currentEnvBase: currentProperties.base,

                    // current version
                    version: require("../../package.json").version,
                }
            )
        );

        // message de sortie
        compileMessage('Pre-build PHP config file', paths.phpConfigPath);
    },

    /**
     * Prebuild dot env config
     * This file contains current environment properties
     *
     */
    preBuildDotEnvConfig : () =>
    {
        // template de dotEnv
        const template = [
            '# WARNING : Do not edit this auto-generated file',
            `${
                Object.keys( currentProperties.dotEnv ).map(
                    propertyName => `${propertyName}=${currentProperties.dotEnv[propertyName]}`
                ).join("\n")
            }`
        ].join('\n');

        // écrire le nouveau fichier
        Files.new(`${paths.dist}.env`).write( template );

        // message de sortie
        compileMessage('Pre-build dot ENV config file', paths.dist);
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
        const atomsLessFiles = Files.getFiles(`${paths.src}${ paths.atomsFolder }*.scss`);

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
        let pathFile = `${ paths.src }${ paths.atomsFolder }${ paths.atomsTypescriptFile }`;

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

        compileMessage('Pre-build atoms file', `${ paths.src }${ paths.atomsFolder }`);
    },



};
