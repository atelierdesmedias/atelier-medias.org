/**
 * @Filename: Scaffold bundles & component
 * @Description: react-main component scaffolder react-main (pages, blocks, components, molecules...)
 */

// ----------------------------------------------------------------------------- DEPENDENCIES

const {Files} = require('@zouloux/files');
const {TemplateHelper} = require('./helper-template');
const Inquirer = require('inquirer');
const changeCase = require('change-case');
const globalConstants = require('../solid-constants.config');
const colors = require('colors');
const path = require('path');

// ----------------------------------------------------------------------------- READ BUNDLE

// All app and async bundles
const bundlesList = [];

// get app bundles path in src folder
const appBundlesPaths = Files.getFolders(`${ globalConstants.srcPath }/*`).files;

// for each bundle in src folder
appBundlesPaths.map( appBundlePath =>
{
    // extract bundle name from single bundle app path
    appBundlePath = `${path.basename(appBundlePath)}`;
    // push name in array
    bundlesList.push(appBundlePath);
});

// ----------------------------------------------------------------------------- QUESTIONS

/**
 * Ask type
 */
const askType = () => {
    return Inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Witch kind of component do you want to create?',
        choices:
            [
                new Inquirer.Separator(),
                'Component',
                new Inquirer.Separator(),
                'App bundle',
                new Inquirer.Separator(),
            ]
    });
};

/**
 * Ask Techno
 */
const askTechno = () => {
    return Inquirer.prompt({
        type: 'list',
        name: 'techno',
        message: 'Witch techno?',
        choices: globalConstants.appBundleTechnoToScaffold
    });
};

/**
 * Ask Bundle
 */
const askBundle = () => {
    return Inquirer.prompt({
        type: 'list',
        name: 'bundle',
        message: 'Select your bundle',
        choices: bundlesList
    });
};

/**
 * Ask Component Sub Folder
 * /src/react-main/...
 */
const askComponentSubFolder = () => {
    return Inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Witch subFolder of the react-main?',
        choices: globalConstants.componentSubFolderScaffold
    })
};

/**
 * Ask BundleName
 */
const askBundleName = () => {
    return Inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What\'s your bundle name (dash-case) ?'
    })
};


/**
 * Ask Name
 */
const askName = () => {
    return Inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What\'s your component name (PascalCase) ?'
    })
};



// ----------------------------------------------------------------------------- COMPONENT

/**
 * Scaffold Component
 */
const scaffoldComponent = () =>
{
    return new Promise(async (resolve) =>
    {
        let componentTechno = '';
        await askTechno().then(answer =>
        {
            componentTechno = answer.techno;
        });

        let componentBundle = '';
        await askBundle().then(answer =>
        {
            componentBundle  = answer.bundle;
        });

        let componentSubFolder = '';
        await askComponentSubFolder().then(answer =>
        {
            componentSubFolder = answer.type;
        });

        let upperName = '';
        await askName().then(answer =>
        {
            // format of component Name "PascalCase"
            upperName = changeCase.pascalCase(answer.name);
        });

        /**
         * Scaffolding Component with answers.
         * Template Depend of Type
         */
        if (componentTechno === 'DOM')
        {
            componentBuilder(componentTechno, componentBundle, componentSubFolder, upperName, "domTsTemplate");
        }
        else if (componentTechno === 'React')
        {
            componentBuilder(componentTechno, componentBundle, componentSubFolder, upperName, "reactTsxTemplate");
        }
        else if (componentTechno === 'Vue')
        {
            componentBuilder(componentTechno, componentBundle, componentSubFolder, upperName, "vueTsTemplate");
        }

        // Done
        resolve();
    });
};

/**
 * Scaffold App bundle
 */
const scaffoldAppBundle = () =>
{
    return new Promise(async (resolve) =>
    {
        let bundleTechno = '';
        await askTechno().then(answer =>
        {
            bundleTechno = answer.techno;
        });

        let bundleName = '';
        await askBundleName().then(answer =>
        {
            // format of component Name "PascalCase"
            bundleName = changeCase.paramCase(answer.name);
        });

        if (bundleTechno === 'React') appBundleBuilder(bundleTechno, bundleName, "mainReactBundleTemplate");

        if (bundleTechno === 'Vue') appBundleBuilder(bundleTechno, bundleName, "mainVueBundleTemplate");

        if (bundleTechno === 'DOM') appBundleBuilder(bundleTechno, bundleName, "mainDomBundleTemplate");

        // updater la liste des bundles
        require('./task-prebuild').preBuildBundleList();

        console.log('');
        console.log(`${bundleName}`.yellow.bold + ` bundle has just been built in ` + `src/`.yellow + ` folder 👍`);
        console.log('');

        // Done
        resolve();
    });
};


// ----------------------------------------------------------------------------- BUILD

/**
 * Component Builder
 * @param pComponentType
 * @param pComponentBundle
 * @param pComponentSubFolder
 * @param pUpperName
 * @param pTsTemplateName
 */
