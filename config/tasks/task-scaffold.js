const Inquirer = require('inquirer');
const path = require('path');
const paths = require('../paths');
const {Files} = require('@zouloux/files');
const changeCase = require('change-case');
const {QuickTemplate} = require('../helpers/helper-template');
require('colors');

// ----------------------------------------------------------------------------- LOGS

/**
 * Show a success message
 * @param pMessage Message to show
 */
const showSuccess = pMessage => {
    console.log(`→ ${pMessage}\n`.cyan);
};

/**
 * Show set of instructions and examples
 * @param pInstructions instructions list
 * @param pExamples examples list, optional
 */
const showInstructions = (pInstructions, pExamples) => {
    console.log('Read carefully:'.yellow.bold);

    // Show instructions
    pInstructions.map((instruction, i) => {
        console.log(`${i + 1}. ${instruction}`.yellow);
    });

    // Show examples
    pExamples &&
    pExamples.map((example, i) => {
        i === 0 && console.log('');
        console.log(`${example}`.yellow);
    });

    console.log('');
};

// ----------------------------------------------------------------------------- COMMON TASKS

/**
 * Ask for the component folder
 */
const askWhichComponentFolder = () => {
    return Inquirer.prompt({
        type: 'list',
        name: 'subFolder',
        message: 'Which component folder?',
        choices: paths.componentCompatibleFolders
    });
};

/**
 * Ask for the component name
 */
const askComponentName = () => {
    return Inquirer.prompt({
        type: 'input',
        message: 'component name? (classCase)',
        name: 'componentName'
    });
};

/**
 * Ask question and scaffold a component with a specific script template
 * @returns {Promise<any>}
 */
const componentScaffolder = () =>
    new Promise(async resolve => {
        // Static sub-folder for pages
        let subFolder = '';
        // Get sub-folder for components
        await askWhichComponentFolder().then(answer => {
            subFolder = answer.subFolder;
        });

        // Get component name
        let componentName = '';
        await askComponentName().then(answer => {
            componentName = answer.componentName;
        });

        // component name "ComponentName" for subfolder and component
        let lowerComponentName = changeCase.camelCase(componentName);
        let upperComponentName = changeCase.pascalCase(componentName);

        // Base path of the component (no extension here)
        let componentPath = `${paths.src}${subFolder}/${lowerComponentName}/${upperComponentName}`;

        // Check if component already exists
        if (Files.getFiles(`${componentPath}.ts`).files.length > 0) {
            console.log(`This component already exists. Aborting.`.red.bold);
            return;
        }

        // Scaffold the script
        Files.new(`${componentPath}.ts`).write(
            QuickTemplate(
                Files.getFiles(`${paths.skeletonsPath}domTsTemplate`).read(),
                {
                    capitalComponentName: upperComponentName,
                    componentType: subFolder
                }
            )
        );

        Files.new(`${componentPath}.scss`).write(
            QuickTemplate(
                Files.getFiles(`${paths.skeletonsPath}scssTemplate`).read(),
                {
                    capitalComponentName: upperComponentName,
                    componentType: subFolder
                }
            )
        );

      // Twig directory path to put components
      const twigDirPath = `${paths.twigTemplatePath}${subFolder}/`;
      // Define twig Template
      const twigTemplate = [
        `{# ${upperComponentName} Component #}`,
        `<div class="${upperComponentName}">`,
        `   ${upperComponentName}`,
        `</div>`
      ].join('\n');

      // Scaffold Twig component File
      Files.new(`${twigDirPath}${upperComponentName}.twig`).write(
          twigTemplate
      );

      console.log([
        `${upperComponentName}.scss`.yellow.bold,
        `${upperComponentName}.ts`.yellow.bold,
        `→ folder path: ` + `${componentPath}`.grey,
        ``,
        `${upperComponentName}.twig`.yellow.bold,
        `→ folder path: ` + `${twigDirPath}`.grey,
        ``,
      ].join('\n'));
        // Done

        showSuccess('Component created!');
        resolve();
    });

// ----------------------------------------------------------------------------- SCAFFOLDERS

const scaffolders = [
    /**
     * Scaffold a react based component
     */
    {
        name: 'DOM Component',
        exec: () => componentScaffolder()
    }
];

// ----------------------------------------------------------------------------- PUBLIC API
const scaffold = () =>
    new Promise(resolve => {
        // Get scaffolder to present listing to user
        let scaffolderTypes = scaffolders.map(scaffolder => scaffolder.name);

        // List available scaffolders to user
        Inquirer.prompt({
            type: 'list',
            name: 'type',
            message: 'What kind of component to create?',
            choices: scaffolderTypes,
            pageSize: 20
        }).then(answer => {
            // Get scaffolder index
            const scaffolderIndex = scaffolderTypes.indexOf(answer.type);

            // Start this scaffolder
            scaffolders[scaffolderIndex].exec();
        });
    });

module.exports = scaffold();