const componentBuilder = (pComponentType, pComponentBundle, pComponentSubFolder, pUpperName, pTsTemplateName) =>
{
    // format of component Name "PascalCase"
    let lowerName = changeCase.camelCase(pUpperName);

    // Path to new component
    let dirPath = `${globalConstants.srcPath}${pComponentBundle}/${pComponentSubFolder}/${lowerName}/`;

    // Scaffold style template
    Files.new(`${dirPath}${pUpperName}.scss`).write(
        TemplateHelper
        (
            Files.getFiles(`${globalConstants.skeletonsPath}scssTemplate`).read(),
            {
                // replace all "%%name%%" with name of the component
                name: pUpperName,
            }
        )
    );

    // define extention dépend of componentTechno
    let fileExtention = 'ts';

    // if React
    if (pComponentType === "React") fileExtention = 'tsx';

    // Scaffold component template
    Files.new(`${dirPath}${pUpperName}.${fileExtention}`).write(
        TemplateHelper
        (
            Files.getFiles(`${globalConstants.skeletonsPath}${pTsTemplateName}`).read(),
            {
                // replace all "%%name%%" with name of the component
                name: pUpperName,
            }
        )
    );


    // Define twig Template
    const twigTemplate = [
        `{# ${pUpperName} Component #}`,
        `<div class="${pUpperName} {{ classElement }}">`,
        `   ${pUpperName}`,
        `</div>`
        ].join('\n');

    // Scaffold Twig component File
    Files.new(`${globalConstants.twigTemplatesPath}${pComponentSubFolder}/${pUpperName}.twig`).write(
        twigTemplate
    );

    console.log('');
    console.log(`${pUpperName}`.yellow.bold + ` has just been built in ` + `${dirPath}`.yellow + ` folder 👍`);
    console.log('');
};


/**
 * Builder app bundle
 * @param bundleTechno
 * @param bundleName
 * @param template
 */
const appBundleBuilder = (bundleTechno, bundleName, template) =>
{
    // definir l'extension en fonction
    let extension = (bundleTechno === 'React') ?'tsx' : 'ts';

    /**
     * Scaffolding App bundler with answers.
     */

    // Check if bundle already exists
    if ( Files.getFolders(`${ globalConstants.srcPath }${ bundleName }`).files.length > 0 )
    {
        console.log(`This bundle already exists. Aborting.`.red.bold);
        return;
    }

    // créer le nouveau dossier
    // Create default folders with .gitkeep files
    globalConstants.appBundleFoldersToScaffold.map( folderName =>
    {
        Files.new(`${ globalConstants.srcPath }${ bundleName }/${ folderName }/.gitkeep`).write('');
    });


    // Create react-main script
    Files.new( `${ globalConstants.srcPath }${ bundleName }/Main.${extension}`).write(
        TemplateHelper(
            Files.getFiles(`${ globalConstants.skeletonsPath }${template}`).read(),
            {
                name: bundleName,
                techno: bundleTechno
            }
        )
    );

    // Create react-main style file
    Files.new( `${ globalConstants.srcPath }${ bundleName }/Main.scss`).write(
        TemplateHelper(
            Files.getFiles(`${ globalConstants.skeletonsPath }mainScssBundleTemplate`).read(),
            {
                name: bundleName,
                techno: bundleTechno
            }
        )
    );

    // Create AppView base component
    Files.new( `${ globalConstants.srcPath }${ bundleName }/components/appView/AppView.${extension}`).write(
        TemplateHelper(
            Files.getFiles(`${ globalConstants.skeletonsPath }appView${bundleTechno}Template`).read(),
            {
                name: bundleName,
            }
        )
    );

    // Create react-main style file
    Files.new( `${ globalConstants.srcPath }${ bundleName }/components/appView/AppView.scss`).write(
        TemplateHelper(
            Files.getFiles(`${ globalConstants.skeletonsPath }scssTemplate`).read(),
            {
                name: "AppView",
            }
        )
    );

    // if Vue Bundle : copy router and store folder
    if (bundleTechno === 'Vue')
    {
        Files.getFolders( `${globalConstants.skeletonsPath}Vue/*` ).copyTo( `${ globalConstants.srcPath }${ bundleName }/` );
    }
};


// ----------------------------------------------------------------------------- START

/**
 * PUBLIC API
 */
module.exports = {

    // check type of scaffold
    scaffold : () =>
    {
        return new Promise( async() =>
        {
            // ask question of scaffolding type (component or app)
            await askType().then(answer =>
            {
                // if it's component
                if (answer.type === "Component") {
                    // start scaffold component function
                    scaffoldComponent();
                }
                // if it's app bundle
                if (answer.type === "App bundle") {
                    // start scaffold app bundle function
                    scaffoldAppBundle();
                }

            });

        });
    }

};


